import firebase from 'firebase/app';
import 'firebase/storage';  

const firebaseConfig = {
  apiKey: "AIzaSyAEjN1kfzJUvl1p-eRAZ1JdJNn_DNYrwb8",
  authDomain: "ptit-learn-app.firebaseapp.com",
  projectId: "ptit-learn-app",
  storageBucket: "ptit-learn-app.appspot.com",
  messagingSenderId: "149937631687",
  appId: "1:149937631687:web:0731f3a14ec85b7d10e9e2",
  measurementId: "G-Y98P92YX8W"
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export default storage;
