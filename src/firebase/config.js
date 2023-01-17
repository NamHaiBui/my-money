import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyAxzlhcHPDgB5h630BvRr55TDej--l2z5E",
    authDomain: "money-management-eaffc.firebaseapp.com",
    projectId: "money-management-eaffc",
    storageBucket: "money-management-eaffc.appspot.com",
    messagingSenderId: "944960050754",
    appId: "1:944960050754:web:b540b984d5aa8da018bfdb",
}
//init firebase
initializeApp(firebaseConfig)

//init firestore
const DB = getFirestore()
//init Auth
const auth = getAuth()
//Time Stamp
export { DB, auth }
