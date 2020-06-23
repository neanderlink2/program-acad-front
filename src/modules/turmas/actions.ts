import { PagedList } from '../../models/pagedList';
import { FailedCallback, SuccessCallback } from '../../models/requestCallbacks';
import { ListagemTurma } from '../../models/turma';
import {
    BuscaTurmas,






    CHANGE_BUSCA, CHANGE_DIRECAO_ORDENACAO, CHANGE_ORDENACAO, CHANGE_PAGE,




    CHANGE_TURMA_SELECIONADA, CLEAN_TURMA_ERROS, GET_TURMAS_FAILED, GET_TURMAS_REQUESTED,
    GET_TURMAS_SUCCEEDED,









    SOLICITAR_ACESSO_FAILED, SOLICITAR_ACESSO_REQUESTED,
    SOLICITAR_ACESSO_SUCCEEDED, TurmaActionTypes
} from './types';

export const requisitarTurmas = (params: BuscaTurmas): TurmaActionTypes => {
    return {
        type: GET_TURMAS_REQUESTED,
        payload: params
    }
}

export const confirmarTurmasRecebidas = (lista: PagedList<ListagemTurma>): TurmaActionTypes => {
    return {
        type: GET_TURMAS_SUCCEEDED,
        payload: lista
    }
}

export const informarFalhaTurmasRecebidas = (erros: string[]): TurmaActionTypes => {
    return {
        type: GET_TURMAS_FAILED,
        payload: erros
    }
}

export const alterarPagina = (indice: number): TurmaActionTypes => {
    return {
        type: CHANGE_PAGE,
        payload: indice
    }
}

export const alterarOrdenacao = (coluna: 1 | 2): TurmaActionTypes => {
    return {
        type: CHANGE_ORDENACAO,
        payload: coluna
    }
}

export const alterarDirecaoOrdenacao = (ordenacao: "asc" | "desc"): TurmaActionTypes => {
    return {
        type: CHANGE_DIRECAO_ORDENACAO,
        payload: ordenacao
    }
}

export const alterarBusca = (busca: string): TurmaActionTypes => {
    return {
        type: CHANGE_BUSCA,
        payload: busca
    }
}

export const limparErros = (): TurmaActionTypes => {
    return {
        type: CLEAN_TURMA_ERROS
    }
}

export const requisitarSolicitacaoAcesso = (idTurma: string, onSuccess: SuccessCallback, onFailed: FailedCallback): TurmaActionTypes => {
    return {
        type: SOLICITAR_ACESSO_REQUESTED,
        payload: {idTurma, onSuccess, onFailed}
    }
}

export const confirmarSolicitacaoAcesso = (mensagemSucesso: string): TurmaActionTypes => {
    return {
        type: SOLICITAR_ACESSO_SUCCEEDED,
        payload: mensagemSucesso
    }
}

export const informarFalhasSolicitacaoAcesso = (erros: string[]): TurmaActionTypes => {
    return {
        type: SOLICITAR_ACESSO_FAILED,
        payload: erros
    }
}

export const selecionarTurma = (idTurma: string) => {
    return {
        type: CHANGE_TURMA_SELECIONADA,
        payload: idTurma
    }
}