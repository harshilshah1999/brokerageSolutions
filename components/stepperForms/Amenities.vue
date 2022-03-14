<template>
  <v-form v-model="valid" ref="form" lazy-validation>
    <v-container>
      <v-row>
        <v-col cols="12" sm="4" v-for="amenity in amenities" :key="amenity.name">
          <v-checkbox
            v-model="amenity.selected"
            :label="amenity.name"
            :append-icon="amenity.icon"
            color="indigo"
            class="custom-icon-spacing"
            ripple
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
import postApartmentServices from "../../services/postForm/apartments/postApartmentServices";
import amenities from "../../assets/amenities.json";

export default {
  props: ["property_details"],
  data: () => ({
    amenities: [],
    valid: false,
    loading: false,
  }),
  mounted() {
    this.amenities = amenities;
    this.amenities.forEach((amenity) => (amenity.selected = false));
  },
  methods: {
    validate: async function () {
      try {
        this.loading = true;
        let amenities = {};
        this.amenities.forEach((amenity) => {
          if (amenity.selected) {
            amenities[amenity.property_name] = true;
          }
        });
        await postApartmentServices.postAmenitiesDetails(
          this.$route.params.property_type + "s_" + this.$route.params.property_for,
          this.property_details.location_details.building_id,
          this.$route.params.id,
          {
            amenity_details: amenities,
            step: 5,
          }
        );
        this.$emit("stepperChange", amenities);
      } catch (e) {
        console.log(e);
      } finally {
        this.loading = false;
      }
    },
  },
  watch: {
    property_details: function (newVal) {
      if (newVal.amenity_details) {
        this.amenities.forEach((amenity) => {
          if (newVal.amenity_details[amenity.property_name]) {
            amenity.selected = true;
          }
        });
      }
      this.amenities = [...this.amenities];
    },
  },
};
</script>

<style lang="scss">
.custom-icon-spacing > .v-input__control {
  flex-grow: unset;
  width: unset;
}
</style>
