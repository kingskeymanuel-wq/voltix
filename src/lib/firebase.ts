
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getPerformance } from "firebase/performance";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "voltix-smart-ci",
  "appId": "1:781467646402:web:50d4519f4344f03f063e5b",
  "storageBucket": "voltix-smart-ci.firebasestorage.app",
  "apiKey": "AIzaSyC0do8vpuylOoZQ1srVxfWiuvGP9UONQWU",
  "authDomain": "voltix-smart-ci.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "781467646402"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Performance Monitoring and get a reference to the service
// To start collecting performance data, you must go to the Firebase console
// to enable and complete the setup for Performance Monitoring.
const perf = getPerformance(app);


export { app };
