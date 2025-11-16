import { jwtDecode } from "jwt-decode";

const NOMEAPP = 'elibrary';

export const getToken = () => {
    const localStorageAutenticacao = localStorage.getItem(NOMEAPP + '/auth');
    const autenticacao = localStorageAutenticacao ? JSON.parse(localStorageAutenticacao) : null;

    if (autenticacao === null) return null;

    if (autenticacao.auth === false) return null;
    else {
        let decoded = jwtDecode(autenticacao.token);

        if (decoded.exp <= Math.floor(new Date() / 1000)) {
            logout();
            throw "Token expirado";
        }
        else return autenticacao.token;
    }
}

export const getUsuario = () => {
    const localStorageAutenticacao = localStorage.getItem(NOMEAPP + '/auth');
    const autenticacao = localStorageAutenticacao ? JSON.parse(localStorageAutenticacao) : null;

    if (autenticacao === null) return null;

    if (autenticacao.auth === false) return null;
    else {
        let decoded = jwtDecode(autenticacao.token);

        if (decoded.exp <= Math.floor(new Date() / 1000)) {
            logout();
            throw "Token expirado";
        }
        else return decoded.usuario;
    }
}

export const login = (json) => { localStorage.setItem(NOMEAPP + '/auth', JSON.stringify(json)); }
export const logout = () => { localStorage.setItem(NOMEAPP + '/auth', JSON.stringify({ "auth": false, "token": '' })); }