import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../configs/middlewares";
import { FailedCallback, SuccessCallback } from "../../models/requestCallbacks";
import {
  limparErros as cleanErrors,
  requisitarSolicitacaoAcesso,


  requisitarTurmaPorId, requisitarTurmas,
  selecionarTurma
} from "./actions";

export const useTurmaState = () => {
  const dispatch = useDispatch();
  const { turmas, erros, isBuscandoTurmas } = useSelector(
    (states: RootState) => ({
      turmas: states.turma.listaTurmas,
      isBuscandoTurmas: states.turma.getTurmasPending,
      erros: states.turma.erros,
    })
  );
  const buscarTurmas = useCallback(
    (busca, colunaOrdenacao, direcaoOrdenacao, pageIndex, totalItems) =>
      dispatch(
        requisitarTurmas({
          busca,
          colunaOrdenacao,
          direcaoOrdenacao,
          pageIndex,
          totalItems,
        })
      ),
    [dispatch]
  );
  const limparErros = () => dispatch(cleanErrors());
  const escolherTurma = (idTurma: string) => dispatch(selecionarTurma(idTurma));

  return {
    turmas,
    erros,
    isBuscandoTurmas,
    buscarTurmas,
    limparErros,
    escolherTurma,
  };
};

export const useSolicitacaoAcesso = () => {
  const dispatch = useDispatch();
  const { isSolicitandoAcesso, mensagemSucesso } = useSelector(
    (states: RootState) => ({
      isSolicitandoAcesso: states.turma.getSolicitacaoRequestPending,
      mensagemSucesso: states.turma.mensagemSucessoSolicitacao,
    })
  );
  const solicitarAcesso = useCallback(
    (idTurma: string, onSuccess: SuccessCallback, onFailed: FailedCallback) => {
      dispatch(requisitarSolicitacaoAcesso(idTurma, onSuccess, onFailed));
    },
    [dispatch]
  );

  return { isSolicitandoAcesso, mensagemSucesso, solicitarAcesso };
};

export const useTurmaById = () => {
  const dispatch = useDispatch();
  const { turma, isLoading } = useSelector((states: RootState) => ({
    turma: states.turma.turmaPorId,
    isLoading: states.turma.getTurmaByIdPending,
  }));

  const buscarTurmaPorId = useCallback(
    (id: string) => {
      dispatch(requisitarTurmaPorId(id));
    },
    [dispatch]
  );

  return { turma, isLoading, buscarTurmaPorId };
};
