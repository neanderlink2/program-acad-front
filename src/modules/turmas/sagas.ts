import { all, call, put, takeLatest } from 'redux-saga/effects';
import { GetTurmasRequestedAction, GET_TURMAS_REQUESTED, SolicitarAcessoRequestedAction, SOLICITAR_ACESSO_REQUESTED } from './types';
import { getRequest, formatErrors, postRequest } from '../../api/index';
import { confirmarTurmasRecebidas, informarFalhaTurmasRecebidas, confirmarSolicitacaoAcesso, informarFalhasSolicitacaoAcesso } from './actions';
import { AxiosResponse } from 'axios';
import { PagedList } from '../../models/pagedList';
import { ListagemTurma } from '../../models/turma';
import { format } from 'date-fns';

function* getTurmaPaginadas({ payload }: GetTurmasRequestedAction) {
    try {
        const response: AxiosResponse<PagedList<ListagemTurma>> = yield call(getRequest, `/v1/turmas`, payload);
        yield put(confirmarTurmasRecebidas(response.data));
    } catch (error) {
        yield put(informarFalhaTurmasRecebidas(formatErrors(error)));
    }
}

function* solicitarAcesso({ payload }: SolicitarAcessoRequestedAction) {
    try {
        const dataAtual = format(new Date(), "yyyy-MM-dd'T'hh:mm:ss'Z'");
        if (payload) {
            const response: AxiosResponse = yield call(postRequest, `/v1/turmas/${payload}/acesso`, null, { dataEnvio: dataAtual });
            yield put(confirmarSolicitacaoAcesso('Solicitação de acesso enviada com sucesso.'));
        } else {
            yield put(informarFalhasSolicitacaoAcesso(['Selecione uma turma']));
        }
    } catch (error) {
        yield put(informarFalhasSolicitacaoAcesso(formatErrors(error)));
    }
}

export const turmaSaga = all([
    takeLatest(GET_TURMAS_REQUESTED, getTurmaPaginadas),
    takeLatest(SOLICITAR_ACESSO_REQUESTED, solicitarAcesso)
]);