"use strict";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAm-TuV5cpCZQ9MH2iF5rLdnH4mBB_CKBs",
  authDomain: "paper2-87598.firebaseapp.com",
  projectId: "paper2-87598",
  storageBucket: "paper2-87598.firebasestorage.app",
  messagingSenderId: "631422072190",
  appId: "1:631422072190:web:bcb53f60e223f259e62f2f",
  measurementId: "G-C6XKV0MKGM",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const analytics = app.analytics();
analytics.logEvent("page_view");
