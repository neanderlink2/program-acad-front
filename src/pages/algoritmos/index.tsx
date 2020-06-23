import { Button, Container, TextField, Typography } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { FlexLine } from "../../components/flex-helpers";
import { useAuth } from "../../contexts/AuthProvider";
import { useAlgoritmoState } from "../../modules/algoritmos/hooks";
import { useTurmaById } from "../../modules/turmas/hooks";
import LoadingScreen from "../shared/layout/Loading";
import { OrdenacaoSelect } from "./ordenacao-select";
import { PaginatedGrid } from "./paginated-grid";

export const AlgoritmosScreen = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [userName, setUserName] = useState("");
  const [busca, setBusca] = useState("");
  const [paginaAtual, setPaginaAtual] = useState(0);
  const [ordenacao, setOrdenacao] = useState<1 | 2>(1);
  const [direcaoOrdenacao, setDirecaoOrdenacao] = useState<"asc" | "desc">(
    "asc"
  );

  const history = useHistory();
  const { buscarTurmaPorId, isLoading, turma } = useTurmaById();

  useEffect(() => {
    if (user && user.nomeCompleto) {
      setUserName(user.nomeCompleto);
    }
  }, [user]);

  useEffect(() => {
    if (id) {
      buscarTurmaPorId(id);
    }
  }, [id]);

  const { isBuscandoAlgoritmos, algoritmos } = useAlgoritmoState(
    busca,
    paginaAtual,
    ordenacao,
    direcaoOrdenacao
  );

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Container>
      <Button
        variant="text"
        startIcon={<ArrowBack />}
        style={{ marginTop: 15 }}
        onClick={() => history.push("/turmas")}
      >
        Ir para turmas
      </Button>
      <Typography variant="h4" style={{ marginTop: 15 }}>
        Turma {turma?.nomeTurma ?? ""}
      </Typography>
      <Typography variant="h5" style={{ marginTop: 15, fontWeight: "normal" }}>
        {userName}, você possui {turma?.qtdePontos ?? 0} pontos nesta turma.
      </Typography>
      <FlexLine style={{ justifyContent: "space-between" }}>
        <TextField
          label="Buscar algoritmo"
          variant="outlined"
          margin="normal"
          type="search"
          color="secondary"
          style={{ width: "45%" }}
          value={busca}
          onChange={({ target }) => setBusca(target.value)}
        />

        <OrdenacaoSelect
          direcao={direcaoOrdenacao}
          ordenacao={ordenacao}
          onChangeOrdenacao={({ target }) => {
            if (parseInt(target.value) === 1) {
              setOrdenacao(1);
            } else {
              setOrdenacao(2);
            }
          }}
          onChangeDirecao={() =>
            setDirecaoOrdenacao(direcaoOrdenacao === "asc" ? "desc" : "asc")
          }
        />
      </FlexLine>
      <PaginatedGrid
        isLoading={isBuscandoAlgoritmos}
        pagedList={algoritmos}
        onPageChange={(index) => setPaginaAtual(index)}
      />
    </Container>
  );
};
