import React, { useState, useEffect, useMemo } from 'react';
import { Container, Card, CardContent, Typography, Grid, TextField, MenuItem, Button, CircularProgress } from '@material-ui/core';
import InputMask from "react-input-mask";
import { useAtualizacaoDados } from '../../modules/detalhes-usuario/hooks';
import { parse } from 'date-fns'
import { useSnackbars } from '../../components/hooks';
import { useUserData } from '../../components/hooks';
import { useHistory } from 'react-router-dom';
import { format } from 'date-fns'
import { ArrowBack } from '@material-ui/icons';

export const EdicaoContaScreen = () => {
    const [nomeCompleto, setNomeCompleto] = useState('');
    const [cep, setCep] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [sexo, setSexo] = useState('');
    const [requested, setRequested] = useState(false);
    const { isLoading, hasErrors, errors, atualizarDados, limparErros } = useAtualizacaoDados();
    const { userClaims } = useUserData();
    const history = useHistory();
    function onAtualizarClicked() {
        const data = parse(dataNascimento, 'dd/MM/yyyy', new Date());
        atualizarDados({
            nomeCompleto,
            cep,
            dataNascimento: data,
            sexo
        });
        setRequested(true);
    }
    console.log(userClaims);
    const { warning, success } = useSnackbars();

    useEffect(() => {
        if (userClaims) {
            setNomeCompleto(userClaims.name);
            setCep(userClaims.cep);
            setDataNascimento(format(parse(userClaims?.data_nascimento, 'yyyy-MM-dd', new Date()), 'dd/MM/yyyy'));
            setSexo(userClaims.sexo);
        }
    }, [userClaims]);

    useEffect(() => {
        if (hasErrors) {
            for (let erro of errors) {
                warning(erro);
            }
            limparErros();
        } else if (requested && !isLoading) {
            success("Dados atualizados com sucesso.");
            history.push("/conta");
            setRequested(false);
        }
    }, [errors, requested, warning, limparErros]);

    return (
        <Container>
            <Button variant="text" startIcon={<ArrowBack />} style={{ marginTop: 15 }} onClick={() => history.push("/conta")}>Ir para minha conta</Button>
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