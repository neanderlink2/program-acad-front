import {
    Button, Card,

    CardContent, CardMedia,



    CircularProgress, Grid,



    Typography
} from "@material-ui/core";
import { Edit, ExitToApp } from "@material-ui/icons";
import { format, parse } from "date-fns";
import React, { useMemo } from "react";
import { FlexLine } from "../../../../components/flex-helpers/index";
import { useSolicitacaoAcesso } from "../../../../modules/turmas/hooks";

type GridItemProps = {
  image?: any | undefined;
  imageAlt?: any | undefined;
  title: any;
  instrutor: any;
  dataHoraTermino: any;
  isUsuarioInscrito: any;
  key?: any;
  onItemClicked: () => void;
};

export const GridItem = ({
  image,
  imageAlt,
  title,
  dataHoraTermino,
  instrutor,
  isUsuarioInscrito,
  onItemClicked,
}: GridItemProps) => {
  const dataFormatada = useMemo(() => {
    const date = parse(dataHoraTermino, "yyyy-MM-dd'T'HH:mm:ss", new Date());
    const formatado = `${format(date, "dd/MM/yyyy 'às' HH:mm")}`;
    return formatado;
  }, [dataHoraTermino]);

  const { isSolicitandoAcesso } = useSolicitacaoAcesso();
  return (
    <Grid item xs={12} sm={6} lg={4} style={{ padding: 5 }}>
      <Card>
        <CardMedia image={image} title={imageAlt} style={{ height: 150 }} />
        <CardContent>
          <Typography variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Ministrado por {instrutor}
          </Typography>
          <FlexLine style={{ justifyContent: "space-between" }}>
            <Typography variant="body2" color="textSecondary">
              Encerra em {dataFormatada}
            </Typography>
            {isUsuarioInscrito ? (
              <Button
                color="secondary"
                variant="contained"
                startIcon={<ExitToApp />}
                onClick={onItemClicked}
              >
                {" "}
                Entrar
              </Button>
            ) : (
              <Button
                color="secondary"
                variant="outlined"
                startIcon={
                  isSolicitandoAcesso ? (
                    <CircularProgress size={12} />
                  ) : (
                    <Edit />
                  )
                }
                disabled={isSolicitandoAcesso}
                onClick={onItemClicked}
              >
                {isSolicitandoAcesso
                  ? "Aguarde um instante..."
                  : "Inscrever-se"}{" "}
              </Button>
            )}
          </FlexLine>
        </CardContent>
      </Card>
    </Grid>
  );
};
