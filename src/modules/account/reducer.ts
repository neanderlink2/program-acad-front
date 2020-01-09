import { AccountState, CREATE_USER_REQUESTED, AccountActionTypes, CREATE_USER_SUCCEEDED, CREATE_USER_FAILED } from './types';

const initialState: AccountState = {
    adicionarUsuarioExternoPending: false,
    erros: []
};

export const accountReducer = (state = initialState, action: AccountActionTypes): AccountState => {
    switch (action.type) {
        case CREATE_USER_REQUESTED:
            return {
                adicionarUsuarioExternoPending: true
            };
        case CREATE_USER_SUCCEEDED:
            return {
                adicionarUsuarioExternoPending: false
            };
        case CREATE_USER_FAILED:
            return {
                adicionarUsuarioExternoPending: false,
                erros: action.payload
            };
        default:
            return state;
    }
}