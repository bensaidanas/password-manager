import { initializeApp } from '@firebase/app';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBBopNndoXXi873XYzXMYxSwa91alxwQT4",
    authDomain: "password-manager-b162f.firebaseapp.com",
    projectId: "password-manager-b162f",
    storageBucket: "password-manager-b162f.appspot.com",
    messagingSenderId: "152086942591",
    appId: "1:152086942591:web:1595c5fbba7cc9cbe0c04a",
    measurementId: "G-1XNBZK8SXT"
};

  // Initialize Firebase
const app = initializeApp(firebaseConfig);

export const environment = {
    production: false
}