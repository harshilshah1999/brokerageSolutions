<template>
  <div id="app">
    <file-pond
      name="file"
      ref="input"
      label-idle="Drop files here..."
      :allow-multiple="true"
      accepted-file-types="image/jpeg, image/png"
      :server="{  process, revert }"
      :files="files2"
      @init="handleFilePondInit"
    />
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
const FilePond = vueFilePond(
  FilePondPluginFileValidateType
);

export default {
  name: "app",
  data: function () {
    return { 
        myFiles: [],
        files2: []
    };
  },
  methods: {
            process(fieldName, file, metadata, load, error, progress, abort)  {
                const uploadTask = firebaseService.setSingleMedia(file.name, file, progress, load, abort, error);
                return {
                    abort: () => {
                            abort()
                            uploadTask.cancel();
                    }
                }
            },
            revert (uniqueFileId, load, error) {
                console.log(uniqueFileId)
                firebaseService.deleteSingleMedia(uniqueFileId, error);
            },
            handleFilePondInit: function() {
                this.$refs.input.getFiles();
            }
  },
   watch:{
            files : {
                handler: function (val, oldVal) {
                    if(this.first) this.first = false;
                    this.$emit('input', val)
                },
                deep: true
            }
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