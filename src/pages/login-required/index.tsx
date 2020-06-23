import { Button, Card, CardContent, Container, Typography } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDocumentTitle, useUserLogin } from '../../components/hooks';
import { LoadingScreen } from '../../components/loading';

export const LoginRequiredScreen = ({ title }: { title: string }) => {
    useDocumentTitle(title);
    const history = useHistory();
    const { isPrimeiroAcesso } = useUserLogin();

    if (isPrimeiroAcesso === null) {
        return (<LoadingScreen style={{ margin: 25 }} />);
    }

    return (
        <Container>
            <Card>
                <CardContent>
                    <Typography variant="h5" align="center">Ops, tivemos um problema.</Typography>
                    <Typography variant="body2">Parece que você está tentando acessar uma página protegida, mas ainda não está autenticado. Deseja entrar em uma conta?</Typography>
                    <Button variant="contained" color="secondary" onClick={() => {
                        history.push('/login');
                    }}>Sim, entrar na conta</Button>
                    <Button variant="text" onClick={() => {
                        history.push('/');
                    }}>Não, voltar ao início</Button>
                </CardContent>
            </Card>
        </Container>
    )
}