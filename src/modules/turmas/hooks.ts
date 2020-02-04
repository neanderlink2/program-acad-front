import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../../configs/middlewares';
import { requisitarTurmas, limparErros as cleanErrors, selecionarTurma, requisitarSolicitacaoAcesso } from './actions';
import { BuscaTurmas } from "./types";
import { useEffect, useCallback } from 'react';

export const useTurmaState = ({ busca, pageIndex, colunaOrdenacao = 1, direcaoOrdenacao = 'asc', totalItems = 6 }: BuscaTurmas) => {
    const dispatch = useDispatch();
    const { turmas, erros, isBuscandoTurmas } = useSelector((states: RootState) => ({ turmas: states.turma.listaTurmas, isBuscandoTurmas: states.turma.getTurmasPending, erros: states.turma.erros }))
    const buscarTurmas = useCallback(() => dispatch(requisitarTurmas({
        busca,
        colunaOrdenacao,
        direcaoOrdenacao,
        pageIndex,
        totalItems,
    })), [dispatch, busca, colunaOrdenacao, direcaoOrdenacao, pageIndex, totalItems]);
    const limparErros = () => dispatch(cleanErrors());
    const escolherTurma = (idTurma: string) => dispatch(selecionarTurma(idTurma));

    useEffect(() => {
        buscarTurmas();
    }, [buscarTurmas])

    return { turmas, erros, isBuscandoTurmas, buscarTurmas, limparErros, escolherTurma };
}

export const useSolicitacaoAcesso = () => {
    const dispatch = useDispatch();
    const { isSolicitandoAcesso, mensagemSucesso } = useSelector((states: RootState) => ({
        isSolicitandoAcesso: states.turma.getSolicitacaoRequestPending,
        mensagemSucesso: states.turma.mensagemSucessoSolicitacao
    }));
    const solicitarAcesso = useCallback((idTurma: string) => {
        dispatch(requisitarSolicitacaoAcesso(idTurma));
    }, [dispatch]);

    return { isSolicitandoAcesso, mensagemSucesso, solicitarAcesso };
}