import { Form } from 'react-bootstrap';

function FormularioUsuario({ form, setForm, modo = 'completo' }) {
    const isLogin = modo === 'login';
    const isEdicao = form.id != null;

    return (
        <>
            {!isLogin && (
                <div className="text-center mb-4">
                    <div className="bg-gradient-primary rounded-circle d-inline-flex align-items-center justify-content-center text-white" style={{ width: '100px', height: '100px' }}>
                        <i className="bi bi-person-fill display-3" />
                    </div>
                </div>
            )}

            <div className="row g-3">
                {!isLogin && (
                    <div className="col-md-6">
                        <Form.Group>
                            <Form.Label className="form-label-custom">
                                <i className="bi bi-person me-2"></i>Nome Completo
                            </Form.Label>
                            <Form.Control
                                className="form-control-custom"
                                type="text"
                                value={form.name || ''}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                placeholder="Digite o nome completo"
                                required
                            />
                        </Form.Group>
                    </div>
                )}

                <div className={isLogin ? "col-12" : "col-md-6"}>
                    <Form.Group>
                        <Form.Label className="form-label-custom">
                            <i className="bi bi-at me-2"></i>Username
                        </Form.Label>
                        <Form.Control
                            className="form-control-custom"
                            type="text"
                            value={form.username || ''}
                            onChange={(e) => setForm({ ...form, username: e.target.value })}
                            placeholder="Digite o username"
                            maxLength={40}
                            required
                        />
                    </Form.Group>
                </div>

                {!isLogin && (
                    <div className="col-md-6">
                        <Form.Group>
                            <Form.Label className="form-label-custom">
                                <i className="bi bi-envelope me-2"></i>E-mail
                            </Form.Label>
                            <Form.Control
                                className="form-control-custom"
                                type="email"
                                value={form.email || ''}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                placeholder="Digite o email"
                                required
                            />
                        </Form.Group>
                    </div>
                )}

                <div className={isLogin ? "col-12" : "col-md-6"}>
                    <Form.Group>
                        <Form.Label className="form-label-custom">
                            <i className="bi bi-lock me-2"></i>Senha
                        </Form.Label>
                        <Form.Control
                            className="form-control-custom"
                            type="password"
                            value={form.password || form.senha || ''}
                            onChange={(e) => setForm({ ...form, password: e.target.value, senha: e.target.value })}
                            placeholder={isEdicao && !isLogin ? "Digite nova senha (opcional)" : "Digite a senha"}
                            maxLength={40}
                            required={!isEdicao}
                        />
                        {isEdicao && !isLogin && (
                            <Form.Text className="text-muted">Deixe em branco para manter a senha atual</Form.Text>
                        )}
                    </Form.Group>
                </div>
            </div>
        </>
    );
}

export default FormularioUsuario;

