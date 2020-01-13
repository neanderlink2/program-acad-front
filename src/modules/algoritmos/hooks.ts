import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../configs/middlewares";
import { useCallback, useEffect } from "react";
import { requisitarAlgoritmos, limparErros as cleanErrorsAlgoritmo } from "./actions";
import { useHistory, useParams } from "react-router-dom";

export const useAlgoritmoState = (busca: string, pageIndex: number, colunaOrdenacao: 1 | 2 = 1, direcaoOrdenacao: 'asc' | 'desc' = 'asc', totalItems = 6) => {
    const dispatch = useDispatch();
    const { id: idTurma } = useParams();

    const { algoritmos, erros, isBuscandoAlgoritmos } = useSelector((states: RootState) =>
        ({
            algoritmos: states.algoritmo.listaAlgoritmos,
            isBuscandoAlgoritmos: states.turma.getTurmasPending,
            erros: states.algoritmo.erros
        }));

    const buscarAlgoritmos = useCallback(() => dispatch(requisitarAlgoritmos({
        idTurma: idTurma ? idTurma : "",
        linguagensVisualizacao: { cSharp: false, java: false, javaScript: false, python: false },
        busca,
        colunaOrdenacao,
        direcaoOrdenacao,
        pageIndex,
        totalItems,
    })), [dispatch, busca, colunaOrdenacao, direcaoOrdenacao, pageIndex, totalItems]);
    const limparErros = () => dispatch(cleanErrorsAlgoritmo());

    useEffect(() => {
        buscarAlgoritmos();
    }, [buscarAlgoritmos])

    return { algoritmos, erros, isBuscandoAlgoritmos, buscarAlgoritmos, limparErros };
}