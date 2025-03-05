import React, { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { useNavigate, Link } from 'react-router-dom';
import { FaEnvelope, FaLock, FaUser, FaEye, FaEyeSlash } from 'react-icons/fa';

export default function Register() {
    const navigate = useNavigate();
    const [registerInput, setRegister] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        error_list: [],
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleInput = (e) => {
        setRegister({ ...registerInput, [e.target.name]: e.target.value });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const registerSubmit = async (e) => {
        e.preventDefault();

        if (registerInput.password !== registerInput.password_confirmation) {
            setRegister({
                ...registerInput,
                error_list: { password_confirmation: 'Les mots de passe ne correspondent pas.' },
            });
            return;
        }

        const data = {
            name: registerInput.name,
            email: registerInput.email,
            password: registerInput.password,
            password_confirmation: registerInput.password_confirmation,
        };

        try {
            await axios.get('/sanctum/csrf-cookie'); 
            const res = await axios.post(`/api/register`, data);
            if (res.data.status === 200) {
                localStorage.setItem('auth_token', res.data.token);
                localStorage.setItem('auth_username', res.data.username);
                swal('Success', res.data.message, 'success');
                navigate('/');
            } else {
                setRegister({ ...registerInput, error_list: res.data.validation_errors });
            }
        } catch (error) {
            swal('Error', 'Something went wrong. Please try again.', 'error');
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>CV Digitale</h2>
                <h4 style={styles.subtitle}>INSCRIPTION</h4>
                <form onSubmit={registerSubmit}>
                    <div style={styles.formGroup}>
                        <div style={styles.inputGroup}>
                            <input 
                                type="text" 
                                name="name" 
                                style={styles.input} 
                                placeholder="Nom complet" 
                                value={registerInput.name} 
                                onChange={handleInput} 
                            />
                            <span className="text-danger">{registerInput.error_list.name}</span>
                        </div>
                    </div>
                    <div style={styles.formGroup}>
                        <div style={styles.inputGroup}>
                            <input 
                                type="email" 
                                name="email" 
                                style={styles.input} 
                                placeholder="Adresse Email" 
                                value={registerInput.email} 
                                onChange={handleInput} 
                            />
                            <span className="text-danger">{registerInput.error_list.email}</span>
                        </div>
                    </div>
                    <div style={styles.formGroup}>
                        <div style={styles.inputGroup}>
                            <input 
                                type={showPassword ? "text" : "password"} 
                                name="password" 
                                style={styles.input} 
                                placeholder="Mot de passe" 
                                value={registerInput.password} 
                                onChange={handleInput} 
                            />
                            <span 
                                style={styles.inputGroupText} 
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                            <span className="text-danger">{registerInput.error_list.password}</span>
                        </div>
                    </div>
                    <div style={styles.formGroup}>
                        <div style={styles.inputGroup}>
                            <input 
                                type={showConfirmPassword ? "text" : "password"} 
                                name="password_confirmation" 
                                style={styles.input} 
                                placeholder="Confirmer le mot de passe" 
                                value={registerInput.password_confirmation} 
                                onChange={handleInput} 
                            />
                            <span 
                                style={styles.inputGroupText} 
                                onClick={toggleConfirmPasswordVisibility}
                            >
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                            <span className="text-danger">{registerInput.error_list.password_confirmation}</span>
                        </div>
                    </div>
                    <div style={styles.formGroup}>
                        <button type='submit' style={styles.button}>Enregistrer</button>
                    </div>
                    <div style={styles.formGroup}>
                        <Link to="/login" style={styles.link}>Déjà inscrit ? Connectez-vous ici</Link>
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
    inputGroup: {
        display: 'flex',
        alignItems: 'center',
    },
    inputGroupText: {
        padding: '0.5rem',
        borderRadius: '5px',
        border: '1px solid #ccc',
        backgroundColor: '#f1f1f1',
        cursor: 'pointer',
        marginLeft: '0.5rem',
    },
    button: {
        backgroundColor: '#0066ff',
        border: 'none',
        padding: '0.5rem 1rem',
        borderRadius: '5px',
        color: 'white',
        cursor: 'pointer',
    },
    link: {
        display: 'block',
        marginTop: '0.5rem',
        color: '#0066ff',
        textDecoration: 'none',
    },
    errorText: {
        color: 'red',
        fontSize: '0.875rem',
    },
};
