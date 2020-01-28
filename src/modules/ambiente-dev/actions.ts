import { AmbienteDevActionTypes, CompilePayload, CompileResult, COMPILE_CODE_REQUEST, COMPILE_CODE_FAILED, COMPILE_CODE_SUCCEEDED } from "./types"

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