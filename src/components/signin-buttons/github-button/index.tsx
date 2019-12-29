import React from 'react';
import { GitHub as GitHubIcon } from '@material-ui/icons';
import { BlackButton } from '../styles';

export const GitHubButton = ({ variant = "contained", ...props }: { variant?: "contained" | "outlined" | "text" }) => {
    return (
        <BlackButton {...props} variant={variant} startIcon={<GitHubIcon />}>GitHub</BlackButton>
    );
}