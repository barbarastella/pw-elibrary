import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, Outlet, Navigate } from 'react-router-dom';
import { Modal, Button, Alert } from 'react-bootstrap';
import FormularioUsuario from './comuns/FormularioUsuario.jsx';
import { login, getToken } from '../seguranca/Auth';
import { criarUsuario } from '../servicos/UsuarioServico.jsx';

function MenuPublico() {
    const [showModalLogin, setShowModalLogin] = useState(false);
    const [showModalRegistro, setShowModalRegistro] = useState(false);
    const [formLogin, setFormLogin] = useState({ username: "", senha: "" });
    const [formRegistro, setFormRegistro] = useState({ name: "", username: "", email: "", password: "" });
    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [carregando, setCarregando] = useState(false);
    const [autenticado, setAutenticado] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const body = { username: formLogin.username, senha: formLogin.senha };
            setCarregando(true);
            setAlerta({ status: "", message: "" });

            const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            const data = await response.json();

            if (data.auth === false) {
                setAlerta({ status: "danger", message: data.message });
                return;
            }

            login(data);
            setShowModalLogin(false);
            setFormLogin({ username: "", senha: "" });
            setAutenticado(true);
        } catch (err) {
            setAlerta({ status: "danger", message: err.message });
        } finally {
            setCarregando(false);
        }
    };

    const handleRegistro = async (e) => {
        e.preventDefault();
        if (!formRegistro.name || !formRegistro.username || !formRegistro.email || !formRegistro.password) return;

        setCarregando(true);
        setAlerta({ status: "", message: "" });

        try {
            const response = await criarUsuario(formRegistro);

            if (response && response.objeto) {
                setAlerta({ status: "success", message: "Usuário criado com sucesso! Você pode fazer login agora." });
                setFormRegistro({ name: "", username: "", email: "", password: "" });
                setTimeout(() => {
                    setShowModalRegistro(false);
                    setShowModalLogin(true);
                }, 1500);
            } else {
                setAlerta({ status: "danger", message: "Erro ao criar usuário. Verifique os dados e tente novamente." });
            }
        } catch (error) {
            setAlerta({ status: "danger", message: error.message || "Erro ao criar usuário" });
        } finally {
            setCarregando(false);
        }
    };

    const handleCloseLogin = () => {
        setShowModalLogin(false);
        setFormLogin({ username: "", senha: "" });
        setAlerta({ status: "", message: "" });
    };

    const handleCloseRegistro = () => {
        setShowModalRegistro(false);
        setFormRegistro({ name: "", username: "", email: "", password: "" });
        setAlerta({ status: "", message: "" });
    };

    if (autenticado === true) return <Navigate to="/admin" />;

    return (
        <>
            <Navbar expand="lg" className="bg-body-secondary navbar-custom">
                <Container>
                    <NavLink className="navbar-brand" exact="true" to="/">eLibrary</NavLink>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavLink className="nav-link" exact="true" to="/">Home</NavLink>
                            <NavLink className="nav-link" exact="true" to="/sobre">Sobre</NavLink>
                            <NavLink className="nav-link" exact="true" to="/reviews">Reviews</NavLink>
                        </Nav>
                    </Navbar.Collapse>

                    <Navbar.Collapse className="justify-content-end">
                        <Nav>
                            <span className="nav-link active mx-2" style={{ cursor: 'pointer' }} onClick={() => setShowModalLogin(true)} >
                                <span style={{ color: 'white', fontWeight: 'bold' }}>Entrar</span>
                            </span>
                            <span className="nav-link active" style={{ cursor: 'pointer' }} onClick={() => setShowModalRegistro(true)} >
                                <span style={{ color: 'white', fontWeight: 'bold' }}>Registrar</span>
                            </span>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Modal de Login */}
            <Modal show={showModalLogin} onHide={handleCloseLogin}>
                <Modal.Header closeButton>
                    <Modal.Title><i className="bi bi-box-arrow-in-right me-2"></i>Login de usuário</Modal.Title>
                </Modal.Header>
                <form onSubmit={handleLogin}>
                    <Modal.Body>
                        {alerta.status && <Alert variant={alerta.status}>{alerta.message}</Alert>}
                        <FormularioUsuario
                            form={formLogin}
                            setForm={setFormLogin}
                            modo="login"
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseLogin} disabled={carregando}>
                            <i className="bi bi-x-circle me-2"></i>Cancelar
                        </Button>
                        <Button variant="primary" type="submit" disabled={carregando}>
                            <i className="bi bi-box-arrow-in-right me-2"></i>{carregando ? 'Entrando...' : 'Efetuar login'}
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>

            <Modal show={showModalRegistro} onHide={handleCloseRegistro} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title><i className="bi bi-person-plus me-2"></i>Registrar novo usuário</Modal.Title>
                </Modal.Header>
                <form onSubmit={handleRegistro}>
                    <Modal.Body>
                        {alerta.status && <Alert variant={alerta.status}>{alerta.message}</Alert>}
                        <FormularioUsuario
                            form={formRegistro}
                            setForm={setFormRegistro}
                            modo="completo"
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseRegistro} disabled={carregando}>
                            <i className="bi bi-x-circle me-2"></i>Cancelar</Button>
                        <Button variant="success" type="submit" disabled={carregando}>
                            <i className="bi bi-person-plus me-2"></i>{carregando ? 'Registrando...' : 'Registrar'}</Button>
                    </Modal.Footer>
                </form>
            </Modal>

            <Outlet />
        </>
    );
}

export default MenuPublico;