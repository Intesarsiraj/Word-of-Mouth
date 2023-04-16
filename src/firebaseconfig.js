// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB5UsX1STwAwFPmWqsPgXvINbcIqUFaa5w",
  authDomain: "ada-word-of-mouth.firebaseapp.com",
  databaseURL: "https://ada-word-of-mouth-default-rtdb.firebaseio.com",
  projectId: "ada-word-of-mouth",
  storageBucket: "ada-word-of-mouth.appspot.com",
  messagingSenderId: "731717180711",
  appId: "1:731717180711:web:327d738acd6fce2238dd02",
  measurementId: "G-8PSZEDFPQ1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const storage = getStorage(app);
