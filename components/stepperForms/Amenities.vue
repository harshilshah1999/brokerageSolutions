<template>
  <v-form v-model="valid" ref="form" lazy-validation>
    <v-container>
      <v-row>
        <v-col cols="12" sm="4" v-for="amenity in amenities" :key="amenity.name"> 
          <v-checkbox
            v-model="amenity.selected"
            :label="amenity.name"
            :append-icon="amenity.icon"
            color="indigo"
          ></v-checkbox>
        </v-col>
         <v-col cols="12" sm="4">
          <v-btn
            :disabled="!valid || loading"
            :loading="loading"
            color="primary"
            @click="validate"
          >
            Save and Continue
            <v-icon right> mdi-arrow-right-thin </v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import postApartmentServices from '../../services/postForm/apartments/postApartmentServices';
import amenities from "../../assets/amenities.json";

export default {
  data: () => ({
    amenities: [],
    valid: false,
    loading: false,
  }),
  mounted() {
    this.amenities = amenities
    this.amenities.forEach(amenity => amenity.selected = false)
  },
  methods: {},
  watch: {},
}
</script>

<style>
</style>