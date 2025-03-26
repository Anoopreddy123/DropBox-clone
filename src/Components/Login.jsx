import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import AuthContext from '../AuthContext';


function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('https://filecloud.us-east-2.elasticbeanstalk.com/login', { username, password });
            const { jwt, userId } = response.data;
            login(jwt, userId, username); // Use context login method
            navigate('/profile', { state: { username, userId } }); // Navigate to Profile
        } catch (error) {
            console.error('Login failed:', error);
            setShowModal(true);
        }
    };

    const handleClose = () => setShowModal(false);

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button type="submit">Log In</button>
            </form>

            <Modal show={showModal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Login Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>There was an error logging in. Please try again.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Login;
