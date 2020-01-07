import React from 'react';
import { ButtonProps } from '@material-ui/core'
import { WhiteButton } from '../styles';
import logoGoogle from '../../../assets/google-signin-logo.svg';

const Button = ({ onClick, variant = "contained" }: ButtonProps) => {
    return (
        <WhiteButton variant={variant} onClick={onClick} startIcon={<img src={logoGoogle} alt="Logo GOOGLE" />} >Google</WhiteButton>
    );
}

export const GoogleButton = Button;