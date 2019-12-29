import React from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { ThemeProvider, CssBaseline } from '@material-ui/core';

import store, { history } from '../configs/store';
import { Layout } from './shared/layout';
import programAcadTheme from '../configs/theme';


const App = ({ children }: { children: React.ReactNode }) => {
    return (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <ThemeProvider theme={programAcadTheme}>
                    <CssBaseline />
                    <Layout />
                </ThemeProvider>
            </ConnectedRouter>
        </Provider>
    );
}

export default App;