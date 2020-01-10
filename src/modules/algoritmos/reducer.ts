import { CLEAN_ALGORITMOS_ERROS, CHANGE_ORDENACAO_ALGORITMOS, CHANGE_DIRECAO_ORDENACAO_ALGORITMOS, CHANGE_BUSCA_ALGORITMOS, CHANGE_PAGE_ALGORITMOS, GET_ALGORITMOS_FAILED, GET_ALGORITMOS_SUCCEEDED, GET_ALGORITMOS_REQUESTED, AlgoritmoActionTypes, AlgoritmoState } from './types';
const initialState: AlgoritmoState = {
    getAlgoritmosPending: false,
    listaAlgoritmos: undefined,
    search: '',
    pageNum: 0,
    colunaOrdenacao: 1,
    direcaoOrdenacao: "asc",
    erros: []
};

export const algoritmoReducer = (state = initialState, action: AlgoritmoActionTypes): AlgoritmoState => {
    switch (action.type) {
        case GET_ALGORITMOS_REQUESTED:
            return {
                ...state,
                getAlgoritmosPending: true
            };
        case GET_ALGORITMOS_SUCCEEDED:
            return {
                ...state,
                getAlgoritmosPending: false,
                listaAlgoritmos: action.payload
            };
        case GET_ALGORITMOS_FAILED:
            return {
                ...state,
                getAlgoritmosPending: false,
                erros: action.payload,
                listaAlgoritmos: {
                    hasNextPage: false,
                    hasPreviousPage: false,
                    items: [],
                    pageIndex: 0,
                    totalItems: 0,
                    totalPages: 0
                }
            };
        case CHANGE_PAGE_ALGORITMOS:
            return {
                ...state,
                pageNum: action.payload
            };
        case CHANGE_BUSCA_ALGORITMOS:
            return {
                ...state,
                search: action.payload
            };
        case CHANGE_DIRECAO_ORDENACAO_ALGORITMOS:
            return {
                ...state,
                direcaoOrdenacao: action.payload
            };
        case CHANGE_ORDENACAO_ALGORITMOS:
            return {
                ...state,
                colunaOrdenacao: action.payload
            };
        case CLEAN_ALGORITMOS_ERROS:
            return {
                ...state,
                erros: []
            };
        default:
            return state;
    }
}