// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
  } from 'firebase/auth'
  
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCv1zjr7cHu41hljIh8sQVi_wUfB6btWVg",
  authDomain: "interactive-comment-sect-d5f6a.firebaseapp.com",
  projectId: "interactive-comment-sect-d5f6a",
  storageBucket: "interactive-comment-sect-d5f6a.appspot.com",
  messagingSenderId: "1027408676443",
  appId: "1:1027408676443:web:8752baf72cc487a320217e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider()

googleProvider.setCustomParameters({
  prompt: 'select_account',
})

export const auth = getAuth()

export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)