import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC5bDFzqfeMqbXDjDiErpbRy6i6E-415Bc",
  authDomain: "twitter-clone-4561b.firebaseapp.com",
  projectId: "twitter-clone-4561b",
  storageBucket: "twitter-clone-4561b.appspot.com",
  messagingSenderId: "326046460264",
  appId: "1:326046460264:web:d2b9be2ec836fb82608edd",
};

export default firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;

export const authService = firebase.auth();

export const dbService = firebase.firestore();

export const storageService = firebase.storage();
