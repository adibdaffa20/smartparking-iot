// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBrmkj1t4Za4-VYeuGvUEZdOPoqIC_o2JM",
  authDomain: "finalproject-iot-d7994.firebaseapp.com",
  projectId: "finalproject-iot-d7994",
  storageBucket: "finalproject-iot-d7994.appspot.com",
  messagingSenderId: "148065638349",
  appId: "1:148065638349:web:28f772b83ddb0a89615684",
  measurementId: "G-XMTJN1QWTW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };