import React, { Fragment } from 'react';
import { Typography, Divider, Container } from '@material-ui/core';
import { SpacedBox, Logo, Credits } from './styles';

import logoIFB from '../../../../assets/logo_ifb.png';

export const Footer = () => {
    return (
        <SpacedBox component="footer">
            <Logo src={logoIFB} />
            <Credits>Program.Acad - {new Date().getFullYear()}</Credits>
        </SpacedBox>
    )
}