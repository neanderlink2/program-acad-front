import { DetalhesUsuarioActionTypes, GET_HISTORICO_ALGORITMOS_REQUESTED, GET_HISTORICO_ALGORITMOS_SUCCEEDED, GET_HISTORICO_ALGORITMOS_FAILED, UpdateDadosPayload, UPDATE_DADOS_REQUESTED, UPDATE_DADOS_SUCCEEDED, UPDATE_DADOS_FAILED } from './types';
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

export const requisitarAtualizacaoDados = (dados: UpdateDadosPayload): DetalhesUsuarioActionTypes => {
    return {
        type: UPDATE_DADOS_REQUESTED,
        payload: dados
    }
}

export const receberSucessoAtualizacao = (): DetalhesUsuarioActionTypes => {
    return {
        type: UPDATE_DADOS_SUCCEEDED
    }
}


export const informarErrosAtualizacao = (erros: string[]): DetalhesUsuarioActionTypes => {
    return {
        type: UPDATE_DADOS_FAILED,
        payload: erros
    }
}