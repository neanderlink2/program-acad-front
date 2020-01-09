import React, { useEffect, useState } from 'react';
import { Container, Typography, TextField, MenuItem, InputAdornment, IconButton, Grid, Card, CardActionArea, CardMedia, CardContent, CardActions, Button } from '@material-ui/core';
import { useUserData, useSnackbars } from '../../components/hooks/index';
import { Redirect } from 'react-router-dom';
import { LoadingScreen } from '../../components/loading/index';
import { FlexLine } from '../../components/flex-helpers/index';
import { OrdenacaoSelect } from './ordenacao-select';
import { Edit, ExitToApp } from '@material-ui/icons';
import { PaginatedGrid } from './paginated-grid/index';
import { useTurmaState } from '../../modules/turmas/hooks';

const TurmaScreen = () => {
    const [busca, setBusca] = useState('');
    const [paginaAtual, setPaginaAtual] = useState(0);
    const [ordenacao, setOrdenacao] = useState<1 | 2>(1);
    const [direcaoOrdenacao, setDirecaoOrdenacao] = useState<'asc' | 'desc'>('asc');

    const { user, isPrimeiroAcesso } = useUserData();
    const [userNickname, setNickname] = useState('');


    const { turmas, erros, isBuscandoTurmas, limparErros } = useTurmaState({
        busca,
        pageIndex: paginaAtual,
        colunaOrdenacao: ordenacao,
        direcaoOrdenacao: direcaoOrdenacao
    });

    const { warning } = useSnackbars();

    useEffect(() => {
        if (erros && erros.length > 0) {
            for (let erro of erros) {
                warning(erro);
            }
            limparErros();
        }
    }, [erros, warning, limparErros]);

    useEffect(() => {
        if (user && user.displayName) {
            setNickname(user.displayName);
        }
    }, [user]);

    if (isPrimeiroAcesso === null) {
        return (<LoadingScreen style={{ margin: 15 }} />);
    } else if (isPrimeiroAcesso) {
        return <Redirect to="/primeiro-acesso" />
    }

    return (
        <Container>
            <Typography variant="h5" style={{ marginTop: 15 }}>Olá {userNickname}, seja bem-vindo à Program.Acad!</Typography>
            <FlexLine style={{ justifyContent: 'space-between' }}>
                <TextField
                    label="Buscar turmas"
                    variant="outlined"
                    margin="normal"
                    type="search"
                    color="secondary"
                    style={{ width: '35%' }}
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

            <PaginatedGrid isLoading={isBuscandoTurmas} pagedList={turmas} onPageChange={(index) => setPaginaAtual(index)} />

        </Container>
    );
};


export default TurmaScreen;