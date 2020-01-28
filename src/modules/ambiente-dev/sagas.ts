import { all, call, put, takeLatest } from 'redux-saga/effects';
import { formatErrors, postRequest } from '../../api/index';
import { AxiosResponse } from 'axios';
import { CompileCodeRequestAction, CompileResult, COMPILE_CODE_REQUEST, TestarCodigoRequestAction, TestarCodigoResult, TESTAR_CODIGO_REQUEST } from './types';
import { receberResultadoCompilacao, informarErrosCompilacao, receberResultadoTestes, informarErrosTestes } from './actions';

const languageMap = {
    'csharp': 'csharp',
    'python3': 'python',
    'c': 'c',
    'java': 'java',
    'nodejs': 'nodejs'
}

function* compileCode({ payload }: CompileCodeRequestAction) {
    try {
        const formData = new FormData();
        formData.append("code", payload.code);
        for (let input of payload.inputs) {
            formData.append("inputs[]", input);
        }
        const response: AxiosResponse<CompileResult> = yield call(postRequest, `/v1/compiler/${languageMap[payload.language]}`, formData);
        yield put(receberResultadoCompilacao(response.data));
    } catch (error) {
        yield put(informarErrosCompilacao(formatErrors(error)));
    }
}

function* testCode({ payload }: TestarCodigoRequestAction) {
    try {
        const formData = new FormData();
        formData.append("code", payload.code);
        const response: AxiosResponse<TestarCodigoResult[]> = yield call(postRequest, `/v1/compiler/${languageMap[payload.language]}/algoritmo/${payload.idAlgoritmo}`, formData);
        yield put(receberResultadoTestes(response.data));
    } catch (error) {
        yield put(informarErrosTestes(formatErrors(error)));
    }
}

export const ambienteDevSaga = all([
    takeLatest(COMPILE_CODE_REQUEST, compileCode),
    takeLatest(TESTAR_CODIGO_REQUEST, testCode)
]);