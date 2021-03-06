import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    
        apiKey: "AIzaSyCtXqYmPr3JYUy_kVrMXvJ_v63wQ3Y7_l0",
        authDomain: "crwn-db-b9a0c.firebaseapp.com",
        projectId: "crwn-db-b9a0c",
        storageBucket: "crwn-db-b9a0c.appspot.com",
        messagingSenderId: "65234663762",
        appId: "1:65234663762:web:cb5eef1c66a91e918d228b",
        measurementId: "G-EZXJPK55R8"
      };

      export const createUserProfileDocument = async (userAuth, additionalData) => {
        if (!userAuth) return;

        const userRef = firestore.doc(`users/${userAuth.uid}`);
        const snapShot = await userRef.get();
        if(!snapShot.exists) {
           const { displayName, email } = userAuth;
           const createdAt = new Date();
           
           try {
              await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
              })
              
           } catch (error) {
            console.log('error creating user', error.message)
           }
        }
        return userRef;
      }

     firebase.initializeApp(config);
     export const auth = firebase.auth();
     export const firestore = firebase.firestore();

     const provider = new firebase.auth.GoogleAuthProvider();
     provider.setCustomParameters({ prompt: 'select_account' });
     export const signInWithGoogle = () => auth.signInWithPopup(provider);

     export default firebase;