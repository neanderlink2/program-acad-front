import React, { useEffect, useState } from 'react';
import { Container, Card, CardContent, CircularProgress, Typography, TextField, Button } from '@material-ui/core';
import { useUserData, useSnackbars } from '../../components/hooks/index';
import { Redirect } from 'react-router-dom';
import { FlexEnd } from '../../components/flex-helpers';
import { LoadingScreen } from '../../components/loading/index';
import { useAccountState } from '../../modules/account/hooks';

const PrimeiroAcessoScreen = () => {
    const { isPrimeiroAcesso, user } = useUserData();
    const [nickname, setNickname] = useState('');
    const { warning } = useSnackbars();
    const { adicionandoUsuarioExterno, cleanErrors, erros, criarUsuarioExterno } = useAccountState(nickname);

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