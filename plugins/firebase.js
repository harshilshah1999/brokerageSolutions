// ~/plugins/firebase.js

import * as firebase from 'firebase/app'
import { getAuth } from 'firebase/auth'

// Your web app's Firebase configuration
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDToWTl1sIdI1NhW3EFp4-l48oD-J9Qi6I",
    authDomain: "brokeragesolutions-65c28.firebaseapp.com",
    projectId: "brokeragesolutions-65c28",
    storageBucket: "brokeragesolutions-65c28.appspot.com",
    messagingSenderId: "59521311236",
    appId: "1:59521311236:web:35072825d88073a0ec8b51"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
  
export const auth = getAuth();
export default firebase