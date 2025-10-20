import { useEffect, useState } from "react";
import { listarLeituras, criarLeitura, atualizarLeitura, removerLeitura } from "../../servicos/LeituraServico.jsx";
import { listarUsuarios } from "../../servicos/UsuarioServico.jsx";
import { listarLivros } from "../../servicos/LivroServico.jsx";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

function StarRating({ value }) {
    const stars = Array.from({ length: 5 }, (_, i) => i < (value || 0));
    return (
        <span>
            {stars.map((filled, idx) => (
                <i key={idx} className={filled ? "bi bi-star-fill text-warning" : "bi bi-star"} />
            ))}
        </span>
    );
}

function StarRatingInput({ value, onChange }) {
    return (
        <div className="d-flex align-items-center">
            <span className="me-2">Avaliação:</span>
            {Array.from({ length: 5 }, (_, i) => (
                <i
                    key={i}
                    className={`bi ${i < value ? "bi-star-fill text-warning" : "bi-star"} me-1`}
                    style={{ cursor: "pointer", fontSize: "1.5rem" }}
                    onClick={() => onChange(i + 1)} />
            ))}

            <span className="ms-2 text-muted">({value}/5)</span>
        </div>
    );
}

function Reviews() {
    const [leituras, setLeituras] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [livros, setLivros] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const [form, setForm] = useState({
        id: null,
        user_id: "",
        book_id: "",
        rating: 5,
        review: "",
        status: ""
    });

    const carregar = async () => {
        setLoading(true);
        try {
            const [leiturasData, usuariosData, livrosData] = await Promise.all([
                listarLeituras(),
                listarUsuarios(),
                listarLivros()]);

            if (leiturasData && leiturasData.objeto) await setLeituras(leiturasData.objeto);
            if (usuariosData && usuariosData.objeto) await setUsuarios(usuariosData.objeto);
            if (livrosData && livrosData.objeto) await setLivros(livrosData.objeto);

        } catch (error) {
            setLeituras([]);
            setUsuarios([]);
            setLivros([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { carregar(); }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!form.user_id || !form.book_id) return;

        setLoading(true);
        try {
            let response;

            if (form.id) response = await atualizarLeitura(form);
            else response = await criarLeitura(form);

            if (response && response.objeto) {
                setForm({
                    id: null,
                    user_id: "",
                    book_id: "",
                    rating: 5,
                    review: "",
                    status: ""
                });

                setShowModal(false);
                await carregar();
            } else {
                alert("Erro ao salvar review. Verifique o console para mais detalhes.");
            }
        } catch (error) {
            alert("Erro ao salvar review: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (leitura) => {
        setForm({
            id: leitura.id,
            user_id: leitura.user.id,
            book_id: leitura.book.id,
            rating: leitura.rating,
            review: leitura.review || "",
            status: leitura.status
        });

        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Tem certeza que deseja remover esta review?")) {
            try {
                await removerLeitura(id); await carregar();
            } catch (error) {
                alert("Erro ao remover review: " + error.message);
            }
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setForm({
            id: null,
            user_id: "",
            book_id: "",
            rating: 5,
            review: "",
            status: ""
        });
    };

    const handleOpenModal = () => {
        setForm({
            id: null,
            user_id: "",
            book_id: "",
            rating: 5,
            review: "",
            status: ""
        });

        setShowModal(true);
    };

    return (
        <div className="container mt-4">

            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="mb-0"><i className="bi bi-chat-square-text me-2 icon-book"></i>Reviews dos Leitores</h2>
                    <p className="text-muted mb-0">Total de {leituras.length} avaliações registradas</p>
                </div>

                <Button className="btn-primary-custom" onClick={handleOpenModal}><i className="bi bi-plus-circle me-2" /> Nova review</Button>
            </div>

            {loading && (
                <div className="text-center mt-5">
                    <div className="spinner-border spinner-custom" role="status"><span className="visually-hidden">Carregando...</span></div>
                    <p className="mt-3 text-muted">Carregando reviews...</p>
                </div>
            )}

            {!loading && leituras.length === 0 && (
                <div className="card-custom text-center py-5">
                    <div className="card-body-custom">
                        <i className="bi bi-chat-square display-1 text-muted mb-3"></i>
                        <h4 className="text-muted">Nenhuma review encontrada</h4>
                        <p className="text-muted">Seja o primeiro a avaliar um livro da biblioteca!</p>

                        <Button className="btn-primary-custom" onClick={handleOpenModal}><i className="bi bi-star-plus me-2"></i>Criar review</Button>
                    </div>
                </div>
            )}

            {!loading && leituras.length > 0 && (
                <div className="row g-4">
                    {leituras.map((leitura) => (
                        <div className="col-lg-6" key={leitura.id}>
                            <Card className="card-custom h-100 fade-in-up">
                                <Card.Body className="card-body-custom d-flex flex-column">

                                    <div className="d-flex justify-content-between align-items-start mb-1">
                                        <div className="flex-grow-1"><h5 className="card-title mb-1">{leitura.book.title} <span className="text-muted">({leitura.book.publication_year})</span></h5></div>
                                        <div className="text-end"><StarRating value={leitura.rating} /></div>
                                    </div>

                                    <hr />

                                    <div className="mb-3">
                                        <div className="d-flex align-items-center mb-2"><i className="bi bi-person-circle me-2 icon-user" /><span>{leitura.user.name} <span className="text-muted">@{leitura.user.username}</span></span></div>
                                        <div className="d-flex align-items-center">
                                            <i className="bi bi-bookmark me-2 icon-book" />
                                            <span className={`ms-2 badge ${leitura.status === 'lido' ? 'bg-success' :
                                                leitura.status === 'lendo' ? 'bg-warning' : 'bg-info'}`}>
                                                {leitura.status === 'lido' ? 'Lido' : leitura.status === 'quero ler' ? 'Lendo' : 'Quero ler'}
                                            </span>
                                        </div>
                                    </div>

                                    {leitura.review && (
                                        <div className="mb-3">
                                            <h6><i className="bi bi-chat-quote me-2 icon-book" />Review:</h6>
                                            <p className="text-muted mb-0" style={{ fontStyle: 'italic' }}>"{leitura.review}"</p>
                                        </div>
                                    )}

                                    <div className="mt-auto">
                                        <div className="d-grid gap-2">
                                            <Button size="sm" className="btn-outline-primary-custom" onClick={() => handleEdit(leitura)}><i className="bi bi-pencil me-1" />Editar review </Button>
                                            <Button size="sm" className="btn-outline-danger-custom" onClick={() => handleDelete(leitura.id)}><i className="bi bi-trash me-1" />Remover</Button>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </div>
            )}

            <Modal show={showModal} onHide={handleCloseModal} size="lg">
                <Modal.Header>
                    <Modal.Title><i className="bi bi-star me-2" /> {form.id ? "Editar Review" : "Nova Review"}</Modal.Title>
                </Modal.Header>

                <Form onSubmit={onSubmit}>
                    <Modal.Body>
                        <div className="row g-3">
                            <div className="col-md-6">
                                <Form.Group>
                                    <Form.Label className="form-label-custom"><i className="bi bi-person me-2"></i>Usuário</Form.Label>

                                    <Form.Select className="form-select-custom"
                                        value={form.user_id}
                                        onChange={(e) => setForm({ ...form, user_id: e.target.value })}
                                        required>

                                        <option disabled selected value="">Selecione um usuário...</option>
                                        {usuarios.map(user => (
                                            <option key={user.id} value={user.id}>
                                                {user.name} (@{user.username})
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </div>

                            <div className="col-md-6">
                                <Form.Group>
                                    <Form.Label className="form-label-custom"><i className="bi bi-book me-2" />Livro</Form.Label>

                                    <Form.Select className="form-select-custom"
                                        value={form.book_id}
                                        onChange={(e) => setForm({ ...form, book_id: e.target.value })}
                                        required>

                                        <option disabled selected value="">Selecione um livro...</option>
                                        {livros.map(livro => (
                                            <option key={livro.id} value={livro.id}>
                                                {livro.title} ({livro.publication_year})
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </div>

                            <div className="col-md-6">
                                <Form.Group>
                                    <Form.Label className="form-label-custom"><i className="bi bi-bookmark me-2" />Status de Leitura</Form.Label>

                                    <Form.Select className="form-select-custom" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>

                                        <option disabled selected value="">Selecione um status...</option>
                                        <option value="lido">Lido</option>
                                        <option value="lendo">Lendo</option>
                                        <option value="para_ler">Quero ler</option>
                                    </Form.Select>
                                </Form.Group>
                            </div>

                            <div className="col-md-6">
                                <Form.Label className="form-label-custom"><i className="bi bi-star me-2" />Avaliação</Form.Label>

                                <div className="bg-light p-3 rounded">
                                    <StarRatingInput value={form.rating} onChange={(rating) => setForm({ ...form, rating })} />
                                </div>
                            </div>

                            <div className="col-12">
                                <Form.Group>
                                    <Form.Label className="form-label-custom"><i className="bi bi-chat-quote me-2" />Review</Form.Label>

                                    <Form.Control
                                        className="form-control-custom"
                                        as="textarea"
                                        rows={4}
                                        value={form.review}
                                        onChange={(e) => setForm({ ...form, review: e.target.value })}
                                        placeholder="Escreva sua opinião sobre o livro, o que mais gostou, recomendações..." />
                                </Form.Group>
                            </div>
                        </div>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}><i className="bi bi-x-circle me-2" />Cancelar</Button>
                        <Button className="btn-primary-custom" type="submit" disabled={loading}><i className="bi bi-check-circle me-2" />{form.id ? "Atualizar" : "Adicionar"} review</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    );
}

export default Reviews;


