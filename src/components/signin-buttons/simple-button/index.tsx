import React from 'react';
import { Button, ButtonProps } from '@material-ui/core';
import { ExitToApp as ExitToAppIcon } from '@material-ui/icons';

const LoginButton = ({ onClick, variant = "contained" }: ButtonProps) => {
    return (
        <Button variant={variant} onClick={onClick} startIcon={<ExitToAppIcon />} color="secondary">Entrar</Button>
    );
}

export const SimpleButton = LoginButton;