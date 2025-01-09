// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCw3DfmONgWkmzU1iGxxeiL7RVKXVWVKhs",
  authDomain: "login-auth-51db6.firebaseapp.com",
  projectId: "login-auth-51db6",
  storageBucket: "login-auth-51db6.firebasestorage.app",
  messagingSenderId: "664542955485",
  appId: "1:664542955485:web:0b0def8cf91e2176cd9834"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth();
export const db=getFirestore(app);
export default app;
