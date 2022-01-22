<template>
  <!--@TODO RESET VALUES ON CHANGE, SEND USER ROLES INSTEAD OF VERIFICATION AND CHANGE THE API AS WELL-->
  <!--@TODO GET PROPERTY TYPE AS A PROP-->
  <v-form v-model="valid" ref="form" lazy-validation>
    <v-container>
      <v-row>
        <v-col
         cols="12" 
         sm="6"
        >
        <v-select
          v-model="city"
          :items="cities"
          label="Select a city"
          :rules="rules"
          @change="getLocalities(city)"
          outlined
          required
        ></v-select>
        </v-col>
        <v-col
          cols="12"
          sm="6"
        >
          <v-combobox
            v-model="locality"
            :items="localities"
            item-text="name"
            item-value="id"
            :rules="rules"
            @input="getSublocalities(locality)"
            label="Enter a locality"
            outlined
            hint="Suggestions are displayed based on city selected"
            persistent-hint
          ></v-combobox>
        </v-col>
        <v-col
          cols="12"
          sm="6"
        >
          <v-combobox
            v-model="sublocality"
            :items="sublocalities"
            item-text="name"
            item-value="id"
            :rules="rules"
            @input="getBuildings(sublocality)"
            label="Enter a sub locality"
            outlined
            hint="Suggestions are displayed based on locality selected"
            persistent-hint
          ></v-combobox>
        </v-col>
         <v-col
          cols="12"
          sm="6"
        >
          <v-combobox
            v-model="building"
            :items="buildings"
             item-text="name"
            item-value="id"
            label="Enter a building"
            outlined
            hint="Suggestions are displayed based on sub-locality selected"
            persistent-hint
            :rules="rules"
            @input="setLandMark(building)"
          ></v-combobox>
        </v-col>
        <v-col
          cols="12"
          sm="6"
        >
           <v-text-field
            v-model="flatNumber"
            label="Flat Number"
            :rules="rules"
            outlined
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          sm="6"
        >
           <v-text-field
            v-model="landmark"
            label="Landmark"
            outlined
          ></v-text-field>
        </v-col>
        <v-col 
          cols="12"
          sm="6">
          <v-btn 
          :disabled="!valid"
          color="primary" 
          @click="validate"> 
            Save and Continue 
          </v-btn>
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
      rules: [
        v => !!v || 'This is a required field'
      ]
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
          name: doc.data().locality_name
        }))
      },
      getSublocalities: async function (locality) {
        this.sublocalities = []
        this.sublocality = ''
        this.buildings = []
        this.building = ''
        this.landmark = ''

        if(this.localities.find(name => name.name === locality.name)) {
          let response = await postApartmentServices.getSublocalities(locality.id)
          response.forEach(doc => this.sublocalities.push({
            id: doc.id,
            name: doc.data().sublocality_name
          }))
        }
      },
      getBuildings: async function(sublocality) {
        this.buildings = []
        this.building = ''
        this.landmark = ''
        
        if(this.sublocalities.find(name => name.name === sublocality.name)) {
          let response = await postApartmentServices.getBuildings(sublocality.id)
          response.forEach(doc => this.buildings.push({
            id: doc.id,
            name: doc.data().building_name,
            landmark: doc.data().landmark
          }))
        }
      },
      setLandMark: function(building) {
        this.landmark = ''
        if(this.buildings.find(b => b.name === building.name)) {
          this.landmark = building.landmark
        }
      },
      add_locality: async function () {
        //add new locality
        try {
          return await postApartmentServices.addNewLocality(
            {
              city: this.city,
              locality_name: this.locality.name || this.locality,
              verified: true
            }
          )
        } catch (error) {
          console.error(error)
        }
      },
      add_sublocality: async function (localityID) {
      //add new sublocality
      try {
        return await postApartmentServices.addNewSubLocality(
          localityID,
          {
            sublocality_name: this.sublocality.name || this.sublocality,
            city: this.city,
            locality_id: localityID,
            locality_name: this.locality.name || this.locality,
            buildings: [],
            verified: true
          }
        )
      } catch (error) {
        console.error(error)
      }
    },
    add_building: async function (localityID, sublocalityID) {
      //add new building
      try {
        return await postApartmentServices.addNewBuilding(
          localityID,
          sublocalityID,
          {
            building_name: this.building.name || this.building,
            city: this.city,
            locality_id: localityID,
            locality_name: this.locality.name || this.locality,
            sublocality_id: sublocalityID,
            sublocality_name: this.sublocality.name || this.sublocality,
            ...(this.landmark && {landmark : this.landmark}),
            verified: true
          }
        )
      } catch (error) {
        console.error(error)
      }
    },
    validate: async function() {
        //el = 2 to parent
        if(this.$refs.form.validate()) {
          console.log('form validated')
          try {
            let localityID = this.locality.id ? this.locality.id : await this.add_locality()
            let sublocalityID = this.sublocality.id ? this.sublocality.id : await this.add_sublocality(localityID)
            let buildingID = this.building.id ? this.building.id : await this.add_building(localityID, sublocalityID)
            const response = await postApartmentServices.postLocationDetails(
              "apartments_sale",
              {
                 location_details: {
                  city: this.city,
                  locality_id: localityID,
                  locality_name: this.locality.name || this.locality,
                  sublocality_id: sublocalityID,
                  sublocality_name: this.sublocality.name || this.sublocality,
                  flat_number: this.flatNumber,
                  building_name: this.building.name || this.building,
                  building_id: buildingID,
                  landmark: this.landmark,
                    google_map_details: {
                      google_map_coordinates: 'Point'
                    }
                  }
              },
              sublocalityID
            )
            console.log(response)
          }
          catch(e) {
            console.log(e)
          }
        }
      }
    }
  }
</script>

<style>

</style>