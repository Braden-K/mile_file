// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlOw5WLPPPNhKi4Kq49E1QCH65z5msW1U",
  authDomain: "mile-file.firebaseapp.com",
  projectId: "mile-file",
  storageBucket: "mile-file.appspot.com",
  messagingSenderId: "296462808533",
  appId: "1:296462808533:web:51c4621762d26058aeb95c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
