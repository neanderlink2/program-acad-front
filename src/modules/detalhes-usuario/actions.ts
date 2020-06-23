import { FailedCallback, SuccessCallback } from "../../models/requestCallbacks";
import { HistoricoAlgoritmoUsuario } from "../../models/user";
import {
    DetalhesUsuarioActionTypes,
    GET_HISTORICO_ALGORITMOS_CLEAN_ERRORS,
    GET_HISTORICO_ALGORITMOS_FAILED,
    GET_HISTORICO_ALGORITMOS_REQUESTED,
    GET_HISTORICO_ALGORITMOS_SUCCEEDED,
    UpdateDadosPayload,
    UPDATE_DADOS_CLEAN_ERRORS,
    UPDATE_DADOS_FAILED,
    UPDATE_DADOS_REQUESTED,
    UPDATE_DADOS_SUCCEEDED
} from "./types";

export const requisitarHistoricoAlgoritmos = (): DetalhesUsuarioActionTypes => {
  return {
    type: GET_HISTORICO_ALGORITMOS_REQUESTED,
  };
};

export const receberHistoricoAlgoritmos = (
  historico: HistoricoAlgoritmoUsuario[]
): DetalhesUsuarioActionTypes => {
  return {
    type: GET_HISTORICO_ALGORITMOS_SUCCEEDED,
    payload: historico,
  };
};

export const informarErrosHistoricoAlgoritmos = (
  erros: string[]
): DetalhesUsuarioActionTypes => {
  return {
    type: GET_HISTORICO_ALGORITMOS_FAILED,
    payload: erros,
  };
};

export const limparErrosHistoricoAlgoritmos = (): DetalhesUsuarioActionTypes => {
  return {
    type: GET_HISTORICO_ALGORITMOS_CLEAN_ERRORS,
  };
};

export const requisitarAtualizacaoDados = (
  dados: UpdateDadosPayload,
  onSuccess: SuccessCallback,
  onFailed: FailedCallback
): DetalhesUsuarioActionTypes => {
  return {
    type: UPDATE_DADOS_REQUESTED,
    payload: { dados, onSuccess, onFailed },
  };
};

export const receberSucessoAtualizacao = (): DetalhesUsuarioActionTypes => {
  return {
    type: UPDATE_DADOS_SUCCEEDED,
  };
};

export const informarErrosAtualizacao = (
  erros: string[]
): DetalhesUsuarioActionTypes => {
  return {
    type: UPDATE_DADOS_FAILED,
    payload: erros,
  };
};

export const limparErrosAtualizacaoDados = (): DetalhesUsuarioActionTypes => {
  return {
    type: UPDATE_DADOS_CLEAN_ERRORS,
  };
};
