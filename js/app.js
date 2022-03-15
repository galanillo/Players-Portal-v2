// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBtGvQ5KDH8EgnWWJM169BriyXseB8WMCY",
  authDomain: "player-s-portal.firebaseapp.com",
  projectId: "player-s-portal",
  storageBucket: "player-s-portal.appspot.com",
  messagingSenderId: "998038850048",
  appId: "1:998038850048:web:ba87b0b3433569c4b126e5",
  measurementId: "G-F5YXJTXNGW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);