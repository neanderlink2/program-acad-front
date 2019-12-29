import React, { Fragment } from 'react';
import { withAuth } from '../../components/firebase-wrapper';
import { WrappedComponentProps } from 'react-with-firebase-auth';
import { Typography, Container } from '@material-ui/core';


const HomeScreen = ({ user, signInWithGoogle }: WrappedComponentProps) => {
    return (
        <Container>
            { /* user ? user.displayName : null}
            <button onClick={() => signInWithGoogle()}>Google</button>*/ }
            <Typography>Tela inicial</Typography>
        </Container>
    );
}

export default withAuth(HomeScreen);