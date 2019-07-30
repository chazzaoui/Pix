import firebase from "firebase";
require("firebase/firestore");

const config = {
  apiKey: "AIzaSyDq0xXoL7ZomQ8iGMfxbtOog2OVCBEDfuw",
  authDomain: "instapicture-7cd83.firebaseapp.com",
  databaseURL: "https://instapicture-7cd83.firebaseio.com",
  projectId: "instapicture-7cd83",
  storageBucket: "instapicture-7cd83.appspot.com",
  messagingSenderId: "1009619963849",
  appId: "1:1009619963849:web:b126d5d1ee675778"
};
// Initialize Firebase
firebase.initializeApp(config);
const db = firebase.firestore();

export default db;
