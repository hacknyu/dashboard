// src/firebase.js
import * as firebase from "firebase/app";
import "firebase/functions";

const config = {
  apiKey: "AIzaSyCCGrSjWVuB5GqGLfgkfA2uQT1EjX1Sjgc",
  authDomain: "hacknyu-3e0c8.firebaseapp.com",
  databaseURL: "https://hacknyu-3e0c8.firebaseio.com",
  projectId: "hacknyu-3e0c8",
  storageBucket: "hacknyu-3e0c8.appspot.com",
  messagingSenderId: "482443126384"
};
firebase.initializeApp(config);

export const functions = firebase.functions();
