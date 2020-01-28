import { AmbienteDevState, AmbienteDevActionTypes, COMPILE_CODE_REQUEST, COMPILE_CODE_FAILED, COMPILE_CODE_SUCCEEDED } from "./types";

const initialState: AmbienteDevState = {
    isCompiling: false,
    compileResult: undefined,
    erros: []
};

export const ambienteDevReducer = (state = initialState, action: AmbienteDevActionTypes): AmbienteDevState => {
    switch (action.type) {
        case COMPILE_CODE_REQUEST:
            return {
                ...state,
                isCompiling: true
            }
        case COMPILE_CODE_SUCCEEDED:
            return {
                ...state,
                isCompiling: false,
                compileResult: action.payload
            }
        case COMPILE_CODE_FAILED:
            return {
                ...state,
                isCompiling: false,
                erros: action.payload
            }
        default:
            return state;
    }
}