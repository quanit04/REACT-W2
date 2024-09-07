// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDpViO4AP0wP6eEpd3So8CqOhXPg5jYIRE",
  authDomain: "mq-app-6e32d.firebaseapp.com",
  projectId: "mq-app-6e32d",
  storageBucket: "mq-app-6e32d.appspot.com",
  messagingSenderId: "576884959091",
  appId: "1:576884959091:web:f490674d2f0f08aa92c706",
  measurementId: "G-XK2HKS40MC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider()