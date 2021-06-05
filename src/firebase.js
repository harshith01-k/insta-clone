import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAjKC4iHStZx1MCBj9c_E_Tpb3JZzELx0o",
  authDomain: "instagram-74707.firebaseapp.com",
  projectId: "instagram-74707",
  storageBucket: "instagram-74707.appspot.com",
  messagingSenderId: "864276607286",
  appId: "1:864276607286:web:44866560be366f52b38397",
  measurementId: "G-2LHQHFLPT2",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
