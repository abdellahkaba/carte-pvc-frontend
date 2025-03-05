import React, { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();
    const [loginInput, setLogin] = useState({
        email: '',
        password: '',
        error_list: [],
    });

    const handleInput = (e) => {
        setLogin({ ...loginInput, [e.target.name]: e.target.value });
    };

    const loginSubmit = async (e) => {
        e.preventDefault();
        const data = {
            email: loginInput.email,
            password: loginInput.password
        };

        try {
            await axios.get('/sanctum/csrf-cookie'); 
            const res = await axios.post(`/api/login`, data);
            if (res.data.status === 200) {
                localStorage.setItem('auth_token', res.data.token);
                localStorage.setItem('auth_username', res.data.username);
                swal('Success', res.data.message, 'success');
                navigate('/');
            } else if (res.data.status === 401) {
                swal('Error', res.data.message, 'error');
            } else {
                setLogin({ ...loginInput, error_list: res.data.validation_errors });
            }
        } catch (error) {
            swal('Error', 'Something went wrong. Please try again.', 'error');
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>CV Digitale</h2>
                <h4 style={styles.subtitle}>CONNEXION</h4>
                <form onSubmit={loginSubmit}>
                    <div style={styles.formGroup}>
                        <input 
                            type="email" 
                            name="email" 
                            style={styles.input} 
                            placeholder="Adresse Email" 
                            value={loginInput.email} 
                            onChange={handleInput} 
                        />
                        <span style={styles.errorText}>{loginInput.error_list.email}</span>
                    </div>
                    <div style={styles.formGroup}>
                        <input 
                            type="password" 
                            name="password" 
                            style={styles.input} 
                            placeholder="Mot de passe" 
                            value={loginInput.password} 
                            onChange={handleInput} 
                        />
                        <span style={styles.errorText}>{loginInput.error_list.password}</span>
                    </div>
                    <div style={styles.formGroup}>
                        <input type="checkbox" id="rememberMe" />
                        <label htmlFor="rememberMe">Se souvenir de moi</label>
                    </div>
                    <button type='submit' style={styles.button}>Se connecter</button>
                    <div style={styles.linkContainer}>
                        <Link to="/forgot-password" style={styles.link}>Mot de passe oublié ?</Link>
                        <Link to="/register" style={styles.link}>Vous n'avez pas encore de compte ? Contactez-nous !</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#1a2e61',
        padding: '1rem',
        overflowY: 'auto',
    },
    card: {
        backgroundColor: '#fff',
        padding: '1rem',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        width: '100%',
        maxWidth: '400px',
    },
    title: {
        fontSize: '2rem',
        fontWeight: 'bold',
        color: '#1a2e61',
        marginBottom: '0.5rem',
    },
    subtitle: {
        fontSize: '1rem',
        marginBottom: '1rem',
    },
    formGroup: {
        marginBottom: '1rem',
    },
    input: {
        width: '100%',
        padding: '0.5rem',
        borderRadius: '5px',
        border: '1px solid #ccc',
        marginBottom: '0.5rem',
    },
    button: {
        backgroundColor: '#0066ff',
        border: 'none',
        padding: '0.5rem 1rem',
        borderRadius: '5px',
        color: 'white',
        cursor: 'pointer',
    },
    linkContainer: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: '1rem',
    },
    link: {
        color: '#0066ff',
        textDecoration: 'none',
        marginTop: '0.5rem',
    },
    errorText: {
        color: 'red',
        fontSize: '0.875rem',
    },
};
