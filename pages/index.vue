<template>
  <div>
    HOME
    <hr />
    <div v-for="element in dropdown" :key="element">
      {{ element }}
    </div>
    <v-col cols="12" sm="6">
      <v-combobox
        v-model="searchquery"
        :items="dropdown"
        @keyup="fillDropdown(searchquery)"
        item-text="name"
        item-value="id"
        label="Locality or Sublocality or Building"
        outlined
        hint="Suggestions are displayed based on query that you type"
        persistent-hint
        :loading="locality_loader"
      ></v-combobox>
    </v-col>
  </div>
</template>
<script>
import homepageServices from "../services/homepageServices";
import firebaseServices from "../services/firebaseServices";
export default {
  name: "index",
  components: {},

  data() {
    return {
      selected_city: "Achalpur",
      searchquery: "may",
      dropdown: [],
      locality_loader: false,
      bool: true, //
    };
  },

  async mounted() {
    // let query = this.searchquery[0].toUpperCase() + this.searchquery[1];
    // let response = await firebaseServices.startWithQuery("cities", "name", query);
    // response.forEach((element) => {
    //   console.log(element.data());
    // });
    // this.fillDropdown(this.selected_city, this.searchquery);
  },
  methods: {
    async fillDropdown(query) {
      if (query.length == 3) {
        this.locality_loader = true;
        query = query[0].toUpperCase() + query[1] + query[2]; //because query is Case sensitive and we need 1st char in uppercase

        this.dropdown = await homepageServices.getLocationsDropdown(
          this.selected_city,
          query
        );
        this.bool = false; //database query only once...rest front end javascript to reduce cost.
        this.locality_loader = false;
      }
    },
  },
};
</script>
