import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyATLNyMeI0UL466kKqfRSJWUFOXRnwfV0Q",
    authDomain: "smartparking-f8be2.firebaseapp.com",
    projectId: "smartparking-f8be2",
    // databaseURL: "https://smartparking-f8be2-default-rtdb.firebaseio.com/",
    storageBucket: "smartparking-f8be2.appspot.com",
    messagingSenderId: "719552682532",
    appId: "1:719552682532:web:08cf512e67d3af180b16b1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

import AppNavigation from './navigation/appNavigation';
import { AuthProvider } from './hooks/useAuth';

export default function App() {
  return (
    <AuthProvider>
      <AppNavigation />
    </AuthProvider>
  );
}
