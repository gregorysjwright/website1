import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import { getDatabase, push, ref, get, onValue } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js";

const firebaseConfig = {
	apiKey: "AIzaSyCnpyh3MsPNIJRniNtiN0BuNhyVe5ImHVg",        
	authDomain: "website-1-9cb6f.firebaseapp.com",
        projectId: "website-1-9cb6f",
        storageBucket: "website-1-9cb6f.appspot.com",
        messagingSenderId: "55103481924",
        appId: "1:55103481924:web:64fcfea9f2dd9ac586b411",
        databaseURL: "https://website-1-9cb6f-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();




function pushToFirebase(database, path, data_json) {
  const db_ref = ref(database, path);
  if (data_json) {
    // Save the message to Firebase Realtime Database
    console.log("trying to push to firebase db");
    push(db_ref,data_json)
    .catch((error) => {
      console.error("Error saving message", error);
    });
  }
  else {console.log("trying to push empty");}
}


// Function to create a new user account with email and password
async function signUpWithEmail(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("New user account created:", user.uid);
    // Do something else here, such as update your database with the new user info
  } catch (error) {
    console.error(error);
    // Handle errors here, such as displaying error messages to the user
  }
}

//signUpWithEmail("example2@email.com", "password123");



function signIntoFirebase(email, password) {

  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    // ...
    console.log("successful sign in of " + user.email);
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
}

signIntoFirebase("example2@email.com", "password123");

onAuthStateChanged(auth, (user) => {
	if (user) {
      	// User is signed in, see docs for a list of available properties
      	// https://firebase.google.com/docs/reference/js/firebase.User
      		const uid = user.uid;
		console.log(user.email + " is currently signed in");
      		console.log(user);
      // ...
    } else {
      // User is signed out
      console.log("user is signed out");
    }
});

// get data from database

function getDataFromFirebase(database, path) {
  return new Promise((resolve, reject) => {
    const databaseRef = ref(database, path);
    get(databaseRef)
      .then((snapshot) => {
        const data = snapshot.val();
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}



