import { LoginActionTypes, LoginState, REMOVE_USER, STORE_USER } from './types';

const initialState: LoginState = {
    user: undefined,
    isLogado: false,
    carregando: true
};

export const loginReducer = (state = initialState, action: LoginActionTypes) => {
    switch (action.type) {
        case STORE_USER:
            return {
                user: action.payload,
                isLogado: true,
                carregando: false
            };
        case REMOVE_USER:
            return {
                isLogado: false,
                carregando: false
            };
        default:
            return state;
    }
}