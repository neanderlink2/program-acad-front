import React, { Fragment, useMemo, useEffect } from 'react';
import { useTurmaState } from '../../../modules/turmas/hooks';
import { ListagemTurma } from '../../../models/turma';
import { Grid, Button, ButtonGroup } from '@material-ui/core';
import { LoadingItem } from './loading-item';
import { GridItem } from './grid-item/index';
import { PagedList } from '../../../models/pagedList';

type PaginatedGridProps = {
    pagedList?: PagedList<any>,
    isLoading: boolean,
    onPageChange: (index: number) => void
}

export const PaginatedGrid = ({ pagedList, isLoading = false, onPageChange }: PaginatedGridProps) => {
    const pagination = useMemo(() => {
        if (pagedList) {
            let pagination: any[] = [];
            for (let i = 0; i < pagedList.totalPages; i++) {
                pagination.push(<Button key={i} variant={i === pagedList.pageIndex ? "contained" : "outlined"} color="secondary" onClick={() => {
                    onPageChange(i);
                }}>{i + 1}</Button>)
            }
            return pagination;
        }
    }, [pagedList]);

    return (
        <Grid container>
            {
                isLoading ?
                    <Fragment><LoadingItem /><LoadingItem /><LoadingItem /></Fragment>
                    :
                    pagedList && pagedList.items.map((turma) => {
                        return <GridItem key={turma.id}
                            image={turma.imagemTurma}
                            imageAlt={turma.titulo}
                            instrutor={turma.nomeInstrutor}
                            isUsuarioInscrito={turma.isUsuarioInscrito}
                            dataHoraTermino={turma.dataTermino}
                            title={turma.titulo} />
                    })
            }
            <Grid item xs={12} style={{ padding: 10, textAlign: 'right' }}>
                {
                    <ButtonGroup color="secondary" aria-label="outlined primary button group">
                        <Button disabled={pagedList ? !pagedList.hasPreviousPage : true} onClick={() => {
                            if (pagedList) {
                                onPageChange(pagedList.pageIndex - 1);
                            }
                        }}> Voltar </Button>
                        {pagination}
                        <Button disabled={pagedList ? !pagedList.hasNextPage : true}
                            onClick={() => {
                                if (pagedList) {
                                    onPageChange(pagedList.pageIndex + 1);
                                }
                            }}> Próximo </Button>
                    </ButtonGroup>
                }
            </Grid>
        </Grid>
    )
}