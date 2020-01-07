import React, { useEffect, useState } from 'react';
import { Container, CircularProgress } from '@material-ui/core';
import { useUserData } from '../../components/hooks/index';
import { withAuth } from '../../components/firebase-wrapper';
import { WrappedComponentProps } from 'react-with-firebase-auth';

const TurmaScreen = ({ user }: WrappedComponentProps) => {
    const data = useUserData(user);
    const [userNickname, setNickname] = useState('');

    useEffect(() => {
        if (data.userClaims) {
            setNickname(data.userClaims.nickname);
        }
    }, [data]);

    if (!data.userClaims) {
        return <CircularProgress color="secondary" />
    }

    return (
        <Container>
            <span>Olá {userNickname}</span>
        </Container>
    );
};


export default withAuth(TurmaScreen);