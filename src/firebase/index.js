import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  addDoc,
  setDoc
} from 'firebase/firestore/lite';



const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);



// <----- AUTH
export async function isEmailAlreadyExist(email) {
  try {
    const res = await fetchSignInMethodsForEmail(auth, email);
    return res;
  }
  catch (err) {
    let message = err.message;
    if (err.code === 'auth/invalid-email') message = 'Email is invalid';
    return {error: message};
  }
}

export async function signUp(email, password) {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    return res;
  }
  catch (err) {
    let message = err.message;
    return {error: message};
  }
};

export async function signIn(email, password) {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    return res;
  }
  catch (err) {
    let message = err.message;
    if (err.code === 'auth/invalid-login-credentials') message = 'Email or password is invalid';
    return {error: message};
  }
};

export function signOut() {
  firebaseSignOut(auth);
};
// AUTH ----->



// <----- FIRESTORE
export function postUser(payload) {
  try {
    addDoc(collection(db, 'users'), payload);
  }
  catch (err) {
    
  }
};
// FIRESTORE ----->
