<template>
  <div>
    <hr />

    <v-autocomplete
      v-model="property_type"
      :items="property_types"
      label="Property Type"
      filled
    ></v-autocomplete>

    <!-- <v-text-field
      v-model="value"
      :rules="nameRules"
      :counter="10"
      label="Property Type"
      required
    ></v-text-field> -->

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
    formData: {},
  }),

  mounted: function () {
    postProperty.getHomepageData().then((response) => {
      this.results = response
      console.log(this.results)
    })
    postProperty.getMedia('appartments/video.webm').then((vid_url) => {
      console.log(vid_url)
      const img = document.getElementById('vid')
      img.setAttribute('src', vid_url)
    })
    postProperty.getMedia('appartments/image.jpeg').then((img_src) => {
      const img = document.getElementById('myimg')
      img.setAttribute('src', img_src)
    })
  },

  methods: {
    submit: function () {
      postProperty.postPropertData(this.formData).then((response) => {
        console.log(response)
      })
    },
  },
}
</script>