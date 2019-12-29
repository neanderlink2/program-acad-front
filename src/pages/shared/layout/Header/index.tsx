import React from 'react';
import { AppBar, Toolbar, IconButton } from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import { BotaoTopo, TituloTopo } from './styles';

export const Header = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <TituloTopo variant="h6">Program.Acad</TituloTopo>
                <BotaoTopo>Entrar</BotaoTopo>
                <BotaoTopo variant="contained" color="secondary">Começar agora</BotaoTopo>
            </Toolbar>
        </AppBar>
    )
}