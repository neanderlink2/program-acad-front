import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../configs/middlewares"
import { useCallback } from "react";
import { LinguagensProgramacao } from "../../models/algoritmos";
import { compilarAlgoritmo } from "./actions";

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