import firebase from 'firebase/app';

export interface User {
    name: string,
    email: string,
    picture?: string,
    cep?: string,
    cpf?: string,
    data_nascimento: string,
    sexo: string
}

export type UserToken = {
    token: string,
    user: User
};