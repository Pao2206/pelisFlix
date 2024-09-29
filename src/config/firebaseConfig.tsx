import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyCYsiaCqFyGNT85s7oQmV5y5GDqRIpPNp8",
  authDomain: "productsnatura-5e9b7.firebaseapp.com",//cambiar
  projectId: "productsnatura-5e9b7",//cambiar
  storageBucket: "productsnatura-5e9b7.appspot.com",//cambiar
  messagingSenderId: "853973337701",
  appId: "1:853973337701:web:5f24699c8cb3e80498e88c"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
//export const auth = getAuth(firebase);

export const auth = initializeAuth(firebase, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });