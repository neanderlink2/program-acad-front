export const INCREMENT = 'counter/INCREMENT'
export const DECREMENT = 'counter/DECREMENT'


interface IncrementAction {
    type: typeof INCREMENT
}

interface DecrementAction {
    type: typeof DECREMENT
}

export interface CounterState {
    count: number
}

export type CounterActionTypes = IncrementAction | DecrementAction;