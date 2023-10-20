import { initializeApp } from 'firebase/app'
import { Auth, getAuth } from 'firebase/auth'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import { Database, getDatabase } from 'firebase/database'
import firebaseConfig from './firebase-config'

const app = initializeApp(firebaseConfig)

const auth: Auth = getAuth(app)
const rtdb: Database = getDatabase(app)

export { auth, rtdb }
