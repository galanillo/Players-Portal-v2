// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js";
import { collection, getDocs, addDoc, Timestamp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js";
import { query, orderBy, limit, where, onSnapshot } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js";
import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDZWgD5Nchv-Az09pQgIzI7aw0H0rzVLfk",
    authDomain: "players--portal.firebaseapp.com",
    projectId: "players--portal",
    storageBucket: "players--portal.appspot.com",
    messagingSenderId: "185509680031",
    appId: "1:185509680031:web:99a49e46ef2152050523aa",
    measurementId: "G-8EH591Y264"
  };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);
    const auth = getAuth();

    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var username = document.getElementById('username').value;
  
    signUp.addEventListener('click', (e) => {
    
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        // Signed in 
          const user = userCredential.user;
    
          set(ref(database, 'users/' + user.uid),{
              username: username,
              email: email
          })
    
          alert('user created!');
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
    
          alert(errorMessage);
        // ..
        });
    
    });
  
    login.addEventListener('click',(e)=>{
    
          signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
    
            const dt = new Date();
            update(ref(database, 'users/' + user.uid),{
              last_login: dt,
            })
    
            alert('User loged in!');
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
    
            alert(errorMessage);
      });
    
    });
    
    const user = auth.currentUser;
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        //bla bla bla
        // ...
      } else {
        // User is signed out
        // ...
        //bla bla bla
      }
    });
    
    logout.addEventListener('click',(e)=>{
    
      signOut(auth).then(() => {
        // Sign-out successful.
        alert('user loged out');
      }).catch((error) => {
        // An error happened.
        const errorCode = error.code;
        const errorMessage = error.message;
    
            alert(errorMessage);
      });
    
    });
