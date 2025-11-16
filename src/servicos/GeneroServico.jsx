import { getToken } from '../seguranca/Auth';

export const listarGeneros = async () => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/genres`,
        {
            method: "GET",
            headers: { "Content-Type": "application/json", "authorization": getToken() },
        })

    const data = await response.json()
    return data;
};

export const obterGenero = async (id) => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/genres/${id}`,
        {
            method: "GET",
            headers: { "Content-Type": "application/json", "authorization": getToken() },
        })

    const data = await response.json()
    return data;
};

export const criarGenero = async (genero) => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/genres`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json", "authorization": getToken() },
            body: JSON.stringify(genero)
        })

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Erro ao criar gênero');

    return data;
};

export const atualizarGenero = async (genero) => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/genres`,
        {
            method: "PUT",
            headers: { "Content-Type": "application/json", "authorization": getToken() },
            body: JSON.stringify(genero)
        })

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Erro ao atualizar gênero');

    return data;
};

export const removerGenero = async (id) => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/genres/${id}`,
        {
            method: "DELETE",
            headers: { "Content-Type": "application/json", "authorization": getToken() },
        })

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Erro ao remover gênero');

    return data;
};

export default { listarGeneros, obterGenero, criarGenero, atualizarGenero, removerGenero };


