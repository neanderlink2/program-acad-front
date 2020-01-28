import { AmbienteDevActionTypes, CompilePayload, CompileResult, COMPILE_CODE_REQUEST, COMPILE_CODE_FAILED, COMPILE_CODE_SUCCEEDED, TestarCodigoResult, TestarCodigoPayload, TESTAR_CODIGO_REQUEST, TESTAR_CODIGO_SUCCEEDED, TESTAR_CODIGO_FAILED, LIMPAR_RESULTADO_TESTES } from './types';

export const compilarAlgoritmo = (compile: CompilePayload): AmbienteDevActionTypes => {
    return {
        type: COMPILE_CODE_REQUEST,
        payload: compile
    }
}

export const receberResultadoCompilacao = (result: CompileResult) => {
    return {
        type: COMPILE_CODE_SUCCEEDED,
        payload: result
    }
}

export const informarErrosCompilacao = (erros: string[]) => {
    return {
        type: COMPILE_CODE_FAILED,
        payload: erros
    }
}

export const testarAlgoritmo = (compile: TestarCodigoPayload): AmbienteDevActionTypes => {
    return {
        type: TESTAR_CODIGO_REQUEST,
        payload: compile
    }
}

export const receberResultadoTestes = (result: TestarCodigoResult[]) => {
    return {
        type: TESTAR_CODIGO_SUCCEEDED,
        payload: result
    }
}

export const informarErrosTestes = (erros: string[]) => {
    return {
        type: TESTAR_CODIGO_FAILED,
        payload: erros
    }
}

export const limparResultadoTestes = () => {
    return {
        type: LIMPAR_RESULTADO_TESTES
    }
}