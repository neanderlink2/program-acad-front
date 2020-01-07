import React, { Fragment, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Menu, MenuItem } from '@material-ui/core';
import { Menu as MenuIcon, AccountCircle } from '@material-ui/icons';
import { BotaoTopo, TituloTopo } from './styles';
import { withAuth } from '../../../../components/firebase-wrapper';
import { WrappedComponentProps } from 'react-with-firebase-auth';
import { bindTrigger, bindMenu, usePopupState } from 'material-ui-popup-state/hooks';
import { useHistory } from 'react-router-dom';
import { useUserData } from '../../../../components/hooks/index';

interface HeaderProps extends WrappedComponentProps {
    signOut: () => Promise<void | Error> | void;
};

const Header = ({ user, signOut }: HeaderProps) => {
    const history = useHistory();
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <TituloTopo variant="h6" onClick={() => history.push('/')}>Program.Acad</TituloTopo>
                {
                    user ?
                        <AuthenticatedMenu userName={user.displayName} signOut={() => signOut() as Promise<void | Error>} />
                        :
                        <NonAuthenticatedMenu />
                }
            </Toolbar>
        </AppBar>
    )
}

const AuthenticatedMenu = ({ userName, signOut }: { userName: string | null, signOut: () => Promise<void | Error> }) => {
    const popupState = usePopupState({ variant: 'popover', popupId: 'user-menu' });
    const history = useHistory();

    function deslogar() {
        signOut()
            .then(() => {
                popupState.close();
                history.push("/");
            });
    }

    return (
        <Fragment>
            <BotaoTopo variant="text" startIcon={<AccountCircle />} {...bindTrigger(popupState)}>{userName}</BotaoTopo>
            <Menu {...bindMenu(popupState)}>
                <MenuItem onClick={popupState.close}>Minha conta</MenuItem>
                <MenuItem onClick={() => {
                    popupState.close();
                    history.push("/turmas");
                }}>Turmas inscritas</MenuItem>
                <MenuItem onClick={deslogar}>Sair</MenuItem>
            </Menu>
        </Fragment >
    )
}

const NonAuthenticatedMenu = () => {
    const history = useHistory();
    return (
        <Fragment>
            <BotaoTopo onClick={() => history.push("/login")}>Entrar</BotaoTopo>
            <BotaoTopo variant="contained" color="secondary">Começar agora</BotaoTopo>
        </Fragment>
    )
}

export default withAuth(Header);