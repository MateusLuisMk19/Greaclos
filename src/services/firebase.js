import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyB4Ld8-p3z-rwDfJpuIxfPASsC2DshAM10",
  authDomain: "greaclos-one.firebaseapp.com",
  projectId: "greaclos-one",
  storageBucket: "greaclos-one.appspot.com",
  messagingSenderId: "331401141584",
  appId: "1:331401141584:web:cf7211ea4fdb64b0c9a055",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const rt = getDatabase(app);
const st = getStorage(app);

export { db, st, rt };
