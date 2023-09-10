import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";


const firebaseConfig = {
  apiKey: "AIzaSyDisp6zGEeZxcleRiiBNTvmiPoJslANrT8",
  authDomain: "mini-hackthon-1b4f7.firebaseapp.com",
  projectId: "mini-hackthon-1b4f7",
  storageBucket: "mini-hackthon-1b4f7.appspot.com",
  messagingSenderId: "696214377099",
  appId: "1:696214377099:web:ffb837c760eca55f6cba8e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

var btn = document.getElementById("loginBtn")
btn.addEventListener("click", () => {
  var email = document.getElementById("email").value
  var password = document.getElementById("pass").value
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      Swal.fire({
        text: `User Signed Up !`,
        icon: 'success',
        confirmButtonText: 'OK'
      })
        if (email === "tahirahh@gmail.com" && password === "TahirahRoohi") {
          console.log("Redirecting to the dashboard.");
          location.href = '../dashboard/dashboard.html';
        } else{
          console.log("Redirecting to the signup page.");
          window.location.href = '../dashboard2/dashboard2.html';
        }
       
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      if (errorMessage === "Firebase: Error (auth/invalid-email).") {
        Swal.fire({
          text: `Invalid Email Address`,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
      else if (errorMessage === "Firebase: Error (auth/user-not-found).") {
        Swal.fire({
          text: `This email Is Not Signed Up`,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
      else if (errorMessage === "Firebase: Error (auth/missing-password).") {
        Swal.fire({
          text: `Enter Password First`,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
      else if (errorMessage === "Firebase: Error (auth/wrong-password).") {
        Swal.fire({
          text: `Wrong Password Entered`,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    });
})

// onAuthStateChanged(auth, async (user) => {
//   if (user) {
//       location.replace("")
//   }
// })