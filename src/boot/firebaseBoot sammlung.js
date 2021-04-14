import firebase from 'firebase'
import 'firebase/firestore'

import { firestorePlugin } from 'vuefire'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCnmWK9Jll-lPm4IHGIskmzTmCR_llvHGU',
  authDomain: 'gpsycho-test.firebaseapp.com',
  projectId: 'gpsycho-test',
  storageBucket: 'gpsycho-test.appspot.com',
  messagingSenderId: '423238993023',
  appId: '1:423238993023:web:27fd754a54ba1d8dfa2b4a'
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig).firestore()

export const db = firebase.firestore()

const timestamp = firebase.firestore.FieldValue.serverTimestamp
export { timestamp }

Vue.use(firestorePlugin)
