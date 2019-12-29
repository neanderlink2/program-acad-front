import React from 'react';
import { Container } from '@material-ui/core';
import { useDocumentTitle } from '../../components/hooks/indes';

export const LoginScreen = ({ title }: { title: string }) => {
    useDocumentTitle(title);
    return (
        <Container>

        </Container>
    )
}