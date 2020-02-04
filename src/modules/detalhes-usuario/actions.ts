import { DetalhesUsuarioActionTypes, GET_HISTORICO_ALGORITMOS_REQUESTED, GET_HISTORICO_ALGORITMOS_SUCCEEDED, GET_HISTORICO_ALGORITMOS_FAILED } from './types';
import { HistoricoAlgoritmoUsuario } from '../../models/user';

export const requisitarHistoricoAlgoritmos = (): DetalhesUsuarioActionTypes => {
    return {
        type: GET_HISTORICO_ALGORITMOS_REQUESTED
    }
}

export const receberHistoricoAlgoritmos = (historico: HistoricoAlgoritmoUsuario[]): DetalhesUsuarioActionTypes => {
    return {
        type: GET_HISTORICO_ALGORITMOS_SUCCEEDED,
        payload: historico
    }
}


export const informarErrosHistoricoAlgoritmos = (erros: string[]): DetalhesUsuarioActionTypes => {
    return {
        type: GET_HISTORICO_ALGORITMOS_FAILED,
        payload: erros
    }
}