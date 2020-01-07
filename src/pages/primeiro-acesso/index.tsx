import React, { useEffect, useState } from 'react';
import { withAuth } from '../../components/firebase-wrapper';
import { Container, Card, CardContent, CircularProgress, Typography, TextField, Button } from '@material-ui/core';
import { WrappedComponentProps } from 'react-with-firebase-auth';
import { useUserData } from '../../components/hooks/index';
import { Redirect } from 'react-router-dom';
import { FlexEnd } from '../../components/flex-helpers';
import { LoadingScreen } from '../../components/loading/index';

const PrimeiroAcessoScreen = ({ user }: WrappedComponentProps) => {
    const data = useUserData(user);
    const [isPrimeiroAcesso, setIsPrimeiroAcesso] = useState<any>(null);
    const [nickname, setNickname] = useState('');

    useEffect(() => {
        if (data.userClaims != null) {
            setIsPrimeiroAcesso(!Boolean(data.userClaims.nickname));
        }
    }, [data]);

    if (isPrimeiroAcesso === null) {
        return (<LoadingScreen containerProps={{ style: { margin: 25 } }} />);
    } else if (isPrimeiroAcesso === false) {
        return (<Redirect to="/turmas" />)
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
                            <Button variant="contained" color="secondary">Salvar meu apelido</Button>
                        </FlexEnd>
                    </CardContent>
                </Card>
            </Container>
        );
    }


};

export default withAuth(PrimeiroAcessoScreen);