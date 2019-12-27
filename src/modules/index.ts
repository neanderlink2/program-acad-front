import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { counterReducer } from './counter/reducer';

export const rootReducer = (history: any) => combineReducers({
    router: connectRouter(history),
    counter: counterReducer
});