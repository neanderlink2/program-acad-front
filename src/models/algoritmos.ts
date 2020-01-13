export type ListagemAlgoritmo = {
    id: string,
    idTurmaPertencente: string,
    nomeTurma: string,
    titulo: string,
    htmlDescricao: string,
    idNivelDificuldade: string,
    linguagensDisponiveis: LinguagensProgramacao[],
    isResolvido: string,
    dataCriacao: string,
    pontosNessaTurma: number
};

export type LinguagensProgramacao = 'csharp' | 'python3' | 'c' | 'java' | 'nodejs';

export const LinguagensProgramacaoEnum = {
    'csharp': 'C#',
    'python3': 'Python',
    'c': "C",
    'java': "Java",
    'nodejs': 'JavaScript'
}