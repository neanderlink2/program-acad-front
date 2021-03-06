import { useSnackbar } from "notistack";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { RootState } from "../../configs/middlewares";

export const useDocumentTitle = (title?: string) => {
  useEffect(() => {
    if (title) {
      document.title = title;
    }
  }, [title]);
};

export const useSnackbars = () => {
  const { enqueueSnackbar } = useSnackbar();
  return {
    default(message: React.ReactNode | string) {
      return enqueueSnackbar(message, { variant: "default" });
    },
    success(message: React.ReactNode | string) {
      return enqueueSnackbar(message, { variant: "success" });
    },
    warning(message: React.ReactNode | string) {
      return enqueueSnackbar(message, { variant: "warning" });
    },
    error(message: React.ReactNode | string) {
      return enqueueSnackbar(message, { variant: "error" });
    },
    info(message: React.ReactNode | string) {
      return enqueueSnackbar(message, { variant: "info" });
    },
  };
};

// export const useUserLogin = () => {
//   const userToken = useSelector((states: RootState) => states.login?.user);

//   const [userClaims, setUserClaims] = useState<any>(null);
//   const [token, setToken] = useState<string>("");
//   const [isPrimeiroAcesso, setIsPrimeiroAcesso] = useState<any>(null);
// /// TO-DO: ALTERAR ESSE HOOK PARA UTILIZAR CONTEXT API.
//   useEffect(() => {
//     if (userToken) {
//       userToken.user.getIdTokenResult(true).then((result) => {
//         setUserClaims(result.claims);
//         setToken(result.token);
//         setIsPrimeiroAcesso(!Boolean(result.claims.nickname));
//       });
//     }
//     return () => {
//       setToken("");
//       setIsPrimeiroAcesso(null);
//     };
//   }, [userToken]);

//   const atualizarUsuario = () => {
//     if (userToken) {
//       updateUser(userToken.user);
//     }
//   };

//   return {
//     userClaims,
//     user: userToken?.user,
//     token,
//     isPrimeiroAcesso,
//     atualizarUsuario,
//   };
// };

export const useUserData = () => {
  const userToken = useSelector((states: RootState) => states.login?.user);
  return userToken?.user;
};

export const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};
