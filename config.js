import * as firebase from 'firebase';
require('@firebase/firestore')

var firebaseConfig = {
    apiKey: "AIzaSyACJ9cLRQqL1YGsZ2PZ3UJa6nLsDS8bXyQ",
    authDomain: "booksanta-e0007.firebaseapp.com",
    projectId: "booksanta-e0007",
    storageBucket: "booksanta-e0007.appspot.com",
    messagingSenderId: "176328717950",
    appId: "1:176328717950:web:a107a28bf0d0c77f40ca2f"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();