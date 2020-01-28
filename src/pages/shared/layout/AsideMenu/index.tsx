import React, { useEffect, useState } from 'react';
import { SwipeableDrawer, List, ListItem, ListItemIcon, ListItemText, Divider, Button } from '@material-ui/core';
import { ArrowBack, Person, Assignment } from '@material-ui/icons';
import { useAsideMenu } from '../../../../modules/aside-menu/hooks';
import { TopAsideMenu } from './styles';
import { signOut } from '../../../../configs/firebaseConfig'
import { useHistory } from 'react-router-dom';
import { useUserData } from '../../../../components/hooks/index';

export const AsideMenu = () => {
    const { userClaims } = useUserData();
    const history = useHistory();
    const { showingAsideMenu, showMenu, hideMenu } = useAsideMenu();
    const [userName, setUserName] = useState('');
    const [userNickname, setUserNickname] = useState('');

    useEffect(() => {
        if (userClaims) {
            setUserName(userClaims.name);
            setUserNickname(userClaims.nickname);
        }
    }, [userClaims]);

    console.log(userClaims);
    const imageStyle = userClaims && userClaims.picture ? { backgroundImage: `url(${userClaims.picture}) ` } : { backgroundColor: '#d2d2d2' };
    return (
        <SwipeableDrawer
            open={showingAsideMenu}
            onClose={hideMenu}
            onOpen={showMenu}
        >
            <TopAsideMenu style={{ ...imageStyle }}>
                <h3>{userName}</h3>
                <span>{userNickname}</span>
                {
                    !userClaims &&
                    <div style={{ display: 'flex', flex: 1, flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                        <Button color="primary" onClick={() => {
                            history.push("/login");
                            hideMenu();

                        }}>Entrar</Button>
                        <Button variant="contained" color="secondary" onClick={() => {
                            history.push("/cadastro");
                            hideMenu();
                        }}>Começar agora</Button>
                    </div>
                }
            </TopAsideMenu>
            <Divider />
            {
                userClaims ?
                    <>
                        <section style={{ flex: 1 }}>
                            <List>
                                <ListItem disabled>Minhas informações</ListItem>
                                <ListItem button>
                                    <ListItemIcon><Person /></ListItemIcon>
                                    <ListItemText primary="Conta" />
                                </ListItem>
                                <ListItem button>
                                    <ListItemIcon><Assignment /></ListItemIcon>
                                    <ListItemText primary="Turmas inscritas" />
                                </ListItem>
                            </List>
                        </section>
                        <Divider />
                        <List>
                            <ListItem button onClick={() => {
                                signOut();
                                hideMenu();
                                history.push("/");
                            }}>
                                <ListItemIcon><ArrowBack /></ListItemIcon>
                                <ListItemText primary="Sair" />
                            </ListItem>
                        </List>
                    </>
                    :
                    <List>
                        <ListItem disabled>Menu</ListItem>
                        <ListItem button onClick={() => {
                            hideMenu();
                            history.push("/");
                        }}>
                            <ListItemIcon><Person /></ListItemIcon>
                            <ListItemText primary="Home" />
                        </ListItem>
                    </List>
            }

        </SwipeableDrawer>
    )
}