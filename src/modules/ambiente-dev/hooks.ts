import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../configs/middlewares"
import { useCallback } from "react";
import { LinguagensProgramacao } from "../../models/algoritmos";
import { compilarAlgoritmo, testarAlgoritmo, limparResultadoTestes } from './actions';
import { useParams } from "react-router-dom";

export const useAmbienteDevState = (linguagemSelecionada?: LinguagensProgramacao) => {
    const dispatch = useDispatch();
    const { compileResult, erros, isCompiling } = useSelector((states: RootState) => ({ ...states.ambienteDev }));

    const compilar = useCallback((codigo, entradas) => {
        if (linguagemSelecionada) {
            dispatch(compilarAlgoritmo({ code: codigo, inputs: entradas, language: linguagemSelecionada }));
        }
    }, [dispatch, linguagemSelecionada]);

    return { compileResult, erros, isCompiling, compilar };
}

export const useValidacaoAlgoritmoState = () => {
    const dispatch = useDispatch();
    const { idAlgoritmo } = useParams();
    const { isTesting, testesResult, erros } = useSelector((states: RootState) => ({ ...states.ambienteDev }));

    const testarCodigo = useCallback((codigo, linguagem) => {
        dispatch(testarAlgoritmo({ code: codigo, language: linguagem, idAlgoritmo: idAlgoritmo ? idAlgoritmo : '' }))
    }, [idAlgoritmo, dispatch]);

    const limparResultado = useCallback(() => {
        dispatch(limparResultadoTestes());
    }, [dispatch]);

    return { isValidando: erros.length > 0 || (testesResult && testesResult.length > 0) || isTesting, resultados: testesResult, isTesting, erros, testarCodigo, limparResultado };
}