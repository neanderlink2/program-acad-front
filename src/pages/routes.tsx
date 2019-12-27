import React from 'react';
import { Route, Link } from 'react-router-dom'
import Home from './home';
import { CounterScreen as Counter } from './counter';
import { useContagemState } from '../modules/counter/hooks';

export const Routes = () => {
    const { contagem } = useContagemState();
    return (
        <div>
            <header>
                <span>Vai? {contagem}</span>
                <Link to="/">Home</Link>
                <Link to="/counter">Contador</Link>
            </header>

            <main>
                <Route exact path="/" component={Home} />
                <Route path="/counter" component={Counter} />
            </main>
        </div>
    )
}
