// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Import the functions you need from the SDKs you need

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBpcK5qA90bOh9Kn79QQm9N6LuhQ3Cq8fE",
  authDomain: "react-curso-67b5b.firebaseapp.com",
  projectId: "react-curso-67b5b",
  storageBucket: "react-curso-67b5b.appspot.com",
  messagingSenderId: "777328694454",
  appId: "1:777328694454:web:419b643a336f5853dfc217"
};

// Initialize Firebase
export const FirebaseApp  = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB   = getFirestore( FirebaseApp );