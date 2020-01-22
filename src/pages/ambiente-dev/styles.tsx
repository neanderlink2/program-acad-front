import styled from 'styled-components';
import React, { PropsWithChildren } from 'react';
import { Chip } from '@material-ui/core';
import { LinguagensProgramacaoEnum, LinguagensProgramacao } from '../../models/algoritmos';

export const DetalhesAlgoritmoContainer = styled.div`
    display: flex; 
    flex: 0.5;     
    flex-direction: column;
    background-color: #121212;
    padding: 15px;
    min-width: 250px;
    @media (max-width: 600px) {
        flex: 1;
    }
`;

export const DescricaoAlgoritmoContainer = styled.section`
    color: #b4b4b4;
`;

export const FullScreenContainer = styled.div`
    display: flex; 
    flex-wrap: wrap;
    flex: 1;
    flex-grow: 1;
`;

export const InlineChips = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
`;

export const TogglableChip = ({ checked, language, onClick, ...props }: { checked: boolean, language: LinguagensProgramacao, onClick: () => void }) => {
    return (
        <Chip {...props} variant={checked ? "default" : "outlined"} onClick={onClick} label={LinguagensProgramacaoEnum[language]} style={{ margin: 5 }} />
    );
}