import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, Outlet, Navigate } from 'react-router-dom';
import { getUsuario, logout } from '../seguranca/Auth.jsx';

function MenuPrivado() {

    let usuario = null;
    try { usuario = getUsuario(); }
    catch (error) { usuario = null; }

    if (!usuario) return <Navigate to="/login" replace />;

    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary navbar-custom">
                <Container>
                    <NavLink className="navbar-brand" exact="true" to="/admin">eLibrary</NavLink>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavLink className="nav-link" exact="true" to="/admin">Home</NavLink>
                            <NavLink className="nav-link" exact="true" to="sobre">Sobre</NavLink>
                            <NavLink className="nav-link" exact="true" to="reviews">Reviews</NavLink>

                            {usuario &&
                                <NavDropdown title={<><i className="bi bi-tools me-1"></i> Cadastros </>} id="basic-nav-dropdown">
                                    <NavLink className="dropdown-item" exact="true" to="autores"><i className="bi bi-person-badge me-2" />Autores </NavLink>
                                    <NavLink className="dropdown-item" exact="true" to="generos"><i className="bi bi-tags me-2" />Gêneros</NavLink>
                                    <NavLink className="dropdown-item" exact="true" to="usuarios"><i className="bi bi-people me-2" />Usuários</NavLink>
                                </NavDropdown>
                            }

                        </Nav>
                    </Navbar.Collapse>

                    <Navbar.Collapse className="justify-content-end">
                        <NavDropdown title={usuario ? <span style={{ color: 'white' }}>Olá, <b>{usuario.name}</b>!</span> : "Usuário"} id="basic-nav-dropdown">
                            {usuario ? <NavLink className="dropdown-item" exact="true" to="/" onClick={() => logout()}>Logout</NavLink>
                                : <NavLink className="dropdown-item" exact="true" to="/login">login</NavLink>
                            }
                        </NavDropdown>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Outlet />
        </>
    );
}

export default MenuPrivado;