import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDYYki3Zb6DUDhujdBRabZ0cy3i_Q4SW-g",
  authDomain: "portfolio-v1-4a05e.firebaseapp.com",
  projectId: "portfolio-v1-4a05e",
  storageBucket: "portfolio-v1-4a05e.firebasestorage.app",
  messagingSenderId: "863430639305",
  appId: "1:863430639305:web:81749f39880c63bef25718",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);