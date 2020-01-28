import styled from 'styled-components';
import { DialogTitle, Typography } from '@material-ui/core';

export const TestsContainer = styled.div`
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
`

export const TestResult = styled.div<{ backgroundColor: string }>`
    width: 80px;
    height: 80px;
    margin: 5px;
    background-color: ${props => props.backgroundColor};
    border-radius: 3px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

export const ModalTitle = styled(Typography)`
    display: inline;
    border-bottom: 1px solid #d2d2d2;
    padding-bottom: 10px;    
    font-size: 24pt;
    color: #f0f0f0;    
    padding-right: 35px;
`;