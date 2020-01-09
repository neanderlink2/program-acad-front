import React, { useState } from 'react';
import { Container, Card, CardContent, Typography, TextField } from '@material-ui/core';
import { useDocumentTitle } from '../../components/hooks';
import { GitHubButton } from '../../components/signin-buttons/github-button';
import { GoogleButton } from '../../components/signin-buttons/google-button';
import { FacebookButton } from '../../components/signin-buttons/facebook-button';
import { PasswordField } from '../../components/password-field';
import { SimpleButton } from '../../components/signin-buttons/simple-button';
import { WrappedComponentProps } from 'react-with-firebase-auth';
import { useFeedbackUserLogin } from './hooks';
import { FlexEnd, FlexLine } from '../../components/flex-helpers/index';
import { signInWithSimple, signInWithFacebook, signInWithGoogle, signInWithGithub } from '../../configs/firebaseConfig';

interface LoginScreenProps extends WrappedComponentProps {
    title?: string,
    signOut: () => Promise<void | Error> | void;
    signInWithGithub: () => Promise<Error | firebase.auth.UserCredential> | void;
    signInWithGoogle: () => Promise<Error | firebase.auth.UserCredential> | void;
    signInWithFacebook: () => Promise<Error | firebase.auth.UserCredential> | void;
    signInWithEmailAndPassword: (email: string, password: string) => Promise<Error | firebase.auth.UserCredential> | void;
}

const LoginScreen = ({ title, user, error }: LoginScreenProps) => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [loginFeedback, setLoginFeedback] = useState(undefined);

    useDocumentTitle(title);
    useFeedbackUserLogin(loginFeedback);

    function loginSenha() {
        signInWithSimple(email, senha)
            .then((response: any) => {
                setLoginFeedback(response);
            });
    }

    function loginFacebook() {
        signInWithFacebook()
            .then((response: any) => {
                setLoginFeedback(response);
            });
    }

    function loginGoogle() {
        signInWithGoogle()
            .then((response: any) => {
                setLoginFeedback(response);
            });
    }

    function loginGithub() {
        signInWithGithub()
            .then((response: any) => {
                setLoginFeedback(response);
            });
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

export default LoginScreen;