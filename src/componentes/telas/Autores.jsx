import { useEffect, useState } from "react";
import { listarAutores, criarAutor, atualizarAutor, removerAutor } from "../../servicos/AutorServico.jsx";
import { Card, Button, Form } from "react-bootstrap";
import Dialogo from "../comuns/Dialogo.jsx";

function Autores() {
    const [autores, setAutores] = useState([]);
    const [form, setForm] = useState({ id: null, name: "" });
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [erro, setErro] = useState("");

    const carregar = async () => {
        setLoading(true);
        setErro("");

        try {
            const data = await listarAutores();

            if (data && data.objeto) setAutores(data.objeto);
            else setAutores([]);

        } catch (error) {
            setAutores([]);
            setErro("Erro ao carregar autores: " + error.message);
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

            if (form.id) response = await atualizarAutor(form);
            else response = await criarAutor({ name: form.name });

            if (response && response.objeto) {
                setForm({ id: null, name: "" });
                setShowModal(false);
                await carregar();
            } else setErro("Erro ao salvar autor. Verifique o console para mais detalhes.");

        } catch (error) {
            setErro("Erro ao salvar autor: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleCloseModal = () => { setShowModal(false); setForm({ id: null, name: "" }); };
    const handleOpenModal = () => { setForm({ id: null, name: "" }); setShowModal(true); };

    const onEdit = (autor) => { setForm(autor); setShowModal(true); };

    const onDelete = async (id) => {
        setErro("");
        try {
            await removerAutor(id); await carregar();
        } catch (error) {
            setErro(error?.message || 'Erro ao remover autor');
        }
    };

    return (
        <div className="container mt-4">

            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="mb-0"><i className="bi bi-people me-2 icon-user" />Autores cadastrados</h2>
                    <p className="text-muted mb-0">Total de {autores.length} cadastros</p>
                </div>

                <Button className="btn-primary-custom" onClick={handleOpenModal}><i className="bi bi-person-plus me-2"></i>Novo Autor </Button>
            </div>

            {erro && (
                <div className="alert alert-warning-custom mb-4"><i className="bi bi-exclamation-triangle me-2" />{erro}</div>
            )}

            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4 mb-4">
                {autores.map(a => (
                    <div className="col" key={a.id}>
                        <Card className="card-custom h-100 fade-in-up">
                            <Card.Body className="card-body-custom text-center d-flex flex-column">

                                <div className="mb-3">
                                    <div className="bg-light rounded-circle d-inline-flex align-items-center justify-content-center" style={{ width: '80px', height: '80px' }}>
                                        <i className="bi bi-person-fill display-4 icon-user" />
                                    </div>
                                </div>

                                <Card.Title className="mb-2">{a.name}</Card.Title>
                                <div className="text-muted mb-3"><small>ID: #{a.id}</small></div>

                                <div className="mt-auto">
                                    <div className="d-grid gap-2">
                                        <Button size="sm" className="btn-outline-primary-custom" onClick={() => onEdit(a)}> <i className="bi bi-pencil me-1"></i>Editar</Button>
                                        <Button size="sm" className="btn-outline-danger-custom" onClick={() => onDelete(a.id)}> <i className="bi bi-trash me-1"></i>Remover</Button>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>

            <Dialogo
                show={showModal}
                onHide={handleCloseModal}
                titulo={form.id ? "Editar Autor" : "Novo Autor"}
                onSubmit={onSubmit}
                iconeTitulo="bi bi-person-badge"
                textoBotaoSalvar={form.id ? "Atualizar Autor" : "Adicionar Autor"}
                textoBotaoCancelar="Cancelar"
                loading={loading}
                size="lg">

                <div className="text-center mb-4">
                    <div className="bg-light rounded-circle d-inline-flex align-items-center justify-content-center" style={{ width: '100px', height: '100px' }}>
                        <i className="bi bi-person-fill display-3 icon-user" />
                    </div>
                </div>
                <Form.Group>
                    <Form.Label className="form-label-custom"><i className="bi bi-person me-2"></i>Nome do Autor</Form.Label>

                    <Form.Control
                        className="form-control-custom"
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Digite o nome completo do autor"
                        required />
                </Form.Group>
            </Dialogo>
        </div>
    );
}

export default Autores;


