import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDnE8yex2PSXq2dFRW7OTqtj325qVgRVCY",
  authDomain: "la22-a3b09.firebaseapp.com",
  projectId: "la22-a3b09",
  storageBucket: "la22-a3b09.appspot.com",
  messagingSenderId: "128527330155",
  appId: "1:128527330155:web:2dc5c8c3e9fe68b7f67a2e"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const db = getFirestore()