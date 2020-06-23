import { UserToken } from "../../models/user";

export const STORE_USER = 'login/StoreUser';
export const REMOVE_USER = 'login/RemoveUser';


interface StoreUserAction {
    type: typeof STORE_USER,
    payload: UserToken
}

interface RemoveUserAction {
    type: typeof REMOVE_USER
}

export type LoginState = {
    user?: UserToken,
    isLogado: boolean;
    carregando: boolean;
}

export type LoginActionTypes = StoreUserAction | RemoveUserAction;