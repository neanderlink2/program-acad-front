import React from 'react';
import { Facebook as FacebookIcon } from '@material-ui/icons';
import { RoyalBlueButton } from '../styles';

export const FacebookButton = ({ variant = "contained", ...props }: { variant?: "contained" | "outlined" | "text" }) => {
    return (
        <RoyalBlueButton {...props} variant={variant} startIcon={<FacebookIcon />}>Facebook</RoyalBlueButton>
    );
}