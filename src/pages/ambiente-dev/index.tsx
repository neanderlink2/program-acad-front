import React, { useState, useEffect } from 'react';
import { useAlgoritmoPorIdState } from '../../modules/algoritmos/hooks';
import { useSnackbars } from '../../components/hooks/index';
import { LoadingScreen } from '../../components/loading/index';
import { FullScreenContainer, AmbienteDesenvolvimentoContainer } from './styles';
import { NiveisDificuldadeEnum, languageDefaults, LinguagensProgramacao } from '../../models/algoritmos';
import { DetalhesAlgoritmo } from './DetalhesAlgoritmo';
import { CodeEditor } from './CodeEditor';
import { EntradaSaida } from './EntradaSaida';


export const AmbienteDevScreen = () => {
    const { isBuscandoAlgoritmoPorId, algoritmo, erros, limparErros } = useAlgoritmoPorIdState();
    const { warning } = useSnackbars();

    useEffect(() => {
        if (erros && erros.length > 0) {
            for (let erro of erros) {
                warning(erro);
            }
        }
    }, [erros, warning, limparErros]);

    const [code, setCode] = useState('');
    const [linguagemSelecionada, setLinguagemSelecionada] = useState<LinguagensProgramacao>();
    const [listaEntradas, setListaEntradas] = useState<string[]>([]);

    function adicionarEntrada(novaEntrada: string) {
        if (novaEntrada && novaEntrada.length > 0) {
            setListaEntradas([...listaEntradas, novaEntrada]);
        }
    }

    function removerEntrada(entradaRemover: string) {
        setListaEntradas(listaEntradas.filter(entrada => entrada.toUpperCase() !== entradaRemover.toUpperCase()));
    }

    useEffect(() => {
        if (algoritmo) {
            setLinguagemSelecionada(algoritmo.linguagensDisponiveis[0]);
            setCode(languageDefaults(algoritmo.linguagensDisponiveis[0]));
        }
    }, [algoritmo]);

    useEffect(() => {
        if (linguagemSelecionada) {
            setCode(languageDefaults(linguagemSelecionada));
        }
    }, [linguagemSelecionada])

    return (
        <FullScreenContainer>
            {
                isBuscandoAlgoritmoPorId && erros.length <= 0 ?
                    <LoadingScreen />
                    :
                    <>
                        <DetalhesAlgoritmo titulo={algoritmo ? algoritmo.titulo : ''}
                            nivelDificuldade={algoritmo ? NiveisDificuldadeEnum[algoritmo.idNivelDificuldade] : ''}
                            descricao={algoritmo ? algoritmo.htmlDescricao : ''}
                            linguagemSelecionada={linguagemSelecionada}
                            onLinguagemClicked={(linguagem: LinguagensProgramacao) => setLinguagemSelecionada(linguagem)}
                            linguagensDisponiveis={algoritmo ? algoritmo.linguagensDisponiveis : []} />

                        <AmbienteDesenvolvimentoContainer>
                            <CodeEditor code={code}
                                linguagemSelecionada={linguagemSelecionada}
                                onCodeChange={(code) => setCode(code)} />

                            <EntradaSaida entradas={listaEntradas}
                                adicionarEntrada={adicionarEntrada}
                                removerEntrada={removerEntrada} />
                        </AmbienteDesenvolvimentoContainer>
                    </>
            }
        </FullScreenContainer >
    );
}