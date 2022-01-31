const firebase = require("firebase/app");
var storage = require("firebase/storage");

const firebaseConfig = {
  apiKey: "AIzaSyDhUhgcAW5wk6KBSHrCNNBqq3hwoucnAr4",
  authDomain: "weggscollection.firebaseapp.com",
  projectId: "weggscollection",
  storageBucket: "weggscollection.appspot.com",
  messagingSenderId: "354137171514",
  appId: "1:354137171514:web:938d796025a324121df703",
  measurementId: "G-5614LMW39X",
};

firebase.initializeApp(firebaseConfig);
// const db = firebase.firestore();
storage = firebase.storage();
module.exports = storage;
