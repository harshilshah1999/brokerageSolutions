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
        @keyup="fillDropdown"
        item-text="name"
        item-value="id"
        label="Locality or Sublocality"
        outlined
        hint="Suggestions are displayed based on query that you type"
        persistent-hint
        :loading="locality_loader"
      ></v-combobox>
    </v-col>
    <hr />
    <br />
  </div>
</template>
<script>
import homepageServices from "../services/homepageServices";
export default {
  name: "index",
  components: {},

  data() {
    return {
      property_type: "apartment",
      property_for: "sale",
      BHKType: 3,
      selected_city: "Achalpur",
      searchquery: "",
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
    // await this.fillDropdown(this.searchquery);
    await this.getLocation("79.251921", "22.868179");
  },
  methods: {
    async getLocation(lat, long) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
      } else {
        console.log("Geolocation is not supported by this browser.");
      }

      function showPosition(position) {
        lat = position.coords.latitude;
        long = position.coords.longitude;

        var xhr = new XMLHttpRequest();
        // xhr.withCredentials = true;
        xhr.addEventListener("readystatechange", function () {
          if (this.readyState === 4) {
            console.log("location->", JSON.parse(this.responseText));
          }
        });
        console.log(lat, long);

        xhr.open(
          "GET",
          "https://us1.locationiq.com/v1/reverse.php?key=pk.7287103c7d78888d2810244eec426f3c&lat=" +
            lat +
            "&lon=" +
            long +
            "&format=json"
        );
        xhr.send();
      }

      function showError(error) {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            console.log("User denied the request for Geolocation.");
            break;
          case error.POSITION_UNAVAILABLE:
            console.log("Location information is unavailable.");
            break;
          case error.TIMEOUT:
            console.log("The request to get user location timed out.");
            break;
          case error.UNKNOWN_ERROR:
            console.log("An unknown error occurred.");
            break;
        }
      }
    },

    async fillDropdown() {
      if (query.length == 3) {
        //to avoid overusage
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
<style scoped></style>
