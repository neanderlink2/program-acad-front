import 'firebase/auth';
import firebase from 'firebase/app';

export const firebaseConfig = {
    apiKey: "AIzaSyDUlqW3Y4a0Gaz2TNgYQrEmS5PT6-4qLNY",
    authDomain: "program-acad.firebaseapp.com",
    databaseURL: "https://program-acad.firebaseio.com",
    projectId: "program-acad",
    storageBucket: "program-acad.appspot.com",
    messagingSenderId: "275006240028",
    appId: "1:275006240028:web:2cd6b7bc6e10c7276036d9",
    measurementId: "G-ZQ33KPF8CM"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const firebaseAppAuth = firebaseApp.auth();
export const providers = {
    googleProvider: new firebase.auth.GoogleAuthProvider(),
    githubProvider: new firebase.auth.GithubAuthProvider(),
    facebookProvider: new firebase.auth.FacebookAuthProvider()
};

export const firebaseErrorCodes = {
    NOT_FOUND: "auth/user-not-found",
    WRONG_PASSWORD: "auth/wrong-password",
    INVALID_EMAIL: "auth/invalid-email",
    ACCOUNT_EXISTING: "auth/account-exists-with-different-credential",
    POPUP_CLOSED: "auth/popup-closed-by-user"
};