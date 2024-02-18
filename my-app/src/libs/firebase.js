import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyA8xHqtBJSXSmJSbiDWMRUg6astAGqG4DA",
  authDomain: "note-easy-fire-base.firebaseapp.com",
  projectId: "note-easy-fire-base",
  storageBucket: "note-easy-fire-base.appspot.com",
  messagingSenderId: "848045565229",
  appId: "1:848045565229:web:911b6533481cc799165fa4",
};


const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth();
export const firestore = getFirestore(app); 

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
