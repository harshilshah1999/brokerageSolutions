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
      searchquery: "",
      dropdown: [],
      bool: true, //
    };
  },

  async mounted() {
    let response = await firebaseServices.startWithQuery(
      "cities",
      "name",
      "ach"[0].toUpperCase()
    );
    response.forEach((element) => {
      console.log(element.data());
    });

    if (this.searchquery.length == 3) {
      this.fillDropdown();
      this.bool = false;
    }
  },
  methods: {
    async fillDropdown() {
      this.dropdown = await homepageServices.getLocationsDropdown("Achalpur");
    },
  },
};
</script>
