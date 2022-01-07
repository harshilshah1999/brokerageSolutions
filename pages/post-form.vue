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
      <v-btn>
        <input
          type="submit"
          value="AMENITIES DETAILS"
          v-on:click="amenities_submit"
        />
      </v-btn>
      <v-btn>
        <input
          type="submit"
          value="VISIT DETAILS"
          v-on:click="visit_preference_submit"
        />
      </v-btn>
      <v-btn>
        <input type="submit" value="OTHER DETAILS" v-on:click="other_submit" />
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
    </span> -->
  </div>
</template>

<script>
import postPropertyServices from '../services/postPropertyServices'
// import cities from '../assets/cities.json'
// import firebaseServices from '../services/firebaseServices'
export default {
  name: 'post-form',

  data: () => ({
    property_type: '',
    property_types: ['appartments'],
    results: {},
    chosenFile: null,
    collectionID: 'appartments',
    documentID: 'cBPvEwByvBLKsV5ehuWG',
    storage_path: '',
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
        city: 'Achalpur',
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
    amenities_formData: {
      amenities: {
        lift: true,
        gas_pipeline: false,
        visitor_parking: true,
        gym: false,
        swimming_pool: true,
        clubhouse: false,
      },
    },
    visit_preference_formData: {
      visit_preference_details: {
        preferred_days: ['Sunday', 'Monday'],
        preferred_time: {
          from: '10am',
          to: '9pm',
        },
        alternate_number: '1234567890',
      },
    },
    other_formData: {
      other_details: {
        posted_date: 'date()',
        expiration_date: 'date()',
        status: 'Active/Inactive',
        posted_by: 'Somil Shah - 124567890',
        verification_status: 'verified/under_verification/rejected',
        times_visited: 'increment()',
        user_feedback: {
          user_id: 'Harshil Shah - 0987654321',
          user_remark: 'Nice property! Good interior!',
        },
      },
    },
    image_formData: {},
  }),

  mounted: async function () {
    // this.randomfunctions()
    // cities.forEach(async (element) => {
    //   await firebaseServices.addDocumentManualID('cities', element['id'], {
    //     name: element['name'],
    //     state: element['state'],
    //     status: element['status'],
    //   })
    // })
  },

  methods: {
    construction_submit: async function () {
      try {
        const response = await postPropertyServices.postConstructionDetails(
          'appartments',
          this.construction_formData
        )
        this.documentID = response['id']
        // this.collectionID = response['parent']
        this.storage_path = response['path']

        console.log('Construction Submitted : ', response['id'], response)
      } catch (error) {
        console.error(error)
      }
    },
    location_submit: async function () {
      try {
        await postPropertyServices.postLocationDetails(
          this.collectionID,
          this.documentID,
          this.location_formData,
          true
        )
      } catch (error) {
        console.error(error)
      }
      //add new locality
      try {
        await postPropertyServices.addNewLocality(
          this.collectionID,
          this.documentID,
          this.location_formData,
          true
        )
      } catch (error) {
        console.error(error)
      }
      //add new sublocality
      try {
        await postPropertyServices.addNewSubLocality(
          this.collectionID,
          this.documentID,
          this.location_formData,
          true
        )
      } catch (error) {
        console.error(error)
      }
    },
    detail_submit: async function () {
      try {
        await postPropertyServices.postPropertyDetails(
          this.collectionID,
          this.documentID,
          this.details_formData
        )
      } catch (error) {
        console.error(error)
      }
    },
    pricing_submit: async function () {
      try {
        await postPropertyServices.postPricingDetails(
          this.collectionID,
          this.documentID,
          this.pricing_formData
        )
      } catch (error) {
        console.error(error)
      }
    },
    amenities_submit: async function () {
      try {
        await postPropertyServices.postAmenitiesDetails(
          this.collectionID,
          this.documentID,
          this.amenities_formData
        )
      } catch (error) {
        console.error(error)
      }
    },
    submit_image: async function () {
      try {
        this.chosenFile.forEach(async (element, index) => {
          ;(this.image_formData = {
            photos: [
              {
                storage_path:
                  this.storage_path + '/' + index + '_' + element.name, //need image name validation here
                photo_type: 'Living Room/Bedroom/Kitchen/...',
                thumbnail: true,
              },
            ],
          }),
            await postPropertyServices.postImage(
              this.collectionID,
              this.documentID,
              element,
              this.image_formData,
              this.collectionID + '/' + this.documentID + '/' + element.name
            )
        })
      } catch (error) {
        console.error(error)
      }
    },
    visit_preference_submit: async function () {
      try {
        await postPropertyServices.postVisitPreferenceDetails(
          this.collectionID,
          this.documentID,
          this.visit_preference_formData
        )
      } catch (error) {
        console.error(error)
      }
    },
    other_submit: async function () {
      try {
        await postPropertyServices.postOtherDetails(
          this.collectionID,
          this.documentID,
          this.other_formData
        )
      } catch (error) {
        console.error(error)
      }
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
  },
}
</script>