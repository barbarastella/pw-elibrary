import { Container, Row, Col, Card, Table } from 'react-bootstrap';

const Sobre = () => (
    <Container className="mt-4">

        <Row className="mb-4">
            <Col>
                <Card className="card-custom">
                    <Card.Header className="card-header-custom"><h3 className="mb-0"><i className="bi bi-database me-2" /> Banco de Dados</h3></Card.Header>

                    <Card.Body className="card-body-custom">
                        <p>O sistema utiliza um banco de dados relacional com as seguintes tabelas:</p>

                        <Table className="table-custom">
                            <thead>
                                <tr>
                                    <th><i className="bi bi-table me-2" />Tabela</th>
                                    <th><i className="bi bi-list-columns me-2" />Campos</th>
                                    <th><i className="bi bi-card-text me-2" />Descrição</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><strong>authors</strong></td>
                                    <td>id, name</td>
                                    <td>Autores dos livros</td>
                                </tr>
                                <tr>
                                    <td><strong>genres</strong></td>
                                    <td>id, name</td>
                                    <td>Gêneros literários dos livros</td>
                                </tr>
                                <tr>
                                    <td><strong>users</strong></td>
                                    <td>id, name, username, email, password</td>
                                    <td>Usuários do sistema (leitores)</td>
                                </tr>
                                <tr>
                                    <td><strong>books</strong></td>
                                    <td>id, title, author_id, genre_id, publication_year</td>
                                    <td>Livros da biblioteca</td>
                                </tr>
                                <tr>
                                    <td><strong>readings</strong></td>
                                    <td>id, user_id, book_id, status, review, rating</td>
                                    <td>Leituras e avaliações dos usuários</td>
                                </tr>
                            </tbody>
                        </Table>

                        <div className="mt-4">
                            <h5>Relacionamentos:</h5>
                            <div className="row">
                                <div className="col-md-6">
                                    <ul className="list-unstyled">
                                        <li className="mb-2">
                                            <strong>books</strong> → <strong>authors</strong> (N:1)
                                            <br /><small className="text-muted">Um livro tem um autor</small>
                                        </li>

                                        <li className="mb-2">
                                            <strong>books</strong> → <strong>genres</strong> (N:1)
                                            <br /><small className="text-muted">Um livro pertence a um gênero</small>
                                        </li>
                                    </ul>
                                </div>

                                <div className="col-md-6">
                                    <ul className="list-unstyled">
                                        <li className="mb-2">
                                            <strong>readings</strong> → <strong>users</strong> (N:1)
                                            <br /><small className="text-muted">Uma leitura pertence a um usuário</small>
                                        </li>

                                        <li className="mb-2">
                                            <strong>readings</strong> → <strong>books</strong> (N:1)
                                            <br /><small className="text-muted">Uma leitura refere-se a um livro</small>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </Row>

        <Row className="mb-4">
            <Col>
                <Card className="card-custom">
                    <Card.Header className="card-header-custom"> <h3 className="mb-0"><i className="bi bi-gear me-2"></i> Páginas</h3></Card.Header>

                    <Card.Body className="card-body-custom">
                        <Row>
                            <Col md={6}>
                                <div className="mb-4">
                                    <h5>Gestão de Livros</h5>
                                    <ul className="list-unstyled">
                                        <li className="mb-2"><i className="bi bi-pin-angle me-2" />Catálogo completo com informações detalhadas</li>
                                        <li className="mb-2"><i className="bi bi-pin-angle me-2" />Cadastro de novos livros</li>
                                        <li className="mb-2"><i className="bi bi-pin-angle me-2" />Edição de informações existentes</li>
                                        <li className="mb-2"><i className="bi bi-pin-angle me-2" />Remoção de livros do catálogo</li>
                                    </ul>
                                </div>

                                <div className="mb-4">
                                    <h5>Gestão de Usuários</h5>
                                    <ul className="list-unstyled">
                                        <li className="mb-2"><i className="bi bi-pin-angle me-2" />Registro de novos leitores</li>
                                        <li className="mb-2"><i className="bi bi-pin-angle me-2" />Perfis personalizados</li>
                                        <li className="mb-2"><i className="bi bi-pin-angle me-2" />Histórico de leituras individual</li>
                                        <li className="mb-2"><i className="bi bi-pin-angle me-2" />Estatísticas de leitura</li>
                                    </ul>
                                </div>
                            </Col>

                            <Col md={6}>
                                <div className="mb-4">
                                    <h5>Gestão de Autores</h5>
                                    <ul className="list-unstyled">
                                        <li className="mb-2"><i className="bi bi-pin-angle me-2" />Catálogo de escritores</li>
                                        <li className="mb-2"><i className="bi bi-pin-angle me-2" />Cadastro de novos autores</li>
                                        <li className="mb-2"><i className="bi bi-pin-angle me-2" />Edição de informações</li>
                                        <li className="mb-2"><i className="bi bi-pin-angle me-2" />Vinculação com livros</li>
                                    </ul>
                                </div>

                                <div className="mb-4">
                                    <h5>Gestão de Gêneros</h5>
                                    <ul className="list-unstyled">
                                        <li className="mb-2"><i className="bi bi-pin-angle me-2" />Categorização literária</li>
                                        <li className="mb-2"><i className="bi bi-pin-angle me-2" />Novos gêneros</li>
                                        <li className="mb-2"><i className="bi bi-pin-angle me-2" />Organização temática</li>
                                        <li className="mb-2"><i className="bi bi-pin-angle me-2" />Classificação de livros</li>
                                    </ul>
                                </div>
                            </Col>

                            < hr />
                        </Row>

                        <h5>Reviews e avaliações</h5>
                        <div className="row">
                            <div className="col-md-6">
                                <ul className="list-unstyled">
                                    <li className="mb-2"><i className="bi bi-pin-angle me-2" />Avaliação por estrelas (1-5)</li>
                                    <li className="mb-2"><i className="bi bi-pin-angle me-2" />Comentários detalhados</li>
                                    <li className="mb-2"><i className="bi bi-pin-angle me-2" />Status de leitura personalizado</li>
                                </ul>
                            </div>

                            <div className="col-md-6">
                                <ul className="list-unstyled">
                                    <li className="mb-2"><i className="bi bi-pin-angle me-2" />Histórico de leituras</li>
                                    <li className="mb-2"><i className="bi bi-pin-angle me-2" />Compartilhamento de experiências</li>
                                    <li className="mb-2"><i className="bi bi-pin-angle me-2" />Comunidade de leitores</li>
                                </ul>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </Container>
);

export default Sobre;