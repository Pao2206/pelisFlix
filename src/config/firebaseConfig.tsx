import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getDatabase } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyAfqVxWRQmT0XVBZqi0uSuMvsJcF487v5Y",
  authDomain: "pelisflix-59bc7.firebaseapp.com",
  projectId: "pelisflix-59bc7",
  storageBucket: "pelisflix-59bc7.appspot.com",
  messagingSenderId: "97471494286",
  appId: "1:97471494286:web:ed30e11f815068c2aa31df",
  databaseURL:"https://pelisflix-59bc7-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
//export const auth = getAuth(firebase);

export const auth = initializeAuth(firebase, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });

  // Initialize Realtime Database and get a reference to the service
export const dbRealtime = getDatabase(firebase);