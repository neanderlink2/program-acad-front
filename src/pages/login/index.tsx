import {
    Button,
    Card,
    CardContent,
    Container,
    TextField,
    Typography
} from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { WrappedComponentProps } from "react-with-firebase-auth";
import { FlexEnd, FlexLine } from "../../components/flex-helpers/index";
import { useDocumentTitle, useSnackbars } from "../../components/hooks";
import { PasswordField } from "../../components/password-field";
import { FacebookButton } from "../../components/signin-buttons/facebook-button";
import { GitHubButton } from "../../components/signin-buttons/github-button";
import { GoogleButton } from "../../components/signin-buttons/google-button";
import { SimpleButton } from "../../components/signin-buttons/simple-button";
import { useAuth } from "../../contexts/AuthProvider";
import { ModalResetPassword } from "./modal-confirm-reset-password";

interface LoginScreenProps extends WrappedComponentProps {
  title?: string;
  signOut: () => Promise<void | Error> | void;
  signInWithGithub: () => Promise<Error | firebase.auth.UserCredential> | void;
  signInWithGoogle: () => Promise<Error | firebase.auth.UserCredential> | void;
  signInWithFacebook: () => Promise<
    Error | firebase.auth.UserCredential
  > | void;
  signInWithEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<Error | firebase.auth.UserCredential> | void;
}

const LoginScreen = ({ title, user, error }: LoginScreenProps) => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [errorCode, setErrorCode] = useState(undefined);
  const [loginResult, setLoginResult] = useState(undefined);
  const [showModal, setShowModal] = useState(false);

  const history = useHistory();
  const { info } = useSnackbars();
  useDocumentTitle(title);
  const {
    entrarUsuarioSenha,
    entrarFacebook,
    entrarGithub,
    entrarGoogle,
  } = useAuth();
  // useUserLoginFailed(errorCode, () => {
  //     setErrorCode(undefined)
  // });
  // useUserLoginSuccess(loginResult);

  async function loginSenha() {
    await entrarUsuarioSenha(email, senha);
    history.push("/primeiro-acesso");
  }

  async function loginFacebook() {
    await entrarFacebook();
    history.push("/primeiro-acesso");
  }

  async function loginGoogle() {
    await entrarGoogle();
    history.push("/primeiro-acesso");
  }

  async function loginGithub() {
    await entrarGithub();
    history.push("/primeiro-acesso");
  }

  return (
    <Container>
      <Card style={{ margin: 15 }}>
        <CardContent>
          <Typography variant="h5" align="center">
            Entre na Program.Acad
          </Typography>
          <Typography variant="body2">
            Entre utilizando suas redes sociais:
          </Typography>
          <FlexLine>
            <GoogleButton onClick={loginGoogle} />
            <FacebookButton onClick={loginFacebook} />
            <GitHubButton onClick={loginGithub} />
          </FlexLine>
          <Typography variant="body2">
            Ou utilize seu e-mail e senha:
          </Typography>
          <TextField
            fullWidth
            autoFocus
            variant="outlined"
            margin="normal"
            label="E-mail"
            color="secondary"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
          />
          <PasswordField
            fullWidth
            margin="normal"
            variant="outlined"
            label="Senha"
            color="secondary"
            value={senha}
            onChange={({ target }) => setSenha(target.value)}
          />
          <FlexEnd>
            <Button
              variant="text"
              style={{ marginRight: 20 }}
              onClick={() => setShowModal(true)}
            >
              Esqueceu sua senha?
            </Button>
            <SimpleButton onClick={loginSenha} />
          </FlexEnd>
          <FlexLine>
            <Typography>
              Ainda não tem uma conta?{" "}
              <Button
                variant="text"
                color="secondary"
                onClick={() => history.push("/cadastro")}
              >
                Crie uma agora
              </Button>
            </Typography>
          </FlexLine>
        </CardContent>
      </Card>

      <ModalResetPassword
        show={showModal}
        onClose={() => setShowModal(false)}
      />
    </Container>
  );
};

export default LoginScreen;
