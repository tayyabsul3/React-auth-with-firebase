import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDKdXctXe9rO8fo29QpyzJP7h4Qbum1jm0",
  authDomain: "react-authentication-397c3.firebaseapp.com",
  projectId: "react-authentication-397c3",
  storageBucket: "react-authentication-397c3.appspot.com",
  messagingSenderId: "120376329514",
  appId: "1:120376329514:web:886c3b52b7198633494a53",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
