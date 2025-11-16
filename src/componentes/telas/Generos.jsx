import { useEffect, useState } from "react";
import { listarGeneros, criarGenero, atualizarGenero, removerGenero } from "../../servicos/GeneroServico.jsx";
import { Card, Button, Form } from "react-bootstrap";
import Dialogo from "../comuns/Dialogo.jsx";
import { getUsuario } from '../../seguranca/Auth.jsx';

function Generos() {
    const [usuario, setUsuario] = useState(getUsuario());
    const [generos, setGeneros] = useState([]);
    const [form, setForm] = useState({ id: null, name: "" });
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [erro, setErro] = useState("");

    const carregar = async () => {
        setLoading(true);
        setErro("");

        try {
            const data = await listarGeneros();
            if (data && data.objeto) setGeneros(data.objeto);
            else setGeneros([]);

        } catch (error) {
            setGeneros([]);
            setErro("Erro ao carregar gêneros: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { carregar(); }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!form.name) return;

        setLoading(true);
        setErro("");
        try {
            let response;

            if (form.id) response = await atualizarGenero(form);
            else response = await criarGenero({ name: form.name });

            if (response && response.objeto) {
                setForm({ id: null, name: "" });
                setShowModal(false);
                await carregar();
            } else {
                setErro("Erro ao salvar gênero. Verifique o console para mais detalhes.");
            }
        } catch (error) {
            setErro("Erro ao salvar gênero: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = () => { setForm({ id: null, name: "" }); setShowModal(true); };
    const handleCloseModal = () => { setShowModal(false); setForm({ id: null, name: "" }); };

    const handleEdit = (genero) => { setForm(genero); setShowModal(true); };

    const onDelete = async (id) => {
        setErro("");
        try {
            await removerGenero(id); await carregar();
        } catch (error) {
            setErro(error?.message || 'Erro ao remover gênero');
        }
    };

    return (
        <div className="container mt-4">

            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="mb-0"><i className="bi bi-collection me-2 icon-book"></i>Gêneros cadastrados</h2>
                    <p className="text-muted mb-0">Total de {generos.length} cadastros</p>
                </div>

                {usuario && <Button className="btn-primary-custom" onClick={handleOpenModal}><i className="bi bi-tag-plus me-2"></i>Novo Gênero</Button>}
            </div>

            {erro && (
                <div className="alert alert-warning-custom mb-4">
                    <i className="bi bi-exclamation-triangle me-2" />{erro}
                </div>
            )}

            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4 mb-4">
                {generos && generos.map(g => (
                    <div className="col" key={g.id}>
                        <Card className="card-custom h-100 fade-in-up">
                            <Card.Body className="card-body-custom text-center d-flex flex-column">

                                <div className="mb-3">
                                    <div className="bg-gradient-primary rounded-circle d-inline-flex align-items-center justify-content-center text-white" style={{ width: '80px', height: '80px' }}>
                                        <i className="bi bi-bookmark-star display-4"></i>
                                    </div>
                                </div>

                                <Card.Title className="mb-2">{g.name}</Card.Title>
                                <div className="text-muted mb-3"><small>ID: #{g.id}</small></div>

                                {usuario?.user_type == 'admin' && <>  <div className="mt-auto">
                                    <div className="d-grid gap-2">
                                        <Button size="sm" className="btn-outline-primary-custom" onClick={() => handleEdit(g)}><i className="bi bi-pencil me-1"></i>Editar</Button>
                                        <Button size="sm" className="btn-outline-danger-custom" onClick={() => onDelete(g.id)}><i className="bi bi-trash me-1"></i>Remover</Button>
                                    </div>
                                </div></>}
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>

            <Dialogo
                show={showModal}
                onHide={handleCloseModal}
                titulo={form.id ? "Editar Gênero" : "Novo Gênero"}
                onSubmit={onSubmit}
                iconeTitulo="bi bi-tags"
                textoBotaoSalvar={form.id ? "Atualizar Gênero" : "Adicionar Gênero"}
                textoBotaoCancelar="Cancelar"
                loading={loading}
                size="lg">

                <div className="text-center mb-4">
                    <div className="bg-gradient-primary rounded-circle d-inline-flex align-items-center justify-content-center text-white" style={{ width: '100px', height: '100px' }}>
                        <i className="bi bi-bookmark-star display-3"></i>
                    </div>
                </div>

                <Form.Group>
                    <Form.Label className="form-label-custom"><i className="bi bi-tag me-2"></i>Nome do Gênero</Form.Label>
                    <Form.Control
                        className="form-control-custom"
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Digite o nome do gênero literário"
                        required />
                </Form.Group>
            </Dialogo>
        </div>
    );
};

export default Generos;


