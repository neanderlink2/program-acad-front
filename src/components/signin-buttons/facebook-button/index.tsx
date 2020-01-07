import React from 'react';
import { Facebook as FacebookIcon } from '@material-ui/icons';
import { ButtonProps } from '@material-ui/core'
import { RoyalBlueButton } from '../styles';

const Button = ({ onClick, variant = "contained" }: ButtonProps) => {
    return (
        <RoyalBlueButton variant={variant} onClick={onClick} startIcon={<FacebookIcon />} >Facebook</RoyalBlueButton>
    );
}

export const FacebookButton = Button;