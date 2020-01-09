import React from 'react';
import HomeScreen from '../pages/home'
import LoginScreen from '../pages/login';
import { CounterScreen } from '../pages/counter';
import TurmaScreen from '../pages/turmas/index';
import PrimeiroAcessoScreen from '../pages/primeiro-acesso';
import { CadastroScreen } from '../pages/cadastro/index';

type RouteModel = {
    path: string,
    component: React.ReactNode,
    title: string,
    onlyAuthenticated: boolean
}

export const routes: RouteModel[] = [
    {
        path: '/',
        component: HomeScreen,
        title: 'Bem-vindo à Program.Acad',
        onlyAuthenticated: false
    },
    {
        path: '/login',
        component: LoginScreen,
        title: 'Entre em sua conta',
        onlyAuthenticated: false
    },
    {
        path: '/cadastro',
        component: CadastroScreen,
        title: 'Comece agora mesmo! - Program.Acad',
        onlyAuthenticated: false
    },
    {
        path: '/counter',
        component: CounterScreen,
        title: 'Tela de testes com o redux',
        onlyAuthenticated: false
    },
    {
        path: '/primeiro-acesso',
        component: PrimeiroAcessoScreen,
        title: 'Primeiro Acesso - Program.Acad',
        onlyAuthenticated: true
    },
    {
        path: '/turmas',
        component: TurmaScreen,
        title: 'Turmas inscritas - Program.Acad',
        onlyAuthenticated: true
    }
];