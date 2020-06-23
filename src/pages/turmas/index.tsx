import { Container, TextField, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { FlexLine } from "../../components/flex-helpers/index";
import { useDocumentTitle, useSnackbars } from "../../components/hooks/index";
import { LoadingScreen } from "../../components/loading/index";
import { useAuth } from "../../contexts/AuthProvider";
import {
  useSolicitacaoAcesso,
  useTurmaState
} from "../../modules/turmas/hooks";
import { OrdenacaoSelect } from "./ordenacao-select";
import { PaginatedGrid } from "./paginated-grid/index";

const TurmaScreen = ({ title }: { title: string }) => {
  useDocumentTitle(title);
  const [busca, setBusca] = useState("");
  const [paginaAtual, setPaginaAtual] = useState(0);
  const [ordenacao, setOrdenacao] = useState<1 | 2>(1);
  const [direcaoOrdenacao, setDirecaoOrdenacao] = useState<"asc" | "desc">(
    "asc"
  );

  const { user, firstAccess } = useAuth();
  const [userName, setUserName] = useState("");
  const [turmaSelecionada, setTurmaSelecionada] = useState("");

  const history = useHistory();
  const { success, error } = useSnackbars();

  const {
    turmas,
    isBuscandoTurmas,
    escolherTurma,
    buscarTurmas,
  } = useTurmaState();

  useEffect(() => {
    buscarTurmas(busca, ordenacao, direcaoOrdenacao, paginaAtual, 6);
  }, [buscarTurmas, busca, paginaAtual, ordenacao, direcaoOrdenacao]);

  const { solicitarAcesso } = useSolicitacaoAcesso();

  useEffect(() => {
    if (turmas && turmas.pageIndex > turmas.totalPages - 1) {
      setPaginaAtual(0);
    }
  }, [turmas]);

  useEffect(() => {
    if (user && user.nomeCompleto) {
      setUserName(user.nomeCompleto);
    }
  }, [user]);

  if (firstAccess === null) {
    return <LoadingScreen style={{ margin: 15 }} />;
  } else if (firstAccess) {
    return <Redirect to="/primeiro-acesso" />;
  }

  return (
    <Container>
      <Typography variant="h5" style={{ marginTop: 15 }}>
        Olá {userName}, seja bem-vindo à Program.Acad!
      </Typography>
      <FlexLine style={{ justifyContent: "space-between" }}>
        <TextField
          label="Buscar turmas"
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
        isLoading={isBuscandoTurmas}
        pagedList={turmas}
        onPageChange={(index) => setPaginaAtual(index)}
        onEntrarClick={(turma) => {
          escolherTurma(turma.id);
          history.push(`/algoritmos/${turma.id}`);
        }}
        onInscreverClick={(turma) => {
          solicitarAcesso(
            turma.id as string,
            () => {
              success(
                `Solicitação de acesso à turma ${turma.nomeTurma} foi enviado com sucesso.`
              );
            },
            (errors) => {
              error(errors);
            }
          );
        }}
      />
    </Container>
  );
};

export default TurmaScreen;
