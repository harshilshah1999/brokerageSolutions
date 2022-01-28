<template>
  <!-- @TODO MAKE STEPPER FORM COMPONENT NAME DYNAMIC -->
  <!-- @TODO remove non-linear -->
  <v-stepper  non-linear v-model="e1" alt-labels>
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
          <location-details @stepperChange="moveToConstructionDetails" />
        </v-card>
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-card elevation="0">
          <construction-details :apartmentId="apartment_ID" @stepperChange="e1 = 3" />
        </v-card>
      </v-stepper-content>

      <!-- <v-stepper-content step="3">
        <v-card elevation="0">
          <flat-details @stepperChange="e1 = 4" />
        </v-card>
      </v-stepper-content>

      <v-stepper-content step="4">
        <v-card elevation="0">
          <amenities @stepperChange="e1 = 5" />
        </v-card>
      </v-stepper-content> -->
    </v-stepper-items>
  </v-stepper>
</template>

<script>
const ConstructionDetails = () => import('~/components/stepperForms/ConstructionDetails.vue')
const LocationDetails = () => import('~/components/stepperForms/LocationDetails.vue')
const FlatDetails  = () => import( '~/components/stepperForms/FlatDetails.vue')
const Amenities  = () => import( '~/components/stepperForms/Amenities.vue')

export default {
  components: {
    LocationDetails,
    ConstructionDetails,
    FlatDetails,
    Amenities,
  },
  data() {
    return {
      e1: 1,
      apartment_ID: null,
      stepperData: [
        {
          title: 'Location Details',
          number: 1,
        },
        {
          title: 'Construction Details',
          number: 2,
        },
        {
          title: 'Flat Details',
          number: 3,
        },
        {
          title: 'Amenities',
          number: 4,
        },
        {
          title: 'Media',
          number: 5,
        },
        {
          title: 'Scheduling',
          number: 6,
        },
      ],
    }
  },
  methods: {
    moveToConstructionDetails: function(apartmentID) {
      this.apartment_ID = apartmentID
      this.e1 = 2;
    }
  }
}
</script>

<style>
</style>