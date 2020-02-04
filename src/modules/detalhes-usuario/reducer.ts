import { DetalhesUsuarioActionTypes, DetalhesUsuarioState, GET_HISTORICO_ALGORITMOS_REQUESTED, GET_HISTORICO_ALGORITMOS_SUCCEEDED, GET_HISTORICO_ALGORITMOS_FAILED } from './types';
const initialState: DetalhesUsuarioState = {
    historicoUsuario: [],
    requests: {
        getHistorico: {
            isRequesting: false,
            hasFinished: false,
            errorPayload: []
        }
    }
};

export const detalhesUsuarioReducer = (state = initialState, action: DetalhesUsuarioActionTypes): DetalhesUsuarioState => {
    switch (action.type) {
        case GET_HISTORICO_ALGORITMOS_REQUESTED:
            return {
                ...state,
                requests: {
                    ...state.requests,
                    getHistorico: {
                        isRequesting: true,
                        hasFinished: false,
                        errorPayload: []
                    }
                }
            };
        case GET_HISTORICO_ALGORITMOS_SUCCEEDED:
            return {
                ...state,
                historicoUsuario: action.payload,
                requests: {
                    ...state.requests,
                    getHistorico: {
                        isRequesting: false,
                        hasFinished: true,
                        errorPayload: []
                    }
                }
            };
        case GET_HISTORICO_ALGORITMOS_FAILED:
            return {
                ...state,
                requests: {
                    ...state.requests,
                    getHistorico: {
                        isRequesting: false,
                        hasFinished: true,
                        errorPayload: action.payload
                    }
                }
            };
        default:
            return state;
    }
}