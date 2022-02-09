import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCnGhT7J_Oj6rCMVcm1LD0NqYyyCTI0tMI",
  authDomain: "a-to-z-base.firebaseapp.com",
  projectId: "a-to-z-base",
  storageBucket: "a-to-z-base.appspot.com",
  messagingSenderId: "854422431517",
  appId: "1:854422431517:web:c96b125dc27934674de3f4",
  measurementId: "G-F32Z1R7T0E",
};
// Initialize Firebase
let app;
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();
const UPLOAD_STATE_CHANGED = firebase.storage.TaskEvent.STATE_CHANGED;

export { auth, db, storage, UPLOAD_STATE_CHANGED };
