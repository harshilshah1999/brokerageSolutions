<template>
  <div id="app">
    <file-pond
      name="file"
      ref="input"
      label-idle="Drop files here..."
      :allow-multiple="true"
      accepted-file-types="image/jpeg, image/png"
      :server="{ process, revert }"
      :files="files2"
      @init="handleFilePondInit"
    />
    <v-row>
      <v-col cols="12" sm="4" v-for="file in myFiles" :key="file.downloadURL">
        <v-card>
          <v-img
            :src="file.downloadURL"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="200px"
          >
          </v-img>

          <v-card-actions>
            <v-row align="center" justify="center">
              <v-col cols="8">
                <v-select
                  :items="['Bedroom', 'Kitchen', 'Living Room', 'Dining Room']"
                  v-model="file.media_type"
                  menu-props="auto"
                  label="Image Type"
                  hide-details
                  dense
                  filled
                  clearable
                >
                </v-select>
              </v-col>
              <v-col cols="4" class="text-right">
                <v-spacer></v-spacer>
                <v-btn
                  icon
                  @click="changeFavourite(file)"
                  :color="file.thumbnail ? 'red' : 'grey'"
                >
                  <v-icon>mdi-heart</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-if="myFiles.length">
      <v-col cols="12" sm="6">
        <v-btn color="primary" @click="saveDetails"> Save Details </v-btn>
      </v-col>
    </v-row>
    <br />
  </div>
</template>

<script>
import firebaseService from "../../services/firebaseServices";
// Import Vue FilePond
import vueFilePond from "vue-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

// Import FilePond plugins
// Please note that you need to install these plugins separately

// Import image preview plugin styles
//import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";

// Import image preview and file type validation plugins
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
//import FilePondPluginImagePreview from "filepond-plugin-image-preview";

// Create component
const FilePond = vueFilePond(FilePondPluginFileValidateType);

import imageCompression from "browser-image-compression";

export default {
  props: ["apartmentId"],
  data: function () {
    return {
      myFiles: [],
      files2: [],
    };
  },
  methods: {
    async process(fieldName, file, metadata, load, error, progress, abort) {
      const options = {
        maxSizeMB: 0.4,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };

      const compressedFile = await imageCompression(file, options);
      const uploadTask = firebaseService.setSingleMedia(
        this.$route.params.property_type + '_' + this.$route.params.property_for + "/" + this.apartmentId + "/" + file.name,
        compressedFile,
        progress,
        load,
        abort,
        error,
        this.$route.params.property_type + '_' + this.$route.params.property_for,
        this.apartmentId,
        this.myFiles
      );
      return {
        abort: () => {
          abort();
          uploadTask.cancel();
        },
      };
    },
    async revert(uniqueFileId, load, error) {
      try {
        await firebaseService.deleteSingleMedia(uniqueFileId, error);
        let id = this.myFiles.find((file) => file.downloadURL === uniqueFileId).id;
        await firebaseService.deleteSingleDocument2D(
          this.$route.params.property_type + '_' + this.$route.params.property_for,
          this.apartmentId,
          "media",
          id
        );
        this.myFiles = this.myFiles.filter((file) => file.downloadURL !== uniqueFileId);
      } catch (e) {
        console.log(e);
      }
    },
    handleFilePondInit: function () {
      this.$refs.input.getFiles();
    },
    changeFavourite: function (file) {
      this.myFiles.forEach((f) => (f.thumbnail = false));
      file.thumbnail = !file.thumbnail;
    },
    saveDetails: async function () {
      console.log(this.myFiles);

      for (let index = 0; index < this.myFiles.length; index++) {
        try {
          await firebaseService.updateSingleDocument2D(
            this.$route.params.property_type + '_' + this.$route.params.property_for,
            this.apartmentId,
            "media",
            this.myFiles[index].id,
            {
              media_type: this.myFiles[index].media_type,
              thumbnail: this.myFiles[index].thumbnail,
            }
          );
        } catch (e) {
          console.log(e);
        }
      }
    },
  },
  watch: {
    files: {
      handler: function (val, oldVal) {
        if (this.first) this.first = false;
        this.$emit("input", val);
      },
      deep: true,
    },
  },
  components: {
    FilePond,
  },
};
</script>
<style>
.filepond--credits {
  display: none;
}
</style>
