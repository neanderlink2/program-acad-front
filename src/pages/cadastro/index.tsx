import React, { useState, useEffect } from 'react';
import { Typography, Container, TextField, CardContent, Card, Grid, Button, CircularProgress } from '@material-ui/core';
import { PasswordField } from '../../components/password-field/index';
import { FlexEnd } from '../../components/flex-helpers';
import { ExitToApp as AddIcon } from '@material-ui/icons';
import { useAccountState } from '../../modules/account/hooks';
import { useSnackbars, useDocumentTitle } from '../../components/hooks/index';
import { useUserLoginFailed, useUserLoginSuccess } from '../login/hooks';
import { signInWithFacebook, signInWithGoogle, signInWithGithub } from '../../configs/firebaseConfig';
import { FlexLine } from '../../components/flex-helpers/index';
import { GoogleButton } from '../../components/signin-buttons/google-button/index';
import { FacebookButton } from '../../components/signin-buttons/facebook-button/index';
import { GitHubButton } from '../../components/signin-buttons/github-button/index';

export const CadastroScreen = ({ title }: { title: string }) => {
    const [nomeCompleto, setNomeCompleto] = useState('');
    const [email, setEmail] = useState('');
    const [nickname, setNickname] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmSenha, setConfirmSenha] = useState('');

    const [errorCode, setErrorCode] = useState(undefined);
    const [loginResult, setLoginResult] = useState(undefined);

    useDocumentTitle(title);
    const { warning } = useSnackbars();
    const { adicionandoUsuarioInterno, cleanErrors, erros, criarUsuarioInterno } = useAccountState(undefined, {
        email,
        nomeCompleto,
        nickname,
        senha
    });
    useUserLoginFailed(errorCode, () => {
        setErrorCode(undefined)
    });
    useUserLoginSuccess(loginResult);

    useEffect(() => {
        if (erros && erros.length > 0) {
            for (let erro of erros) {
                warning(erro);
            }
            cleanErrors();
        }
    }, [erros, warning, cleanErrors]);

    function salvarUsuario() {
        if (senha !== confirmSenha) {
            warning('As senhas digitadas não estão iguais, por favor corrija o erro e tente novamente.');
            return;
        }

        if (criarUsuarioInterno) {
            criarUsuarioInterno();
        }
    }

    function loginFacebook() {
        signInWithFacebook()
            .then((response: any) => {
                setLoginResult(response.user);
            })
            .catch((e: any) => {
                setErrorCode(e.code);
            });
    }

    function loginGoogle() {
        signInWithGoogle()
            .then((response: any) => {
                setLoginResult(response.user);
            })
            .catch((e: any) => {
                setErrorCode(e.code);
            });
    }

    function loginGithub() {
        signInWithGithub()
            .then((response: any) => {
                setLoginResult(response.user);
            })
            .catch((e: any) => {
                setErrorCode(e.code);
            });
    }

    return (
        <Container>
            <Card style={{ margin: 15 }}>
                <CardContent>
                    <Typography variant="h5" align="center">Você está prestes a entrar para a Program.Acad</Typography>

                    <Typography variant="body2">Comece utilizando suas redes sociais:</Typography>
                    <FlexLine>
                        <GoogleButton onClick={loginGoogle} />
                        <FacebookButton onClick={loginFacebook} />
                        <GitHubButton onClick={loginGithub} />
                    </FlexLine>

                    <Typography variant="body2">Ou crie uma conta, mas precisaremos de alguns dados...</Typography>
                    <Grid container>
                        <Grid item xs={12} style={{ padding: 5 }}>
                            <TextField fullWidth
                                autoFocus
                                autoComplete="new-password"
                                variant="outlined"
                                margin="normal"
                                label="Nome completo"
                                color="secondary"
                                value={nomeCompleto}
                                onChange={({ target }) => setNomeCompleto(target.value)} />
                        </Grid>
                        <Grid item xs={12} sm={6} style={{ padding: 5 }}>
                            <TextField fullWidth
                                autoComplete="new-password"
                                type="email"
                                variant="outlined"
                                margin="normal"
                                label="E-mail"
                                color="secondary"
                                value={email}
                                onChange={({ target }) => setEmail(target.value)} />
                        </Grid>
                        <Grid item xs={12} sm={6} style={{ padding: 5 }}>
                            <TextField fullWidth
                                autoComplete="new-password"
                                variant="outlined"
                                margin="normal"
                                label="Nickname"
                                color="secondary"
                                value={nickname}
                                onChange={({ target }) => setNickname(target.value)} />
                        </Grid>
                        <Grid item xs={12} sm={6} style={{ padding: 5 }}>
                            <PasswordField fullWidth
                                autoComplete="new-password"
                                showVisibility={false}
                                margin="normal"
                                variant="outlined"
                                label="Senha"
                                color="secondary"
                                value={senha}
                                onChange={({ target }) => setSenha(target.value)} />
                        </Grid>
                        <Grid item xs={12} sm={6} style={{ padding: 5 }}>
                            <PasswordField fullWidth
                                showVisibility={false}
                                autoComplete="new-password"
                                margin="normal"
                                variant="outlined"
                                label="Repita sua senha"
                                color="secondary"
                                value={confirmSenha}
                                onChange={({ target }) => setConfirmSenha(target.value)} />
                        </Grid>
                    </Grid>
                    <FlexEnd style={{ padding: 5 }}>
                        <Button variant="contained" color="secondary" disabled={adicionandoUsuarioInterno} startIcon={<AddIcon />} onClick={salvarUsuario}>
                            {adicionandoUsuarioInterno && <CircularProgress color="inherit" size={24} style={{ marginRight: 15 }} />}
                            Criar minha conta
                        </Button>
                    </FlexEnd>
                </CardContent>
            </Card>
        </Container>
    )
}