import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import { getDatabase, push, ref, get, onValue } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCnpyh3MsPNIJRniNtiN0BuNhyVe5ImHVg",
  authDomain: "website-1-9cb6f.firebaseapp.com",
  projectId: "website-1-9cb6f",
  storageBucket: "website-1-9cb6f.appspot.com",
  messagingSenderId: "55103481924",
  appId: "1:55103481924:web:64fcfea9f2dd9ac586b411",
  databaseURL: "https://website-1-9cb6f-default-rtdb.firebaseio.com/",
};

function pushToFirebase(database, path, data_json) {
  const ref = ref(database, path);
  if (data_json) {
    // Save the message to Firebase Realtime Database
    console.log("trying to push to firebase db");
    push(ref,data_json);
    .catch((error) => {
      console.error("Error saving message", error);
    });
  }
  else {console.log("trying to push empty");}
}
