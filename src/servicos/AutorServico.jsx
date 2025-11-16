import { getToken } from '../seguranca/Auth';

export const listarAutores = async () => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/authors`,
        {
            method: "GET",
            headers: { "Content-Type": "application/json", "authorization": getToken() },
        })

    const data = await response.json()
    return data;
};

export const obterAutor = async (id) => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/authors/${id}`,
        {
            method: "GET",
            headers: { "Content-Type": "application/json", "authorization": getToken() },
        })

    const data = await response.json();
    return data;
};

export const criarAutor = async (autor) => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/authors`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json", "authorization": getToken() },
            body: JSON.stringify(autor)
        })

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Erro ao criar autor');

    return data;
};

export const atualizarAutor = async (autor) => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/authors`,
        {
            method: "PUT",
            headers: { "Content-Type": "application/json", "authorization": getToken() },
            body: JSON.stringify(autor)
        })

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Erro ao atualizar autor');

    return data;
};

export const removerAutor = async (id) => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/authors/${id}`,
        {
            method: "DELETE",
            headers: { "Content-Type": "application/json", "authorization": getToken() },
        })

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Erro ao remover autor');

    return data;
};

export default { listarAutores, obterAutor, criarAutor, atualizarAutor, removerAutor };


