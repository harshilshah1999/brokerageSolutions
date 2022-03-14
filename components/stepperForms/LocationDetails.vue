<template>
  <!--@TODO RESET VALUES ON CHANGE, SEND USER ROLES INSTEAD OF VERIFICATION AND CHANGE THE API AS WELL-->
  <!--@TODO Use Promise All for on submit -->
  <!--@TODO GET PROPERTY TYPE AS A PROP-->
  <!--@TODO OC AND CC TOOLTIPS ON INFO ICON-->
  <!--@TODO CHECK if THE SAME FLAT NUMBER ALREADY EXISTS IN THE BUILDING-->

  <v-form v-model="valid" ref="form" lazy-validation>
    <v-container>
      <v-row>
        <v-col cols="12" sm="6">
          <v-select
            v-model="city"
            :items="cities"
            menu-props="auto"
            label="City"
            :rules="rules"
            @change="getLocalities(city)"
            outlined
            required
          ></v-select>
        </v-col>
        <v-col cols="12" sm="6">
          <v-combobox
            v-model="locality"
            :items="localities"
            item-text="name"
            item-value="id"
            :rules="rules"
            @input="getSublocalities(locality)"
            label="Locality"
            outlined
            hint="Suggestions are displayed based on city selected"
            persistent-hint
            :loading="locality_loader"
          ></v-combobox>
        </v-col>
        <v-col cols="12" sm="6">
          <v-combobox
            v-model="sublocality"
            :items="sublocalities"
            item-text="name"
            item-value="id"
            :rules="rules"
            @input="getBuildings(sublocality)"
            label="Sub locality"
            outlined
            hint="Suggestions are displayed based on locality selected"
            persistent-hint
          ></v-combobox>
        </v-col>
        <v-col cols="12" sm="6">
          <v-combobox
            v-model="building"
            :items="buildings"
            item-text="name"
            item-value="id"
            label="Building"
            outlined
            hint="Suggestions are displayed based on sub-locality selected"
            persistent-hint
            :rules="rules"
            @input="setLandMark(building)"
          ></v-combobox>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="flatNumber"
            label="Flat Number"
            :rules="rules"
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-combobox
            v-model="landmark"
            :items="landmarks"
            label="Landmark"
            outlined
            hint="Suggestions are displayed based on building selected"
            persistent-hint
          ></v-combobox>
          <!-- <v-text-field
            v-model="landmark"
            label="Landmark"
            outlined
          ></v-text-field> -->
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
import cities from "../../assets/cities.json";

