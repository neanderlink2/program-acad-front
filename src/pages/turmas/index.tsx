import React, { useEffect, useState } from 'react';
import { Container } from '@material-ui/core';
import { useUserData } from '../../components/hooks/index';
import { Redirect } from 'react-router-dom';
import { LoadingScreen } from '../../components/loading/index';

const TurmaScreen = () => {
    const { userClaims, isPrimeiroAcesso } = useUserData();
    const [userNickname, setNickname] = useState('');

    useEffect(() => {
        if (userClaims) {
            setNickname(userClaims.nickname);
        }
    }, [userClaims]);

    if (isPrimeiroAcesso === null) {
        return (<LoadingScreen style={{ margin: 15 }} />);
    } else if (isPrimeiroAcesso) {
        return <Redirect to="/primeiro-acesso" />
    }

    return (
        <Container>
            <span>Olá {userNickname}</span>
        </Container>
    );
};


export default TurmaScreen;