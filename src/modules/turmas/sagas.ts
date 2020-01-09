import { all, call, put, takeLatest } from 'redux-saga/effects';
import { GetTurmasRequestedAction, GET_TURMAS_REQUESTED } from './types';
import { getRequest, formatErrors } from '../../api/index';
import { confirmarTurmasRecebidas, informarFalhaTurmasRecebidas } from './actions';
import { AxiosResponse } from 'axios';
import { PagedList } from '../../models/pagedList';
import { ListagemTurma } from '../../models/turma';

export function* getTurmaPaginadas({ payload }: GetTurmasRequestedAction) {
    try {
        const response: AxiosResponse<PagedList<ListagemTurma>> = yield call(getRequest, `/v1/turmas`, payload);
        yield put(confirmarTurmasRecebidas(response.data));
    } catch (error) {
        yield put(informarFalhaTurmasRecebidas(formatErrors(error)));
    }
}

export const turmaSaga = all([
    takeLatest(GET_TURMAS_REQUESTED, getTurmaPaginadas)
]);