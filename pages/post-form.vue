<template>
  <div>
    <div>
      <h2>First Name</h2>
      <input type="text" v-model="firstName" />
    </div>

    <div>
      <h2>Last Name</h2>
      <input type="text" v-model="lastName" />
    </div>

    <div>
      <h2>Submit</h2>
      <input type="submit" value="Submit" v-on:click="submit" />
    </div>
  </div>
</template>

<script>
import { db } from '../plugins/firebase'
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  setDoc,
} from 'firebase/firestore'

const citiesRef = collection(db, 'cities')

// setDoc(doc(citiesRef, 'SF'), {
//   name: 'San Francisco',
//   state: 'CA',
//   country: 'USA',
//   capital: false,
//   population: 860000,
//   regions: ['west_coast', 'norcal'],
// })

export default {
  name: 'post-form',
  data: () => ({
    firstName: '',
    lastName: 'foo',
  }),
  methods: {
    submit: function () {
      console.log(this.firstName, this.lastName)

      this.firstName = ''
      this.lastName = ''
    },
  },
  firestore() {
      console.log(db.collection('appartments').orderBy('createdAt'))
    return {
      locations: db.collection('appartments').orderBy('createdAt'),
    }
  },
}
</script>
