import { all, call, put, takeLatest } from 'redux-saga/effects';
import { CREATE_USER_REQUESTED, CreateUserAction } from './types';
import { postRequest, formatErrors } from '../../api/index';
import { confirmarUsuarioExternoCriado, informarErrosUsuarioCriado } from './actions';
import { history } from '../../configs/middlewares';

// type UsuarioCriado = {
//     id: string,
//     nomeCompleto: string,
//     email: string,
//     nickname: string,
//     sexo?: string,
//     cep?: string,
//     cpf?: string,
//     dataNascimento?: Date
// }

export function* criarUsuarioExterno({ payload }: CreateUserAction) {
    try {
        const body = { nickname: payload };
        yield call(postRequest, `/v1/account`, body);
        yield put(confirmarUsuarioExternoCriado());
        history.push("/turmas");
    } catch (error) {
        yield put(informarErrosUsuarioCriado(formatErrors(error)));
    }
}

export const accountSaga = all([
    takeLatest(CREATE_USER_REQUESTED, criarUsuarioExterno),
]);