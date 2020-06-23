export type ListagemTurma = {
  id: string;
  nomeInstrutor: string;
  nomeTurma: string;
  imagemTurma: string;
  capacidadeAlunos: number;
  dataTermino: string;
  isUsuarioInscrito: boolean;
};

export type TurmaById = ListagemTurma & {
  qtdePontos: number;
};
