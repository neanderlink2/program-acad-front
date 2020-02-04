import firebase from 'firebase/app';
import { LinguagensProgramacao } from './algoritmos';

// export interface User {
//     name: string,
//     email: string,
//     picture?: string,
//     cep?: string,
//     cpf?: string,
//     data_nascimento: string,
//     sexo: string
// }

export type UserToken = {
    token: string,
    user: firebase.User
};

export type HistoricoAlgoritmoUsuario = {
    nomeUsuario?: string,
    nomeAlgoritmo?: string,
    descricaoNivelDificuldade?: string,
    nomeTurma?: string,
    linguagemUtilizada?: LinguagensProgramacao,
    dataConclusao: Date,
    pontosRecebidos: number,
    percentAcertos: number,
    testes: HistoricoCasoTesteUsuario[]
}

export type HistoricoCasoTesteUsuario = {
    idCasoTeste?: string,
    idAlgoritmo?: string,
    idUsuario?: string,
    sucesso: boolean,
    tempoExecucao: number,

    linguagemUtilizada: LinguagensProgramacao
}