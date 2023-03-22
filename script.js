const password = "mypassword"; // Replace with your desired password
const correctDOB = "01/01/2000"; // Replace with your desired date of birth
const storageKey = "mywebsite_auth"; // Replace with your desired storage key

function authenticateUser() {
  // Check for the authentication flag in local storage
  const isAuthenticated = localStorage.getItem(storageKey);

  if (isAuthenticated === "true") {
    // The user is already authenticated, so they can access the site
    console.log("User is authenticated.");
  } else {
    // The user is not authenticated, so prompt for credentials
    const enteredPassword = prompt("Please enter the password to access this website:");
    const enteredDOB = prompt("Please enter your date of birth (MM/DD/YYYY):");

    if (enteredPassword !== password || enteredDOB !== correctDOB) {
      alert("Access denied.");
      window.location.href = "https://www.google.com/"; // Redirect to another page
    } else {
      // Set a flag in local storage to indicate that the user is authenticated
      localStorage.setItem(storageKey, "true");
      console.log("User is authenticated.");
    }
  }
}

authenticateUser();
// Get the progress bar and its spans

document.addEventListener("DOMContentLoaded", function() {
  const progressBar = document.getElementById("progress-bar");
  const spans = progressBar.getElementsByTagName("span");

  // Do something with the spans...

// Load the progress from storage or set it to an empty array if none exists
let progress = JSON.parse(localStorage.getItem("progress")) || [];

// Loop through the spans and add event listeners
for (let i = 0; i < spans.length; i++) {
  //spans[i].addEventListener("click", function() {
    // Update the style of the clicked span

    // Add the completed game to the progress array
  //  progress.push(i + 1);

    // Save the progress to storage
  //  localStorage.setItem("progress", JSON.stringify(progress));
  //});

  // Check if the game has been completed and update the style if necessary
  console.log(progress.includes(i + 1))
  console.log(progress.includes(i))
  if (progress.includes(i + 1) && !spans[i].classList.contains("prize")) {
    console.log("is true")
    spans[i].innerHTML = "&#x2705";
    //spans[i+1].innerHTML = "&#x1F513"
  }
}
});

// Disable links not ready yet

const linkIdsToDisable = ['link4', 'link5', 'link6', 'link7', 'link8', 'link9', 'link10'];

linkIdsToDisable.forEach(id => {
  const link = document.getElementById(id);
  if (link) {
    link.removeAttribute('href');
    link.style.pointerEvents = 'none';
  }
});


// Other JavaScript code for your website can go here.