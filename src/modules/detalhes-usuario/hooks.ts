import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../configs/middlewares';
import { requisitarHistoricoAlgoritmos, requisitarAtualizacaoDados, limparErrosAtualizacaoDados } from './actions';
import { UpdateDadosPayload } from './types';

export const useHistoricoAlgoritmos = () => {
    const dispatch = useDispatch();
    const { isLoading, hasFinished, errors, historico } = useSelector((states: RootState) => ({
        isLoading: states.detalhesUsuario.requests?.getHistorico?.isRequesting,
        hasFinished: states.detalhesUsuario.requests?.getHistorico?.hasFinished,
        errors: states.detalhesUsuario.requests?.getHistorico?.errorPayload,
        historico: states.detalhesUsuario.historicoUsuario
    }));

    const buscarHistorico = useCallback(() => {
        //if (!isLoading && !hasFinished) {
        dispatch(requisitarHistoricoAlgoritmos());
        //}
    }, [dispatch])

    useEffect(() => {
        buscarHistorico()
    }, [buscarHistorico])

    return { data: historico, isLoading: isLoading && !hasFinished, buscarHistorico };
}

export const useAtualizacaoDados = () => {
    const dispatch = useDispatch();
    const { isLoading, hasFinished, errors } = useSelector((states: RootState) => ({
        isLoading: states.detalhesUsuario.requests?.updateDados?.isRequesting,
        hasFinished: states.detalhesUsuario.requests?.updateDados?.hasFinished,
        errors: states.detalhesUsuario.requests?.updateDados?.errorPayload,
    }));
    const atualizarDados = useCallback((dados: UpdateDadosPayload) => {
        dispatch(requisitarAtualizacaoDados(dados));
    }, [dispatch]);

    const limparErros = useCallback(() => {
        dispatch(limparErrosAtualizacaoDados());
    }, [dispatch]);

    return { isLoading: isLoading && !hasFinished, hasErrors: errors.length > 0 && !isLoading && hasFinished, errors, atualizarDados, limparErros };
}