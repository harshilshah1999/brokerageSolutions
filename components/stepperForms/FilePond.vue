<template>
  <div id="app">
    <file-pond
      name="file"
      ref="input"
      label-idle="Drop files here..."
      :allow-multiple="true"
      accepted-file-types="image/jpeg, image/png"
      :server="{  process, revert,  restore, load, fetch }"
      :files="files2"
      @init="handleFilePondInit"
    />
  </div>
</template>

<script>
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
                var self = this
                try {
                    progress(true, 0, 1024);
                    var uploadTask = this.$storage.ref().child('images/' + file.name).put(file, metadata)
                    uploadTask.on(this.$firebase.storage.TaskEvent.STATE_CHANGED,
                        function (snapshot) { progress(true, snapshot.bytesTransferred, snapshot.totalBytes)},
                        function (e) {  self.handleError(error, e)},
                        function () {
                            load(uploadTask.snapshot.ref.fullPath)
                            self.files.push(uploadTask.snapshot.ref.fullPath)
                        }
                    )
                    return {
                        abort: () => {
                            abort()
                            uploadTask.cancel();
                        }
                    }
                } catch (e) {
                    this.handleError(error, e)
                    return {
                        abort: () => { abort() }
                    }
                }
            },
            revert (uniqueFileId, load, error) {
                var self = this
                // Create a reference to the file to delete
                console.log(uniqueFileId)
                var desertRef = this.$storage.ref().child(uniqueFileId);
                        desertRef.delete().then(function() {
                            var index = self.files.indexOf(uniqueFileId);
                            if (index > -1) {
                                self.files.splice(index, 1);
                            }
                            load();
                        }).catch(function(e) {
                           this.handleError(error, e)
                        });
            },
            load (uniqueFileId, load, error){ error()},
            fetch (url, load, error, progress, abort, headers) {   error("Solo archivos locales")   },
            restore (uniqueFileId, load, error, progress, abort, headers) { error() },
            handleError (error, e){
                switch (e.code) {
                    case 'storage/canceled':
                        break;
                    default: error(e.message)
                }
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