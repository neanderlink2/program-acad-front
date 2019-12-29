import { LoginActionTypes, REMOVE_USER, STORE_USER } from './types';
import { UserToken } from '../../models/user';

export function storeUser(user: UserToken): LoginActionTypes {
    return {
        type: STORE_USER,
        payload: user
    };
}

export function removeUser(): LoginActionTypes {
    return {
        type: REMOVE_USER
    };
}