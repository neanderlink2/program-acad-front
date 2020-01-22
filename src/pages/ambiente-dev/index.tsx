import React, { useState, useEffect } from 'react';
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-csharp";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/ext-spellcheck";
import 'ace-builds/src-noconflict/ext-searchbox';

import "ace-builds/src-noconflict/theme-tomorrow_night_eighties"

import { useAlgoritmoPorIdState } from '../../modules/algoritmos/hooks';
import { Typography, Chip, Button } from '@material-ui/core';
import { useSnackbars } from '../../components/hooks/index';
import { LoadingScreen } from '../../components/loading/index';
import HtmlParser from 'react-html-parser';
import { FullScreenContainer, DetalhesAlgoritmoContainer, InlineChips, DescricaoAlgoritmoContainer, TogglableChip } from './styles';
import { LinguagensProgramacaoEnum, NiveisDificuldadeEnum, languageDefaults, LinguagensProgramacao } from '../../models/algoritmos';
import { useHistory, useParams } from 'react-router-dom';
import { ArrowLeft } from '@material-ui/icons';

const getAceEditorMode = (language?: LinguagensProgramacao) => {
    switch (language) {
        case 'csharp':
            return "csharp";
        case 'java':
            return "java";
        case 'nodejs':
            return "javascript";
        case 'python3':
            return "python";
        default:
            return;
    }
}

export const AmbienteDevScreen = () => {
    const { idTurma } = useParams();
    const { isBuscandoAlgoritmoPorId, algoritmo, erros, limparErros } = useAlgoritmoPorIdState();
    const { warning } = useSnackbars();
    const history = useHistory();

    useEffect(() => {
        if (erros && erros.length > 0) {
            for (let erro of erros) {
                warning(erro);
            }
        }
    }, [erros, warning, limparErros]);

    const [code, setCode] = useState('');
    const [linguagemSelecionada, setLinguagemSelecionada] = useState<LinguagensProgramacao>();

    useEffect(() => {
        if (algoritmo) {
            setLinguagemSelecionada(algoritmo.linguagensDisponiveis[0]);
            setCode(languageDefaults(algoritmo.linguagensDisponiveis[0]));
        }
    }, [algoritmo]);

    return (
        <FullScreenContainer>
            {
                isBuscandoAlgoritmoPorId && erros.length <= 0 ?
                    <LoadingScreen />
                    :
                    <>
                        <DetalhesAlgoritmoContainer>
                            <div>
                                <Button variant="text" onClick={() => history.push(`/algoritmos/${idTurma}`)} startIcon={<ArrowLeft />}>Voltar para turma</Button>
                            </div>

                            <Typography variant="h5">{algoritmo != null ? algoritmo.titulo : ''}</Typography>
                            <InlineChips>
                                {
                                    algoritmo != null &&
                                    algoritmo.linguagensDisponiveis.map((linguagem) => {
                                        return (
                                            <div>
                                                <TogglableChip checked={linguagemSelecionada === linguagem} language={linguagem} onClick={() => {
                                                    setLinguagemSelecionada(linguagem);
                                                    setCode(languageDefaults(linguagem));
                                                }} />
                                            </div>
                                        );
                                    })
                                }
                            </InlineChips>
                            <Typography variant="subtitle2">Nível de dificuldade: {algoritmo != null ? NiveisDificuldadeEnum[algoritmo.idNivelDificuldade] : null}</Typography>
                            <DescricaoAlgoritmoContainer>
                                {HtmlParser(algoritmo != null ? algoritmo.htmlDescricao : '')}
                            </DescricaoAlgoritmoContainer>

                        </DetalhesAlgoritmoContainer>

                        <AceEditor
                            mode={getAceEditorMode(linguagemSelecionada)}
                            theme="tomorrow_night_eighties"
                            height="60vh"
                            onChange={(value) => setCode(value)}
                            name="ambiente-dev"
                            value={code}
                            editorProps={{ $blockScrolling: Infinity }}
                            style={{ flex: 1, flexGrow: 1, minWidth: 350 }}
                            
                            setOptions={{
                                enableBasicAutocompletion: true,
                                enableLiveAutocompletion: true,
                                showLineNumbers: true,
                                useWorker: true,
                                spellcheck: true,
                                tabSize: 4
                            }}
                        />
                    </>
            }
        </FullScreenContainer>
    );
}