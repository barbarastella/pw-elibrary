import { useEffect, useState } from "react";
import { listarUsuarios, criarUsuario, atualizarUsuario, removerUsuario } from "../../servicos/UsuarioServico";
import { listarLeituras } from "../../servicos/LeituraServico";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Dialogo from "../comuns/Dialogo";

function StarRating({ value }) {
    const stars = Array.from({ length: 5 }, (_, i) => i < (value || 0));
    return (
        <span>
            {stars.map((filled, idx) => (
                <i key={idx} className={filled ? "bi bi-star-fill text-warning" : "bi bi-star"}></i>
            ))}
        </span>
    );
}

function Usuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [leituras, setLeituras] = useState([]);
    const [form, setForm] = useState({ id: null, name: "", username: "", email: "", password: "" });
    const [showModal, setShowModal] = useState(false);
    const [showModalLeituras, setShowModalLeituras] = useState(false);
    const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);
    const [loading, setLoading] = useState(false);

    const carregar = async () => {
        setLoading(true);

        try {
            const [us, ls] = await Promise.all([listarUsuarios(), listarLeituras()]);
            if (us && us.objeto) setUsuarios(us.objeto);
            if (ls && ls.objeto) setLeituras(ls.objeto);
        } catch (error) {
            alert("Erro ao carregar dados: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { carregar(); }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!form.name || !form.username || !form.email) return;

        setLoading(true);

        try {
            let response;

            if (form.id) response = await atualizarUsuario(form);
            else response = await criarUsuario(form);

            if (response && response.objeto) {
                setForm({ id: null, name: "", username: "", email: "", password: "" });
                setShowModal(false);
                await carregar();
            } else alert("Erro ao salvar usuário. Verifique o console para mais detalhes.");

        } catch (error) {
            alert("Erro ao salvar usuário: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    const userLeituras = (userId) => leituras.filter(l => l.user.id === userId);
    const handleEdit = (usuario) => { setForm(usuario); setShowModal(true); };
    const handleCloseModal = () => { setShowModal(false); setForm({ id: null, name: "", username: "", email: "", password: "" }); };
    const handleOpenModal = () => { setForm({ id: null, name: "", username: "", email: "", password: "" }); setShowModal(true); };
    const handleOpenModalLeituras = (usuario) => { setUsuarioSelecionado(usuario); setShowModalLeituras(true); };
    const handleCloseModalLeituras = () => { setShowModalLeituras(false); setUsuarioSelecionado(null); };

    return (
        <div className="container mt-4">

            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="mb-0"><i className="bi bi-person-badge me-2 icon-user" />Usuários cadastrados</h2>
                    <p className="text-muted mb-0">Total de {usuarios.length} cadastros</p>
                </div>

                <Button className="btn-primary-custom" onClick={handleOpenModal}><i className="bi bi-person-plus me-2"></i>Novo usuário</Button>
            </div>

            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4 mb-4">
                {usuarios.map(u => (
                    <div className="col" key={u.id}>
                        <Card className="card-custom h-100 fade-in-up">
                            <Card.Body className="card-body-custom text-center d-flex flex-column">
                                <div className="mb-3">
                                    <div className="bg-gradient-primary rounded-circle d-inline-flex align-items-center justify-content-center text-white" style={{ width: '80px', height: '80px' }}><i className="bi bi-person-fill display-4"></i></div>
                                </div>

                                <Card.Title className="mb-2">{u.name}</Card.Title>

                                <div className="text-muted mb-1"><i className="bi bi-at me-1" />{u.username}</div>
                                <div className="text-muted mb-3"><i className="bi bi-envelope me-1" />{u.email} </div>
                                <div className="text-muted mb-3"><small>ID: #{u.id}</small></div>

                                <div className="mt-auto">
                                    <div className="d-grid gap-2">
                                        <Button size="sm" className="btn-outline-primary-custom" onClick={() => handleEdit(u)}> <i className="bi bi-pencil me-1"></i>Editar </Button>
                                        <Button size="sm" className="btn-outline-secondary-custom" onClick={() => handleOpenModalLeituras(u)}>   <i className="bi bi-book me-1"></i>Leituras ({userLeituras(u.id).length})  </Button>
                                        <Button size="sm" className="btn-outline-danger-custom" onClick={async () => { await removerUsuario(u.id); await carregar(); }}>    <i className="bi bi-trash me-1"></i>Remover  </Button>
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
                titulo={form.id ? "Editar Usuário" : "Novo Usuário"}
                onSubmit={onSubmit}
                iconeTitulo="bi bi-person-badge"
                textoBotaoSalvar={form.id ? "Atualizar Usuário" : "Adicionar Usuário"}
                textoBotaoCancelar="Cancelar"
                loading={loading}
                size="lg">

                <div className="text-center mb-4">
                    <div className="bg-gradient-primary rounded-circle d-inline-flex align-items-center justify-content-center text-white" style={{ width: '100px', height: '100px' }}><i className="bi bi-person-fill display-3" /></div>
                </div>

                <div className="row g-3">
                    <div className="col-md-6">
                        <Form.Group>
                            <Form.Label className="form-label-custom"><i className="bi bi-person me-2"></i>Nome Completo</Form.Label>

                            <Form.Control className="form-control-custom"
                                type="text"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                placeholder="Digite o nome completo"
                                required />
                        </Form.Group>
                    </div>

                    <div className="col-md-6">
                        <Form.Group>
                            <Form.Label className="form-label-custom"><i className="bi bi-at me-2"></i>Username</Form.Label>

                            <Form.Control className="form-control-custom"
                                type="text"
                                value={form.username}
                                onChange={(e) => setForm({ ...form, username: e.target.value })}
                                placeholder="Digite o username"
                                required />
                        </Form.Group>
                    </div>

                    <div className="col-md-6">
                        <Form.Group>
                            <Form.Label className="form-label-custom"><i className="bi bi-envelope me-2"></i>E-mail</Form.Label>

                            <Form.Control className="form-control-custom"
                                type="email"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                placeholder="Digite o email"
                                required />
                        </Form.Group>
                    </div>

                    <div className="col-md-6">
                        <Form.Group>
                            <Form.Label className="form-label-custom"><i className="bi bi-lock me-2"></i>Senha</Form.Label>

                            <Form.Control className="form-control-custom"
                                type="password"
                                value={form.password}
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                                placeholder={form.id ? "Digite nova senha (opcional)" : "Digite a senha"}
                                required={!form.id} />

                            {form.id && <Form.Text className="text-muted">Deixe em branco para manter a senha atual</Form.Text>}
                        </Form.Group>
                    </div>
                </div>
            </Dialogo>

            <Modal show={showModalLeituras} onHide={handleCloseModalLeituras} size="xl">
                <Modal.Header closeButton>
                    <Modal.Title><i className="bi bi-book me-2" />Histórico de Leituras - {usuarioSelecionado?.name}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {usuarioSelecionado && (
                        <>
                            <div className="text-center mb-4 p-3 bg-light rounded">
                                <div className="d-flex align-items-center justify-content-center mb-3">
                                    <div className="bg-gradient-primary rounded-circle d-inline-flex align-items-center justify-content-center text-white me-3" style={{ width: '60px', height: '60px' }}><i className="bi bi-person-fill display-6" /></div>

                                    <div className="text-start">
                                        <h5 className="mb-1">{usuarioSelecionado.name}</h5>
                                        <p className="text-muted mb-1">{usuarioSelecionado.username}</p>
                                        <p className="text-muted mb-0">{usuarioSelecionado.email}</p>
                                    </div>
                                </div>

                                <div className="badge bg-primary fs-6">Total de {userLeituras(usuarioSelecionado.id).length} leituras</div>
                            </div>

                            {userLeituras(usuarioSelecionado.id).length === 0 ? (
                                <div className="text-center py-5">
                                    <i className="bi bi-book display-1 text-muted mb-3" />
                                    <h5 className="text-muted">Nenhuma leitura registrada</h5>
                                    <p className="text-muted">Este usuário ainda não possui avaliações de livros.</p>
                                </div>
                            ) : (
                                <div className="row g-3">
                                    {userLeituras(usuarioSelecionado.id).map(l => (
                                        <div className="col-md-6 col-lg-4" key={l.id}>
                                            <Card className="h-100 border-0 shadow-sm">
                                                <Card.Body>
                                                    <div className="d-flex justify-content-between align-items-start mb-3">
                                                        <h6 className="mb-1 text-truncate" title={l.book.title}><i className="bi bi-book me-1 text-primary" />{l.book.title} </h6>
                                                        <StarRating value={l.rating} />
                                                    </div>

                                                    <div className="mb-2">
                                                        <small className="text-muted"><i className="bi bi-calendar me-1"></i>{l.book.publication_year}</small>
                                                    </div>

                                                    <div className="mb-3">
                                                        <span className={`badge ${l.status === 'read' ? 'bg-success' : l.status === 'reading' ? 'bg-warning' : 'bg-info'}`}>
                                                            {l.status === 'read' ? 'Lido' : l.status === 'reading' ? 'Lendo' : 'Quero ler'}
                                                        </span>
                                                    </div>

                                                    {l.review && (
                                                        <div className="mt-auto">
                                                            <small className="text-muted">Avaliação:</small><p className="small text-muted mb-0 mt-1">{l.review}</p>
                                                        </div>
                                                    )}
                                                </Card.Body>
                                            </Card>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModalLeituras}> <i className="bi bi-x-circle me-2" />Fechar</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Usuarios;


