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
  setDoc,
  doc,
  getDoc,
  onSnapshot
} from 'firebase/firestore';



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
export const db = getFirestore(app);



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

export async function signUp(email, password, payload) {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    setUser(res.user.uid, {email, ...payload});
  }
  catch (err) {
    
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
export function setUser(id, payload) {
  try {
    setDoc(doc(db, 'users', id), payload);
  }
  catch (err) {

  }
};

async function getUserDoc(id) {
  try {
    const docRef = doc(db, 'users', id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) return docSnap.data();
    return null;
  }
  catch (err) {

  }
};

export function getUser(id, callback=()=>{}) {
  try {
    onSnapshot(doc(db, 'users', id), doc => {
      if (doc.exists()) callback(doc.data());
      else callback(null);
    });
  }
  catch (err) {
    callback(null);
  }
};

export async function setVideo(id, payload) {
  try {
    const res = await setDoc(doc(db, 'videos', id), payload);
    return res;
  }
  catch (err) {
    return {error: err.message};
  }
};

export async function getVideoDoc(id) {
  try {
    const docRef = doc(db, 'videos', id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) return docSnap.data();
    return null;
  }
  catch (err) {

  }
};

export function getVideo(id, callback=()=>{}) {
  try {
    onSnapshot(doc(db, 'videos', id), doc => {
      if (doc.exists()) callback(doc.data());
      else callback(null);
    });
  }
  catch (err) {
    callback(null);
  }
};

export async function likeVideo(userId, videoId, isLiked) {
  try {
    // update the user
    const prevUserData = await getUserDoc(userId);
    let newUserData = {};

    if (isLiked) {
      newUserData = {
        ...prevUserData,
        likedVideos: [...prevUserData.likedVideos, videoId]
      };
    }
    else {
      newUserData = {
        ...prevUserData,
        likedVideos: prevUserData.likedVideos.filter(likedVideo => likedVideo !== videoId)
      };
    }

    setUser(userId, newUserData);

    // update the video
    const prevVideoData = await getVideoDoc(videoId);
    let newVideoData = {};

    if (!prevVideoData) {
      newVideoData = {
        likes: 1,
        dislikes: 0,
        comments: []
      };
    }
    else {
      newVideoData = {
        ...prevVideoData,
        likes: prevVideoData.likes += (isLiked ? 1 : -1)
      }
    }

    setVideo(videoId, newVideoData);
  }
  catch (err) {

  }
};

export async function dislikeVideo(userId, videoId, isDisliked) {
  try {
    // update the user
    const prevUserData = await getUserDoc(userId);
    let newUserData = {};

    if (isDisliked) {
      newUserData = {
        ...prevUserData,
        dislikedVideos: [...prevUserData.dislikedVideos, videoId]
      };
    }
    else {
      newUserData = {
        ...prevUserData,
        dislikedVideos: prevUserData.dislikedVideos.filter(dislikedVideo => dislikedVideo !== videoId)
      };
    }

    setUser(userId, newUserData);

    // update the video
    const prevVideoData = await getVideoDoc(videoId);
    let newVideoData = {};

    if (!prevVideoData) {
      newVideoData = {
        likes: 0,
        dislikes: 1,
        comments: []
      };
    }
    else {
      newVideoData = {
        ...prevVideoData,
        dislikes: prevVideoData.dislikes += (isDisliked ? 1 : -1)
      }
    }

    setVideo(videoId, newVideoData);
  }
  catch (err) {

  }
};
// FIRESTORE ----->
