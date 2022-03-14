<template>
  <!-- @TODO MAKE STEPPER FORM COMPONENT NAME DYNAMIC -->
  <!-- @TODO ADD ICONS IN FORM-->
  <!-- @TODO Validation for dynamic routes paramters-->
  <v-stepper non-linear v-model="property_details.step" alt-labels>
    <v-stepper-header>
      <template v-for="n in stepperData">
        <v-stepper-step
          :key="`${n.number}-step`"
          :complete="property_details.step > n.number"
          :step="n.number"
          editable
        >
          {{ n.title }}
        </v-stepper-step>

        <v-divider v-if="n.number !== 5" :key="n.number"> </v-divider>
      </template>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <v-card elevation="0">
          <location-details
            :property_details="property_details"
            @stepperChange="updateBuildingDetails"
          />
        </v-card>
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-card elevation="0">
          <building-details
            :property_details="property_details"
            @stepperChange="updateFlatDetails"
          />
        </v-card>
      </v-stepper-content>

      <v-stepper-content step="3">
        <v-card elevation="0">
          <flat-details
            :property_details="property_details"
            @stepperChange="updateAmenities"
          />
        </v-card>
      </v-stepper-content>

      <v-stepper-content step="4">
        <v-card elevation="0">
          <amenities
            :property_details="property_details"
            @stepperChange="property_details.step = 5"
          />
        </v-card>
      </v-stepper-content>

      <v-stepper-content step="5">
        <v-card elevation="0">
          <media @stepperChange="property_details.step = 6" />
        </v-card>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import postApartmentServices from "../../../../services/postForm/apartments/postApartmentServices";
const BuildingDetails = () => import("~/components/stepperForms/BuildingDetails.vue");
const LocationDetails = () => import("~/components/stepperForms/LocationDetails.vue");
const FlatDetails = () => import("~/components/stepperForms/FlatDetails.vue");
const Amenities = () => import("~/components/stepperForms/Amenities.vue");
const Media = () => import("~/components/stepperForms/Media.vue");

export default {
  components: {
    LocationDetails,
    BuildingDetails,
    FlatDetails,
    Amenities,
    Media,
  },
  data() {
    return {
      property_details: {
        step: 1,
      },
      stepperData: [
        {
          title: "Location Details",
          number: 1,
        },
        {
          title: "Building Details",
          number: 2,
        },
        {
          title: "Flat Details",
          number: 3,
        },
        {
          title: "Amenities",
          number: 4,
        },
        {
          title: "Media",
          number: 5,
        },
      ],
    };
  },
  async mounted() {
    let response = await postApartmentServices.getApartmentDetails(
      this.$route.params.property_type + "s_" + this.$route.params.property_for,
      this.$route.params.id
    );
    this.property_details = { ...response.data() };
  },
  methods: {
    updateBuildingDetails: function (localtion_details) {
      this.property_details.location_details = {
        ...localtion_details,
      };
      this.property_details = { ...this.property_details, step: 2 };
    },
    updateFlatDetails: function (flat_details) {
      this.property_details.flat_details = {
        ...flat_details,
      };
      this.property_details = { ...this.property_details, step: 3 };
    },
    updateAmenities: function(amenities) {
      this.property_details.amenities = {
        ...amenities,
      };
      this.property_details = { ...this.property_details, step: 4 };
    }
  },
};
</script>

<style></style>
