import React from 'react';
import { Route } from 'react-router-dom'
import { routes } from '../../../../configs/routes';
import { LoginRequiredScreen } from '../../../login-required';
import { useUserData } from '../../../../components/hooks';

const Main = () => {
    const { user } = useUserData();
    return (
        <main style={{ marginTop: 50 }}>
            {routes.map((route) => {
                if (!route.onlyAuthenticated || (route.onlyAuthenticated && user)) {
                    return (
                        <Route key={route.path} exact path={route.path} render={(props) => <route.component {...props} title={route.title} />} />
                    );
                }
                return (<Route key={route.path} exact path={route.path} component={LoginRequiredScreen} />);
            })}
        </main>
    )
}

export default Main;