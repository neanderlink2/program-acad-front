import { all, takeLatest, call, put } from "redux-saga/effects";
import { GET_HISTORICO_ALGORITMOS_REQUESTED } from './types';
import { AxiosResponse } from "axios";
import { HistoricoAlgoritmoUsuario } from '../../models/user';
import { getRequest, formatErrors } from '../../api/index';
import { receberHistoricoAlgoritmos, informarErrosHistoricoAlgoritmos } from './actions';

function* getHistoricoAlgoritmos() {
    try {
        const response: AxiosResponse<HistoricoAlgoritmoUsuario[]> = yield call(getRequest, `/v1/account/concluidos/algoritmo`);
        yield put(receberHistoricoAlgoritmos(response.data));
    } catch (error) {
        yield put(informarErrosHistoricoAlgoritmos(formatErrors(error)));
    }
}

export const detalhesUsuarioSaga = all([
    takeLatest(GET_HISTORICO_ALGORITMOS_REQUESTED, getHistoricoAlgoritmos)
]);