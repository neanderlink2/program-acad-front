import React from 'react';
import { Button } from '@material-ui/core';
import { ExitToApp as ExitToAppIcon } from '@material-ui/icons';

export const SimpleButton = ({ variant = "contained", ...props }: { variant?: "contained" | "outlined" | "text" }) => {
    return (
        <Button {...props} variant={variant} startIcon={<ExitToAppIcon />} color="secondary">Entrar</Button>
    );
}