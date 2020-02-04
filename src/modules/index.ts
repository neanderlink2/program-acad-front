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
import { ambienteDevReducer } from './ambiente-dev/reducer';
import { ambienteDevSaga } from './ambiente-dev/sagas';
import { asideMenuReducer } from './aside-menu/index';
import { detalhesUsuarioSaga } from './detalhes-usuario/sagas';
import { detalhesUsuarioReducer } from './detalhes-usuario/reducer';

export const rootReducer = (history: any) => combineReducers({
    router: connectRouter(history),
    login: loginReducer,
    account: accountReducer,
    turma: turmaReducer,
    algoritmo: algoritmoReducer,
    ambienteDev: ambienteDevReducer,
    asideMenu: asideMenuReducer,
    detalhesUsuario: detalhesUsuarioReducer
});

export const rootSaga = function* () {
    return yield all([accountSaga, turmaSaga, algoritmoSaga, ambienteDevSaga, detalhesUsuarioSaga]);
}