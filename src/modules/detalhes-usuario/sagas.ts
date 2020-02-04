import { all, takeLatest, call, put } from "redux-saga/effects";
import { GET_HISTORICO_ALGORITMOS_REQUESTED, UpdateDadosRequestAction, UPDATE_DADOS_REQUESTED } from './types';
import { AxiosResponse } from "axios";
import { HistoricoAlgoritmoUsuario } from '../../models/user';
import { getRequest, formatErrors, putRequest } from '../../api/index';
import { receberHistoricoAlgoritmos, informarErrosHistoricoAlgoritmos, receberSucessoAtualizacao, informarErrosAtualizacao } from './actions';

function* getHistoricoAlgoritmos() {
    try {
        const response: AxiosResponse<HistoricoAlgoritmoUsuario[]> = yield call(getRequest, `/v1/account/concluidos/algoritmo`);
        yield put(receberHistoricoAlgoritmos(response.data));
    } catch (error) {
        yield put(informarErrosHistoricoAlgoritmos(formatErrors(error)));
    }
}


function* updateDados({ payload }: UpdateDadosRequestAction) {
    try {
        const response: AxiosResponse = yield call(putRequest, `/v1/account`, payload);
        yield put(receberSucessoAtualizacao());
    } catch (error) {
        yield put(informarErrosAtualizacao(formatErrors(error)));
    }
}

export const detalhesUsuarioSaga = all([
    takeLatest(GET_HISTORICO_ALGORITMOS_REQUESTED, getHistoricoAlgoritmos),
    takeLatest(UPDATE_DADOS_REQUESTED, updateDados)
]);