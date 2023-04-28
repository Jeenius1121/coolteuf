import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore'

export const firebaseConfig = {
  apiKey: "AIzaSyAHC-A4aBu8FOMk2U-fT6Y8caItruRTecA",
  authDomain: "coolteuf.firebaseapp.com",
  projectId: "coolteuf",
  storageBucket: "coolteuf.appspot.com",
  messagingSenderId: "598723584536",
  appId: "1:598723584536:web:69985b2dd28d580854d96d",
  measurementId: "G-7VQVT0XWC2"
  };

  if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }