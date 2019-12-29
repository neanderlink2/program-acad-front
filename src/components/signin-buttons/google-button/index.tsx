import React from 'react';
import { WhiteButton } from '../styles';
import logoGoogle from '../../../assets/google-signin-logo.svg';

export const GoogleButton = ({ variant = "contained", ...props }: { variant?: "contained" | "outlined" | "text" }) => {
    return (
        <WhiteButton {...props} variant={variant} startIcon={<img src={logoGoogle} alt="Logo GOOGLE" />}>Google</WhiteButton>
    );
}