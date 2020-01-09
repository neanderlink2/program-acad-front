import axios, { AxiosError } from 'axios';
import store from '../configs/middlewares';

const api = axios.create({
    baseURL: 'http://localhost:63856/api',
});

api.interceptors.request.use(async config => {
    const user = store.getState().login.user;

    if (user && user.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
});

export const getRequest = async (url: string, params?: any) => {
    return api.get(url, { params });
}

export const postRequest = async (url: string, body?: any, params?: any) => {
    return api.post(url, body, { params });
}

export const putRequest = async (url: string, body?: any, params?: any) => {
    return api.put(url, { params });
}

export const deleteRequest = async (url: string, params?: any) => {
    return api.delete(url, { params });
}

export const patchRequest = async (url: string, body?: any, params?: any) => {
    return api.patch(url, body, { params });
}

type ApiError = { source: string, detail: string };

export const formatErrors = (error: AxiosError<ApiError[]>): string[] => {
    if (error.response) {
        switch (error.response.status) {
            case 400:
                return error.response.data.map((e: ApiError) => e.detail);
            case 401:
                return ["Não autorizado"];
            case 404:
                return ["Não encontrado"];
            default:
                return ["Erro interno do servidor"];
        }
    }
    return [];
};