import React from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, Button } from '@material-ui/core';
import { FlexLine } from '../../../../components/flex-helpers/index';
import { Edit, ExitToApp } from '@material-ui/icons';
import { format } from 'date-fns'

type GridItemProps = {
    image?: any | undefined,
    imageAlt?: any | undefined,
    title: any,
    instrutor: any,
    dataHoraTermino: any,
    isUsuarioInscrito: any,
    key?: any
}

export const GridItem = ({ key, image, imageAlt, title, dataHoraTermino, instrutor, isUsuarioInscrito }: GridItemProps) => {
    const date = new Date(dataHoraTermino);
    const dataFormatada = `${format(date, 'dd/MM/yyyy')} às ${format(date, 'hh:mm')}`;

    return (
        <Grid key={key} item xs={12} sm={6} lg={4} style={{ padding: 5 }}>
            <Card>
                <CardMedia
                    image={image}
                    title={imageAlt}
                    style={{ height: 150 }}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">{title}</Typography>
                    <Typography variant="body2" color="textSecondary" component="p">Ministrado por {instrutor}</Typography>
                    <FlexLine style={{ justifyContent: 'space-between' }}>
                        <Typography variant="body2" color="textSecondary">Encerra em {dataFormatada}</Typography>
                        {
                            isUsuarioInscrito ?
                                <Button color="secondary" variant="contained" startIcon={<ExitToApp />}> Entrar</Button>
                                :
                                <Button color="secondary" variant="outlined" startIcon={<Edit />}> Inscrever-se</Button>
                        }
                    </FlexLine>
                </CardContent>
            </Card>
        </Grid>
    );
}