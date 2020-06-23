import { AxiosResponse } from "axios";
import { format } from "date-fns";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { formatErrors, getRequest, postRequest } from "../../api/index";
import { PagedList } from "../../models/pagedList";
import { ListagemTurma, TurmaById } from "../../models/turma";
import {
  confirmarSolicitacaoAcesso,
  confirmarTurmaPorIdRecebida,
  confirmarTurmasRecebidas,
  informarFalhasSolicitacaoAcesso,
  informarFalhaTurmaPorIdRecebida,
  informarFalhaTurmasRecebidas
} from "./actions";
import {
  GetTurmaByIdRequestedAction,
  GetTurmasRequestedAction,
  GET_TURMAS_REQUESTED,
  GET_TURMA_BY_ID_REQUESTED,
  SolicitarAcessoRequestedAction,
  SOLICITAR_ACESSO_REQUESTED
} from "./types";

function* getTurmaPaginadas({ payload }: GetTurmasRequestedAction) {
  try {
    const response: AxiosResponse<PagedList<ListagemTurma>> = yield call(
      getRequest,
      `/v1/turmas`,
      payload
    );
    yield put(confirmarTurmasRecebidas(response.data));
  } catch (error) {
    yield put(informarFalhaTurmasRecebidas(formatErrors(error)));
  }
}

function* solicitarAcesso({ payload }: SolicitarAcessoRequestedAction) {
  try {
    const dataAtual = format(new Date(), "yyyy-MM-dd'T'hh:mm:ss'Z'");
    if (payload) {
      const { idTurma, onSuccess, onFailed } = payload;
      const response: AxiosResponse = yield call(
        postRequest,
        `/v1/turmas/${idTurma}/acesso`,
        null,
        { dataEnvio: dataAtual }
      );
      yield put(
        confirmarSolicitacaoAcesso("Solicitação de acesso enviada com sucesso.")
      );
      onSuccess(response.data);
    } else {
      yield put(informarFalhasSolicitacaoAcesso(["Selecione uma turma"]));
    }
  } catch (error) {
    const { onFailed } = payload;
    onFailed(formatErrors(error));
    yield put(informarFalhasSolicitacaoAcesso(formatErrors(error)));
  }
}

function* getTurmaById({ payload }: GetTurmaByIdRequestedAction) {
  try {
    const response: AxiosResponse<TurmaById> = yield call(
      getRequest,
      `/v1/turmas/${payload}`
    );
    yield put(confirmarTurmaPorIdRecebida(response.data));
  } catch (error) {
    yield put(informarFalhaTurmaPorIdRecebida(formatErrors(error)));
  }
}

export const turmaSaga = all([
  takeLatest(GET_TURMAS_REQUESTED, getTurmaPaginadas),
  takeLatest(GET_TURMA_BY_ID_REQUESTED, getTurmaById),
  takeLatest(SOLICITAR_ACESSO_REQUESTED, solicitarAcesso),
]);
