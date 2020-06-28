import { all, call, put, takeLatest } from "redux-saga/effects";
import { formatErrors, postRequest } from "../../api/index";
import { updateUser } from "../../configs/firebaseConfig";
import { history } from "../../configs/middlewares";
import {
    confirmarUsuarioExternoCriado,
    confirmarUsuarioInternoCriado,
    informarErrosUsuarioCriado,
    informarErrosUsuarioInternoCriado
} from "./actions";
import {
    CreateExternalUserAction,
    CreateInternalUserAction,
    CREATE_EXTERNAL_USER_REQUESTED,
    CREATE_INTERNAL_USER_REQUESTED
} from "./types";

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
    yield call(updateUser);
    setTimeout(() => {
      history.push("/turmas");
    }, 1000);
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
  takeLatest(CREATE_INTERNAL_USER_REQUESTED, criarUsuarioInterno),
]);
