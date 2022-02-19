<template>
  <div>
    HOME
    <hr />
    <div v-for="element in dropdown" :key="element">
      {{ element }}
    </div>
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
      searchquery: "ac",
      dropdown: [],
      bool: true, //
    };
  },

  async mounted() {
    let query =
      this.searchquery[0].toUpperCase() + this.searchquery[1];

    let response = await firebaseServices.startWithQuery("cities", "name", query);
    response.forEach((element) => {
      console.log(element.data());
    });

    if (this.searchquery.length == 3) {
      let query = //because query is Case sensitive and we need 1st char in uppercase
        this.searchquery[0].toUpperCase() + this.searchquery[1] + this.searchquery[2];
      this.fillDropdown(query);
      this.bool = false; //database query only once...rest front end javascript to reduce cost.
    }
  },
  methods: {
    async fillDropdown(query) {
      this.dropdown = await homepageServices.getLocationsDropdown(
        this.selected_city,
        query
      );
    },
  },
};
</script>
