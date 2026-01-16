import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDYjDiZ2tD3COFv3zB8tmr2gJQ9cqha7Yo",
  authDomain: "camp-scoreboard.firebaseapp.com",
  projectId: "camp-scoreboard",
  storageBucket: "camp-scoreboard.firebasestorage.app",
  messagingSenderId: "763916838880",
  appId: "1:763916838880:web:4e05c7f8d7e66194aded85"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);