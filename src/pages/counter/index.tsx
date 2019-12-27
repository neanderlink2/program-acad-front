import React from 'react';
import { useContagemState } from '../../modules/counter/hooks';

export const CounterScreen = () => {
    const { contagem, incrementar, decrementar } = useContagemState();

    return (
        <div>
            <span>Contagem {contagem}</span>
            <button onClick={(): any => incrementar()}>Aumentar</button>
            <button onClick={(): any => decrementar()}>Diminuir</button>
        </div>
    )
}