export default {
  props: ["property_details"],
  data: () => ({
    cities: [],
    localities: [],
    sublocalities: [],
    buildings: [],
    landmarks: [],
    building: "",
    landmark: "",
    city: "",
    locality: "",
    sublocality: "",
    flatNumber: "",
    valid: false,
    rules: [(v) => !!v || "This is a required field"],
    loading: false,
    locality_loader: false,
  }),
  mounted() {
    this.cities = cities
      .filter((city) => city.status === "active")
      .map((city) => city.name);
  },
  methods: {
    getLocalities: async function (city) {
      this.localities = [];
      this.input_loader = true;
      let response = await postApartmentServices.getLocalities(city);
      this.input_loader = false;
      response.forEach((doc) => {
        this.localities.push({
          id: doc.id,
          name: doc.data().locality_name,
        });
      });
    },
    getSublocalities: async function (locality) {
      this.sublocalities = [];

      if (this.localities.find((name) => name.name === locality.name)) {
        let response = await postApartmentServices.getSublocalities(locality.id);
        response.forEach((doc) => {
          this.sublocalities.push({
            id: doc.id,
            name: doc.data().sublocality_name,
          });
        });
      }
    },
    getBuildings: async function (sublocality) {
      this.buildings = [];
      if (this.sublocalities.find((name) => name.name === sublocality.name)) {
        let response = await postApartmentServices.getBuildings(sublocality.id);

        response.forEach((doc) => {
          this.buildings.push({
            id: doc.id,
            name: doc.data().building_name,
            landmark: doc.data().landmark,
          });
        });
      }
    },
    setLandMark: async function (building) {
      this.landmarks = [];
      if (await this.buildings.find((b) => b.name === building.name)) {
        this.landmarks = building.landmark;
      }
    },
    add_locality: async function () {
      //add new locality
      try {
        return await postApartmentServices.addNewLocality({
          city: this.city,
          locality_name: this.locality["name"] || this.locality,
          verified: true,
        });
      } catch (error) {
        console.error(error);
      }
    },
    add_sublocality: async function (localityID) {
      //add new sublocality
      try {
        return await postApartmentServices.addNewSubLocality({
          sublocality_name: this.sublocality["name"] || this.sublocality,
          city: this.city,
          locality_id: localityID,
          locality_name: this.locality["name"] || this.locality,
          verified: true,
        });
      } catch (error) {
        console.error(error);
      }
    },
    add_building: async function (localityID, sublocalityID) {
      //add new building
      try {
        return await postApartmentServices.addNewBuilding({
          building_name: this.building["name"] || this.building,
          city: this.city,
          locality_id: localityID,
          locality_name: this.locality["name"] || this.locality,
          sublocality_id: sublocalityID,
          sublocality_name: this.sublocality["name"] || this.sublocality,
          ...(this.landmark && { landmark: [this.landmark] }),
          verified: true,
        });
      } catch (error) {
        console.error(error);
      }
    },
    validate: async function () {
      //el = 2 to parent
      if (this.$refs.form.validate()) {
        try {
          this.loading = true;
          let localityID = this.locality.id
            ? this.locality.id
            : await this.add_locality();
          let sublocalityID = this.sublocality.id
            ? this.sublocality.id
            : await this.add_sublocality(localityID);
          let buildingID = this.building.id
            ? this.building.id
            : await this.add_building(localityID, sublocalityID);
          if (!this.building.id && !this.landmarks.find((l) => l === this.landmark))
            await postApartmentServices.addLandmark(buildingID, this.landmark);
          await postApartmentServices.updateLocationDetails(
            this.$route.params.property_type + "s_" + this.$route.params.property_for,
            this.$route.params.id,
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
                landmark: this.landmark
              },
              step: 2,
            },
            sublocalityID
          );

          this.$emit("stepperChange", {
            city: this.city,
            locality_id: localityID,
            locality_name: this.locality,
            sublocality_id: sublocalityID,
            sublocality_name: this.sublocality,
            building_id: buildingID,
            building_name: this.building,
            landmark: this.landmark,
            flat_number: this.flatNumber,
          });
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
      if (newVal.location_details) {
        this.city = newVal.location_details.city ? newVal.location_details.city : "";
        this.locality = newVal.location_details.locality_name
          ? { id: newVal.location_details.locality_id, name: newVal.location_details.locality_name }
          : "";
        this.sublocality = newVal.location_details.sublocality_name
          ? { id: newVal.location_details.sublocality_id, name: newVal.location_details.sublocality_name }
          : "";
        this.building = newVal.location_details.building_name
          ? {id: newVal.location_details.building_id, name: newVal.location_details.building_name}
          : "";
        this.flatNumber = newVal.location_details.flat_number
          ? newVal.location_details.flat_number
          : "";
        this.landmark = newVal.location_details.landmark
          ? newVal.location_details.landmark
          : "";
      }
    },
    localities: function () {
      this.locality = "";
    },
    locality: function () {
      if (!this.locality) this.sublocalities = [];
    },
    sublocalities: function () {
      this.sublocality = "";
    },
    sublocality: function () {
      if (!this.sublocality) this.buildings = [];
    },
    buildings: function () {
      this.building = "";
    },
    building: function () {
      if (!this.building) this.landmarks = [];
    },
    landmarks: function () {
      this.landmark = "";
    },
  },
};
</script>

<style></style>
