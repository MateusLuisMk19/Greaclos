import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB4Ld8-p3z-rwDfJpuIxfPASsC2DshAM10",
  authDomain: "greaclos-one.firebaseapp.com",
  projectId: "greaclos-one",
  storageBucket: "greaclos-one.appspot.com",
  messagingSenderId: "331401141584",
  appId: "1:331401141584:web:cf7211ea4fdb64b0c9a055",
  databaseURL:
    "https://greaclos-one-default-rtdb.europe-west1.firebasedatabase.app", // URL atualizada para a região correta
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const rt = getDatabase(app);
const st = getStorage(app);
const auth = getAuth(app);

export { db, st, rt, auth };
