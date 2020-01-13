import { TurmaState, GET_TURMAS_REQUESTED, GET_TURMAS_SUCCEEDED, GET_TURMAS_FAILED, TurmaActionTypes, CHANGE_PAGE, CHANGE_BUSCA, CHANGE_DIRECAO_ORDENACAO, CHANGE_ORDENACAO, CLEAN_TURMA_ERROS, CHANGE_TURMA_SELECIONADA } from './types';

const initialState: TurmaState = {
    getTurmasPending: false,
    listaTurmas: undefined,
    search: '',
    pageNum: 0,
    colunaOrdenacao: 1,
    direcaoOrdenacao: "asc",
    erros: [],
    turmaSelecionada: undefined,
};

export const turmaReducer = (state = initialState, action: TurmaActionTypes): TurmaState => {
    switch (action.type) {
        case GET_TURMAS_REQUESTED:
            return {
                ...state,
                getTurmasPending: true
            };
        case GET_TURMAS_SUCCEEDED:
            return {
                ...state,
                getTurmasPending: false,
                listaTurmas: action.payload
            };
        case GET_TURMAS_FAILED:
            return {
                ...state,
                getTurmasPending: false,
                erros: action.payload,
                listaTurmas: {
                    hasNextPage: false,
                    hasPreviousPage: false,
                    items: [],
                    pageIndex: 0,
                    totalItems: 0,
                    totalPages: 0
                }
            };
        case CHANGE_PAGE:
            return {
                ...state,
                pageNum: action.payload
            };
        case CHANGE_BUSCA:
            return {
                ...state,
                search: action.payload
            };
        case CHANGE_DIRECAO_ORDENACAO:
            return {
                ...state,
                direcaoOrdenacao: action.payload
            };
        case CHANGE_ORDENACAO:
            return {
                ...state,
                colunaOrdenacao: action.payload
            };
        case CLEAN_TURMA_ERROS:
            return {
                ...state,
                erros: []
            };
        case CHANGE_TURMA_SELECIONADA:
            return {
                ...state,
                turmaSelecionada: action.payload
            }
        default:
            return state;
    }
}