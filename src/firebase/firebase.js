import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDqYlKQUifUnDOst1qY5pikD9YWL4lcySQ",
  authDomain: "swiftkeys-24768.firebaseapp.com",
  projectId: "swiftkeys-24768",
  storageBucket: "swiftkeys-24768.firebasestorage.app",
  messagingSenderId: "733476070165",
  appId: "1:733476070165:web:dbe9da8d51a30bb4bf3f1c",
  measurementId: "G-QRZQ001Z5L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app)

export {auth, app};