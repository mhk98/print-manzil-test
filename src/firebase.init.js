// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtvL2W-cvXk1OajHps2y5fKZQiKve5O5Y",
  authDomain: "independent-service-providers.firebaseapp.com",
  projectId: "independent-service-providers",
  storageBucket: "independent-service-providers.appspot.com",
  messagingSenderId: "150400937271",
  appId: "1:150400937271:web:bf4224c8d238351372feb2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
