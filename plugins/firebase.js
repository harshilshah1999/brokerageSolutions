// ~/plugins/firebase.js

import { initializeApp } from "firebase/app"
import { getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";

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
const firebaseApp = initializeApp(firebaseConfig)
const db = getFirestore(firebaseApp);
const auth = getAuth();

export { auth, db }
export default firebaseApp