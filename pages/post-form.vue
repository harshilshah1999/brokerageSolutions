<template>
  <div>
    <hr />

    <v-autocomplete
      v-model="property_type"
      :items="property_types"
      label="Property Type"
      filled
    ></v-autocomplete>

    <!-- <v-text-field
      v-model="value"
      :rules="nameRules"
      :counter="10"
      label="Property Type"
      required
    ></v-text-field> -->

    <!-- <v-text-field
      v-model="property_type"
      :rules="nameRules"
      :counter="10"
      label="Property Type"
      required
    ></v-text-field> -->

    <div>
      <h2>Submit</h2>
      <input type="submit" value="Submit" v-on:click="submit" />
    </div>

    <hr />

    <div v-for="(value  ) in results" :key="value.id">
      {{ value }}
    </div>
  </div>
</template>

<script>
import postProperty from '../services/postProperty'
export default {
  name: 'post-form',

  data: () => ({
    property_type: '',
    property_types: ['appartment'],
    results: {},
    formData: {
      construction_details: {
        property_for: 'string',
        property_type: 'string',
        construction_type: 'string',
        possesion_date: 'date',
        oc_status: 'string',
        property_age: 'string',
        property_available_from: 'date',
      },
      location_details: {
        city_id: 'ObjectID',
        locality_id: 'ObjectID',
        sub_locality_id: 'ObjectID',
        property_id: 'ObjectID',
        google_map_details: {
          google_map_coordinates: 'Point',
        },
      },
      property_details: {
        BHKtype: 'string',
        carpet_area: 'number',
        builtup_area: 'number',
        super_builtup_area: 'number',
        floor_number: 'string',
        total_floors: 'string',
        facing: 'string',
        furnishing: 'string',
        bathrooms: 'number',
        balconies: 'number',
        description: 'string',
      },
      pricing_details: {
        negotiable_price: 'number/string',
        non_negotiable_price: 'number/string',
        all_inclusive_price: 'number/string',
        inclusions: {
          parking: 'boolean',
          clubhouse_membership: 'boolean',
          maintenance: 'string',
          other: 'string',
        },
        monthly_maintainence: 'number/string',
        annual_maintainence: 'number/string',
      },
      amenities: {
        lift: 'boolean',
        gas_pipeline: 'boolean',
        visitor_parking: 'boolean',
        gym: 'boolean',
        swimming_pool: 'boolean',
        clubhouse: 'boolean',
      },
      photos: [
        {
          storage_location: 'string',
          photo_type: 'string (living room,etc)',
          thumbnail: 'boolean',
        },
      ],
      scheduling_visits: {
        preferred_days: [],
        preferred_time: 'string',
        alternate_number: 'string ',
      },
      other_details: {
        posted_date: 'date',
        expiration_date: 'date',
        status: 'string - Active or not',
        posted_by: 'ObjectID',
        verification_status: 'string',
        times_visited: 'number',
        user_feedback: {
          user_id: 'ObjectID',
          user_remark: 'string',
        },
      },
    },
  }),

  mounted: function () {
    //this function will execute at pageload
    postProperty.getHomepageData().then((response) => {
      this.results = response
      console.log(this.results)
    })
  },

  methods: {
    submit: function () {
      postProperty.postPropertData(this.formData).then((response) => {
        console.log(response)
      })
    },
  },
}
</script>