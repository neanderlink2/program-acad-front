import React from 'react';
import { Route, Link } from 'react-router-dom'
import Home from '../../../home';
import { CounterScreen as Counter } from '../../../counter';
import { useContagemState } from '../../../../modules/counter/hooks';

export const Main = () => {    
    return (
        <main>
            <Route exact path="/" component={Home} />
            <Route path="/counter" component={Counter} />
        </main>
    )
}