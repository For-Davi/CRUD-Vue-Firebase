import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_FIREBASE_APP_ID,
//   measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
// }
const firebaseConfig = {
  apiKey: 'AIzaSyAJ-AVO98oa83u7wbMxtRdfmxaUBg6k590',
  authDomain: 'operandbr-6c4b8.firebaseapp.com',
  projectId: 'operandbr-6c4b8',
  storageBucket: 'operandbr-6c4b8.appspot.com',
  messagingSenderId: '536174325688',
  appId: '1:536174325688:web:bc290ec7b0df18061ba94d',
  measurementId: 'G-C4YB44XNMB'
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)
const analytics = getAnalytics(app)

export { auth, db }
