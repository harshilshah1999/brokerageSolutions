<template>
  <v-stepper v-model="e1" alt-labels>
    <v-stepper-header>
      <template v-for="n in stepperData">
        <v-stepper-step
          :key="`${n.number}-step`"
          :complete="e1 > n.number"
          :step="n.number"
        >
          {{ n.title }}
        </v-stepper-step>

        <v-divider v-if="n.number !== 6" :key="n"> </v-divider>
      </template>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <v-card class="mb-12" elevation="0">
          <location-details />
        </v-card>

        <v-btn color="primary" @click="e1 = 2"> Continue </v-btn>

        <v-btn text> Cancel </v-btn>
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-card class="mb-12" color="grey lighten-1" height="200px"></v-card>

        <v-btn color="primary" @click="e1 = 3"> Continue </v-btn>

        <v-btn text> Cancel </v-btn>
      </v-stepper-content>

      <v-stepper-content step="3">
        <v-card class="mb-12" color="grey lighten-1" height="200px"></v-card>

        <v-btn color="primary" @click="e1 = 1"> Continue </v-btn>

        <v-btn text> Cancel </v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import LocationDetails from '../components/stepperForms/LocationDetails.vue'

export default {
  components: {
    LocationDetails,
  },
  data() {
    return {
      e1: 1,
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
          title: 'Propert Details',
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
          title: 'Preferences',
          number: 6,
        },
      ],
    }
  },
}
</script>

<style>
</style>