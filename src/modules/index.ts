import { combineReducers } from 'redux'
import { all } from 'redux-saga/effects';

import { connectRouter } from 'connected-react-router'
import { counterReducer } from './counter/reducer';
import { loginReducer } from './login/reducer';
import { accountReducer } from './account/reducer';

import { accountSaga } from './account/sagas';

export const rootReducer = (history: any) => combineReducers({
    router: connectRouter(history),
    counter: counterReducer,
    login: loginReducer,
    account: accountReducer
});

export const rootSaga = function* () {
    return yield all([accountSaga]);
}