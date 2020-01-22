import { all, call, put, takeLatest } from 'redux-saga/effects';
import { GetAlgoritmosRequestedAction, GET_ALGORITMOS_REQUESTED, GetAlgoritmoPorIdRequestedAction, GET_ALGORITMO_POR_ID_REQUESTED } from './types';
import { getRequest, formatErrors } from '../../api/index';
import { confirmarAlgoritmosRecebidos, informarFalhaAlgoritmosRecebidos, confirmarAlgoritmoPorIdRecebido, informarFalhaAlgoritmoPorIdRecebido } from './actions';
import { ListagemAlgoritmo } from '../../models/algoritmos';
import { AxiosResponse } from 'axios';
import { PagedList } from '../../models/pagedList';

function* getAlgoritmosPaginadas({ payload }: GetAlgoritmosRequestedAction) {
    try {
        const data = {
            busca: payload.busca,
            numPagina: payload.pageIndex,
            qtdePorPagina: payload.totalItems,
            colunasOrdenacao: payload.colunaOrdenacao,
            direcaoOrdenacao: payload.direcaoOrdenacao
        }
        if (Boolean(payload.idTurma)) {
            const response: AxiosResponse<PagedList<ListagemAlgoritmo>> = yield call(getRequest, `/v1/algoritmos/turma/${payload.idTurma}`, data);
            yield put(confirmarAlgoritmosRecebidos(response.data));
        }
    } catch (error) {
        yield put(informarFalhaAlgoritmosRecebidos(formatErrors(error)));
    }
}

function* getAlgoritmoPorId({ payload }: GetAlgoritmoPorIdRequestedAction) {
    try {
        const response: AxiosResponse<ListagemAlgoritmo> = yield call(getRequest, `/v1/algoritmos/${payload}`);
        yield put(confirmarAlgoritmoPorIdRecebido(response.data));
    } catch (error) {
        yield put(informarFalhaAlgoritmoPorIdRecebido(formatErrors(error)));
    }
}

export const algoritmoSaga = all([
    takeLatest(GET_ALGORITMOS_REQUESTED, getAlgoritmosPaginadas),
    takeLatest(GET_ALGORITMO_POR_ID_REQUESTED, getAlgoritmoPorId)
]);