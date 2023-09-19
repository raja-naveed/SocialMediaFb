// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAUw3jPYvcLF8mp2s5jFD9IADiwCu3yUhw",
    authDomain: "socialmediaclone-917b2.firebaseapp.com",
    projectId: "socialmediaclone-917b2",
    storageBucket: "socialmediaclone-917b2.appspot.com",
    messagingSenderId: "435913252922",
    appId: "1:435913252922:web:597c9744256bfcd8875503"
  };
  
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export default app;
export { db, storage };