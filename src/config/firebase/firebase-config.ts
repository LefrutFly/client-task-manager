const apiKey = import.meta.env.VITE_FIREBASE_API_KEY
const authDomain = import.meta.env.VITE_FIREBASE_AUTH
const projectId = import.meta.env.VITE_FIREBASE_AUTH
const storageBucket = import.meta.env.VITE_FIREBASE_AUTH
const messagingSenderId = import.meta.env.VITE_FIREBASE_AUTH
const appId = import.meta.env.VITE_FIREBASE_AUTH
const databaseURL = import.meta.env.VITE_FIREBASE_RTDB

const firebaseConfig = {
	apiKey: apiKey,
	authDomain: authDomain,
	projectId: projectId,
	storageBucket: storageBucket,
	messagingSenderId: messagingSenderId,
	appId: appId,
	databaseURL: databaseURL,
}

export default firebaseConfig
