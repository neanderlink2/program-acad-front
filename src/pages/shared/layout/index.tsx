import React, { Fragment } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, Container } from '@material-ui/core'
import { Menu as MenuIcon } from '@material-ui/icons';
import { TituloTopo } from './Header/styles';
import { Header } from './Header';
import { Main } from './Main';
import { Footer } from './Footer';

export const Layout = () => {
    return (
        <Fragment>
            <Header />
            <Main />
            <Footer />
        </Fragment>
    );
}