import { TurmaActionTypes, GET_TURMAS_REQUESTED, BuscaTurmas, GET_TURMAS_SUCCEEDED, GET_TURMAS_FAILED, CHANGE_PAGE, CHANGE_ORDENACAO, CHANGE_DIRECAO_ORDENACAO, CHANGE_BUSCA, CLEAN_TURMA_ERROS, CHANGE_TURMA_SELECIONADA } from './types';
import { PagedList } from '../../models/pagedList';
import { ListagemTurma } from '../../models/turma';

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

export const alterarOrdenacao = (coluna: 1 | 2) => {
    return {
        type: CHANGE_ORDENACAO,
        payload: coluna
    }
}

export const alterarDirecaoOrdenacao = (ordenacao: "asc" | "desc") => {
    return {
        type: CHANGE_DIRECAO_ORDENACAO,
        payload: ordenacao
    }
}

export const alterarBusca = (busca: string) => {
    return {
        type: CHANGE_BUSCA,
        payload: busca
    }
}

export const limparErros = () => {
    return {
        type: CLEAN_TURMA_ERROS
    }
}

export const selecionarTurma = (idTurma: string) => {
    return {
        type: CHANGE_TURMA_SELECIONADA,
        payload: idTurma
    }
}