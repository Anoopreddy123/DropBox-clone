import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import AuthContext from '../AuthContext';
import { useContext } from 'react';

export default function Header() {
    const { isAuthenticated, user, logout } = useContext(AuthContext);
    const navigate = useNavigate(); 

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    Filecloud
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/">
                            Home
                        </Nav.Link>
                        {isAuthenticated ? (
                            <>
                                <Nav.Link as={Link} to="/upload">
                                    Upload
                                </Nav.Link>
                                <Nav.Link as={Link} to="/download">
                                    Download
                                </Nav.Link>
                                <Nav.Link as={Link} to="/profile">
                                    Profile
                                </Nav.Link>
                                <Button variant="outline-dark" onClick={() => logout(navigate)} className="ms-2">
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={Link} to="/login" className="ms-2">
                                    <Button variant="dark">Login</Button>
                                </Nav.Link>
                                <Nav.Link as={Link} to="/register" className="ms-2">
                                    <Button variant="light" className="border">
                                        Signup
                                    </Button>
                                </Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
