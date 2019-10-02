
// import React, { createContext } from 'react';
// import app from 'firebase/app';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

var firebaseConfig = {
    apiKey: "AIzaSyA97DkBXrCYcPPuqN1ch7Zw4myRk-cHBSA",
    authDomain: "app23980.firebaseapp.com",
    databaseURL: "https://app23980.firebaseio.com",
    projectId: "app23980",
    storageBucket: "app23980.appspot.com",
    messagingSenderId: "1089915062068",
    appId: "1:1089915062068:web:b1586fb5765c6047070761",
    measurementId: "G-HG0D2TNCEV"
};

firebase.initializeApp(firebaseConfig);


export default firebase;