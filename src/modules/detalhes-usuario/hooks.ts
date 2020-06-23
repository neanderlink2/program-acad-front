import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../configs/middlewares";
import { FailedCallback, SuccessCallback } from "../../models/requestCallbacks";
import {
    limparErrosAtualizacaoDados,
    requisitarAtualizacaoDados,
    requisitarHistoricoAlgoritmos
} from "./actions";
import { UpdateDadosPayload } from "./types";

export const useHistoricoAlgoritmos = () => {
  const dispatch = useDispatch();
  const { isLoading, hasFinished, errors, historico } = useSelector(
    (states: RootState) => ({
      isLoading: states.detalhesUsuario.requests?.getHistorico?.isRequesting,
      hasFinished: states.detalhesUsuario.requests?.getHistorico?.hasFinished,
      errors: states.detalhesUsuario.requests?.getHistorico?.errorPayload,
      historico: states.detalhesUsuario.historicoUsuario,
    })
  );

  const buscarHistorico = useCallback(() => {
    //if (!isLoading && !hasFinished) {
    dispatch(requisitarHistoricoAlgoritmos());
    //}
  }, [dispatch]);

  useEffect(() => {
    buscarHistorico();
  }, [buscarHistorico]);

  return {
    data: historico,
    isLoading: isLoading && !hasFinished,
    buscarHistorico,
  };
};

export const useAtualizacaoDados = () => {
  const dispatch = useDispatch();
  const { isLoading, hasFinished, errors } = useSelector(
    (states: RootState) => ({
      isLoading: states.detalhesUsuario.requests?.updateDados?.isRequesting,
      hasFinished: states.detalhesUsuario.requests?.updateDados?.hasFinished,
      errors: states.detalhesUsuario.requests?.updateDados?.errorPayload,
    })
  );
  const atualizarDados = useCallback(
    (
      dados: UpdateDadosPayload,
      onSuccess: SuccessCallback,
      onFailed: FailedCallback
    ) => {
      dispatch(requisitarAtualizacaoDados(dados, onSuccess, onFailed));
    },
    [dispatch]
  );

  const limparErros = useCallback(() => {
    dispatch(limparErrosAtualizacaoDados());
  }, [dispatch]);

  return {
    isLoading: isLoading && !hasFinished,
    hasErrors: errors.length > 0 && !isLoading && hasFinished,
    errors,
    atualizarDados,
    limparErros,
  };
};
