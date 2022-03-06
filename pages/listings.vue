<template>
  <!--
// @TODO user cannot post a new property if he has more than 5 properties in pending
// @TODO
// @TODO
 -->
  <div>
    <v-row class="col-wrapper">
      <v-col cols="12" sm="8"> ALREADY LISTED PROPERTIES </v-col>
      <v-col class="wrapper center" cols="12" sm="4">
        <v-card class="card">
          <v-col>
            <h2 class="light_blue">Post New Property</h2>
          </v-col>

          <!-- <v-col cols="12" sm="12">
            <p class="extra-light_blue">My property category is:</p>
            <v-chip
              v-for="category in categories"
              :key="category"
              v-on:click="
                property_category = category;
                updatePropertyTypes(category);
              "
              class="categories"
              pill
              color="#1e2738da"
              :text-color="property_category != category ? '' : 'white'"
              :outlined="property_category != category"
              link
            >
              <span class="capitalize">{{ category }} </span>
            </v-chip>
          </v-col> -->

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
            <!-- <v-select
              v-if="property_type === 'Other'"
              v-model="property_type"
              :items="property_types"
              menu-props="auto"
              label="Property Type"
              outlined
              required
            ></v-select> -->
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
              :disabled="submit_button_disabled"
              class="btn"
              id="submit"
              @click="submit"
            >
              <span id="send-otp-button"> Submit </span>
            </v-btn>
          </v-col>
        </v-card>
      </v-col>
    </v-row>
    <v-snackbar
      v-model="snackbar.show"
      top
      width="25%"
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
    property_category: null,
    categories: ["residential", "commercial", "other"],

    property_type: null,
    property_type_chips: [
      { id: "apartment", name: "Flat/Apartment" },
      { id: "shop", name: "Retail Shop" },
      { id: "pg", name: "PG/Hostel" },
      // { id: "other", name: "Other" },
    ],
    property_types: [],
    // residential_properties: ["apartment"],
    // commercial_properties: ["shop"],
    // other_properties: ["farm"],

    property_for: null,
    property_for_types: ["sale", "rent", "share"],

    submit_button_loading: false,
    submit_button_disabled: false,

    snackbar: {
      text: null,
      show: null,
      backgroundColor: "#dfdfdf",
    },
  }),
  async mounted() {},
  methods: {
    async submit() {
      let collectionID = this.property_type + "s_" + this.property_for;
      let user;
      let propertyID;
      try {
        user = await listingServices.getUser(localStorage.getItem("user_id"));
      } catch (error) {
        this.showSnackbar("Error retrieving user details! Please try again", "danger");
        console.log(error);
      }

      try {
        if (user.data()) {
          // to make sure that user_id is not manipulated from localstorage
          propertyID = await listingServices.addProperty(collectionID, {
            posted_by_user_id: user.id,
            posted_by_user_name: user.data().user_name,
          });
          this.showSnackbar("Property ad created!!", "success");
          console.log(propertyID);
        }
      } catch (error) {
        this.showSnackbar("Property add not created! Please try again", "danger");
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
