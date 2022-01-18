<template>
  <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col cols="6">
          <v-select
            v-model="city"
            :items="cities"
            label="Select a city"
            @change="getLocalities(city)"
            outlined
            required
          ></v-select>
        </v-col>
        <v-col cols="6">
          <v-combobox
            v-model="locality"
            :items="localities"
            item-text="value"
            item-value="id"
            @select="getSublocalities(locality)"
            label="Enter a locality"
            outlined
            hint="Suggestions are displayed based on city selected"
            persistent-hint
          ></v-combobox>
        </v-col>
        <v-col cols="6">
          <v-combobox
            v-model="sublocality"
            :items="sublocalities"
            label="Enter a sub locality"
            outlined
            hint="Suggestions are displayed based on locality selected"
            persistent-hint
          ></v-combobox>
        </v-col>
        <!-- <v-col
          cols="6"
        >
          <v-text-field
            v-model="lastname"
            :rules="nameRules"
            :counter="10"
            label="Last name"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="6"
        >
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>
        </v-col> -->
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import postApartmentServices from '../../services/postForm/apartments/postApartmentServices'
import cities from '../../assets/cities.json'

export default {
  data: () => ({
    cities: [],
    localities: [],
    sublocalities: [],
    buildings: [],
    building: '',
    city: '',
    locality: '',
    sublocality: '',
    valid: false,
    firstname: '',
    lastname: '',

    nameRules: [
      (v) => !!v || 'Name is required',
      (v) => v.length <= 10 || 'Name must be less than 10 characters',
    ],
    email: '',
    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) => /.+@.+/.test(v) || 'E-mail must be valid',
    ],
  }),
  mounted() {
    this.cities = cities
      .filter((city) => city.status === 'active')
      .map((city) => city.name)
    //this.getLocalities('Achalpur')
    // this.getSublocalities('9MbuWjry273O6D21RCNr')
  },
  methods: {
    getLocalities: async function (cityID) {
      let response = await postApartmentServices.getLocalities(cityID)
      this.localities = []
      response.forEach((doc) =>
        this.localities.push({
          id: doc.id,
          value: doc.data().locality_name,
        })
      )
    },
    getSublocalities: async function (localityID) {
      console.log('fired' + localityID)
      let response = await postApartmentServices.getSublocalities(localityID)
      console.log(response)
      this.sublocalities = []
      response.forEach((doc) => this.sublocalities.push(doc.data()))
      this.sublocalities = this.sublocalities.map(
        (sublocality) => sublocality.sublocality_name
      )
    },
  },
}
</script>

<style>
</style>