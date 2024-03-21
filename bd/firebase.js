import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDKROCfYUdEzG8gCkjVYGfHwDHsGhvu7ZA",
    authDomain: "clothingsales-2ace7.firebaseapp.com",
    projectId: "clothingsales-2ace7",
    storageBucket: "clothingsales-2ace7.appspot.com",
    messagingSenderId: "856958563843",
    appId: "1:856958563843:web:7758d4e8948316a5e44036"
};

// Inicialize o Firebase
const app = firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
