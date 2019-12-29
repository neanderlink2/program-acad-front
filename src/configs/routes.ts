import React from 'react';
import HomeScreen from '../pages/home'
import { LoginScreen } from '../pages/login';
import { CounterScreen } from '../pages/counter';

type RouteModel = {
    path: string,
    component: React.ReactNode,
    title: string
}

export const routes: RouteModel[] = [
    {
        path: '/',
        component: HomeScreen,
        title: 'Bem-vindo à Program.Acad'
    },
    {
        path: '/login',
        component: LoginScreen,
        title: 'Entre em sua conta'
    }, {
        path: '/counter',
        component: CounterScreen,
        title: 'Tela de testes com o redux'
    }
];