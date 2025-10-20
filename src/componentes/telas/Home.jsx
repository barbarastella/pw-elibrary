
import { useEffect, useState, useCallback } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { listarLivros, criarLivro, atualizarLivro, removerLivro } from '../../servicos/LivroServico.jsx';
import { listarAutores } from '../../servicos/AutorServico.jsx';
import { listarGeneros } from '../../servicos/GeneroServico.jsx';

function Home() {
    const [livros, setLivros] = useState([]);
    const [autores, setAutores] = useState([]);
    const [generos, setGeneros] = useState([]);
    const [show, setShow] = useState(false);
    const [form, setForm] = useState({ id: null, title: '', author_id: '', genre_id: '', publication_year: '' });
    const [erro, setErro] = useState("");

    const carregar = useCallback(async () => {
        setErro("");

        try {
            const resLivros = await listarLivros();
            await setLivros(resLivros.objeto);

            const resAutores = await listarAutores();
            await setAutores(resAutores.objeto);

            const resGeneros = await listarGeneros();
            await setGeneros(resGeneros.objeto);
        } catch (error) {
            setLivros([]);
            setAutores([]);
            setGeneros([]);
            setErro(error?.message || 'Falha ao carregar dados');
        }
    }, []);

    useEffect(() => { carregar(); }, [carregar]);

    const abrirNovo = () => { setForm({ id: null, title: '', author_id: '', genre_id: '', publication_year: '' }); setShow(true); };
    const abrirEditar = (livro) => { setForm({ id: livro.id, title: livro.title, author_id: livro.author.id, genre_id: livro.genre.id, publication_year: livro.publication_year }); setShow(true); };
    const fechar = () => setShow(false);

    const salvar = async (e) => {
        e.preventDefault();
        if (form.id) await atualizarLivro(form); else await criarLivro(form);
        fechar();
        await carregar();
    };

    const excluir = async (id) => {
        try {
            const resultado = await removerLivro(id);

            if (resultado.status === 'success') {
                await carregar();
                setErro("");
            } else {
                setErro(resultado.message || 'Falha ao remover livro');
            }
        } catch (error) {
            setErro((error?.message || 'Erro desconhecido'));
        }
    };

    const autorNome = (livro) => livro.author?.name;
    const generoNome = (livro) => livro.genre?.name;

    return (
        <div className="container mt-4">
            <div className="page-header rounded-3 mb-4">
                <div className="container">
                    <h1><i className="bi bi-book-half me-3" />eLibrary</h1>
                    <p className="mb-0">Sistema de gestão de leituras</p>
                </div>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-4">
                <div><h2 className="mb-0"><i className="bi bi-collection me-2 icon-book"></i> Livros cadastrados</h2></div>
                <Button className="btn-primary-custom" onClick={abrirNovo}> <i className="bi bi-plus-circle me-2"></i>Novo Livro</Button>
            </div>

            {erro && (
                <div className="alert alert-warning-custom mb-4">
                    <i className="bi bi-exclamation-triangle me-2" />{erro}
                </div>
            )}

            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
                {livros.map(livro => (
                    <div className="col" key={livro.id}>
                        <Card className="card-custom h-100 fade-in-up">
                            <Card.Body className="card-body-custom d-flex flex-column">
                                <div className="text-center mb-3"><i className="bi bi-book display-4 icon-book"></i></div>

                                <Card.Title className="text-center mb-3">{livro.title}</Card.Title>
                                <div className="mb-2"><i className="bi bi-person me-2 icon-user" />
                                    <strong>Autor(a):</strong> {autorNome(livro)}
                                </div>

                                <div className="mb-2"><i className="bi bi-calendar me-2 icon-book" />
                                    <strong>Ano de publicação:</strong> {livro.publication_year}
                                </div>

                                <div className="mb-3"><i className="bi bi-tag me-2 icon-book" />
                                    <strong>Gênero:</strong> {generoNome(livro)}
                                </div>

                                <div className="mt-auto">
                                    <div className="d-grid gap-2">
                                        <Button size="sm" className="btn-outline-primary-custom" onClick={() => abrirEditar(livro)}><i className="bi bi-pencil me-1"></i>Editar</Button>
                                        <Button size="sm" className="btn-outline-danger-custom" onClick={() => excluir(livro.id)}><i className="bi bi-trash me-1"></i>Remover</Button>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>

            <Modal show={show} onHide={fechar} backdrop="static" size="lg">
                <Form onSubmit={salvar}>
                    <Modal.Header>
                        <Modal.Title><i className="bi bi-book me-2"></i> {form.id ? 'Editar livro' : 'Adicionar livro'}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <div className="row g-3">
                            <div className="col-12">
                                <Form.Group>
                                    <Form.Label className="form-label-custom"><i className="bi bi-bookmark me-2" />Título do Livro</Form.Label>

                                    <Form.Control
                                        className="form-control-custom"
                                        value={form.title}
                                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                                        placeholder="Digite o título do livro"
                                        required />
                                </Form.Group>
                            </div>

                            <div className="col-md-6">
                                <Form.Group>
                                    <Form.Label className="form-label-custom"><i className="bi bi-person me-2" />Autor</Form.Label>

                                    <Form.Select
                                        className="form-select-custom"
                                        value={form.author_id}
                                        onChange={(e) => setForm({ ...form, author_id: Number(e.target.value) })}
                                        required>
                                        <option value="">Selecione um autor...</option>
                                        {autores.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                                    </Form.Select>
                                </Form.Group>
                            </div>

                            <div className="col-md-6">
                                <Form.Group>
                                    <Form.Label className="form-label-custom"><i className="bi bi-tag me-2" />Gênero</Form.Label>

                                    <Form.Select
                                        className="form-select-custom"
                                        value={form.genre_id}
                                        onChange={(e) => setForm({ ...form, genre_id: Number(e.target.value) })}
                                        required>
                                        <option value="">Selecione um gênero...</option>
                                        {generos.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
                                    </Form.Select>
                                </Form.Group>
                            </div>

                            <div className="col-12">
                                <Form.Group>
                                    <Form.Label className="form-label-custom"><i className="bi bi-calendar me-2" />Ano de Publicação</Form.Label>

                                    <Form.Control
                                        className="form-control-custom"
                                        type="number"
                                        value={form.publication_year}
                                        onChange={(e) => setForm({ ...form, publication_year: Number(e.target.value) })}
                                        placeholder="Ex: 2023"
                                        min="1000"
                                        max="2030"
                                        required />
                                </Form.Group>
                            </div>
                        </div>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={fechar}><i className="bi bi-x-circle me-2" />Cancelar</Button>
                        <Button className="btn-primary-custom" type="submit"> <i className="bi bi-check-circle me-2" />{form.id ? 'Atualizar' : 'Adicionar'} Livro</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    );
}

export default Home;