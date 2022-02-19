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

export default {
  name: "index",

  components: {},

  data() {
    return {
      dropdown: [],
      bool: true,
    };
  },

  async mounted() {
    if (this.bool) {
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
