import { AlgoritmoActionTypes, BuscaAlgoritmos, GET_ALGORITMO_POR_ID_REQUESTED, GET_ALGORITMO_POR_ID_SUCCEEDED, GET_ALGORITMO_POR_ID_FAILED } from './types';
import { GET_ALGORITMOS_REQUESTED, GET_ALGORITMOS_SUCCEEDED, GET_ALGORITMOS_FAILED, CHANGE_PAGE_ALGORITMOS, CHANGE_ORDENACAO_ALGORITMOS, CHANGE_DIRECAO_ORDENACAO_ALGORITMOS, CHANGE_BUSCA_ALGORITMOS, CLEAN_ALGORITMOS_ERROS } from './types';
import { ListagemAlgoritmo } from "../../models/algoritmos";
import { PagedList } from '../../models/pagedList';

export const requisitarAlgoritmos = (params: BuscaAlgoritmos): AlgoritmoActionTypes => {
    return {
        type: GET_ALGORITMOS_REQUESTED,
        payload: params
    }
}

export const confirmarAlgoritmosRecebidos = (listaAlgoritmos: PagedList<ListagemAlgoritmo>): AlgoritmoActionTypes => {
    return {
        type: GET_ALGORITMOS_SUCCEEDED,
        payload: listaAlgoritmos
    }
}

export const informarFalhaAlgoritmosRecebidos = (erros: string[]): AlgoritmoActionTypes => {
    return {
        type: GET_ALGORITMOS_FAILED,
        payload: erros
    }
}

export const requisitarAlgoritmoPorId = (idAlgoritmo: string): AlgoritmoActionTypes => {
    return {
        type: GET_ALGORITMO_POR_ID_REQUESTED,
        payload: idAlgoritmo
    }
}

export const confirmarAlgoritmoPorIdRecebido = (algoritmo: ListagemAlgoritmo): AlgoritmoActionTypes => {
    return {
        type: GET_ALGORITMO_POR_ID_SUCCEEDED,
        payload: algoritmo
    }
}

export const informarFalhaAlgoritmoPorIdRecebido = (erros: string[]): AlgoritmoActionTypes => {
    return {
        type: GET_ALGORITMO_POR_ID_FAILED,
        payload: erros
    }
}

export const alterarPagina = (indice: number): AlgoritmoActionTypes => {
    return {
        type: CHANGE_PAGE_ALGORITMOS,
        payload: indice
    }
}

export const alterarOrdenacao = (coluna: 1 | 2): AlgoritmoActionTypes => {
    return {
        type: CHANGE_ORDENACAO_ALGORITMOS,
        payload: coluna
    }
}

export const alterarDirecaoOrdenacao = (ordenacao: "asc" | "desc"): AlgoritmoActionTypes => {
    return {
        type: CHANGE_DIRECAO_ORDENACAO_ALGORITMOS,
        payload: ordenacao
    }
}

export const alterarBusca = (busca: string): AlgoritmoActionTypes => {
    return {
        type: CHANGE_BUSCA_ALGORITMOS,
        payload: busca
    }
}

export const limparErros = (): AlgoritmoActionTypes => {
    return {
        type: CLEAN_ALGORITMOS_ERROS
    }
}