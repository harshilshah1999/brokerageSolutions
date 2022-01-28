<template>
  <v-form v-model="valid" ref="form" lazy-validation>
    <v-container>
      <v-row>
        <v-col cols="12" sm="4">
          <v-checkbox v-model="lift" label="Lift" color="indigo"></v-checkbox>
        </v-col>
        <v-col cols="12" sm="4">
          <v-checkbox
            v-model="gas_pipeline"
            label="Gas Pipeline"
            color="indigo"
          ></v-checkbox>
        </v-col>
        <v-col cols="12" sm="4">
          <v-checkbox
            v-model="visitor_parking"
            label="Visitor Parking"
            color="indigo"
          ></v-checkbox>
        </v-col>
        <v-col cols="12" sm="4">
          <v-checkbox v-model="gym" label="Gym" color="indigo"></v-checkbox>
        </v-col>
        <v-col cols="12" sm="4">
          <v-checkbox
            v-model="swimming_pool"
            label="Swimming Pool"
            color="indigo"
          ></v-checkbox>
        </v-col>
        <v-col cols="12" sm="4">
          <v-checkbox
            v-model="clubhouse"
            label="Clubhouse"
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
import postApartmentServices from '../../services/postForm/apartments/postApartmentServices'

export default {
  data: () => ({
    lift: true,
    gas_pipeline: false,
    visitor_parking: true,
    gym: false,
    swimming_pool: true,
    clubhouse: false,

    menu: false,
    valid: false,
    rules: [(v) => !!v || 'This is a required field'],
    loading: false,
  }),
  mounted() {},
  methods: {},
  watch: {},
}
</script>

<style>
</style>