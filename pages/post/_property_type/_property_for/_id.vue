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
            @stepperChange="moveToBuildingDetails"
          />
        </v-card>
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-card elevation="0">
          <building-details
            :property_details="property_details"
            @stepperChange="property_details.step = 3"
          />
        </v-card>
      </v-stepper-content>

      <v-stepper-content step="3">
        <v-card elevation="0">
          <flat-details :apartmentId="apartmentID" @stepperChange="property_details.step = 4" />
        </v-card>
      </v-stepper-content>

      <v-stepper-content step="4">
        <v-card elevation="0">
          <amenities
            :buildingId="buildingID"
            :apartmentId="apartmentID"
            @stepperChange="property_details.step = 5"
          />
        </v-card>
      </v-stepper-content>

      <v-stepper-content step="5">
        <v-card elevation="0">
          <media :apartmentId="apartmentID" @stepperChange="property_details.step = 6" />
        </v-card>
      </v-stepper-content>

      <!-- <v-stepper-content step="6">
        <v-card elevation="0">
          <file-pond @stepperChange="property_details.step = 7" />
        </v-card>
      </v-stepper-content> -->
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
        step: 1
      },
      buildingID: null,
      apartmentID: null,
      localityID: null,
      sublocalityID: null,
      city: null,
      building: "",
      landmark: "",
      locality: "",
      sublocality: "",
      flatNumber: "",
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
      this.$route.params.property_type + "_" + this.$route.params.property_for,
      this.$route.params.id
    );
    this.property_details = {...response.data()};
    this.buildingID = this.property_details.location_details.building_id;
    this.localityID = this.property_details.location_details.locality_id;
    this.sublocalityID = this.property_details.location_details.sublocality_id;
    this.apartmentID = this.$route.params.id;
  },
  methods: {
    moveToBuildingDetails: function (
      city,
      localityID,
      sublocalityID,
      buildingID,
      apartmentID
    ) {
      this.city = city;
      this.localityID = localityID;
      this.sublocalityID = sublocalityID;
      this.buildingID = buildingID;
      this.apartmentID = apartmentID;
      this.property_details.step = 2;
    },
  },
};
</script>

<style></style>
