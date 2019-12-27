import { CounterActionTypes, INCREMENT, DECREMENT } from './types';

export function increment(): CounterActionTypes {
    return {
        type: INCREMENT
    }
}

export function decrement(): CounterActionTypes {
    return {
        type: DECREMENT
    }
}