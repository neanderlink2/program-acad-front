import React, { Fragment } from 'react';
import { AppBar, Toolbar, IconButton, Menu, MenuItem } from '@material-ui/core';
import { Menu as MenuIcon, AccountCircle, Assignment, People, ExitToApp } from '@material-ui/icons';
import { BotaoTopo, TituloTopo } from './styles';
import { bindTrigger, bindMenu, usePopupState } from 'material-ui-popup-state/hooks';
import { useHistory } from 'react-router-dom';
import { useUserData } from '../../../../components/hooks/index';
import { signOut } from '../../../../configs/firebaseConfig';
import { useWindowWidth } from './hooks';
import { useAsideMenu } from '../../../../modules/aside-menu/hooks';

const Header = () => {
    const history = useHistory();
    const { user } = useUserData();
    const width = useWindowWidth();
    const { showMenu } = useAsideMenu();
    return (
        <AppBar>
            <Toolbar>
                {
                    width <= 650 &&
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={showMenu}>
                        <MenuIcon />
                    </IconButton>
                }
                <TituloTopo variant="h6" onClick={() => history.push('/')}>Program.Acad</TituloTopo>
                {
                    width > 650 ?
                        user ?
                            <AuthenticatedMenu userName={user.displayName} signOut={() => signOut() as Promise<void | Error>} />
                            :
                            <NonAuthenticatedMenu />
                        :
                        null
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
            <BotaoTopo variant="text" startIcon={<People />} onClick={() => history.push("/turmas")}>Turmas</BotaoTopo>
            <BotaoTopo variant="text" startIcon={<AccountCircle />} onClick={() => history.push("/conta")}>{userName}</BotaoTopo>
            <BotaoTopo variant="text" startIcon={<ExitToApp />} onClick={deslogar}>Sair</BotaoTopo>
            {/*<Menu {...bindMenu(popupState)}>
                <MenuItem onClick={() => {
                    popupState.close();
                    history.push("/conta");
                }}>Minha conta</MenuItem>
                <MenuItem onClick={() => {
                    popupState.close();
                    history.push("/turmas");
                }}>Turmas inscritas</MenuItem>
                <MenuItem onClick={deslogar}>Sair</MenuItem>
            </Menu>*/}
        </Fragment>
    )
}

const NonAuthenticatedMenu = () => {
    const history = useHistory();
    return (
        <Fragment>
            <BotaoTopo onClick={() => history.push("/login")}>Entrar</BotaoTopo>
            <BotaoTopo variant="contained" color="secondary" onClick={() => history.push("/cadastro")}>Começar agora</BotaoTopo>
        </Fragment>
    )
}

export default Header;