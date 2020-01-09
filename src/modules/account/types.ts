export const CREATE_USER_REQUESTED = 'account/CreateUserRequested';
export const CREATE_USER_SUCCEEDED = 'account/CreateUserSucceeded';
export const CREATE_USER_FAILED = 'account/CreateUserFailed';

export interface CreateUserAction {
    type: typeof CREATE_USER_REQUESTED,
    payload: string
}

interface SucceedUserCreationAction {
    type: typeof CREATE_USER_SUCCEEDED
}

interface InfoUserCreationFailedAction {
    type: typeof CREATE_USER_FAILED,
    payload: string[]
}

export type AccountState = {
    adicionarUsuarioExternoPending: boolean,
    erros?: string[]
}

export type AccountActionTypes = CreateUserAction | SucceedUserCreationAction | InfoUserCreationFailedAction;