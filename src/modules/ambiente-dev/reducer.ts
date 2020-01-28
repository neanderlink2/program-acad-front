import { AmbienteDevState, AmbienteDevActionTypes, COMPILE_CODE_REQUEST, COMPILE_CODE_FAILED, COMPILE_CODE_SUCCEEDED, TESTAR_CODIGO_REQUEST, TESTAR_CODIGO_SUCCEEDED, TESTAR_CODIGO_FAILED, LIMPAR_RESULTADO_TESTES } from './types';

const initialState: AmbienteDevState = {
    isCompiling: false,
    isTesting: false,
    compileResult: undefined,
    testesResult: [],
    erros: []
};

export const ambienteDevReducer = (state = initialState, action: AmbienteDevActionTypes): AmbienteDevState => {
    switch (action.type) {
        case COMPILE_CODE_REQUEST:
            return {
                ...state,
                isCompiling: true
            };
        case COMPILE_CODE_SUCCEEDED:
            return {
                ...state,
                isCompiling: false,
                compileResult: action.payload
            };
        case COMPILE_CODE_FAILED:
            return {
                ...state,
                isCompiling: false,
                erros: action.payload
            };
        case TESTAR_CODIGO_REQUEST:
            return {
                ...state,
                isTesting: true
            };
        case TESTAR_CODIGO_SUCCEEDED:
            return {
                ...state,
                isTesting: false,
                testesResult: action.payload
            };
        case TESTAR_CODIGO_FAILED:
            return {
                ...state,
                isTesting: false,
                erros: action.payload
            }
        case LIMPAR_RESULTADO_TESTES:
            return {
                ...state,
                isTesting: false,
                erros: [],
                testesResult: []
            }
        default:
            return state;
    }
}