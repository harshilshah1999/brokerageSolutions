<template>
  <!--
// @TODO user cannot post a new property if he has more than 5 properties in pending
// @TODO get all the properties posted by the user.
// @TODO
 -->
  <div>
    <v-row class="col-wrapper">
      <v-col cols="12" sm="8">
        ALREADY LISTED PROPERTIES
        <div>
          {{ user_listings }}
        </div>

        <v-card
          v-for="(item, i) in items"
          :key="i"
          class="mx-auto"
          style="margin-bottom: 5px"
        >
          <v-container>
            <v-row dense>
              <v-col cols="3" sm="3">
                <v-img :src="item.src"> </v-img>
              </v-col>
              <v-col cols="6" sm="6"> </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>

      <!-- right section starts here -->
      <v-col class="center" cols="12" sm="4">
        <div class="wrapper">
          <v-card class="card">
            <v-col>
              <h2 class="light_blue">Post New Property</h2>
            </v-col>

            <v-col cols="12" sm="12">
              <p class="extra-light_blue left">What kind of property do you have?</p>
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
              <p class="extra-light_blue left">
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
                :disabled="property_type == 'shop' && property_for_type == 'share'"
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
    property_for_types: ["sale", "rent", "share"],

    submit_button_loading: false,

    snackbar: {
      text: null,
      show: null,
      backgroundColor: "#dfdfdf",
    },

    items: [
      {
        color: "#1F7087",
        src: "https://cdn.vuetifyjs.com/images/cards/foster.jpg",
        title: "Supermodel",
        artist: "Foster the People",
      },
      {
        color: "#952175",
        src: "https://cdn.vuetifyjs.com/images/cards/halcyon.png",
        title: "Halcyon Days",
        artist: "Ellie Goulding",
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
          posting_status: "incomplete",
          step: 1,
        });
        this.submit_button_loading = false;

        this.showSnackbar("Property ad created!!", "success");
        this.$router.replace({
          path:
            "/post/" + this.property_type + "/" + this.property_for + "/" + propertyID.id,
        });
      } catch (error) {
        this.submit_button_loading = false;
        this.showSnackbar("Property add not created! Please try again", "error");
        console.log(error);
      }
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
.col-wrapper {
  min-height: 90vh;
}
.wrapper {
  display: flex;
  align-items: center;
  justify-items: center;
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
.center {
  text-align: center;
}
.left {
  text-align: left;
}
.dark-blue {
  color: #1e2738;
}
.light_blue {
  color: #1e2738da;
}
.extra-light_blue {
  color: #1e2738b9;
}
.ultra-light-blue-bg {
  background-color: #1e27380b;
}
</style>
