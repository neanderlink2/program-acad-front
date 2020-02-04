import { HistoricoAlgoritmoUsuario } from '../../models/user';
export const GET_HISTORICO_ALGORITMOS_REQUESTED = '@detalhesUsuario/GET_HISTORICO_ALGORITMOS_REQUESTED';
export const GET_HISTORICO_ALGORITMOS_SUCCEEDED = '@detalhesUsuario/GET_HISTORICO_ALGORITMOS_SUCCEEDED';
export const GET_HISTORICO_ALGORITMOS_FAILED = '@detalhesUsuario/GET_HISTORICO_ALGORITMOS_FAILED';

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

type RequestsState = {
    getHistorico: {
        isRequesting: boolean,
        hasFinished: boolean,
        errorPayload: string[]
    }
}

export type DetalhesUsuarioState = {
    requests: RequestsState,
    historicoUsuario?: HistoricoAlgoritmoUsuario[]
}

export type DetalhesUsuarioActionTypes = GetHistoricoAlgoritmosRequestAction | GetHistoricoAlgoritmosSucceededAction | GetHistoricoAlgoritmosFailedAction;