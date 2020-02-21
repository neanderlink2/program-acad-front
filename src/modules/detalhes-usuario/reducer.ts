import { DetalhesUsuarioActionTypes, DetalhesUsuarioState, GET_HISTORICO_ALGORITMOS_REQUESTED, GET_HISTORICO_ALGORITMOS_SUCCEEDED, GET_HISTORICO_ALGORITMOS_FAILED, UPDATE_DADOS_REQUESTED, UPDATE_DADOS_SUCCEEDED, UPDATE_DADOS_FAILED, UPDATE_DADOS_CLEAN_ERRORS, GET_HISTORICO_ALGORITMOS_CLEAN_ERRORS } from './types';
const initialState: DetalhesUsuarioState = {
    historicoUsuario: [],
    requests: {
        getHistorico: {
            isRequesting: false,
            hasFinished: false,
            errorPayload: []
        },
        updateDados: {
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
        case GET_HISTORICO_ALGORITMOS_CLEAN_ERRORS: {
            return {
                ...state,
                requests: {
                    ...state.requests,
                    getHistorico: {
                        ...state.requests.getHistorico,
                        errorPayload: []
                    }
                }
            }
        }
        case UPDATE_DADOS_REQUESTED:
            return {
                ...state,
                requests: {
                    ...state.requests,
                    updateDados: {
                        isRequesting: true,
                        hasFinished: false,
                        errorPayload: []
                    }
                }
            };
        case UPDATE_DADOS_SUCCEEDED:
            return {
                ...state,
                requests: {
                    ...state.requests,
                    updateDados: {
                        isRequesting: false,
                        hasFinished: true,
                        errorPayload: []
                    }
                }
            };
        case UPDATE_DADOS_FAILED:
            return {
                ...state,
                requests: {
                    ...state.requests,
                    updateDados: {
                        isRequesting: false,
                        hasFinished: true,
                        errorPayload: action.payload
                    }
                }
            };
        case UPDATE_DADOS_CLEAN_ERRORS: {
            return {
                ...state,
                requests: {
                    ...state.requests,
                    updateDados: {
                        ...state.requests.updateDados,
                        errorPayload: []
                    }
                }
            }
        }
        default:
            return state;
    }
}