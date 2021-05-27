import firebase from "firebase"

var firebaseConfig = {
    apiKey: "AIzaSyAnJ6SulKDfG2HiPN9nKqqidOYoLgG_ovQ",
    authDomain: "instagram-4423d.firebaseapp.com",
    projectId: "instagram-4423d",
    storageBucket: "instagram-4423d.appspot.com",
    messagingSenderId: "285912607577",
    appId: "1:285912607577:web:83c079fa48f43d5ed2fa48",
    measurementId: "G-VFWD6G9NKS"
  };

  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();

  export{db, auth, storage}