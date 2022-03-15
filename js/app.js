import { initializeApp } from 'firebase/app';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  //...
  apiKey: "AIzaSyBtGvQ5KDH8EgnWWJM169BriyXseB8WMCY",
  authDomain: "player-s-portal.firebaseapp.com",
  projectId: "player-s-portal",
  storageBucket: "player-s-portal.appspot.com",
  messagingSenderId: "998038850048",
  appId: "1:998038850048:web:ba87b0b3433569c4b126e5",
  measurementId: "G-F5YXJTXNGW"

};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Get a list of cities from your database

async function getCities(db) {

  const citiesCol = collection(db, 'cities');
  const citySnapshot = await getDocs(citiesCol);
  const cityList = citySnapshot.docs.map(doc => doc.data());
  return cityList;
  
}