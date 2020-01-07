import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';

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

export const useUserData = (user?: firebase.User) => {
    const [userClaims, setUserClaims] = useState<any>(null);
    const [token, setToken] = useState<string>('');
    
    useEffect(() => {
        if (user) {
            user.getIdTokenResult(true)
                .then((result) => {
                    setUserClaims(result.claims);
                    setToken(result.token);
                });
        }

        return () => {
            setUserClaims(null);
            setToken('');
        }
    }, [user]);
    return { userClaims, token };
}