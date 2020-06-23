import { AxiosResponse } from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { formatErrors, getRequest, putRequest } from "../../api/index";
import { HistoricoAlgoritmoUsuario } from "../../models/user";
import {
    informarErrosAtualizacao, informarErrosHistoricoAlgoritmos, receberHistoricoAlgoritmos,

    receberSucessoAtualizacao
} from "./actions";
import {
    GET_HISTORICO_ALGORITMOS_REQUESTED,
    UpdateDadosRequestAction,
    UPDATE_DADOS_REQUESTED
} from "./types";

function* getHistoricoAlgoritmos() {
  try {
    const response: AxiosResponse<HistoricoAlgoritmoUsuario[]> = yield call(
      getRequest,
      `/v1/account/concluidos/algoritmo`
    );
    yield put(receberHistoricoAlgoritmos(response.data));
  } catch (error) {
    yield put(informarErrosHistoricoAlgoritmos(formatErrors(error)));
  }
}

function* updateDados({ payload }: UpdateDadosRequestAction) {
  const { dados, onSuccess, onFailed } = payload;
  try {
    const response: AxiosResponse = yield call(
      putRequest,
      `/v1/account`,
      dados
    );
    yield put(receberSucessoAtualizacao());
    onSuccess("Successo");
  } catch (error) {
    yield put(informarErrosAtualizacao(formatErrors(error)));
    onFailed(formatErrors(error));
  }
}

export const detalhesUsuarioSaga = all([
  takeLatest(GET_HISTORICO_ALGORITMOS_REQUESTED, getHistoricoAlgoritmos),
  takeLatest(UPDATE_DADOS_REQUESTED, updateDados),
]);
