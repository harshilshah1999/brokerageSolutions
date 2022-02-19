<template>
  <!-- @TODO OC CC INFO ALERT-->

  <v-form v-model="valid" ref="form" lazy-validation>
    <v-container>
      <v-row>
        <v-col cols="12" sm="6">
          <v-file-input
            counter
            multiple
            show-size
            small-chips
            truncate-length="50"
            accept="image/*,video/mp4,video/x-m4v,video/*"
            v-model="chosenFile"
          ></v-file-input>
          <v-btn v-on:click="submit_image">UPLOAD IMAGE</v-btn>
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
  data: () => ({
    construction_type: "",
    oc_status: null,
    cc_status: null,
    construction_types: ["Under Construction", "New Construction", "Resale"],
    oc_cc_types: ["Received", "Not Received", "Dont Know"],
    possession_date: null,
    building_age: null,
    menu: false,
    valid: false,
    rules: [(v) => !!v || "This is a required field"],
    loading: false,
  }),
  mounted() {
    //get building data
  },
  methods: {
    validate: async function () {},
    submit_image: async function () {
      try {
        this.chosenFile.forEach(async (element, index) => {
          const options = {
            maxSizeMB: 0.4,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
          };
          console.log(`originalFile size ${element.size / 1024 / 1024} MB`);
          const compressedFile = await imageCompression(element, options);
          console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
          (this.media_formData = {
            storage_path: this.storage_path + "/" + index + "_" + element.name, //need image name validation here
            media_type: "Living Room/Bedroom/Kitchen/...",
            thumbnail: true,
          }),
            await postApartmentServices.postMedia(
              this.property_type,
              this.documentID,
              compressedFile,
              this.media_formData,
              this.property_type + "/" + this.documentID + "/" + element.name
            );
        });
      } catch (error) {
        console.error(error);
      }
    },
  },
  watch: {},
};
</script>

<style></style>
