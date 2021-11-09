import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
const NavBar = () => {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container fluid className="mx-4">
                <Navbar.Brand href="/">Bienvenido</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="facturacion">Facturacion</Nav.Link>
                        <Nav.Link href="about">Sobre</Nav.Link>


                    </Nav>
                    <Nav>
                        <Nav.Link href="historial">Historiales</Nav.Link>
                        <Nav.Link eventKey={2} href="#memes">
                            Configuracion
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
export default NavBar;