<template>
  <!--
// @TODO user cannot post a new property if he has more than 5 properties in pending
// @TODO get all the properties posted by the user.
// @TODO property post-card dislaying only on page reload
 -->
  <div>
    <v-row class="col-wrapper">
      <v-col cols="12" sm="8">
        <v-card style="padding: 20px">
          <v-card-title>ALREADY LISTED PROPERTIES</v-card-title>
          <!-- <div>
            {{ user_listings }}
          </div> -->

          <v-card
            v-for="(property, i) in user_listings"
            :key="i"
            class="mx-auto"
            style="margin: 20px 0px 0px 0px"
          >
            <div class="wrapper">
              <v-col cols="3" sm="3" style="padding: 0">
                <v-img :src="items[0].src"> </v-img>
              </v-col>
              <v-col cols="9" sm="9">
                <div class="capitalize dark-blue" style="margin-left: 12px; padding-bottom: 8px">
                  <span v-if="property.flat_details && property.flat_details.BHKType">
                    {{ property.flat_details.BHKType }}
                  </span>
                  {{ property.property_type }} for {{ property.property_for }}
                  <span
                    v-if="
                      property.location_details && property.location_details.building_name
                    "
                  >
                    in {{ property.location_details.building_name }},
                    {{ property.location_details.sublocality_name }},
                    {{ property.location_details.locality_name }}
                  </span>
                  <span
                    v-else-if="
                      property.location_details && property.location_details.landmark
                    "
                  >
                    near {{ property.location_details.landmark }}
                  </span>
                </div>
                <v-divider></v-divider>

                <!-- <v-divider vertical style="margin: 0px 10px 0px 10px"></v-divider> -->
                <div class="wrapper justify-start">
                  <v-col class="wrapper justify-start" cols="7" sm="7">
                    <div>
                      <p style="margin: 0">
                        <span class="dark-blue">Property ID : </span>
                        <span class="extra-lightblue">{{ property.property_id }} </span>
                      </p>
                      <p style="margin: 0">
                        <span class="dark-blue">Status : </span>
                        <span class="extra-lightblue">{{ property.status }}</span>
                      </p>
                      <p style="margin: 0">
                        <span class="dark-blue">Created On : </span>
                        <span class="extra-lightblue">
                          {{
                            new Intl.DateTimeFormat("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "2-digit",
                            }).format(
                              new Date(
                                property.created_date.seconds * 1000 +
                                  property.created_date.nanoseconds / 1000000
                              )
                            )
                          }}</span
                        >
                      </p>
                    </div>
                  </v-col>
                  <v-divider style="margin: 10px 0 0 0" inset vertical></v-divider>

                  <v-col cols="5" sm="5" class="wrapper">
                    <div>
                      <v-btn
                        class="btn2"
                        id="otp-btn"
                        @click="
                          redirect(
                            property.property_type,
                            property.property_for,
                            property.property_id
                          )
                        "
                      >
                        Edit
                      </v-btn>
                      <v-btn class="btn2" id="otp-btn"> Mark as sold </v-btn>
                    </div>
                  </v-col>
                </div>
              </v-col>
            </div>
          </v-card>
        </v-card>
      </v-col>

      <!-- right section starts here -->
      <v-col class="center" cols="12" sm="4">
        <div class="wrapper">
          <v-card class="card">
            <v-col>
              <h2 class="lightblue">Post New Property</h2>
            </v-col>

            <v-col cols="12" sm="12">
              <p class="extra-lightblue left">What kind of property do you have?</p>
              <v-chip
                v-for="type in property_type_chips"
                :key="type.id"
                v-on:click="property_type = type.id"
                class="categories"
                pill
                color="#1e2738da"
                :disabled="type.id == 'pg'"
                :text-color="property_type != type.id ? '' : 'white'"
                :outlined="property_type != type.id"
                link
              >
                <span class="capitalize">{{ type.name }} </span>
              </v-chip>
            </v-col>

            <v-col cols="12" sm="12">
              <p class="extra-lightblue left">
                What would you like to do with your
                <span v-if="property_type">{{ property_type }}</span>
                <span v-else>property</span>?
              </p>
              <v-chip
                v-for="property_for_type in property_for_types"
                :key="property_for_type"
                v-on:click="property_for = property_for_type"
                class="categories"
                pill
                color="#1e2738da"
                :text-color="property_for != property_for_type ? '' : 'white'"
                :outlined="property_for != property_for_type"
                :disabled="property_type == 'shop' && property_for_type == 'sharing'"
                link
              >
                <span class="capitalize">{{ property_for_type }} </span>
              </v-chip>
            </v-col>

            <v-col cols="12" sm="12">
              <v-btn
                :loading="submit_button_loading"
                :disabled="!property_for || !property_type"
                class="btn"
                id="submit"
                @click="submit"
              >
                <span id="send-otp-button"> Create </span>
              </v-btn>
            </v-col>
          </v-card>
        </div>
      </v-col>
    </v-row>
    <v-snackbar
      v-model="snackbar.show"
      bottom
      :color="snackbar.backgroundColor"
      :timeout="3000"
    >
      <b style="font-size: 1em">{{ snackbar.text }}</b>

      <template v-slot:action="{ attrs }">
        <v-btn
          style="background-color: #1e2738da; color: #dfdfdf"
          text
          v-bind="attrs"
          @click="snackbar.show = false"
        >
          Close
          <!-- Cross icon -->
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import listingServices from "../services/listingServices";
export default {
  // layout: "no-container",
  data: () => ({
    user: null,
    user_listings: [],

    property_category: null,
    categories: ["residential", "commercial", "other"],

    property_type: null,
    property_type_chips: [
      { id: "apartment", name: "Flat/Apartment", type: "Residential" },
      { id: "shop", name: "Retail Shop", type: "Commercial" },
      { id: "pg", name: "PG/Hostel", type: "Residential" },
      // { id: "other", name: "Other" },
    ],
    property_types: [],

    property_for: null,
    property_for_types: ["sale", "rent", "sharing"],

    submit_button_loading: false,

    snackbar: {
      text: null,
      show: null,
      backgroundColor: "#dfdfdf",
    },

    items: [
      {
        src: "https://cdn.vuetifyjs.com/images/cards/halcyon.png",
      },
    ],
  }),
  async mounted() {
    this.user = await listingServices.getUser(localStorage.getItem("user_id"));
    if (this.user) {
      // to make sure that user_id is not manipulated from localstorage
      let properties_posted = this.user.data().properties_posted
        ? this.user.data().properties_posted
        : [];
      properties_posted.forEach(async (property) => {
        let collectionID = property.split("-")[0];
        let propertyID = property.split("-")[1];
        await listingServices.getProperty(collectionID, propertyID).then((response) => {
          let data = {
            ...response.data(),
            type: collectionID,
            property_id: propertyID,
          };
          this.user_listings.push(data);
        });
      });
    } else {
      this.showSnackbar("Stop fucking around and login again bitch!", "danger");
      localStorage.removeItem("user_id");
      this.$router.replace({ name: "signin" });
    }
  },
  methods: {
    async submit() {
      let collectionID = this.property_type + "s_" + this.property_for;

      try {
        this.submit_button_loading = true;
        let propertyID = await listingServices.addProperty(collectionID, {
          posted_by_user_id: this.user.id,
          posted_by_user_name: this.user.data().user_name,
          property_type: this.property_type,
          property_for: this.property_for,
          posting_status: "incomplete",
          status: "Inactive",
          step: 1,
        });
        this.submit_button_loading = false;
        this.showSnackbar("Property ad created!!", "success");
        this.redirect(this.property_type, this.property_for, propertyID.id);
      } catch (error) {
        this.submit_button_loading = false;
        this.showSnackbar("Property add not created! Please try again", "error");
        console.log(error);
      }
    },

    redirect(property_type, property_for, propertyID) {
      this.$router.replace({
        path: "/post/" + property_type + "/" + property_for + "/" + propertyID,
      });
    },
    showSnackbar(text, backgroundColor) {
      this.snackbar.show = true;
      this.snackbar.text = text;
      this.snackbar.backgroundColor = backgroundColor;
    },
  },
};
</script>

<style>
.no-margin {
  margin: 0;
}
.col-wrapper {
  min-height: 90vh;
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}
.justify-start {
  justify-content: flex-start;
}
.capitalize {
  text-transform: capitalize;
}
.categories {
  margin: 2px;
}
.card {
  width: 100%;
  border-radius: 2% !important;
  padding: 1%;
}
.btn {
  width: 100% !important;
  height: 50px !important;
  border-radius: 10px;
  background-color: #1e2738da !important;
  color: white !important;
  transition: background-color 0.75s;
}
.btn2 {
  width: 100% !important;
  height: 40px !important;
  border-radius: 10px;
  background-color: #1e2738da !important;
  color: white !important;
  margin: 5px;
  transition: background-color 0.75s;
}
.center {
  text-align: center;
}
.left {
  text-align: left;
}
.dark-blue {
  color: #1e2738;
}
.lightblue {
  color: #1e2738da;
}
.extra-lightblue {
  color: #1e2738b9;
}
.ultra-lightblue-bg {
  background-color: #1e27380b;
}
</style>
