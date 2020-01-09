import { all, call, put, takeLatest } from 'redux-saga/effects';
import { CREATE_EXTERNAL_USER_REQUESTED, CreateExternalUserAction, CREATE_INTERNAL_USER_REQUESTED, CreateInternalUserAction } from './types';
import { postRequest, formatErrors } from '../../api/index';
import { confirmarUsuarioExternoCriado, informarErrosUsuarioCriado, informarErrosUsuarioInternoCriado, confirmarUsuarioInternoCriado } from './actions';
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

export function* criarUsuarioExterno({ payload }: CreateExternalUserAction) {
    try {
        const body = { nickname: payload };
        yield call(postRequest, `/v1/account`, body);
        yield put(confirmarUsuarioExternoCriado());
        history.push("/turmas");
    } catch (error) {
        yield put(informarErrosUsuarioCriado(formatErrors(error)));
    }
}

export function* criarUsuarioInterno({ payload }: CreateInternalUserAction) {
    try {
        yield call(postRequest, `/v1/account`, payload);
        yield put(confirmarUsuarioInternoCriado());
        history.push("/login");
    } catch (error) {
        yield put(informarErrosUsuarioInternoCriado(formatErrors(error)));
    }
}

export const accountSaga = all([
    takeLatest(CREATE_EXTERNAL_USER_REQUESTED, criarUsuarioExterno),
    takeLatest(CREATE_INTERNAL_USER_REQUESTED, criarUsuarioInterno)
]);