import React from 'react';
import { DetalhesAlgoritmoContainer, TogglableChip, DescricaoAlgoritmoContainer, BotaoSubmeterContainer } from './styles';
import { Button, Typography } from '@material-ui/core';
import { InlineChips } from '../styles';
import { LinguagensProgramacao } from '../../../models/algoritmos';
import { useHistory, useParams } from 'react-router-dom';
import { ArrowLeft } from '@material-ui/icons';
import HtmlParser from 'react-html-parser';
import { useValidacaoAlgoritmoState } from '../../../modules/ambiente-dev/hooks';

type DetalhesAlgoritmoType = {
    titulo: string,
    linguagensDisponiveis: LinguagensProgramacao[],
    descricao: string,
    nivelDificuldade: string,
    codigo: string,
    linguagemSelecionada?: LinguagensProgramacao,
    onLinguagemClicked: (linguagem: LinguagensProgramacao) => void
};

export const DetalhesAlgoritmo = ({ titulo, linguagensDisponiveis, descricao, nivelDificuldade, linguagemSelecionada, codigo, onLinguagemClicked }: DetalhesAlgoritmoType) => {
    const history = useHistory();
    const { idTurma } = useParams();
    const { testarCodigo } = useValidacaoAlgoritmoState();
    return (
        <DetalhesAlgoritmoContainer>
            <div>
                <Button variant="text" onClick={() => history.push(`/algoritmos/${idTurma}`)} startIcon={<ArrowLeft />}>Voltar para turma</Button>
            </div>

            <Typography variant="h5">{titulo}</Typography>
            <InlineChips>
                {
                    linguagensDisponiveis.map((linguagem: LinguagensProgramacao) => {
                        return (
                            <div key={`chip-${linguagem}`}>
                                <TogglableChip checked={linguagemSelecionada === linguagem} language={linguagem} onClick={() => {
                                    onLinguagemClicked(linguagem);
                                }} />
                            </div>
                        );
                    })
                }
            </InlineChips>
            <Typography variant="subtitle2">Nível de dificuldade: {nivelDificuldade}</Typography>
            <DescricaoAlgoritmoContainer>
                {HtmlParser(descricao)}
            </DescricaoAlgoritmoContainer>
            <BotaoSubmeterContainer>
                <Button fullWidth variant="contained" color="secondary" onClick={() => testarCodigo(codigo, linguagemSelecionada)}>Enviar para testes</Button>
            </BotaoSubmeterContainer>
        </DetalhesAlgoritmoContainer>
    )
}