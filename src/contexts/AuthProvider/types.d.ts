export interface AuthProviderUser {
  nomeCompleto: string;
  email: string;
  picture?: string;
  nickname?: string;
  cep?: string;
  cpf?: string;
  dataNascimento?: Date;
  sexo?: "M" | "F";
}

export type AuthContextType = {
  user: AuthProviderUser | null;
  loading: boolean;
  authenticated: boolean;
  hydrating: boolean;
  firstAccess: boolean | null;
  entrarUsuarioSenha(usuario: string, senha: string): Promise<void> | void;
  entrarFacebook(): Promise<void> | void;
  entrarGithub(): Promise<void> | void;
  entrarGoogle(): Promise<void> | void;
  sair(): void;
};
