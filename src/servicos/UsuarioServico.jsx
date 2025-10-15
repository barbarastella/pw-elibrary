export const listarUsuarios = async () => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/users`,
        {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        })

    const data = await response.json()
    return data;
};

export const obterUsuario = async (id) => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/users/${id}`,
        {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        })

    const data = await response.json()
    return data;
};

export const criarUsuario = async (usuario) => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/users`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(usuario)
        })

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Erro ao criar usuário');

    return data;
};

export const atualizarUsuario = async (usuario) => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/users`,
        {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(usuario)
        })

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Erro ao atualizar usuário');

    return data;
};

export const removerUsuario = async (id) => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/users/${id}`,
        {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        })

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Erro ao remover usuário');

    return data;
};

export default { listarUsuarios, obterUsuario, criarUsuario, atualizarUsuario, removerUsuario };


