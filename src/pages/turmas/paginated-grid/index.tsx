import { Button, ButtonGroup, Grid, Typography } from '@material-ui/core';
import React, { Fragment, useMemo } from 'react';
import { PagedList } from '../../../models/pagedList';
import { GridItem } from './grid-item/index';
import { LoadingItem } from './loading-item';

type PaginatedGridProps = {
    pagedList?: PagedList<any>,
    isLoading: boolean,
    onPageChange: (index: number) => void,
    onEntrarClick: (turma: any) => void,
    onInscreverClick: (turma: any) => void
}

export const PaginatedGrid = ({ pagedList, isLoading = false, onPageChange, onEntrarClick, onInscreverClick }: PaginatedGridProps) => {
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
    }, [pagedList, onPageChange]);

    const onItemClick = (turma: any) => {
        if (turma.isUsuarioInscrito) {
            onEntrarClick(turma)
        } else {
            onInscreverClick(turma);
        }
    }

    return (
        <Grid container>
            {
                isLoading ?
                    <Fragment><LoadingItem /><LoadingItem /><LoadingItem /></Fragment>
                    :
                    pagedList && pagedList.items.length <= 0 ?
                        <Typography component="small">Nenhuma turma foi encontrada...</Typography>
                        :
                        pagedList && pagedList.items.map((turma) => {
                            return <GridItem key={turma.id}
                                image={turma.urlImagem}
                                imageAlt={turma.titulo}
                                instrutor={turma.nomeInstrutor}
                                isUsuarioInscrito={turma.isUsuarioInscrito}
                                dataHoraTermino={turma.dataHoraTermino}
                                title={turma.nomeTurma}
                                onItemClicked={() => onItemClick(turma)} />
                        })
            }
            <Grid item xs={12} style={{ padding: 10, textAlign: 'right' }}>
                {
                    isLoading ?
                        null
                        :
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