import React from 'react';
import HomeScreen from '../pages/home'
import LoginScreen from '../pages/login';
import TurmaScreen from '../pages/turmas/index';
import PrimeiroAcessoScreen from '../pages/primeiro-acesso';
import { CadastroScreen } from '../pages/cadastro/index';
import { AlgoritmosScreen } from '../pages/algoritmos';
import { AmbienteDevScreen } from '../pages/ambiente-dev';

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
    },
    {
        path: '/algoritmos/:id',
        component: AlgoritmosScreen,
        title: 'Algoritmos - Program.Acad',
        onlyAuthenticated: true
    },
    {
        path: '/ambiente-dev/:idAlgoritmo/:idTurma',
        component: AmbienteDevScreen,
        title: 'Ambiente de Desenvolvimento',
        onlyAuthenticated: true
    }
];