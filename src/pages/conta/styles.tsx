import styled from 'styled-components';
import { Typography, CardContent } from '@material-ui/core';

export const CenterPanel = styled.div`
    display: flex;
    flex-direction: row;
    flex: 1;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    padding: 15px;
`;

export const SpacedBetweenPanel = styled.div`
    display: flex;
    flex-direction: row;
    flex: 1;
    justify-content: space-between;
    align-items: flex-end;
    flex-wrap: wrap;
`;

export const InlineText = styled(Typography)`
    display: inline-flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: 10pt !important;
    margin: 5px;
`;

export const CardDadosUsuario = styled(CardContent)`
    min-height: 200px; 
    display: flex; 
    flex-direction: column;
`;