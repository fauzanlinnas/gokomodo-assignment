import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyDHihwa_5XIUUbklZEWsrxh573sOZrkMzc",
  authDomain: "gokomodo-assignment.firebaseapp.com",
  projectId: "gokomodo-assignment",
  storageBucket: "gokomodo-assignment.appspot.com",
  messagingSenderId: "1076287581053",
  appId: "1:1076287581053:web:c6989b39539b429f617a14",
  measurementId: "G-FXMHT5BSV2",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
