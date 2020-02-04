import React, { useState } from 'react';
import { Container, Card, CardContent, Typography, Grid, TextField, MenuItem, Button, CircularProgress } from '@material-ui/core';
import InputMask from "react-input-mask";
import { useAtualizacaoDados } from '../../modules/detalhes-usuario/hooks';
import { parse } from 'date-fns'

export const EdicaoContaScreen = () => {
    const [nomeCompleto, setNomeCompleto] = useState('');
    const [cep, setCep] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [sexo, setSexo] = useState('');

    const { isLoading, hasErrors, errors, atualizarDados } = useAtualizacaoDados();

    function onAtualizarClicked() {
        const data = parse(dataNascimento, 'dd/MM/yyyy', new Date());
        atualizarDados({
            nomeCompleto,
            cep,
            dataNascimento: data,
            sexo
        });
    }

    return (
        <Container>
            <Card style={{ margin: 15 }}>
                <CardContent>
                    <Typography variant="h5">Atualização do perfil</Typography>
                    <Grid container>
                        <Grid item xs={12} sm={6} style={{ padding: 5 }}>
                            <TextField fullWidth
                                autoFocus
                                autoComplete="new-password"
                                variant="outlined"
                                margin="normal"
                                label="Nome completo"
                                color="secondary"
                                value={nomeCompleto}
                                onChange={({ target }) => setNomeCompleto(target.value)} />
                        </Grid>
                        <Grid item xs={12} sm={6} style={{ padding: 5 }}>
                            <InputMask mask="99999-999" value={cep} onChange={({ target }) => setCep(target.value)}>
                                {
                                    () => (
                                        <TextField fullWidth
                                            autoComplete="new-password"
                                            type="text"
                                            variant="outlined"
                                            margin="normal"
                                            label="CEP"
                                            color="secondary"
                                        />
                                    )
                                }
                            </InputMask>

                        </Grid>
                        <Grid item xs={12} sm={6} style={{ padding: 5 }}>
                            <InputMask mask="99/99/9999" value={dataNascimento} onChange={({ target }) => setDataNascimento(target.value)}>
                                {
                                    () => (
                                        <TextField fullWidth
                                            autoComplete="new-password"
                                            variant="outlined"
                                            margin="normal"
                                            label="Data de Nascimento"
                                            color="secondary"
                                        />
                                    )
                                }
                            </InputMask>
                        </Grid>
                        <Grid item xs={12} sm={6} style={{ padding: 5 }}>
                            <TextField fullWidth
                                select
                                autoComplete="new-password"
                                variant="outlined"
                                margin="normal"
                                label="Sexo"
                                color="secondary"
                                value={sexo}
                                onChange={({ target }) => setSexo(target.value)}>
                                <MenuItem value="M">Masculino</MenuItem>
                                <MenuItem value="F">Feminino</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} style={{ textAlign: 'right' }}>
                            <Button color="secondary"
                                variant="contained"
                                disabled={isLoading}
                                startIcon={isLoading && <CircularProgress size={12} />}
                                onClick={onAtualizarClicked}>Atualizar perfil</Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Container>
    )
}