import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyAHoq3F5__rehOc4Lkh5wh0itzMUDi03hI",
  authDomain: "my-own-project-955a0.firebaseapp.com",
  projectId: "my-own-project-955a0",
  storageBucket: "my-own-project-955a0.firebasestorage.app",
  messagingSenderId: "1053488540536",
  appId: "1:1053488540536:web:40b1e2093fb7c2c53ef68d",
  measurementId: "G-J8F370Z5J9"
};

// Initialize Firebase app only once
const FIREBASE_APP = initializeApp(firebaseConfig);
const FIREBASE_AUTH = getAuth(FIREBASE_APP);
const FIRESTORE_DB = getFirestore(FIREBASE_APP);

export { FIREBASE_APP, FIREBASE_AUTH, FIRESTORE_DB };