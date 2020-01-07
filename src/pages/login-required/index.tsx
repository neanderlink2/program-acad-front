import React from 'react';
import { Container, CardContent, Card, Typography, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

export const LoginRequiredScreen = () => {
    const history = useHistory();
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