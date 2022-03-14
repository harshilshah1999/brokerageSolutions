<template>
  <!--@TODO CARPET AREA UNITS DROPDOWN -->
  <!-- @TODO ERROR IF TOTAL FLOORS IS LESS THAN YOUR FLOOR -->
  <!-- @TODO stepper should be fixed at the top, make flatdetails scrollable -->
  <!-- @TODO add unit dropdown and while saving convert to a base unit and of type number for three carpet areas-->
  <!--@TODO add bhk types 1 room kitchen , etc -->
  <v-form v-model="valid" ref="form" lazy-validation>
    <v-container>
      <v-row>
        <v-col cols="12" sm="6">
          <v-select
            v-model="BHKtype"
            :items="Array.from({ length: 10 }, (_, index) => index + 1)"
            label="BHK Type"
            suffix="BHK"
            :rules="[(v) => !!v || 'This is a required field']"
            required
            outlined
          >
          </v-select>
        </v-col>
        <v-col cols="12" sm="6">
          <v-select
            v-model="floor_number"
            :items="Array.from({ length: 100 }, (_, index) => index + 1)"
            label="Your Floor"
            outlined
            required
          >
          </v-select>
        </v-col>
        <v-col cols="12" sm="4">
          <v-text-field
            label="Carpet Area "
            outlined
            v-model="carpet_area"
            suffix="Sq.ft"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="4">
          <v-text-field
            label="Builtup Area "
            outlined
            v-model="builtup_area"
            suffix="Sq.ft"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="4">
          <v-text-field
            label="Super Builtup Area "
            outlined
            v-model="super_builtup_area"
            suffix="Sq.ft"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-select
            v-model="facing"
            :items="facing_values"
            menu-props="auto"
            label="Flat Facing Direction"
            outlined
          >
          </v-select>
        </v-col>
        <v-col cols="12" sm="6">
          <v-select
            v-model="furnishing"
            :items="furnishing_values"
            menu-props="auto"
            label="Flat Furnishing Status"
            outlined
          >
          </v-select>
        </v-col>
        <v-col cols="12" sm="4">
          <v-select
            v-model="bathrooms"
            :items="Array.from({ length: 11 }, (_, index) => index + 1)"
            label="Number of Bathrooms"
            outlined
            required
          >
          </v-select>
        </v-col>
        <v-col cols="12" sm="4">
          <v-select
            v-model="balconies"
            :items="Array.from({ length: 5 }, (_, index) => index + 1)"
            label="Number of Balconies"
            outlined
            required
          >
          </v-select>
        </v-col>
        <v-col cols="12" sm="4">
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="flat_available_from"
            transition="fade-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="flat_available_from"
                label="Flat Available From"
                readonly
                v-bind="attrs"
                v-on="on"
                clearable
                outlined
              ></v-text-field>
            </template>
            <v-date-picker v-model="flat_available_from" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
              <v-btn text color="primary" @click="$refs.menu.save(flat_available_from)">
                OK
              </v-btn>
            </v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" sm="12">
          <v-textarea
            label="Property Description"
            outlined
            v-model="description"
          ></v-textarea>
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
          <v-snackbar v-model="snackbar">
            Please enter atleast one of the following areas - Carpet Area, Builtup Area,
            Super Builtup Area
            <template v-slot:action="{ attrs }">
              <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
                Close
              </v-btn>
            </template>
          </v-snackbar>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import postApartmentServices from "../../services/postForm/apartments/postApartmentServices";

export default {
  props: ["property_details"],
  data: () => ({
    snackbar: false,
    BHKtype: "",
    carpet_area: "",
    builtup_area: "",
    super_builtup_area: "",
    floor_number: "",
    facing: "",
    facing_values: [
      "East",
      "West",
      "North",
      "South",
      "North-East",
      "North-West",
      "South-East",
      "South-West",
    ],
    furnishing: "",
    furnishing_values: ["Fully-furnished", "Semi-Furnished", "Unfurnished"],
    bathrooms: "3",
    balconies: "0",
    flat_available_from: null,
    description: "",

    menu: false,
    valid: false,
    rules: [(v) => !!v || "This is a required field"],
    loading: false,
  }),
  mounted() {},
  methods: {
    validate: async function () {
      if (this.$refs.form.validate()) {
        if (!this.carpet_area && !this.builtup_area && !this.super_builtup_area) {
          this.valid = false;
          this.snackbar = true;
          return;
        }
        try {
          this.loading = true;
          let flat_details = {
            BHKtype: this.BHKtype,
            carpet_area: this.carpet_area,
            builtup_area: this.builtup_area,
            super_builtup_area: this.super_builtup_area,
            floor_number: this.floor_number,
            facing: this.facing,
            furnishing: this.furnishing,
            bathrooms: this.bathrooms,
            balconies: this.balconies,
            description: this.description,
            flat_available_from: this.flat_available_from,
          };
          await postApartmentServices.postFlatDetails(
            this.$route.params.property_type + "s_" + this.$route.params.property_for,
            this.$route.params.id,
            {
              flat_details,
              step: 4,
            }
          );
          this.$emit("stepperChange", flat_details);
        } catch (e) {
          console.log(e);
        } finally {
          this.loading = false;
        }
      }
    },
  },
  watch: {
    property_details: function (newVal) {
      if (newVal.flat_details) {
        let properties = [
          "BHKtype",
          "carpet_area",
          "builtup_area",
          "super_builtup_area",
          "floor_number",
          "facing",
          "furnishing",
          "bathrooms",
          "balconies",
          "description",
          "flat_available_from",
        ];
        properties.forEach((property) => {
          if (newVal.flat_details[property]) {
            this[property] = newVal.flat_details[property];
          }
        });
      }
    },
  },
};
</script>

<style></style>
