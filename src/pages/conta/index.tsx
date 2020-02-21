import React, { useMemo } from 'react';
import { useHistoricoAlgoritmos } from '../../modules/detalhes-usuario/hooks';
import { useUserData } from '../../components/hooks/index';
import { Container, Grid, Card, CardMedia, CardContent, Typography, Chip, CircularProgress, IconButton, Button, Fab } from '@material-ui/core';
import { InlineText, SpacedBetweenPanel, CardDadosUsuario, CenterPanel } from './styles';
import { CalendarToday, Room, Mail, Accessibility, Refresh, Edit } from '@material-ui/icons';
import { LinguagensProgramacaoEnum } from '../../models/algoritmos';
import { useHistory } from 'react-router-dom';
import { format, parse } from 'date-fns';

export const ContaScreen = () => {
    const { data, isLoading, buscarHistorico } = useHistoricoAlgoritmos();
    const { userClaims } = useUserData();
    const history = useHistory();
    const dataNascimentoFormatada = useMemo(() => {
        if (userClaims) {
            return format(parse(userClaims.data_nascimento, 'yyyy-MM-dd', new Date()), 'dd/MM/yyyy');
        }
        return "-";
    }, [userClaims]);
    return (
        <Container>
            <Grid container>
                <Grid item xs={12} sm={6} md={3} style={{ padding: 5 }}>
                    <Card>
                        <CardMedia
                            component="img"
                            alt="Perfil usuário"
                            height="200"
                            image={userClaims?.picture ?? ""}
                        />
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={9} style={{ padding: 5 }}>
                    <Card>
                        <CardDadosUsuario>
                            <Typography variant="h4">{userClaims?.name ?? "-"} <small>({userClaims?.nickname ?? "-"})</small>
                                <Fab color="secondary" style={{ float: 'right' }} onClick={() => history.push("/conta/edicao")}>
                                    <Edit />
                                </Fab>
                            </Typography>
                            <SpacedBetweenPanel>
                                <InlineText><CalendarToday style={{ marginRight: 10 }} /> {dataNascimentoFormatada}</InlineText>
                                <InlineText><Room style={{ marginRight: 10 }} /> {userClaims?.cep ?? "-"}</InlineText>
                                <InlineText><Mail style={{ marginRight: 10 }} /> {userClaims?.email ?? "-"}</InlineText>
                                <InlineText><Accessibility style={{ marginRight: 10 }} /> {userClaims?.sexo === "M" ? "Masculino" : "Feminino" ?? "-"}</InlineText>
                            </SpacedBetweenPanel>
                        </CardDadosUsuario>
                    </Card>
                </Grid>
            </Grid>
            <Grid container style={{ marginTop: 15 }}>
                <Grid item xs={12}>
                    <Typography variant="h5">
                        Algoritmos concluídos
                        {
                            !isLoading &&
                            <IconButton onClick={buscarHistorico}>
                                <Refresh />
                            </IconButton>
                        }
                    </Typography>
                </Grid>
                {
                    isLoading ?
                        <CenterPanel>
                            <CircularProgress color="secondary" />
                        </CenterPanel>
                        :
                        data?.map((algoritmo) => {
                            const qtdeAcertos = algoritmo.testes.filter((teste) => teste.sucesso).length;
                            const qtdeTotal = algoritmo.testes.length;
                            const percent = qtdeAcertos / qtdeTotal;
                            return (
                                <Grid item xs={12} sm={6} style={{ padding: 5 }}>
                                    <Card>
                                        <CardContent>
                                            <SpacedBetweenPanel>
                                                <Typography variant="h6">{algoritmo.nomeAlgoritmo}</Typography>
                                                <Chip variant="outlined" label={LinguagensProgramacaoEnum[algoritmo?.linguagemUtilizada ?? "nodejs"]} />
                                            </SpacedBetweenPanel>
                                            <Typography variant="subtitle2" style={{ color: '#b2b2b2' }}>Nível de dificuldade: {algoritmo?.descricaoNivelDificuldade}</Typography>

                                            <Typography variant="body1">Você acertou <b>{(percent * 100).toFixed(2)}%</b> dos testes ao submeter para testes.</Typography>
                                            <Typography variant="body1">Você recebeu <b>{algoritmo.pontosRecebidos}</b> pontos na turma {algoritmo.nomeTurma} por completar esse algoritmo.</Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            )
                        }) ?? null
                }
            </Grid>
        </Container>
    )
}