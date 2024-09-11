// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "rudemailgenerator.firebaseapp.com",
    projectId: "rudemailgenerator",
    storageBucket: "rudemailgenerator.appspot.com",
    messagingSenderId: "785163304909",
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const functions = getFunctions(app)

// const auth = getAuth(app)

export {
    db,
    app,
    functions
    // auth
}