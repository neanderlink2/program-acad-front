import React, { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useSelector } from 'react-redux';
import { RootState } from '../../configs/middlewares';

export const useDocumentTitle = (title?: string) => {
    useEffect(() => {
        if (title) {
            document.title = title;
        }
    }, [title]);
}

export const useSnackbars = () => {
    const { enqueueSnackbar } = useSnackbar();
    return {
        default(message: React.ReactNode | string) {
            return enqueueSnackbar(message, { variant: 'default' });
        },
        success(message: React.ReactNode | string) {
            return enqueueSnackbar(message, { variant: 'success' });
        },
        warning(message: React.ReactNode | string) {
            return enqueueSnackbar(message, { variant: 'warning' });
        },
        error(message: React.ReactNode | string) {
            return enqueueSnackbar(message, { variant: 'error' });
        },
        info(message: React.ReactNode | string) {
            return enqueueSnackbar(message, { variant: 'info' });
        }
    }
}

export const useUserData = () => {
    const userToken = useSelector((states: RootState) => states.login.user);

    const [userClaims, setUserClaims] = useState<any>(null);
    const [token, setToken] = useState<string>('');
    const [isPrimeiroAcesso, setIsPrimeiroAcesso] = useState<any>(null);

    useEffect(() => {
        if (userToken) {
            userToken.user.getIdTokenResult(true)
                .then((result) => {
                    setUserClaims(result.claims);
                    setToken(result.token);
                    setIsPrimeiroAcesso(!Boolean(result.claims.nickname));
                });
        }
        return () => {
            setUserClaims(null);
            setToken('');
            setIsPrimeiroAcesso(null);
        }
    }, [userToken]);
    return { userClaims, user: userToken ? userToken.user : undefined, token, isPrimeiroAcesso };
}