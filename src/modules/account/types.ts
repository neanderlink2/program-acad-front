export const CREATE_EXTERNAL_USER_REQUESTED = 'account/CreateExternalUserRequested';
export const CREATE_EXTERNAL_USER_SUCCEEDED = 'account/CreateExternalUserSucceeded';
export const CREATE_EXTERNAL_USER_FAILED = 'account/CreateExternalUserFailed';
export const CREATE_INTERNAL_USER_REQUESTED = 'account/CreateInternalUserRequested';
export const CREATE_INTERNAL_USER_SUCCEEDED = 'account/CreateInternalUserSucceeded';
export const CREATE_INTERNAL_USER_FAILED = 'account/CreateInternalUserFailed';
export const CLEAN_ERRORS = 'account/CleanErrors';

export type CreateInternalUser = {
    nomeCompleto: string,
    email: string,
    nickname: string,
    senha: string
}

export interface CreateExternalUserAction {
    type: typeof CREATE_EXTERNAL_USER_REQUESTED,
    payload: string
}

interface SucceedExternalUserCreationAction {
    type: typeof CREATE_EXTERNAL_USER_SUCCEEDED
}

interface InfoExternalUserCreationFailedAction {
    type: typeof CREATE_EXTERNAL_USER_FAILED,
    payload: string[]
}

export interface CreateInternalUserAction {
    type: typeof CREATE_INTERNAL_USER_REQUESTED,
    payload: CreateInternalUser
}

interface SucceedInternalUserCreationAction {
    type: typeof CREATE_INTERNAL_USER_SUCCEEDED
}

interface InfoInternalUserCreationFailedAction {
    type: typeof CREATE_INTERNAL_USER_FAILED,
    payload: string[]
}

interface CleanErrorsAction {
    type: typeof CLEAN_ERRORS
}

export type AccountState = {
    adicionarUsuarioExternoPending: boolean,
    adicionarUsuarioInternoPending: boolean,
    erros?: string[]
}

export type AccountActionTypes = CreateExternalUserAction | SucceedExternalUserCreationAction | InfoExternalUserCreationFailedAction |
    CreateInternalUserAction | SucceedInternalUserCreationAction | InfoInternalUserCreationFailedAction | CleanErrorsAction;