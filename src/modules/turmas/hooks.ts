import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../../configs/middlewares';
import { requisitarTurmas, limparErros as cleanErrors } from './actions';
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

    useEffect(() => {
        buscarTurmas();
    }, [buscarTurmas])

    return { turmas, erros, isBuscandoTurmas, buscarTurmas, limparErros };
}