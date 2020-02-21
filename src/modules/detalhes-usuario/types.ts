import { HistoricoAlgoritmoUsuario } from '../../models/user';

export const GET_HISTORICO_ALGORITMOS_REQUESTED = '@detalhesUsuario/GET_HISTORICO_ALGORITMOS_REQUESTED';
export const GET_HISTORICO_ALGORITMOS_SUCCEEDED = '@detalhesUsuario/GET_HISTORICO_ALGORITMOS_SUCCEEDED';
export const GET_HISTORICO_ALGORITMOS_FAILED = '@detalhesUsuario/GET_HISTORICO_ALGORITMOS_FAILED';
export const GET_HISTORICO_ALGORITMOS_CLEAN_ERRORS = '@detalhesUsuario/GET_HISTORICO_ALGORITMOS_CLEAN_ERRORS';

export const UPDATE_DADOS_REQUESTED = '@detalhesUsuario/UPDATE_DADOS_REQUESTED';
export const UPDATE_DADOS_SUCCEEDED = '@detalhesUsuario/UPDATE_DADOS_SUCCEEDED';
export const UPDATE_DADOS_FAILED = '@detalhesUsuario/UPDATE_DADOS_FAILED';
export const UPDATE_DADOS_CLEAN_ERRORS = '@detalhesUsuario/UPDATE_DADOS_CLEAN_ERRORS';

export type UpdateDadosPayload = {
    nomeCompleto?: string,
    sexo?: string,
    cep?: string,
    cpf?: string,
    dataNascimento?: Date
}

export interface GetHistoricoAlgoritmosRequestAction {
    type: typeof GET_HISTORICO_ALGORITMOS_REQUESTED,
    payload?: any
}

interface GetHistoricoAlgoritmosSucceededAction {
    type: typeof GET_HISTORICO_ALGORITMOS_SUCCEEDED,
    payload: HistoricoAlgoritmoUsuario[]
}

interface GetHistoricoAlgoritmosFailedAction {
    type: typeof GET_HISTORICO_ALGORITMOS_FAILED,
    payload: string[]
}

interface GetHistoricoAlgoritmosCleanErrorsAction {
    type: typeof GET_HISTORICO_ALGORITMOS_CLEAN_ERRORS,
    payload?: any
}

export interface UpdateDadosRequestAction {
    type: typeof UPDATE_DADOS_REQUESTED,
    payload: UpdateDadosPayload
}

interface UpdateDadosSucceededAction {
    type: typeof UPDATE_DADOS_SUCCEEDED
}

interface UpdateDadosFailedAction {
    type: typeof UPDATE_DADOS_FAILED,
    payload: string[]
}

interface UpdateDadosCleanErrorsAction {
    type: typeof UPDATE_DADOS_CLEAN_ERRORS,
    payload?: any
}

type RequestsState = {
    getHistorico: {
        isRequesting: boolean,
        hasFinished: boolean,
        errorPayload: string[]
    },
    updateDados: {
        isRequesting: boolean,
        hasFinished: boolean,
        errorPayload: string[]
    }
}

export type DetalhesUsuarioState = {
    requests: RequestsState,
    historicoUsuario?: HistoricoAlgoritmoUsuario[]
}

export type DetalhesUsuarioActionTypes = GetHistoricoAlgoritmosRequestAction | GetHistoricoAlgoritmosSucceededAction | GetHistoricoAlgoritmosFailedAction |
    GetHistoricoAlgoritmosCleanErrorsAction | UpdateDadosRequestAction | UpdateDadosSucceededAction | UpdateDadosFailedAction | UpdateDadosCleanErrorsAction;