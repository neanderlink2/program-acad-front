import { firebaseErrorCodes } from '../../configs/firebaseConfig';
import { useEffect } from 'react';
import { useSnackbars } from '../../components/hooks/index';
import { useHistory } from 'react-router-dom';

export function useFeedbackUserLogin(error: any) {
    const history = useHistory();
    const { info, warning, error: snackError } = useSnackbars();

    useEffect(() => {
        if (error && error.code) {
            switch (error.code) {
                case firebaseErrorCodes.NOT_FOUND:
                    warning("Usuário ainda não cadastrado.");
                    break;
                case firebaseErrorCodes.WRONG_PASSWORD:
                    warning("Usuário ou senha estão incorretos.");
                    break;
                case firebaseErrorCodes.INVALID_EMAIL:
                    warning("E-mail digitado é inválido.");
                    break;
                case firebaseErrorCodes.ACCOUNT_EXISTING:
                    warning("Opa, esse e-mail está sendo utilizado em uma conta vinculada a outra rede social.");
                    break;
                case firebaseErrorCodes.POPUP_CLOSED:
                    break;
                default:
                    snackError("Houve um problema de conexão com o servidor de autenticação.");
                    break;
            }
        } else {
            if (error && error.user) {
                history.push('/primeiro-acesso');
                info(`Seja bem-vindo à Program.Acad, ${error.user.displayName}!`);
            }
        }
    }, [error, snackError, info, warning, history]);
}