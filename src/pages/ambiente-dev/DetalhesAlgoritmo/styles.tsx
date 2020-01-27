import React from 'react';
import styled from 'styled-components';
import { LinguagensProgramacao, LinguagensProgramacaoEnum } from '../../../models/algoritmos';
import { Chip } from '@material-ui/core';

export const DetalhesAlgoritmoContainer = styled.div`
    display: flex; 
    flex: 0.3;     
    flex-direction: column;
    background-color: #121212;
    padding: 15px;
    min-width: 450px;
    height: 85vh;
    @media (max-width: 1000px) {
        flex: 1;
        height: auto;
    }
`;

export const DescricaoAlgoritmoContainer = styled.section`
    color: #b4b4b4;
`;

export const TogglableChip = ({ checked, language, onClick, ...props }: { checked: boolean, language: LinguagensProgramacao, onClick: () => void }) => {
    return (
        <Chip {...props} variant={checked ? "default" : "outlined"} onClick={onClick} label={LinguagensProgramacaoEnum[language]} style={{ margin: 5 }} />
    );
}