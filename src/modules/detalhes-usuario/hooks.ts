import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../configs/middlewares';
import { requisitarHistoricoAlgoritmos } from './actions';

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