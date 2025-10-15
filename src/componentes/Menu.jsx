import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, Outlet } from 'react-router-dom';

function Menu() {
    return (
        <div>
            <Navbar expand="lg" className="navbar-custom">
                <Container>
                    <NavLink className="navbar-brand" aria-current="page" exact="true" to="/"> <i className="bi bi-book-half me-2" /></NavLink>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />

                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavLink className="nav-link" aria-current="page" exact="true" to="/"><i className="bi bi-house-door me-1" /> Início</NavLink>
                            <NavLink className="nav-link" aria-current="page" exact="true" to="/sobre"> <i className="bi bi-info-circle me-1" /> Sobre</NavLink>
                            <NavLink className="nav-link" aria-current="page" exact="true" to="/reviews"> <i className="bi bi-star me-1" /> Reviews</NavLink>

                            <NavDropdown title={<><i className="bi bi-tools me-1"></i> Cadastros </>} id="basic-nav-dropdown">
                                <NavLink className="dropdown-item" exact="true" to="/autores"><i className="bi bi-person-badge me-2" />Autores </NavLink>
                                <NavLink className="dropdown-item" exact="true" to="/generos"><i className="bi bi-tags me-2" />Gêneros</NavLink>
                                <NavLink className="dropdown-item" exact="true" to="/usuarios"><i className="bi bi-people me-2" />Usuários</NavLink>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Outlet />
        </div>
    );
}

export default Menu;