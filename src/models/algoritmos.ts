import { csharpDefault, javaDefault, javascriptDefault, pythonDefault } from "./languages-default";

export type ListagemAlgoritmo = {
    id: string,
    idTurmaPertencente: string,
    nomeTurma: string,
    titulo: string,
    htmlDescricao: string,
    idNivelDificuldade: 1 | 2 | 3 | 4 | 5,
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

export const NiveisDificuldadeEnum = {
    '1': 'Muito fácil',
    '2': 'Fácil',
    '3': "Médio",
    '4': "Difícil",
    '5': 'Muito difícil'
}

export const languageDefaults = (language: LinguagensProgramacao) => {
    switch (language) {
        case 'csharp':
            return csharpDefault;
        case 'java':
            return javaDefault;
        case 'nodejs':
            return javascriptDefault;
        case 'python3':
            return pythonDefault;
        default:
            return "";
    }
}