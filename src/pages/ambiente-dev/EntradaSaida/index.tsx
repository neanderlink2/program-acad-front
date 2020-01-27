import React, { useState } from 'react';
import { InferiorContainer, InferiorSection, SectionTitle } from './styles';
import { TextField, InputAdornment, Tooltip, IconButton, Chip, Button, Icon } from '@material-ui/core';
import { InlineChips } from '../styles';
import { Close, PlayArrow } from '@material-ui/icons';
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-text";
import "ace-builds/src-noconflict/theme-terminal";

type EntradaSaidaType = {
    entradas: string[],
    adicionarEntrada: (entrada: string) => void,
    removerEntrada: (entrada: string) => void
}

export const EntradaSaida = ({ entradas, adicionarEntrada, removerEntrada }: EntradaSaidaType) => {
    const [entradaDigitada, setEntradaDigitada] = useState('');

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
                    <Button size="small" startIcon={<PlayArrow />} variant="contained" color="secondary">Executar</Button>
                </SectionTitle>
                <AceEditor
                    mode="text"
                    theme="terminal"
                    readOnly
                    name="saida"
                    //height="100%"
                    highlightActiveLine={false}
                    editorProps={{ $blockScrolling: Infinity }}
                    style={{ flex: 1, flexGrow: 1, width: '100%', height: '80%' }}
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