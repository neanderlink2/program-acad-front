import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbars } from "../../components/hooks";
import {
  signInWithFacebook,
  signInWithGithub,
  signInWithGoogle,
  signInWithSimple,
  signOut
} from "../../configs/firebaseConfig";
import { RootState } from "../../configs/middlewares";
import { storeUser } from "../../modules/login/actions";
import { AuthContextType, AuthProviderUser } from "./types";

const AuthContext = createContext<AuthContextType>({
  authenticated: false,
  entrarUsuarioSenha: (email: string, senha: string) => {},
  entrarFacebook: () => {},
  entrarGithub: () => {},
  entrarGoogle: () => {},
  sair: () => {},
  firstAccess: null,
  loading: false,
  hydrating: false,
  user: null,
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};

export default function AuthProvider({ children }: PropsWithChildren<{}>) {
  const dispatch = useDispatch();
  const firebaseTokenUser = useSelector(
    (states: RootState) => states.login?.user
  );
  const [isLoading, setIsLoading] = useState(false);
  const [hydrating, setHydrating] = useState(true);
  const { success } = useSnackbars();
  const [usuario, setUsuario] = useState<AuthProviderUser | null>(null);
  const [isPrimeiroAcesso, setIsPrimeiroAcesso] = useState<boolean | null>(
    null
  );

  async function entrarUsuarioSenha(email: string, senha: string) {
    setIsLoading(true);
    const signInResponse = await signInWithSimple(email, senha);
    dispatch(
      storeUser({
        user: signInResponse.user,
        token: signInResponse.user?.refreshToken,
      })
    );
    success(
      `Seja bem-vindo(a) à Program.Acad, ${signInResponse.user?.displayName}!`
    );
    setIsLoading(false);
  }

  async function entrarFacebook() {
    setIsLoading(true);
    const signInResponse = await signInWithFacebook();
    dispatch(
      storeUser({
        user: signInResponse.user,
        token: signInResponse.user?.refreshToken,
      })
    );
    success(
      `Seja bem-vindo(a) à Program.Acad, ${signInResponse.user?.displayName}!`
    );
    setIsLoading(false);
  }

  async function entrarGithub() {
    setIsLoading(true);
    const signInResponse = await signInWithGithub();
    dispatch(
      storeUser({
        user: signInResponse.user,
        token: signInResponse.user?.refreshToken,
      })
    );
    success(
      `Seja bem-vindo(a) à Program.Acad, ${signInResponse.user?.displayName}!`
    );
    setIsLoading(false);
  }

  async function entrarGoogle() {
    setIsLoading(true);
    const signInResponse = await signInWithGoogle();
    dispatch(
      storeUser({
        user: signInResponse.user,
        token: signInResponse.user?.refreshToken,
      })
    );
    success(
      `Seja bem-vindo(a) à Program.Acad, ${signInResponse.user?.displayName}!`
    );
    setIsLoading(false);
  }

  function sair() {
    signOut().then(() => setUsuario(null));
  }

  useEffect(() => {
    setHydrating(false);
  }, []);

  useEffect(() => {
    if (firebaseTokenUser && firebaseTokenUser.user) {
      firebaseTokenUser.user?.getIdTokenResult(false).then((result) => {
        setUsuario({
          nickname: result.claims.nickname,
          cep: result.claims.cep,
          cpf: result.claims.cpf,
          sexo: result.claims.sexo,
          picture: firebaseTokenUser.user?.photoURL ?? "",
          dataNascimento: result.claims?.data_nascimento ? new Date(result.claims?.data_nascimento) : undefined,
          email: firebaseTokenUser.user?.email ?? "",
          nomeCompleto: firebaseTokenUser.user?.displayName ?? "",
        });
        setIsPrimeiroAcesso(!result.claims.nickname);
      });
    }
  }, [firebaseTokenUser]);

  return (
    <AuthContext.Provider
      value={{
        user: usuario,
        authenticated: !!usuario,
        entrarUsuarioSenha,
        entrarFacebook,
        entrarGithub,
        entrarGoogle,
        sair,
        firstAccess: isPrimeiroAcesso,
        loading: isLoading,
        hydrating,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
