import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCWinxAMRL8IUTtHDddK_TVYwmkXE4MwJ8",
  authDomain: "crwn-db-775bd.firebaseapp.com",
  projectId: "crwn-db-775bd",
  storageBucket: "crwn-db-775bd.appspot.com",
  messagingSenderId: "347107361860",
  appId: "1:347107361860:web:1084589e9a489f988e2811",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
