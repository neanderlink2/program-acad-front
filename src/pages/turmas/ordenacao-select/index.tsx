import React from 'react';
import { TextField, InputAdornment, IconButton, MenuItem, Tooltip } from '@material-ui/core';
import { TextRotateUp, TextRotationDown } from '@material-ui/icons';

type OrdenacaoSelectProps = {
    ordenacao: 1 | 2,
    direcao: 'asc' | 'desc',
    onChangeOrdenacao: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
    onChangeDirecao: () => void
}

export const OrdenacaoSelect = ({ ordenacao, direcao, onChangeOrdenacao, onChangeDirecao }: OrdenacaoSelectProps) => {
    return (
        <TextField
            select
            margin="normal"
            variant="outlined"
            label="Ordenação"
            type="text"
            color="secondary"
            style={{ width: '35%' }}
            value={ordenacao}
            onChange={onChangeOrdenacao}
            InputProps={{
                startAdornment:
                    (
                        <InputAdornment position="start">
                            <Tooltip title={direcao === "asc" ? "Mudar para ordenação do maior para o menor" : "Mudar para ordenação do menor para o maior"}>
                                <IconButton aria-label="Toggle password visibility" onClick={onChangeDirecao}>
                                    {
                                        direcao === "asc" ?
                                            <TextRotationDown />
                                            :
                                            <TextRotateUp />
                                    }
                                </IconButton>
                            </Tooltip>

                        </InputAdornment>
                    )
            }}
        >
            <MenuItem value={1}>Ordenar por Nome</MenuItem>
            <MenuItem value={2}>Ordenar por Data de Encerramento</MenuItem>
        </TextField>
    )
}