import React from 'react';
import { Grid, Card, CardContent, Typography, Button, Chip } from '@material-ui/core';
import { FlexLine } from '../../../../components/flex-helpers/index';
import { PlayArrow, Check } from '@material-ui/icons';
import Truncate from 'react-text-truncate';
import { LinguagensProgramacaoEnum, LinguagensProgramacao } from '../../../../models/algoritmos';

type GridItemProps = {
    title: any,
    nivelDificuldade: string,
    isConcluido: boolean,
    descricao: string,
    linguagensDisponiveis: LinguagensProgramacao[]
    key?: any
}

export const GridItem = ({ title, linguagensDisponiveis, descricao, nivelDificuldade, isConcluido }: GridItemProps) => {
    const descricaoRaw = removeHtmlTags(descricao);

    return (
        <Grid item xs={12} sm={6} lg={4} style={{ padding: 5 }}>
            <Card>
                <CardContent>
                    <Typography variant="h5" align="center" component="h2">{title}</Typography>
                    <Typography variant="body2" color="textSecondary" component="p">Dificuldade: {nivelDificuldade}</Typography>
                    <FlexLine style={{ justifyContent: 'flex-start' }}>
                        {
                            linguagensDisponiveis.map((linguagem: LinguagensProgramacao) => {
                                return (
                                    <Chip label={LinguagensProgramacaoEnum[linguagem]} style={{ margin: 5 }} />
                                )
                            })
                        }
                    </FlexLine>
                    <Typography variant="body2" color="textSecondary" component="div">
                        <Truncate
                            line={2}
                            element="span"
                            truncateText="..."
                            text={descricaoRaw}
                        />
                    </Typography>
                    <FlexLine style={{ justifyContent: 'space-between', marginTop: 15 }}>
                        {
                            isConcluido ?
                                <Button fullWidth color="secondary" variant="contained" disabled startIcon={<Check />}> Concluído</Button>
                                :
                                <Button fullWidth color="secondary" variant="contained" startIcon={<PlayArrow />}> Começar</Button>
                        }
                    </FlexLine>
                </CardContent>
            </Card>
        </Grid>
    );
}

const removeHtmlTags = (html: string) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
}