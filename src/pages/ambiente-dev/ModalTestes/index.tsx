import React from 'react';
import { Dialog, Slide, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, DialogProps, CircularProgress } from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions';
import { TestResult, TestsContainer, ModalTitle } from './styles';
import { Check, Close } from '@material-ui/icons';
import { useValidacaoAlgoritmoState } from '../../../modules/ambiente-dev/hooks';
import { useHistory, useParams } from 'react-router-dom';
import { Animated } from "react-animated-css";


const Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export const ModalTestes = () => {
    const { isValidando, isTesting, resultados, erros, limparResultado } = useValidacaoAlgoritmoState();
    const history = useHistory();
    const { idTurma } = useParams();

    return (
        <Dialog
            open={isValidando}
            TransitionComponent={Transition}
            onClose={() => { }}
        >
            <DialogContent>
                <ModalTitle variant="h5">Validação do algoritmo</ModalTitle>
                {
                    resultados && resultados.length > 0 ?
                        <DialogContentText style={{ marginTop: 15 }}>Os resultados de sua submissão são:</DialogContentText>
                        :
                        <DialogContentText style={{ marginTop: 15 }}>Seu algoritmo está sendo executado. Por favor, aguarde um instante...</DialogContentText>
                }

                <TestsContainer>
                    {
                        isTesting ?
                            <CircularProgress color="secondary" />
                            :
                            <>
                                {
                                    resultados && resultados.map((result) => {
                                        return (
                                            <Animated animationIn={result.sucesso ? "bounceIn" : "shake"} animationOut="fadeOut" isVisible={true}>
                                                <TestResult backgroundColor={result.sucesso ? "#c8e6c9" : "#ffcdd2"}>
                                                    {
                                                        result.sucesso ?
                                                            <Check style={{ color: '#2e7d32', fontSize: 48 }} />
                                                            :
                                                            <Close style={{ color: '#c62828', fontSize: 48 }} />
                                                    }
                                                </TestResult>
                                            </Animated>
                                        )
                                    })
                                }
                            </>
                    }
                </TestsContainer>
                {
                    !isTesting &&
                    resultados &&
                    resultados.filter((result) => !result.sucesso).length > 0 &&
                    <DialogContentText style={{ marginTop: 15 }}>Opa, parece que nem todos os testes estão corretos... Faça mais algumas validações e tente novamente!</DialogContentText>
                }
                {
                    !isTesting &&
                    resultados &&
                    resultados.filter((result) => !result.sucesso).length === 0 &&
                    <DialogContentText style={{ marginTop: 15 }}>Parabéns! Você resolveu o algoritmo corretamente!</DialogContentText>
                }
            </DialogContent>
            <DialogActions>
                {
                    !isTesting &&
                    resultados &&
                    resultados.filter((result) => !result.sucesso).length > 0 &&
                    <Button variant="contained" color="secondary" onClick={() => limparResultado()}>Voltar para o código</Button>
                }
                {
                    !isTesting &&
                    resultados &&
                    resultados.filter((result) => !result.sucesso).length === 0 &&
                    <Button variant="contained" color="secondary" onClick={() => {
                        limparResultado();
                        history.push(`/algoritmos/${idTurma}`)
                    }}>Retornar ao menu principal</Button>
                }
            </DialogActions>
        </Dialog>
    )
}