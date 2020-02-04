import 'firebase/auth';
import firebase from 'firebase/app';
import store from './middlewares';
import { storeUser, removeUser } from '../modules/login/actions';

const firebaseConfig = {
    apiKey: "AIzaSyDUlqW3Y4a0Gaz2TNgYQrEmS5PT6-4qLNY",
    authDomain: "program-acad.firebaseapp.com",
    databaseURL: "https://program-acad.firebaseio.com",
    projectId: "program-acad",
    storageBucket: "program-acad.appspot.com",
    messagingSenderId: "275006240028",
    appId: "1:275006240028:web:2cd6b7bc6e10c7276036d9",
    measurementId: "G-ZQ33KPF8CM"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseApp.auth();
const authenticationProviders = {
    googleProvider: new firebase.auth.GoogleAuthProvider(),
    githubProvider: new firebase.auth.GithubAuthProvider(),
    facebookProvider: new firebase.auth.FacebookAuthProvider()
};

firebaseAppAuth.onAuthStateChanged(
    (user) => {
        if (user) {
            user.getIdTokenResult()
                .then(result => {
                    console.log(result.claims);
                    store.dispatch(storeUser({ user: user, token: result.token }))
                })
        }
    },
    (error: firebase.auth.Error) => {
        // console.log(error);
    }
);

export const firebaseErrorCodes = {
    NOT_FOUND: "auth/user-not-found",
    WRONG_PASSWORD: "auth/wrong-password",
    INVALID_EMAIL: "auth/invalid-email",
    ACCOUNT_EXISTING: "auth/account-exists-with-different-credential",
    POPUP_CLOSED: "auth/popup-closed-by-user"
};

export const signInWithFacebook = () => {
    return firebaseAppAuth.signInWithPopup(authenticationProviders.facebookProvider);
}

export const signInWithGoogle = () => {
    return firebaseAppAuth.signInWithPopup(authenticationProviders.googleProvider);
}

export const signInWithGithub = () => {
    return firebaseAppAuth.signInWithPopup(authenticationProviders.githubProvider);
}

export const signInWithSimple = (email: string, password: string) => {
    return firebaseAppAuth.signInWithEmailAndPassword(email, password);
}

export const signOut = () => {
    store.dispatch(removeUser());
    return firebaseAppAuth.signOut();
}

export const sendPasswordReset = (email: string) => {
    return firebaseAppAuth.sendPasswordResetEmail(email);
}