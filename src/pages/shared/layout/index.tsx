import React, { Fragment } from 'react';
import Header from './Header';
import Main from './Main';
import { Footer } from './Footer';

export const Layout = () => {
    return (
        <Fragment>
            <Header />
            <Main />
            <Footer />
        </Fragment>
    );
}