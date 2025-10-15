export const listarLivros = async () => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/books`,
        {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        })

    const data = await response.json();
    return data;
};

export const obterLivro = async (id) => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/books/${id}`,
        {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        })

    const data = await response.json();
    return data;
};

export const criarLivro = async (livro) => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/books`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(livro)
        })

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Erro ao criar livro');

    return data;
};

export const atualizarLivro = async (livro) => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/books`,
        {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(livro)
        })

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Erro ao atualizar livro');

    return data;
};

export const removerLivro = async (id) => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/books/${id}`,
        {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        })

    const data = await response.json()
    if (!response.ok) throw new Error(data.message || 'Erro ao remover livro');

    return data;
};

export default { listarLivros, obterLivro, criarLivro, atualizarLivro, removerLivro };
