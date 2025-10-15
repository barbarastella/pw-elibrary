export const listarLeituras = async () => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/readings`,
        {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        })

    const data = await response.json()
    return data;
};

export const obterLeitura = async (id) => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/readings/${id}`,
        {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        })

    const data = await response.json()
    return data;
};

export const criarLeitura = async (leitura) => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/readings`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(leitura)
        })

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Erro ao criar leitura');

    return data;
};

export const atualizarLeitura = async (leitura) => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/readings`,
        {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(leitura)
        })

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Erro ao atualizar leitura');

    return data;
};

export const removerLeitura = async (id) => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/readings/${id}`,
        {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        })

    const data = await response.json()
    if (!response.ok) throw new Error(data.message || 'Erro ao remover leitura');

    return data;
};

export default { listarLeituras, obterLeitura, criarLeitura, atualizarLeitura, removerLeitura };


