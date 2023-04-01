import { auth, onAuthStateChanged } from "./firebase.js"


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
      console.log("user is signed out, redirecting to login");
      window.location.href = "login.html";
    }
});
