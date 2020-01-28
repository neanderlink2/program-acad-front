import React, { useState } from 'react';
import { InferiorContainer, InferiorSection, SectionTitle } from './styles';
import { TextField, InputAdornment, Tooltip, IconButton, Chip, Button, Icon, CircularProgress } from '@material-ui/core';
import { InlineChips } from '../styles';
import { Close, PlayArrow } from '@material-ui/icons';
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-text";
import "ace-builds/src-noconflict/theme-terminal";
import { useAmbienteDevState } from '../../../modules/ambiente-dev/hooks';
import { LinguagensProgramacao } from '../../../models/algoritmos';

type EntradaSaidaType = {
    entradas: string[],
    codigo: string,
    linguagemSelecionada?: LinguagensProgramacao,
    adicionarEntrada: (entrada: string) => void,
    removerEntrada: (entrada: string) => void
}

export const EntradaSaida = ({ entradas, linguagemSelecionada, codigo, adicionarEntrada, removerEntrada }: EntradaSaidaType) => {
    const [entradaDigitada, setEntradaDigitada] = useState('');
    const { isCompiling, compileResult, erros, compilar } = useAmbienteDevState(linguagemSelecionada);

    return (
        <InferiorContainer>
            <InferiorSection rightBordered>
                <SectionTitle style={{ marginTop: 5 }}>Entradas</SectionTitle>
                <TextField
                    margin="normal"
                    name="add-input"
                    variant="outlined"
                    label="Entrada"
                    color="secondary"
                    type="text"
                    onChange={({ target }) => setEntradaDigitada(target.value)}
                    value={entradaDigitada}
                    fullWidth
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <Tooltip title="Adicionar entrada" placement="top">
                                    <IconButton
                                        aria-label="Adicionar uma nova entrada"
                                        onClick={() => {
                                            adicionarEntrada(entradaDigitada);
                                            setEntradaDigitada('');
                                        }}>
                                        <Icon>add</Icon>
                                    </IconButton>
                                </Tooltip>
                            </InputAdornment>
                        )
                    }}
                />
                <InlineChips>
                    {
                        entradas.map((entrada: string) => {
                            return (
                                <Chip key={`entrada-${entrada}`}
                                    variant="outlined"
                                    deleteIcon={<Close />}
                                    onDelete={() => removerEntrada(entrada)}
                                    label={entrada}
                                />
                            );
                        })
                    }
                </InlineChips>
            </InferiorSection>
            <InferiorSection>
                <SectionTitle>
                    Saída
                    <Button size="small" startIcon={isCompiling ? <CircularProgress size={15} /> : <PlayArrow />}
                        disabled={isCompiling}
                        onClick={() => compilar(codigo, entradas)}
                        variant="contained" color="secondary">{isCompiling ? 'Executando...' : 'Executar'}</Button>
                </SectionTitle>
                <AceEditor
                    mode="text"
                    theme="terminal"
                    readOnly
                    name="saida"
                    //height="100%"
                    highlightActiveLine={false}
                    value={compileResult ? compileResult.output : ''}
                    editorProps={{ $blockScrolling: Infinity }}
                    style={{ flex: 1, flexGrow: 1, width: '100%', height: '80%', color: compileResult && compileResult.hasCompilingError ? 'red' : 'inherit' }}
                    setOptions={{
                        showLineNumbers: false,
                        showGutter: false,
                        tabSize: 4
                    }}
                />
            </InferiorSection>
        </InferiorContainer>
    )
}