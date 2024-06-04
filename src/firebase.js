
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAivlWu1RVA-LbT2COFZ6Grh9iUJkwjy4A",
  authDomain: "castingapp-gc.firebaseapp.com",
  projectId: "castingapp-gc",
  storageBucket: "castingapp-gc.appspot.com",
  messagingSenderId: "191085121170",
  appId: "1:191085121170:web:9001f2df0f681cf3c0a04b",
  measurementId: "G-LXXEG08ZNC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
