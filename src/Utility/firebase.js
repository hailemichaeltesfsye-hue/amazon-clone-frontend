import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAFaXo6_VWv9ChPJCwzJXDkD3JJA9TcQ3o',
  authDomain: 'clone-5beb6.firebaseapp.com',
  projectId: 'clone-5beb6',
  storageBucket: 'clone-5beb6.firebasestorage.app',
  messagingSenderId: '420636504991',
  appId: '1:420636504991:web:26d29b212b96a6577803aa'
}

const firebaseApp = initializeApp(firebaseConfig)

export const auth = getAuth(firebaseApp)
export const db = getFirestore(firebaseApp)