import React, { Props } from 'react';
import { Route } from 'react-router-dom'
import Home from '../../../home';
import { CounterScreen as Counter } from '../../../counter';
import { HomeScreenProps } from '../../../home';
import { LoginScreen } from '../../../login';
import { routes } from '../../../../configs/routes';

export const Main = () => {
    return (
        <main>
            {routes.map((route) => (
                <Route key={route.path} exact path={route.path} render={(props) => <route.component {...props} title={route.title} />} />
            ))}
        </main>
    )
}