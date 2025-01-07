import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "chatweb-7b8f6.firebaseapp.com",
  projectId: "chatweb-7b8f6",
  storageBucket: "chatweb-7b8f6.firebasestorage.app",
  messagingSenderId: "176124268266",
  appId: "1:176124268266:web:21cc271f05355485389193",
  measurementId: "G-QV27R12MQN"
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth()
export const db = getFirestore()