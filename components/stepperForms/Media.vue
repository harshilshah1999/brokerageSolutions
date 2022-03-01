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
      <v-col cols="12" sm="3" v-for="file in myFiles" :key="file">
        <v-card>
          <v-img
            :src="file"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="200px"
          >
          </v-img>

          <v-card-actions>
             <v-spacer></v-spacer>
            <v-select
              :items="['Bedroom', 'Kitchen', 'Living Room', 'Dining Room']"
              menu-props="auto"
              label="Image Type"
              outlined
            >
            </v-select>
            <v-btn icon>
              <v-icon>mdi-heart</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <br />
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
  name: "app",
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
        file.name,
        compressedFile,
        progress,
        load,
        abort,
        error,
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
        const index = this.myFiles.indexOf(uniqueFileId);
        if (index > -1) {
          this.myFiles.splice(index, 1);
        }
      } catch (e) {
        console.log(e);
      }
    },
    handleFilePondInit: function () {
      this.$refs.input.getFiles();
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
