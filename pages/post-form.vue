<template>
  <div>
    <hr />

    <v-autocomplete
      v-model="property_type"
      :items="property_types"
      label="Property Type"
      filled
    ></v-autocomplete>

    <v-file-input
      counter
      multiple
      show-size
      small-chips
      truncate-length="50"
      accept="image/*,video/mp4,video/x-m4v,video/*"
      v-model="chosenFile"
    ></v-file-input>
    <button v-on:click="submit_image">UPLOAD IMAGE</button>

    <!-- <v-text-field
      v-model="property_type"
      :rules="nameRules"
      :counter="10"
      label="Property Type"
      required
    ></v-text-field> -->

    <div>
      <h2>Submit</h2>
      <input type="submit" value="Submit" v-on:click="submit" />
    </div>
    <hr />
    <img id="myimg" src="../assets/image.png" height="125px" width="200px" />
    <span>
      <video width="400" controls>
        <source src="../assets/video2.webm" id="vid" type="video/webm" />
      </video>
    </span>
    <br />
    <hr />
    <div v-for="value in results" :key="value.id">
      {{ value }}
    </div>
  </div>
</template>

<script>
import postProperty from '../services/firebaseServices'
export default {
  name: 'post-form',

  data: () => ({
    property_type: '',
    property_types: ['appartments'],
    results: {},
    chosenFile: null,
    formData: {
      property_type: 'appartments',
    },
  }),

  mounted: function () {
    this.randomfunctions()
  },

  methods: {
    submit: function () {
      postProperty
        .createProperty('appartments', this.formData)
        .then((response) => {
          console.log(response)
        })
    },
    submit_image: async function () {
      this.chosenFile.forEach((element) => {
        postProperty
          .setMedia('appartments/' + element.name, element)
          .then((response) => {
            console.log(response)
          })
      })
    },
    randomfunctions: function () {
      // postProperty.readallProperty('cities').then((response) => {
      //   console.log(response)
      // })
      // postProperty.getMedia('appartments/video.webm').then((vid_url) => {
      //   // console.log(vid_url)
      //   const video = document.getElementById('vid')
      //   video.setAttribute('src', vid_url)
      // })
      // postProperty.getMedia('appartments/image.jpeg').then((img_src) => {
      //   const img = document.getElementById('myimg')
      //   img.setAttribute('src', img_src)
      // })
      // postProperty
      //   .updateProperty('appartments', 'S2GEh6qUHWsP2kc02CL6', {
      //     verified: true,
      //   })
      //   .then((response) => {  console.log(response)})
    },
  },
}
</script>