import React, { useEffect, useState } from 'react';
import { Container, Typography, TextField } from '@material-ui/core';
import { useUserData, useDocumentTitle, useSnackbars } from '../../components/hooks/index';
import { Redirect, useHistory } from 'react-router-dom';
import { LoadingScreen } from '../../components/loading/index';
import { FlexLine } from '../../components/flex-helpers/index';
import { OrdenacaoSelect } from './ordenacao-select';
import { PaginatedGrid } from './paginated-grid/index';
import { useTurmaState } from '../../modules/turmas/hooks';

const TurmaScreen = ({ title }: { title: string }) => {
    useDocumentTitle(title);
    const [busca, setBusca] = useState('');
    const [paginaAtual, setPaginaAtual] = useState(0);
    const [ordenacao, setOrdenacao] = useState<1 | 2>(1);
    const [direcaoOrdenacao, setDirecaoOrdenacao] = useState<'asc' | 'desc'>('asc');

    const { user, isPrimeiroAcesso } = useUserData();
    const [userName, setUserName] = useState('');
    const [turmaSelecionada, setTurmaSelecionada] = useState('');

    const history = useHistory();
    const { success } = useSnackbars();

    const { turmas, isBuscandoTurmas, escolherTurma } = useTurmaState({
        busca,
        pageIndex: paginaAtual,
        colunaOrdenacao: ordenacao,
        direcaoOrdenacao: direcaoOrdenacao
    });

    useEffect(() => {
        if (turmas && turmas.pageIndex > turmas.totalPages - 1) {
            setPaginaAtual(0);
        }
    }, [turmas])

    useEffect(() => {
        if (user && user.displayName) {
            setUserName(user.displayName);
        }
    }, [user]);

    if (isPrimeiroAcesso === null) {
        return (<LoadingScreen style={{ margin: 15 }} />);
    } else if (isPrimeiroAcesso) {
        return <Redirect to="/primeiro-acesso" />
    }

    return (
        <Container>
            <Typography variant="h5" style={{ marginTop: 15 }}>Olá {userName}, seja bem-vindo à Program.Acad!</Typography>
            <FlexLine style={{ justifyContent: 'space-between' }}>
                <TextField
                    label="Buscar turmas"
                    variant="outlined"
                    margin="normal"
                    type="search"
                    color="secondary"
                    style={{ width: '45%' }}
                    value={busca}
                    onChange={({ target }) => setBusca(target.value)}
                />

                <OrdenacaoSelect direcao={direcaoOrdenacao} ordenacao={ordenacao}
                    onChangeOrdenacao={({ target }) => {
                        if (parseInt(target.value) === 1) {
                            setOrdenacao(1);
                        } else {
                            setOrdenacao(2);
                        }
                    }}
                    onChangeDirecao={() => setDirecaoOrdenacao(direcaoOrdenacao === "asc" ? "desc" : "asc")} />
            </FlexLine>
            <PaginatedGrid isLoading={isBuscandoTurmas}
                pagedList={turmas}
                onPageChange={(index) => setPaginaAtual(index)}
                onEntrarClick={(turma) => {
                    escolherTurma(turma.id);
                    history.push(`/algoritmos/${turma.id}`);
                }}
                onInscreverClick={(turma) => {
                    setTurmaSelecionada(turma.id)
                    success(`Pedido de inscrição feito com sucesso. Por favor, aguarde uma confirmação do prof. ${turma.nomeInstrutor}.`);
                }} />
        </Container>
    );
};


export default TurmaScreen;