import { CREATE_EXTERNAL_USER_REQUESTED, AccountActionTypes, CREATE_EXTERNAL_USER_SUCCEEDED, CREATE_EXTERNAL_USER_FAILED, CreateInternalUser, CREATE_INTERNAL_USER_REQUESTED, CREATE_INTERNAL_USER_SUCCEEDED, CREATE_INTERNAL_USER_FAILED, CLEAN_ERRORS } from './types';

export const requisitarCriarUsuarioExterno = (nickname: string): AccountActionTypes => {
    return {
        type: CREATE_EXTERNAL_USER_REQUESTED,
        payload: nickname
    }
}

export const confirmarUsuarioExternoCriado = (): AccountActionTypes => {
    return {
        type: CREATE_EXTERNAL_USER_SUCCEEDED
    }
}

export const informarErrosUsuarioCriado = (erros: string[]): AccountActionTypes => {
    return {
        type: CREATE_EXTERNAL_USER_FAILED,
        payload: erros
    }
}

export const requisitarCriarUsuarioInterno = (usuario: CreateInternalUser): AccountActionTypes => {
    return {
        type: CREATE_INTERNAL_USER_REQUESTED,
        payload: usuario
    }
}

export const confirmarUsuarioInternoCriado = (): AccountActionTypes => {
    return {
        type: CREATE_INTERNAL_USER_SUCCEEDED
    }
}

export const informarErrosUsuarioInternoCriado = (erros: string[]): AccountActionTypes => {
    return {
        type: CREATE_INTERNAL_USER_FAILED,
        payload: erros
    }
}

export const limparErros = (): AccountActionTypes => {
    return {
        type: CLEAN_ERRORS
    }
}