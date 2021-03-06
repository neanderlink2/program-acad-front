import { PagedList } from "../../models/pagedList";
import { FailedCallback, SuccessCallback } from "../../models/requestCallbacks";
import { ListagemTurma, TurmaById } from "../../models/turma";

export const GET_TURMAS_REQUESTED = "turmas/GetTurmasRequested";
export const GET_TURMAS_SUCCEEDED = "turmas/GetTurmasSucceeded";
export const GET_TURMAS_FAILED = "turmas/GetTurmasFailed";
export const GET_TURMA_BY_ID_REQUESTED = "turmas/GetTurmaByIdRequested";
export const GET_TURMA_BY_ID_SUCCEEDED = "turmas/GetTurmaByIdSucceeded";
export const GET_TURMA_BY_ID_FAILED = "turmas/GetTurmaByIdFailed";
export const CHANGE_ORDENACAO = "turmas/ChangeOrdenacao";
export const CHANGE_DIRECAO_ORDENACAO = "turmas/ChangeDirecaoOrdenacao";
export const CHANGE_BUSCA = "turmas/ChangeBusca";
export const CHANGE_PAGE = "turmas/ChangePage";
export const CLEAN_TURMA_ERROS = "turmas/CleanErros";
export const CHANGE_TURMA_SELECIONADA = "turmas/ChangeTurmaSelecionada";
export const SOLICITAR_ACESSO_REQUESTED = "turmas/SolicitarAcessoRequested";
export const SOLICITAR_ACESSO_SUCCEEDED = "turmas/SolicitarAcessoSucceeded";
export const SOLICITAR_ACESSO_FAILED = "turmas/SolicitarAcessoFailed";

//Ordem 1: Nome
//Ordem 2: DataTermino
export type BuscaTurmas = {
  busca?: string;
  pageIndex?: number;
  totalItems?: number;
  colunaOrdenacao?: 1 | 2;
  direcaoOrdenacao?: "asc" | "desc";
};

export interface GetTurmasRequestedAction {
  type: typeof GET_TURMAS_REQUESTED;
  payload: BuscaTurmas;
}

interface GetTurmasSucceededAction {
  type: typeof GET_TURMAS_SUCCEEDED;
  payload: PagedList<ListagemTurma>;
}

interface GetTurmasFailedAction {
  type: typeof GET_TURMAS_FAILED;
  payload: string[];
}

export interface GetTurmaByIdRequestedAction {
  type: typeof GET_TURMA_BY_ID_REQUESTED;
  payload: string;
}

interface GetTurmaByIdSucceededAction {
  type: typeof GET_TURMA_BY_ID_SUCCEEDED;
  payload: TurmaById;
}

interface GetTurmaByIdFailedAction {
  type: typeof GET_TURMA_BY_ID_FAILED;
  payload: string[];
}

interface ChangeOrdenacaoAction {
  type: typeof CHANGE_ORDENACAO;
  payload: 1 | 2;
}

interface ChangeDirecaoOrdenacaoAction {
  type: typeof CHANGE_DIRECAO_ORDENACAO;
  payload: "asc" | "desc";
}

interface ChangeBuscaAction {
  type: typeof CHANGE_BUSCA;
  payload: string;
}

interface ChangePageAction {
  type: typeof CHANGE_PAGE;
  payload: number;
}

export interface SolicitarAcessoRequestedAction {
  type: typeof SOLICITAR_ACESSO_REQUESTED;
  payload: {
    idTurma: string;
    onSuccess: SuccessCallback;
    onFailed: FailedCallback;
  };
}

interface SolicitarAcessoSucceededAction {
  type: typeof SOLICITAR_ACESSO_SUCCEEDED;
  payload: string;
}

interface SolicitarAcessoFailedAction {
  type: typeof SOLICITAR_ACESSO_FAILED;
  payload: string[];
}

interface CleanErrosAction {
  type: typeof CLEAN_TURMA_ERROS;
}

interface ChooseTurmaSelecionadaAction {
  type: typeof CHANGE_TURMA_SELECIONADA;
  payload: string;
}

export type TurmaState = {
  listaTurmas?: PagedList<ListagemTurma>;
  turmaPorId?: TurmaById;
  getTurmasPending: boolean;
  getTurmaByIdPending: boolean;
  getSolicitacaoRequestPending: boolean;
  mensagemSucessoSolicitacao?: string;
  search?: string;
  pageNum?: number;
  colunaOrdenacao?: 1 | 2;
  direcaoOrdenacao?: "asc" | "desc";
  erros: string[];
  turmaSelecionada?: string;
};

export type TurmaActionTypes =
  | GetTurmasRequestedAction
  | GetTurmasSucceededAction
  | GetTurmasFailedAction
  | GetTurmaByIdRequestedAction
  | GetTurmaByIdSucceededAction
  | GetTurmaByIdFailedAction
  | ChangeOrdenacaoAction
  | ChangeDirecaoOrdenacaoAction
  | ChangeBuscaAction
  | ChangePageAction
  | CleanErrosAction
  | ChooseTurmaSelecionadaAction
  | SolicitarAcessoRequestedAction
  | SolicitarAcessoSucceededAction
  | SolicitarAcessoFailedAction;
