import {initializeApp} from "@firebase/app";
import {getFirestore} from "@firebase/firestore";
import {getAnalytics} from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyA2kHFiLISxGw6NMXVnF9nXCq6D1ImwJAE",
    authDomain: "town-hero.firebaseapp.com",
    projectId: "town-hero",
    storageBucket: "town-hero.appspot.com",
    messagingSenderId: "685767935977",
    appId: "1:685767935977:web:46560804c916cd838bed78",
    measurementId: "G-9E5JKZKTMD"
};

const firebase = initializeApp(firebaseConfig);
export const db = getFirestore(firebase);

// const analytics = getAnalytics(firebase);
