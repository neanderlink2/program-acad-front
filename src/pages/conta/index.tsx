import React, { useEffect } from 'react';
import { useHistoricoAlgoritmos } from '../../modules/detalhes-usuario/hooks';
import { useUserData } from '../../components/hooks/index';
import { Container, Grid, Card, CardMedia, CardContent, Typography, Chip, CircularProgress, IconButton } from '@material-ui/core';
import { InlineText, SpacedBetweenPanel, CardDadosUsuario, CenterPanel } from './styles';
import { CalendarToday, Room, Mail, Accessibility, Refresh } from '@material-ui/icons';
import { LinguagensProgramacaoEnum } from '../../models/algoritmos';

export const ContaScreen = () => {
    const { data, isLoading, buscarHistorico } = useHistoricoAlgoritmos();
    const { userClaims, user } = useUserData();

    return (
        <Container>
            <Grid container>
                <Grid item xs={6} sm={4} md={2} style={{ paddingRight: 5 }}>
                    <Card>
                        <CardMedia
                            component="img"
                            alt="Perfil usuário"
                            height="200"
                            image={user?.photoURL ?? ""}
                        />
                    </Card>
                </Grid>
                <Grid item xs={6} sm={8} md={10} style={{ paddingLeft: 5 }}>
                    <Card>
                        <CardDadosUsuario>
                            <Typography variant="h4">{user?.displayName ?? ""} <small>({userClaims?.nickname ?? ""})</small></Typography>
                            <SpacedBetweenPanel>
                                <InlineText><CalendarToday style={{ marginRight: 10 }} /> 00/00/0000</InlineText>
                                <InlineText><Room style={{ marginRight: 10 }} /> 00.000-000</InlineText>
                                <InlineText><Mail style={{ marginRight: 10 }} /> email.usuario@email.com</InlineText>
                                <InlineText><Accessibility style={{ marginRight: 10 }} /> Masculino</InlineText>
                            </SpacedBetweenPanel>
                        </CardDadosUsuario>
                    </Card>
                </Grid>
            </Grid>
            <Grid container style={{ marginTop: 15 }}>
                <Grid item xs={12}>
                    <Typography variant="h5">
                        Algoritmos concluídos
                        <IconButton onClick={buscarHistorico}>
                            {isLoading ? <CircularProgress color="inherit" size={12} /> : <Refresh />}
                        </IconButton>
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