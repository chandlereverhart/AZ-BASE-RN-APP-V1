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

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
