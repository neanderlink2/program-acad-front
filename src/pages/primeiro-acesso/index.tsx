import { Button, Card, CardContent, CircularProgress, Container, TextField, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { FlexEnd } from '../../components/flex-helpers';
import { useDocumentTitle, useSnackbars, useUserLogin } from '../../components/hooks/index';
import { LoadingScreen } from '../../components/loading/index';
import { useAccountState } from '../../modules/account/hooks';

const PrimeiroAcessoScreen = ({ title }: { title: string }) => {
    const { isPrimeiroAcesso, user } = useUserLogin();
    const [nickname, setNickname] = useState('');
    const { warning } = useSnackbars();
    const { adicionandoUsuarioExterno, cleanErrors, erros, criarUsuarioExterno } = useAccountState(nickname);
    useDocumentTitle(title);
    useEffect(() => {
        if (erros && erros.length > 0) {
            for (let erro of erros) {
                warning(erro);
            }
            cleanErrors();
        }
    }, [erros, warning, cleanErrors]);

    if (isPrimeiroAcesso === null) {
        return (<LoadingScreen />);
    } else if (!isPrimeiroAcesso) {
        return (<Redirect to="/turmas" />);
    } else {
        return (
            <Container>
                <Card style={{ margin: 15 }}>
                    <CardContent>
                        <Typography variant="h5">Comece a usar a Program.Acad</Typography>
                        <Typography variant="body2">
                            Olá <b>{user ? user.displayName : ''}</b>, seja bem-vindo à Program.Acad!
                            </Typography>
                        <Typography variant="body2">
                            Antes de continuar, precisamos que você crie um apelido (nickname) para a plataforma.
                            Este nickname será visto por outros usuários e será sua identificação na plataforma, pois <b>todos os nickname são únicos</b>.
                        </Typography>
                        <TextField fullWidth
                            autoFocus
                            variant="outlined"
                            margin="normal"
                            label="Seu nickname"
                            color="secondary"
                            value={nickname}
                            onChange={({ target }) => setNickname(target.value)} />
                        <FlexEnd>
                            <Button variant="contained" color="secondary" disabled={adicionandoUsuarioExterno} onClick={() => {
                                if (criarUsuarioExterno) {
                                    criarUsuarioExterno()
                                }
                            }}>
                                {adicionandoUsuarioExterno && <CircularProgress color="inherit" size={24} style={{ marginRight: 15 }} />}
                                Salvar meu apelido
                            </Button>
                        </FlexEnd>
                    </CardContent>
                </Card>
            </Container>
        );
    }


};

export default PrimeiroAcessoScreen;