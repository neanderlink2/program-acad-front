import { LoginActionTypes, LoginState, STORE_USER, REMOVE_USER } from './types'

const initialState: LoginState = {
    user: undefined,
    isLogado: false
};

export const loginReducer = (state = initialState, action: LoginActionTypes) => {
    switch (action.type) {
        case STORE_USER:
            return {
                user: action.payload,
                isLogado: true
            };
        case REMOVE_USER:
            return {
                isLogado: false
            };
        default:
            return state;
    }
}