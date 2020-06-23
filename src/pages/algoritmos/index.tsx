import { Button, Container, TextField, Typography } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { FlexLine } from "../../components/flex-helpers";
import { useUserLogin } from "../../components/hooks";
import { useAlgoritmoState } from "../../modules/algoritmos/hooks";
import { OrdenacaoSelect } from "./ordenacao-select";
import { PaginatedGrid } from "./paginated-grid";

export const AlgoritmosScreen = () => {
  const { user } = useUserLogin();
  const [userName, setUserName] = useState("");
  const [busca, setBusca] = useState("");
  const [paginaAtual, setPaginaAtual] = useState(0);
  const [ordenacao, setOrdenacao] = useState<1 | 2>(1);
  const [direcaoOrdenacao, setDirecaoOrdenacao] = useState<"asc" | "desc">(
    "asc"
  );

  const history = useHistory();

  useEffect(() => {
    if (user && user.displayName) {
      setUserName(user.displayName);
    }
  }, [user]);

  const { isBuscandoAlgoritmos, algoritmos } = useAlgoritmoState(
    busca,
    paginaAtual,
    ordenacao,
    direcaoOrdenacao
  );

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
        Turma {algoritmos ? algoritmos.items[0].nomeTurma : ""}
      </Typography>
      <Typography variant="h5" style={{ marginTop: 15, fontWeight: "normal" }}>
        {userName}, você possui{" "}
        {algoritmos ? algoritmos.items[0].pontosNessaTurma : ""} pontos nesta
        turma.
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
