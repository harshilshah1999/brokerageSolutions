<template>
  <!-- @TODO OC CC INFO ALERT-->
  <!-- @TODO CHANGE DATE FORMAT IN POSESSION DATE-->

  <v-form v-model="valid" ref="form" lazy-validation>
    <v-container>
      <v-row>
        <v-col cols="12" sm="6">
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
        <v-col cols="12" sm="6" v-if="construction_type === 'Under Construction'">
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
            <v-date-picker v-model="possession_date" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
              <v-btn text color="primary" @click="$refs.menu.save(possession_date)">
                OK
              </v-btn>
            </v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" sm="6" v-else>
          <v-text-field
            :rules="[
              (d) => !d || /^\d+$/.test(d) || 'Please enter a number',
              (d) => !d || d <= 100 || 'Age cannot be more than 100',
            ]"
            label="Building Age "
            outlined
            v-model="building_age"
            suffix="Years"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="4">
          <v-select
            v-model="oc_status"
            :items="oc_cc_types"
            menu-props="auto"
            label="Occupancy Certificate"
            outlined
          >
          </v-select>
        </v-col>
        <v-col cols="12" sm="4">
          <v-select
            v-model="cc_status"
            :items="oc_cc_types"
            menu-props="auto"
            label="Completion Certificate"
            outlined
          >
          </v-select>
        </v-col>
        <v-col cols="12" sm="4">
          <v-select
            v-model="total_floors"
            :items="Array.from({ length: 100 }, (_, index) => index + 1)"
            label="Total Floors"
            outlined
          >
          </v-select>
        </v-col>
        <v-col cols="12" sm="6">
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
import postApartmentServices from "../../services/postForm/apartments/postApartmentServices";

export default {
  props: ["property_details"],
  data: function () {
    return {
      total_floors: null,
      construction_type: "",
      oc_status: null,
      cc_status: null,
      construction_types: ["Under Construction", "New Construction", "Resale"],
      oc_cc_types: ["Received", "Not Received"],
      possession_date: null,
      building_age: null,
      menu: false,
      valid: false,
      rules: [(v) => !!v || "This is a required field"],
      loading: false,
    };
  },
  mounted() {
    //get building data
    // console.log(this.buildingId)
  },
  methods: {
    validate: async function () {
      if (this.$refs.form.validate()) {
        try {
          this.loading = true;
          await postApartmentServices.postBuildingDetails(
            this.$route.params.property_type + "s_" + this.$route.params.property_for,
            this.$route.params.id,
            this.property_details.location_details.building_id,
            {
              building_details: {
                ...(this.property_details.location_details.landmark && {
                  landmark: [this.property_details.location_details.landmark],
                }),
                construction_type: this.construction_type,
                ...(this.building_age && { building_age: this.building_age }),
                ...(this.oc_status && { oc_status: this.oc_status }),
                ...(this.cc_status && { cc_status: this.cc_status }),
                ...(this.possession_date && { possession_date: this.possession_date }),
                ...(this.total_floors && { total_floors: this.total_floors }),
              },
              step: 3,
            },
            {
              city: this.property_details.location_details.city,
              localityID: this.property_details.location_details.locality_id,
              sublocalityID: this.property_details.location_details.sublocality_id,
            }
          );
          this.$emit("stepperChange");
        } catch (e) {
          console.log(e);
        } finally {
          this.loading = false;
        }
      }
    },
  },
  watch: {
    property_details: async function () {
      let building_details = {};
      if (this.property_details.location_details) {
        building_details = await postApartmentServices.getBuildingDetails(
          this.property_details.location_details.building_id
        );
        building_details = building_details.data();
      }

      if (building_details.hasOwnProperty("construction_type")) {
        this.construction_type = building_details.construction_type;
        this.building_age = building_details.building_age;
        this.oc_status = building_details.oc_status;
        this.cc_status = building_details.cc_status;
        this.possession_date = building_details.possession_date;
        this.total_floors = building_details.total_floors;
      }
    },
  },
};
</script>

<style></style>
