<template>
  <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col
          cols="6"
        >
        <v-select
          v-model="city"
          :items="cities"
          label="Select a city"
          @change="getLocalities(city)"
          outlined
          required
        ></v-select>
        </v-col>
        <v-col
          cols="6"
        >
          <v-combobox
            v-model="locality"
            :items="localities"
            item-text="value"
            item-value="id"
            @input="getSublocalities(locality)"
            label="Enter a locality"
            outlined
            hint="Suggestions are displayed based on city selected"
            persistent-hint
          ></v-combobox>
        </v-col>
        <v-col
          cols="6"
        >
          <v-combobox
            v-model="sublocality"
            :items="sublocalities"
            item-text="value"
            item-value="id"
            @input="getBuildings(sublocality)"
            label="Enter a sub locality"
            outlined
            hint="Suggestions are displayed based on locality selected"
            persistent-hint
          ></v-combobox>
        </v-col>
         <v-col
          cols="6"
        >
          <v-combobox
            v-model="building"
            :items="buildings"
             item-text="value"
            item-value="id"
            label="Enter a building"
            outlined
            hint="Suggestions are displayed based on sub-locality selected"
            persistent-hint
            @input="setLandMark(building)"
          ></v-combobox>
        </v-col>
        <v-col
          cols="6"
        >
           <v-text-field
            v-model="flatNumber"
            label="Flat Number"
            outlined
          ></v-text-field>
        </v-col>
        <v-col
          cols="6"
        >
           <v-text-field
            v-model="landmark"
            label="Landmark"
            outlined
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
  import  postApartmentServices  from "../../services/postForm/apartments/postApartmentServices";
  import cities from '../../assets/cities.json'

  export default {
    data: () => ({
      cities: [],
      localities: [],
      sublocalities: [],
      buildings: [],
      building: '',
      landmark: '',
      city: '',
      locality: '',
      sublocality: '',
      flatNumber: '',
      valid: false,
      nameRules: [
        v => !!v || 'Name is required',
        v => v.length <= 10 || 'Name must be less than 10 characters',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
    }),
    mounted() {
      this.cities = cities.filter(city => city.status === 'active').map(city => city.name)
      //this.getLocalities('Achalpur')
    },
    methods: {
      getLocalities: async function (cityID) {
        
        this.locality = ''
        this.localities = []
        this.sublocalities = []
        this.sublocality = ''
        this.building = ''
        this.buildings = []
        this.landmark = ''

        let response = await postApartmentServices.getLocalities(cityID)
        
        response.forEach(doc => this.localities.push({
          id: doc.id,
          value: doc.data().locality_name
        }))
      },
      getSublocalities: async function (locality) {
        this.sublocalities = []
        this.sublocality = ''
        this.buildings = []
        this.building = ''
        this.landmark = ''

        if(this.localities.find(name => name.value === locality.value)) {
          let response = await postApartmentServices.getSublocalities(locality.id)
          response.forEach(doc => this.sublocalities.push({
            id: doc.id,
            value: doc.data().sublocality_name
          }))
        }
      },
      getBuildings: async function(sublocality) {
        this.buildings = []
        this.building = ''
        this.landmark = ''
        
        if(this.sublocalities.find(name => name.value === sublocality.value)) {
          let response = await postApartmentServices.getBuildings(sublocality.id)
          response.forEach(doc => this.buildings.push({
            id: doc.id,
            value: doc.data().building_name,
            landmark: doc.data().landmark
          }))
        }
      },
      setLandMark: function(building) {
        this.landmark = ''
        if(this.buildings.find(b => b.value === building.value)) {
          this.landmark = building.landmark
        }
      }
    }
  }
</script>

<style>

</style>