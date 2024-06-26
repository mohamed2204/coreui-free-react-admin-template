/* eslint-disable prettier/prettier */
import {getAuth}  from 'firebase/auth';
import {initializeApp} from 'firebase/app';
/* eslint-disable prettier/prettier */
const firebaseConfig = {
  apiKey: 'AIzaSyAc8jjqGInX6fwil6eJmaCfOkIiWv-wHEY',
  authDomain: 'authproject-1ffcb.firebaseapp.com',
  projectId: 'authproject-1ffcb',
  storageBucket: 'authproject-1ffcb.appspot.com',
  messagingSenderId: '937535547533',
  appId: '1:937535547533:web:f35e67a5c1a1c9e98a9ac4',
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREABSE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
}

const app = initializeApp(firebaseConfig)

const auth = getAuth(app)

export default auth
