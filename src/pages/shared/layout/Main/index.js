import React, { Props, useEffect } from 'react';
import { Route } from 'react-router-dom'
import { routes } from '../../../../configs/routes';
import { withAuth } from '../../../../components/firebase-wrapper';
import { LoginRequiredScreen } from '../../../login-required';
import { useUserData } from '../../../../components/hooks';

const Main = ({ user }) => {
    return (
        <main>
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

export default withAuth(Main);