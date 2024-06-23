import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyATLNyMeI0UL466kKqfRSJWUFOXRnwfV0Q",
    authDomain: "smartparking-f8be2.firebaseapp.com",
    projectId: "smartparking-f8be2",
    storageBucket: "smartparking-f8be2.appspot.com",
    messagingSenderId: "719552682532",
    appId: "1:719552682532:web:08cf512e67d3af180b16b1",
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };