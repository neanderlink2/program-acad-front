import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@material-ui/core';
import { useUserData } from '../../components/hooks/index';

export const AlgoritmosScreen = () => {
    const { user } = useUserData();
    const [userName, setUserName] = useState('');
    const pontos = 0;
    useEffect(() => {
        if (user && user.displayName) {
            setUserName(user.displayName);
        }
    }, [user]);

    return (
        <Container>
            <Typography variant="h5" style={{ marginTop: 15 }}>{userName}, você possui {pontos} pontos nesta turma.</Typography>
        </Container>
    )
}