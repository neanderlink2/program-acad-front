import { ListagemAlgoritmo } from "../../models/algoritmos";
import { PagedList } from '../../models/pagedList';

export const GET_ALGORITMOS_REQUESTED = 'algoritmos/GetAlgoritmosRequested';
export const GET_ALGORITMOS_SUCCEEDED = 'algoritmos/GetAlgoritmosSucceeded';
export const GET_ALGORITMOS_FAILED = 'algoritmos/GetAlgoritmosFailed';

export const GET_ALGORITMO_POR_ID_REQUESTED = 'algoritmos/GetAlgoritmoPorIdRequested';
export const GET_ALGORITMO_POR_ID_SUCCEEDED = 'algoritmos/GetAlgoritmoPorIdSucceeded';
export const GET_ALGORITMO_POR_ID_FAILED = 'algoritmos/GetAlgoritmoPorIdFailed';

export const CHANGE_ORDENACAO_ALGORITMOS = 'algoritmos/ChangeOrdenacao';
export const CHANGE_DIRECAO_ORDENACAO_ALGORITMOS = 'algoritmos/ChangeDirecaoOrdenacao';
export const CHANGE_BUSCA_ALGORITMOS = 'algoritmos/ChangeBusca';
export const CHANGE_PAGE_ALGORITMOS = 'algoritmos/ChangePage';
export const CLEAN_ALGORITMOS_ERROS = 'algoritmos/CleanErros';

export const CHANGE_ALGORITMOS = 'algoritmos/CleanErros';

type LinguagensVisualizacao = {
    javaScript: boolean,
    cSharp: boolean,
    java: boolean,
    python: boolean
};

//Ordem 1: Nome
//Ordem 2: DataCriacao
export type BuscaAlgoritmos = {
    idTurma: string,
    busca?: string,
    linguagensVisualizacao: LinguagensVisualizacao,
    pageIndex?: number,
    totalItems?: number,
    colunaOrdenacao?: 1 | 2,
    direcaoOrdenacao?: "asc" | "desc"
};

export interface GetAlgoritmosRequestedAction {
    type: typeof GET_ALGORITMOS_REQUESTED,
    payload: BuscaAlgoritmos
}

interface GetAlgoritmosSucceededAction {
    type: typeof GET_ALGORITMOS_SUCCEEDED,
    payload: PagedList<ListagemAlgoritmo>
}

interface GetAlgoritmosFailedAction {
    type: typeof GET_ALGORITMOS_FAILED,
    payload: string[]
}

export interface GetAlgoritmoPorIdRequestedAction {
    type: typeof GET_ALGORITMO_POR_ID_REQUESTED,
    payload: string
}

interface GetAlgoritmoPorIdSucceededAction {
    type: typeof GET_ALGORITMO_POR_ID_SUCCEEDED,
    payload: ListagemAlgoritmo
}

interface GetAlgoritmoPorIdFailedAction {
    type: typeof GET_ALGORITMO_POR_ID_FAILED,
    payload: string[]
}

interface ChangeOrdenacaoAlgoritmoAction {
    type: typeof CHANGE_ORDENACAO_ALGORITMOS,
    payload: 1 | 2
}

interface ChangeDirecaoOrdenacaoAlgoritmoAction {
    type: typeof CHANGE_DIRECAO_ORDENACAO_ALGORITMOS,
    payload: "asc" | "desc"
}

interface ChangeBuscaAlgoritmoAction {
    type: typeof CHANGE_BUSCA_ALGORITMOS,
    payload: string
}

interface ChangePageAlgoritmoAction {
    type: typeof CHANGE_PAGE_ALGORITMOS,
    payload: number
}

interface CleanErrosAlgoritmoAction {
    type: typeof CLEAN_ALGORITMOS_ERROS
}

export type AlgoritmoState = {
    pedingRequest: any,
    algoritmoPorId?: ListagemAlgoritmo,
    listaAlgoritmos?: PagedList<ListagemAlgoritmo>,
    search?: string,
    pageNum?: number,
    colunaOrdenacao?: 1 | 2,
    direcaoOrdenacao?: "asc" | "desc",
    erros: string[]
}

export type AlgoritmoActionTypes = GetAlgoritmosRequestedAction | GetAlgoritmosSucceededAction | GetAlgoritmosFailedAction | ChangeOrdenacaoAlgoritmoAction |
    ChangeDirecaoOrdenacaoAlgoritmoAction | ChangeBuscaAlgoritmoAction | ChangePageAlgoritmoAction | CleanErrosAlgoritmoAction | GetAlgoritmoPorIdRequestedAction |
    GetAlgoritmoPorIdSucceededAction | GetAlgoritmoPorIdFailedAction;