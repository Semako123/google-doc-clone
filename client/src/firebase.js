// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZcFNJCh6MqTwLGZnB41KrdA9-g5gzzB8",
  authDomain: "doc-clone-be4f5.firebaseapp.com",
  projectId: "doc-clone-be4f5",
  storageBucket: "doc-clone-be4f5.firebasestorage.app",
  messagingSenderId: "961131799768",
  appId: "1:961131799768:web:b8e32ffa885953b15fe3ad",
  measurementId: "G-8295BY9MCW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app