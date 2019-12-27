import React, { useState } from 'react';
import withFirebaseAuth from 'react-with-firebase-auth'
import { providers, firebaseAppAuth } from '../../configs/firebaseConfig';

export const FirebaseWrapper = withFirebaseAuth({
    providers,
    firebaseAppAuth
})(
    ({ children, user, signOut, signInWithGoogle, signInWithEmailAndPassword, signInWithGithub, signInWithFacebook }) => {
        const [token, setToken] = useState('');
        if (user) {
            user.getIdToken().then((result) => {
                setToken(result);
            });
        }

        return (
            <div>
                <button onClick={signInWithGoogle}>Signin Google</button>
                <button onClick={signInWithGithub}>Signin GitHub</button>
                <button onClick={signInWithFacebook}>Signin Facebook</button>
                <button onClick={() => {
                    signInWithEmailAndPassword("neander.teixeira@estudante.ifb.edu.br", "neander2")
                }}>Signin Default</button>
                <button onClick={signOut}>SignOut</button>
                <br />
                <span>Usuario: {user ? user.displayName : ''}</span>
                <br />
                <span>Token: {token}</span>
                {children}
            </div>
        );
    });