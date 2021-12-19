<template>
  <div>
    <hr />
    <br />
    <div>
      <v-autocomplete
        v-model="property_type"
        :items="property_types"
        label="Property Type"
        filled
      ></v-autocomplete>
      <v-btn>
        <input
          type="submit"
          value="CONSTRUCTION DETAILS"
          v-on:click="construction_submit"
        />
      </v-btn>
      <v-btn>
        <input
          type="submit"
          value="LOCATION DETAILS"
          v-on:click="location_submit"
        />
      </v-btn>
      <v-btn>
        <input
          type="submit"
          value="PROPERTY DETAILS"
          v-on:click="detail_submit"
        />
      </v-btn>
      <v-btn>
        <input
          type="submit"
          value="PRICING DETAILS"
          v-on:click="pricing_submit"
        />
      </v-btn>
    </div>

    <br /><br /><br /><br /><br />
    <v-file-input
      counter
      multiple
      show-size
      small-chips
      truncate-length="50"
      accept="image/*,video/mp4,video/x-m4v,video/*"
      v-model="chosenFile"
    ></v-file-input>
    <v-btn v-on:click="submit_image">UPLOAD IMAGE</v-btn>

    <!-- <v-text-field
      v-model="property_type"
      :rules="nameRules"
      :counter="10"
      label="Property Type"
      required
    ></v-text-field> -->

    <!-- <hr />
    <img id="myimg" src="../assets/image.png" height="125px" width="200px" />
    <span>
      <video width="400" controls>
        <source src="../assets/video2.webm" id="vid" type="video/webm" />
      </video>
    </span>
    <br />
    <hr />
    <div v-for="value in results" :key="value.id">
      {{ value }}
    </div> -->
  </div>
</template>

<script>
import postPropertyServices from '../services/postPropertyServices'

export default {
  name: 'post-form',

  data: () => ({
    property_type: '',
    property_types: ['appartments'],
    results: {},
    chosenFile: null,
    documentid: '',
    construction_formData: {
      construction_details: {
        property_for: 'Sale/Rent',
        property_type: 'Flat/Bungalow/Commercial/etc',
        construction_type: 'Under Construction/New/resale',
        possesion_date: 'date',
        oc_status: 'string',
        property_age: 'string',
        property_available_from: 'date',
      },
    },
    location_formData: {
      location_details: {
        city: 'mumbai',
        locality: 'Dahisar',
        sub_locality: 'Anand Nagar',
        google_map_details: {
          google_map_coordinates: 'Point',
        },
      },
    },
    details_formData: {
      property_details: {
        BHKtype: '2BHK',
        carpet_area: '706 sq.ft',
        builtup_area: '900 sq.ft',
        super_builtup_area: '1200 sq.ft',
        floor_number: '19',
        total_floors: '42',
        facing: 'East/West/South/North/South-East/...',
        furnishing: 'Unfurnished/Semifurnished/Unfurnished',
        bathrooms: '3',
        balconies: '0',
        description: 'Auto-generate summary API - lorem ipsum',
      },
    },
    pricing_formData: {
      pricing_details: {
        negotiable_price: 'number/string',
        non_negotiable_price: 'number/string',
        all_inclusive_price: 'number/string',
        inclusions: {
          parking: 'boolean',
          clubhouse_membership: 'boolean',
          maintenance: 'string',
          other_inclusions: 'string',
        },
        monthly_maintainence: 'number/string',
        annual_maintainence: 'number/string',
      },
    },
    formData: {
      property_type: 'appartments',
    },
  }),

  mounted: function () {
    // this.randomfunctions()
  },

  methods: {
    construction_submit: async function () {
      try {
        const response = await postPropertyServices.postConstructionDetails(
          'appartments',
          this.construction_formData
        )
        this.documentid = response['id']
        console.log('Construction Submitted : ' + response['id'])
      } catch (error) {
        console.error(error)
      }
    },

    location_submit: async function () {
      try {
        await postPropertyServices.postLocationDetails(
          'appartments',
          this.documentid,
          this.location_formData
        )
      } catch (error) {
        console.error(error)
      }
    },

    detail_submit: async function () {
      try {
        await postPropertyServices.postPropertyDetails(
          'appartments',
          this.documentid,
          this.details_formData
        )
      } catch (error) {
        console.error(error)
      }
    },

    pricing_submit: async function () {
      try {
        await postPropertyServices.postPricingDetails(
          'appartments',
          this.documentid,
          this.pricing_formData
        )
      } catch (error) {
        console.error(error)
      }
    },





    
    submit_image: async function () {
      // this.chosenFile.forEach((element) => {
      //   postPropertyServices
      //     .setSingleMedia('appartments/' + element.name, element)
      //     .then((response) => {
      //       console.log(response)
      //     })
      // })
    },
    // randomfunctions: function () {
    //   postPropertyServices.getAllDocuments('cities').then((response) => {
    //     console.log(response)
    //   })
    //   postPropertyServices.getSingleMedia('appartments/video.webm').then((vid_url) => {
    //     // console.log(vid_url)
    //     const video = document.getElementById('vid')
    //     video.setAttribute('src', vid_url)
    //   })
    //   postPropertyServices.getSingleMedia('appartments/image.jpeg').then((img_src) => {
    //     const img = document.getElementById('myimg')
    //     img.setAttribute('src', img_src)
    //   })
    //   postPropertyServices
    //     .updateSingleDocument('appartments', 'S2GEh6qUHWsP2kc02CL6', {
    //       verified: true,
    //     })
    //     .then((response) => {  console.log(response)})
    // },
  },
}
</script>