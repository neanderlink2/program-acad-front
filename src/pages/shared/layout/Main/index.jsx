import React from 'react';
import { Route } from 'react-router-dom';
import { useUserLogin } from '../../../../components/hooks';
import { routes } from '../../../../configs/routes';
import { LoginRequiredScreen } from '../../../login-required';

const Main = () => {
    const { user } = useUserLogin();
    return (
        <main style={{ marginTop: 50, paddingTop: 30 }}>
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