import { combineReducers } from 'redux'
import { all } from 'redux-saga/effects';

import { connectRouter } from 'connected-react-router'
import { loginReducer } from './login/reducer';
import { accountReducer } from './account/reducer';
import { turmaReducer } from './turmas/reducer';
import { algoritmoReducer } from './algoritmos/reducer';

import { accountSaga } from './account/sagas';
import { turmaSaga } from './turmas/sagas';
import { algoritmoSaga } from './algoritmos/sagas';

export const rootReducer = (history: any) => combineReducers({
    router: connectRouter(history),
    login: loginReducer,
    account: accountReducer,
    turma: turmaReducer,
    algoritmo: algoritmoReducer
});

export const rootSaga = function* () {
    return yield all([accountSaga, turmaSaga, algoritmoSaga]);
}