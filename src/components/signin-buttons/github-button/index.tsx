import React from 'react';
import { GitHub as GitHubIcon } from '@material-ui/icons';
import { BlackButton } from '../styles';
import { ButtonProps } from '@material-ui/core'

const Button = ({ onClick, variant = "contained" }: ButtonProps) => {
    return (
        <BlackButton variant={variant} onClick={onClick} startIcon={<GitHubIcon />} >GitHub</BlackButton>
    );
}

export const GitHubButton = Button;