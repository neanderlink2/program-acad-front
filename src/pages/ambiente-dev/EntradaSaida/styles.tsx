import styled from 'styled-components';
import { Typography } from '@material-ui/core';

export const InferiorContainer = styled.div`
    display: flex;
    flex: 0.5;
    flex-direction: row;
    @media (max-width: 1000px) {
        flex: 1;
    }
`;

export const InferiorSection = styled.section<{ rightBordered?: boolean, leftBordered?: boolean }>`
    flex: 1; 
    flex-wrap: wrap;
    padding: 10px;
    border-right: ${({ rightBordered }) => rightBordered ? 'solid 1px #d2d2d2' : 'none'};
    border-left: ${({ leftBordered }) => leftBordered ? 'solid 1px red' : 'none'};
    min-height: 200px;
`;

export const SectionTitle = styled(Typography)`
    width: 100%;
    padding: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
