import React, { useState, useEffect } from 'react';
import { Container, Card, CardContent, Typography, TextField } from '@material-ui/core';
import { useDocumentTitle } from '../../components/hooks';
import { GitHubButton } from '../../components/signin-buttons/github-button';
import { GoogleButton } from '../../components/signin-buttons/google-button';
import { FacebookButton } from '../../components/signin-buttons/facebook-button';
import { PasswordField } from '../../components/password-field';
import { SimpleButton } from '../../components/signin-buttons/simple-button';
import { WrappedComponentProps } from 'react-with-firebase-auth';
import { withAuth } from '../../components/firebase-wrapper';
import { useFeedbackUserLogin } from './hooks';
import { FlexEnd, FlexLine } from '../../components/flex-helpers/index';

interface LoginScreenProps extends WrappedComponentProps {
    title?: string,
    signOut: () => Promise<void | Error> | void;
    signInWithGithub: () => Promise<Error | firebase.auth.UserCredential> | void;
    signInWithGoogle: () => Promise<Error | firebase.auth.UserCredential> | void;
    signInWithFacebook: () => Promise<Error | firebase.auth.UserCredential> | void;
    signInWithEmailAndPassword: (email: string, password: string) => Promise<Error | firebase.auth.UserCredential> | void;
}

const LoginScreen = ({ title, user, error, signInWithEmailAndPassword, signInWithFacebook, signInWithGoogle, signInWithGithub }: LoginScreenProps) => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [errorCode, setErrorCode] = useState(undefined);

    useDocumentTitle(title);
    useFeedbackUserLogin(errorCode);

    function loginSenha() {
        if (typeof signInWithEmailAndPassword === typeof Promise) {
            (signInWithEmailAndPassword(email, senha) as Promise<Error | firebase.auth.UserCredential>)
                .then((response: any) => {
                    setErrorCode(response);
                });
        }
    }

    function loginFacebook() {
        if (typeof signInWithFacebook === typeof Promise) {
            (signInWithFacebook() as Promise<Error | firebase.auth.UserCredential>)
                .then((response: any) => {
                    setErrorCode(response);
                });
        }
    }

    function loginGoogle() {
        if (typeof signInWithGoogle === typeof Promise) {
            (signInWithGoogle() as Promise<Error | firebase.auth.UserCredential>)
                .then((response: any) => {
                    setErrorCode(response);
                });
        }
    }

    function loginGithub() {
        if (typeof signInWithGithub === typeof Promise) {
            (signInWithGithub() as Promise<Error | firebase.auth.UserCredential>)
                .then((response: any) => {
                    setErrorCode(response);
                });
        }
    }

    return (
        <Container>
            <Card style={{ margin: 15 }}>
                <CardContent>
                    <Typography variant="h5" align="center">Entre na Program.Acad</Typography>
                    <Typography variant="body2">Entre utilizando suas redes sociais:</Typography>
                    <FlexLine>
                        <GoogleButton onClick={loginGoogle} />
                        <FacebookButton onClick={loginFacebook} />
                        <GitHubButton onClick={loginGithub} />
                    </FlexLine>
                    <Typography variant="body2">Ou utilize seu e-mail e senha:</Typography>
                    <TextField fullWidth
                        autoFocus
                        variant="outlined"
                        margin="normal"
                        label="E-mail"
                        color="secondary"
                        value={email}
                        onChange={({ target }) => setEmail(target.value)} />
                    <PasswordField fullWidth
                        margin="normal"
                        variant="outlined"
                        label="Senha"
                        color="secondary"
                        value={senha}
                        onChange={({ target }) => setSenha(target.value)} />
                    <FlexEnd>
                        <SimpleButton onClick={loginSenha} />
                    </FlexEnd>
                </CardContent>
            </Card>
        </Container>
    )
}

export default withAuth(LoginScreen);