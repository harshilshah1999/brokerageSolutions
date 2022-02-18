<template>
  <!-- @TODO MAKE STEPPER FORM COMPONENT NAME DYNAMIC -->
  <!-- @TODO ADD ICONS IN FORM-->
  <v-stepper non-linear v-model="e1" alt-labels>
    <v-stepper-header>
      <template v-for="n in stepperData">
        <v-stepper-step
          :key="`${n.number}-step`"
          :complete="e1 > n.number"
          :step="n.number"
          editable
        >
          {{ n.title }}
        </v-stepper-step>

        <v-divider v-if="n.number !== 6" :key="n.number"> </v-divider>
      </template>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <v-card elevation="0">
          <location-details @stepperChange="moveToBuildingDetails" />
        </v-card>
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-card elevation="0">
          <construction-details
            :buildingId="buildingID"
            :apartmentId="apartmentID"
            :city="city"
            :localityId="localityID"
            :sublocalityId="sublocalityID"
            @stepperChange="e1 = 3"
          />
        </v-card>
      </v-stepper-content>

      <v-stepper-content step="3">
        <v-card elevation="0">
          <flat-details :apartmentId="apartmentID" @stepperChange="e1 = 4" />
        </v-card>
      </v-stepper-content>

      <v-stepper-content step="4">
        <v-card elevation="0">
          <amenities @stepperChange="e1 = 5" />
        </v-card>
      </v-stepper-content>

      <v-stepper-content step="5">
        <v-card elevation="0">
          <media @stepperChange="e1 = 6" />
        </v-card>
      </v-stepper-content>

      <v-stepper-content step="6">
        <v-card elevation="0">
          <scheduling @stepperChange="e1 = 7" />
        </v-card>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
const BuildingDetails = () => import("~/components/stepperForms/BuildingDetails.vue");
const LocationDetails = () => import("~/components/stepperForms/LocationDetails.vue");
const FlatDetails = () => import("~/components/stepperForms/FlatDetails.vue");
const Amenities = () => import("~/components/stepperForms/Amenities.vue");
const Media = () => import("~/components/stepperForms/Media.vue");
const Scheduling = () => import("~/components/stepperForms/Scheduling.vue");

export default {
  components: {
    LocationDetails,
    BuildingDetails,
    FlatDetails,
    Amenities,
    Media,
    Scheduling,
  },
  data() {
    return {
      e1: 1,
      buildingID: null,
      apartmentID: null,
      localityID: null,
      sublocalityID: null,
      city: null,
      stepperData: [
        {
          title: "Location Details",
          number: 1,
        },
        {
          title: "Construction Details",
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
        {
          title: "Scheduling",
          number: 6,
        },
      ],
    };
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
      this.e1 = 2;
    },
  },
};
</script>

<style></style>
