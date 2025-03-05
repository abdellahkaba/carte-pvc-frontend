import React, { useState } from 'react';
import Navbar from '../../../layouts/frontend/Navbar';
import axios from 'axios';
import swal from 'sweetalert';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useNavigate } from 'react-router-dom';

export default function Carte() {
    const [carteInput, setCarte] = useState({
        first_name: '',
        last_name: '',
        email: '',
        adress: '',
        phone: '',
        title: '',
        company: '',
        website: '',
        facebook: '',
        linkdin: '',
        whatsapp: ''
    });

    const navigate = useNavigate();

    const [pictures, setPictures] = useState({
        photo: '',
        logo: '',
        background_image: '',
    });

    const [errorList, setErrorList] = useState([]);

    const handleInput = (e) => {
        const { name, value } = e.target;
        setCarte((prev) => ({ ...prev, [name]: value }));
    };

    const handlePhoneChange = (value, name) => {
        setCarte((prev) => ({ ...prev, [name]: value }));
    };

    const handlePhoto = (e) => {
        setPictures((prev) => ({ ...prev, photo: e.target.files[0] }));
    };

    const handleLogo = (e) => {
        setPictures((prev) => ({ ...prev, logo: e.target.files[0] }));
    };

    const handleBackgroundImage = (e) => {
        setPictures((prev) => ({ ...prev, background_image: e.target.files[0] }));
    };

    const prefixUrl = (url) => {
        if (url) {
            const cleanUrl = url.replace(/^https?:\/\//i, '');
            return 'https://' + cleanUrl;
        }
        return url;
    };

    const carteSubmit = (e) => {
        e.preventDefault();

        const updatedCarteInput = {
            ...carteInput,
            website: prefixUrl(carteInput.website),
            facebook: prefixUrl(carteInput.facebook),
            linkdin: prefixUrl(carteInput.linkdin),
        };

        const formData = new FormData();
        formData.append('photo', pictures.photo);
        formData.append('logo', pictures.logo);
        formData.append('background_image', pictures.background_image);
        formData.append('first_name', updatedCarteInput.first_name);
        formData.append('last_name', updatedCarteInput.last_name);
        formData.append('email', updatedCarteInput.email);
        formData.append('adress', updatedCarteInput.adress);
        formData.append('phone', updatedCarteInput.phone);
        formData.append('title', updatedCarteInput.title);
        formData.append('company', updatedCarteInput.company);
        formData.append('website', updatedCarteInput.website);
        formData.append('facebook', updatedCarteInput.facebook);
        formData.append('linkdin', updatedCarteInput.linkdin);
        formData.append('whatsapp', updatedCarteInput.whatsapp);

        axios.post(`/api/cartes`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json'
            }
        })
        .then((res) => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");
                setErrorList([]);
                navigate('/user-cartes');
            } else if (res.data.status === 422) {
                swal("Desolé", "", "error");
                setErrorList(res.data.errors);
            }
        })
        .catch((err) => {
            swal("Desolé", "Une erreur est survenue", "error");
        });
    };

    return (
        <div>
            <Navbar />
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">
                                <h4 style={{ color: 'darkblue' }}>Ajouter une carte</h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={carteSubmit}>
                                    <div className="row">
                                        <div className="col-md-6 form-group mb-3">
                                        <label><strong>Prénom</strong></label>
                                            <input
                                                type="text"
                                                name="first_name"
                                                className="form-control"
                                                placeholder=" Votre prénom"
                                                value={carteInput.first_name}
                                                onChange={handleInput}
                                                style={{ color: 'darkblue' }}
                                            />
                                        </div>
                                        <div className="col-md-6 form-group mb-3">
                                        <label><strong>Nom</strong></label>
                                            <input
                                                type="text"
                                                name="last_name"
                                                className="form-control"
                                                placeholder="Votre nom"
                                                value={carteInput.last_name}
                                                onChange={handleInput}
                                                style={{ color: 'darkblue' }}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 form-group mb-3">
                                        <label><strong>Adresse Email</strong></label>
                                            <input
                                                type="email"
                                                name="email"
                                                className="form-control"
                                                placeholder="Adresse Email"
                                                value={carteInput.email}
                                                onChange={handleInput}
                                                style={{ color: 'darkblue' }}
                                            />
                                        </div>
                                        <div className="col-md-6 form-group mb-3">
                                        <label><strong>Adresse</strong></label>
                                            <input
                                                type="text"
                                                name="adress"
                                                className="form-control"
                                                placeholder="Adresse"
                                                value={carteInput.adress}
                                                onChange={handleInput}
                                                style={{ color: 'darkblue' }}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 form-group mb-3">
                                        <label><strong>Téléphone</strong></label>
                                            <PhoneInput
                                                country={'sn'}
                                                value={carteInput.phone}
                                                onChange={(value) => handlePhoneChange(value, 'phone')}
                                                inputProps={{
                                                    name: 'phone',
                                                    required: true,
                                                    autoFocus: true,
                                                    placeholder: 'Téléphone',
                                                }}
                                                inputStyle={{ color: 'darkblue' }}
                                            />
                                        </div>
                                        <div className="col-md-6 form-group mb-3">
                                        <label><strong>Titre</strong></label>
                                            <input
                                                type="text"
                                                name="title"
                                                className="form-control"
                                                placeholder="Votre titre"
                                                value={carteInput.title}
                                                onChange={handleInput}
                                                style={{ color: 'darkblue' }}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 form-group mb-3">
                                        <label><strong>Société</strong></label>
                                            <input
                                                type="text"
                                                name="company"
                                                className="form-control"
                                                placeholder="Votre Société"
                                                value={carteInput.company}
                                                onChange={handleInput}
                                                style={{ color: 'darkblue' }}
                                            />
                                        </div>
                                        <div className="col-md-6 form-group mb-3">
                                        <label><strong>Site web</strong></label>
                                            <input
                                                type="text"
                                                name="website"
                                                className="form-control"
                                                placeholder="Lien site Web"
                                                value={carteInput.website}
                                                onChange={handleInput}
                                                style={{ color: 'darkblue' }}
                                            />
                                            {/* <small className="form-text text-muted">Veuillez saisir l'URL sans https://</small> */}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 form-group mb-3">
                                        <label><strong>facebook</strong></label>
                                            <input
                                                type="url"
                                                name="facebook"
                                                className="form-control"
                                                placeholder="Lien Facebook"
                                                value={carteInput.facebook}
                                                onChange={handleInput}
                                                style={{ color: 'darkblue' }}
                                            />
                                        </div>
                                        <div className="col-md-6 form-group mb-3">
                                        <label><strong>Linkdin</strong></label>
                                            <input
                                                type="url"
                                                name="linkdin"
                                                className="form-control"
                                                placeholder="Lien Linkdin"
                                                value={carteInput.linkdin}
                                                onChange={handleInput}
                                                style={{ color: 'darkblue' }}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 form-group mb-3">
                                        <label><strong>Numero whatsapp</strong></label>
                                            <PhoneInput
                                                country={'sn'}
                                                value={carteInput.whatsapp}
                                                onChange={(value) => handlePhoneChange(value, 'whatsapp')}
                                                inputProps={{
                                                    name: 'whatsapp',
                                                    required: true,
                                                    placeholder: 'Whatsapp',
                                                }}
                                                inputStyle={{ color: 'darkblue' }}
                                            />
                                        </div>
                                        <div className="col-md-6 form-group mb-3">
                                        <label><strong>Logo</strong></label>
                                            <input
                                                type="file"
                                                name="logo"
                                                className="form-control"
                                                onChange={handleLogo}
                                                style={{ color: 'darkblue' }}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 form-group mb-3">
                                        <label><strong>Photo</strong></label>
                                            <input
                                                type="file"
                                                name="photo"
                                                className="form-control"
                                                onChange={handlePhoto}
                                                style={{ color: 'darkblue' }}
                                            />
                                        </div>
                                        <div className="col-md-6 form-group mb-3">
                                        <label><strong>Arrière Plan</strong></label>
                                            <input
                                                type="file"
                                                name="background_image"
                                                className="form-control"
                                                onChange={handleBackgroundImage}
                                                style={{ color: 'darkblue' }}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12 form-group mb-3">
                                            <button type="submit" className="btn btn-primary">Enregistrer</button>
                                        </div>
                                    </div>
                                    {errorList.length > 0 && (
                                        <div className="alert alert-danger">
                                            <ul>
                                                {errorList.map((error, index) => (
                                                    <li key={index}>{error}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
