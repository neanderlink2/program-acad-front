import {
    CHANGE_BUSCA,
    CHANGE_DIRECAO_ORDENACAO,
    CHANGE_ORDENACAO,
    CHANGE_PAGE,
    CHANGE_TURMA_SELECIONADA,
    CLEAN_TURMA_ERROS,
    GET_TURMAS_FAILED,
    GET_TURMAS_REQUESTED,
    GET_TURMAS_SUCCEEDED,
    GET_TURMA_BY_ID_FAILED,
    GET_TURMA_BY_ID_REQUESTED,
    GET_TURMA_BY_ID_SUCCEEDED,
    SOLICITAR_ACESSO_FAILED,
    SOLICITAR_ACESSO_REQUESTED,
    SOLICITAR_ACESSO_SUCCEEDED,
    TurmaActionTypes,
    TurmaState
} from "./types";

const initialState: TurmaState = {
  getTurmasPending: false,
  getSolicitacaoRequestPending: false,
  listaTurmas: undefined,
  search: "",
  pageNum: 0,
  colunaOrdenacao: 1,
  direcaoOrdenacao: "asc",
  mensagemSucessoSolicitacao: "",
  erros: [],
  turmaSelecionada: undefined,
  getTurmaByIdPending: false,
  turmaPorId: undefined,
};

export const turmaReducer = (
  state = initialState,
  action: TurmaActionTypes
): TurmaState => {
  switch (action.type) {
    case GET_TURMAS_REQUESTED:
      return {
        ...state,
        getTurmasPending: true,
      };
    case GET_TURMAS_SUCCEEDED:
      return {
        ...state,
        getTurmasPending: false,
        listaTurmas: action.payload,
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
          totalPages: 0,
        },
      };
    case GET_TURMA_BY_ID_REQUESTED:
      return {
        ...state,
        getTurmaByIdPending: true,
      };
    case GET_TURMA_BY_ID_SUCCEEDED:
      return {
        ...state,
        getTurmaByIdPending: false,
        turmaPorId: action.payload,
      };
    case GET_TURMA_BY_ID_FAILED:
      return {
        ...state,
        getTurmaByIdPending: false,
        erros: action.payload,
        turmaPorId: undefined,
      };
    case CHANGE_PAGE:
      return {
        ...state,
        pageNum: action.payload,
      };
    case CHANGE_BUSCA:
      return {
        ...state,
        search: action.payload,
      };
    case CHANGE_DIRECAO_ORDENACAO:
      return {
        ...state,
        direcaoOrdenacao: action.payload,
      };
    case CHANGE_ORDENACAO:
      return {
        ...state,
        colunaOrdenacao: action.payload,
      };
    case CLEAN_TURMA_ERROS:
      return {
        ...state,
        mensagemSucessoSolicitacao: "",
        erros: [],
      };
    case CHANGE_TURMA_SELECIONADA:
      return {
        ...state,
        turmaSelecionada: action.payload,
      };
    case SOLICITAR_ACESSO_REQUESTED:
      return {
        ...state,
        getSolicitacaoRequestPending: true,
      };
    case SOLICITAR_ACESSO_SUCCEEDED:
      return {
        ...state,
        getSolicitacaoRequestPending: false,
        mensagemSucessoSolicitacao: action.payload,
      };
    case SOLICITAR_ACESSO_FAILED:
      return {
        ...state,
        getSolicitacaoRequestPending: false,
        erros: action.payload,
      };
    default:
      return state;
  }
};
