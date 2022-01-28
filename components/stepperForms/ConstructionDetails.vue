<template>
  <v-form v-model="valid" ref="form" lazy-validation>
    <v-container>
      <v-row>
        <v-col
         cols="12" 
         sm="6"
        >
            <v-select
                v-model="construction_type"
                :items="construction_types"
                menu-props="auto"
                label="Construction Type"
                :rules="rules"
                outlined
                required
            >
            </v-select>
        </v-col>
        <v-col
        cols="12"
        sm="6"
        v-if="construction_type === 'Under Construction'"
        >
                <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    :return-value.sync="possession_date"
                    transition="fade-transition"
                    offset-y
                    min-width="auto"
                >
                    <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                        v-model="possession_date"
                        :rules="rules"
                        label="Possession Date"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        outlined
                    ></v-text-field>
                    </template>
                    <v-date-picker
                    v-model="possession_date"
                    no-title
                    scrollable
                    >
                    <v-spacer></v-spacer>
                    <v-btn
                        text
                        color="primary"
                        @click="menu = false"
                    >
                        Cancel
                    </v-btn>
                    <v-btn
                        text
                        color="primary"
                        @click="$refs.menu.save(possession_date)"
                    >
                        OK
                    </v-btn>
                    </v-date-picker>
                </v-menu>
        </v-col>
        <v-col
        cols="12"
        sm="6"
        v-else
        >
        <v-row
        align="center"
        no-gutters>
            <v-col
            cols="3"
            >
            <v-subheader>
            Building Age : 
            </v-subheader>
            </v-col>
            <v-col
            cols="3"

            >
            <v-text-field
                label="Years"
                outlined
            
                v-model="building_age.years"
            ></v-text-field>
            </v-col>
            <v-col cols="3">
            <v-text-field
                outlined
               label="months"
                v-model="building_age.months"
            ></v-text-field>
            </v-col>
        </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import postApartmentServices from '../../services/postForm/apartments/postApartmentServices'

  export default {
    data: () => ({
      construction_type: '',
      construction_types: [
          'Under Construction',
          'New Construction',
          'Resale'
      ],
      possession_date: null,
      building_age: {
          years: null,
          months: null
      },
      menu: false,
      valid: false,
      rules: [
        v => !!v || 'This is a required field'
      ],
      loading: false
    }),
    mounted() {

    },
    methods: {
       
    },
    watch: {

    }
}
</script>

<style>
</style>