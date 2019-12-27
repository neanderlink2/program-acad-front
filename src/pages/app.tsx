
import React, { Fragment } from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import store, { history } from '../configs/store';
import { Routes } from './routes';

const App = ({ children }: { children: React.ReactNode }) => {
    return (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <Fragment>
                    <Routes />
                </Fragment>
            </ConnectedRouter>
        </Provider>
    );
}

export default App;