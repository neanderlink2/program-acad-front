import { CREATE_USER_REQUESTED, AccountActionTypes, CREATE_USER_SUCCEEDED, CREATE_USER_FAILED } from './types';

export const requisitarCriarUsuarioExterno = (nickname: string): AccountActionTypes => {
    return {
        type: CREATE_USER_REQUESTED,
        payload: nickname
    }
}

export const confirmarUsuarioExternoCriado = (): AccountActionTypes => {
    return {
        type: CREATE_USER_SUCCEEDED
    }
}

export const informarErrosUsuarioCriado = (erros: string[]): AccountActionTypes => {
    return {
        type: CREATE_USER_FAILED,
        payload: erros
    }
}