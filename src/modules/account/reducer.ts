import { AccountState, CREATE_EXTERNAL_USER_REQUESTED, AccountActionTypes, CREATE_EXTERNAL_USER_SUCCEEDED, CREATE_EXTERNAL_USER_FAILED, CREATE_INTERNAL_USER_REQUESTED, CREATE_INTERNAL_USER_SUCCEEDED, CREATE_INTERNAL_USER_FAILED, CLEAN_ERRORS } from './types';

const initialState: AccountState = {
    adicionarUsuarioExternoPending: false,
    adicionarUsuarioInternoPending: false,
    erros: []
};

export const accountReducer = (state = initialState, action: AccountActionTypes): AccountState => {
    switch (action.type) {
        case CREATE_EXTERNAL_USER_REQUESTED:
            return {
                ...state,
                adicionarUsuarioExternoPending: true
            };
        case CREATE_EXTERNAL_USER_SUCCEEDED:
            return {
                ...state,
                adicionarUsuarioExternoPending: false
            };
        case CREATE_EXTERNAL_USER_FAILED:
            return {
                ...state,
                adicionarUsuarioExternoPending: false,
                erros: action.payload
            };
        case CREATE_INTERNAL_USER_REQUESTED:
            return {
                ...state,
                adicionarUsuarioInternoPending: true
            };
        case CREATE_INTERNAL_USER_SUCCEEDED:
            return {
                ...state,
                adicionarUsuarioInternoPending: false
            };
        case CREATE_INTERNAL_USER_FAILED:
            return {
                ...state,
                adicionarUsuarioInternoPending: false,
                erros: action.payload
            };
        case CLEAN_ERRORS:
            return {
                ...state,
                erros: []
            }
        default:
            return state;
    }
}