// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyCLiqN_P4l_HJ5aHvGC9WCM9yML-_kgpDI',
    authDomain: 'netflix-f7184.firebaseapp.com',
    projectId: 'netflix-f7184',
    storageBucket: 'netflix-f7184.firebasestorage.app',
    messagingSenderId: '437980722320',
    appId: '1:437980722320:web:c3461b641962d42b6e9415',
    measurementId: 'G-L9CQF37LTG',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)

export const auth = getAuth()
