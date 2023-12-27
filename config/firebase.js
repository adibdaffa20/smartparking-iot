// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth} from 'firebase/auth'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDyn7z2VOoWVpNemdEZ_l4ai7i7wghd0ug",
  authDomain: "finalproject-pemmob.firebaseapp.com",
  projectId: "finalproject-pemmob",
  storageBucket: "finalproject-pemmob.appspot.com",
  messagingSenderId: "771428363743",
  appId: "1:771428363743:web:c3cbc05d3d655266f8286a",
  measurementId: "G-K10V0XJBH9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);