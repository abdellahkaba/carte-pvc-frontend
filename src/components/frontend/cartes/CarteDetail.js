import axios from 'axios'; // Bibliothèque pour faire des requêtes HTTP
import React, { useEffect, useState } from 'react'; // Hooks React
import { FaArrowLeft, FaFacebook, FaGlobe, FaLinkedin, FaPrint, FaWhatsapp } from 'react-icons/fa'; // Icônes de Font Awesome
import { useParams, useNavigate } from 'react-router-dom'; // Hooks pour la gestion des routes
import { ToastContainer, toast } from 'react-toastify'; // Bibliothèque pour les notifications
import 'react-toastify/dist/ReactToastify.css'; // CSS pour les notifications


const CarteDetail = () => {
    const { id } = useParams(); // Hook pour récupérer les paramètres de l'URL
    const navigate = useNavigate(); // Hook pour la navigation
    const [carte, setCarte] = useState(null); // État pour stocker les détails de la carte
    const [loading, setLoading] = useState(true); // État pour gérer le chargement des données
    const [loadingPrint, setLoadingPrint] = useState(false); // État pour gérer le chargement lors du téléchargement du PDF

    // Hook useEffect pour récupérer les détails de la carte lors du chargement du composant
    useEffect(() => {
        axios.get(`/api/cartes/${id}`)
            .then(response => {
                if (response.data.status === 200) {
                    setCarte(response.data.carte); // Mise à jour de l'état avec les détails de la carte
                } else {
                    console.error('Error: ', response.data.message);
                }
                setLoading(false); // Arrêt du chargement
            })
            .catch(error => {
                console.error("Erreur lors de la récupération de la carte", error);
                setLoading(false); // Arrêt du chargement en cas d'erreur
            });
    }, [id]); // Dépendance à l'id pour relancer l'effet en cas de changement d'id

    // Fonction pour gérer le téléchargement du PDF de la carte
    const handlePrint = async () => {
        setLoadingPrint(true); // Activation du chargement
        try {
            const response = await axios.get(`/api/cartes/${id}/print`, {
                responseType: 'blob', // Spécification du type de réponse attendu
            });

            const url = window.URL.createObjectURL(new Blob([response.data])); // Création d'un URL pour le blob reçu
            const link = document.createElement('a'); // Création d'un élément lien
            link.href = url;
            link.setAttribute('download', 'carte.pdf'); // Spécification du nom du fichier à télécharger
            document.body.appendChild(link); // Ajout du lien au document
            link.click(); // Simuler le clic pour télécharger le fichier
        } catch (error) {
            console.error("Erreur lors du téléchargement du PDF", error);
        } finally {
            setLoadingPrint(false); // Désactivation du chargement
        }
    };

    // Fonction pour gérer la redirection vers une URL
    const handleRedirect = (url) => {
        if (url) {
            window.open(url, '_blank', 'noopener,noreferrer'); // Ouverture de l'URL dans un nouvel onglet
        } else {
            toast.error('Le lien n\'existe pas.'); // Notification d'erreur si l'URL est vide
        }
    };

    // Affichage du chargement
    if (loading) {
        return <div>Chargement...</div>;
    }

    // Affichage si la carte n'est pas trouvée
    if (!carte) {
        return <div>Carte non trouvée</div>;
    }

    // Nettoyage du numéro WhatsApp pour être utilisé dans un lien
    const cleanedWhatsAppNumber = carte.whatsapp.replace(/[^0-9]/g, '');
    const whatsappLink = `https://wa.me/${cleanedWhatsAppNumber}`;
    const websiteLink = carte.website;
    const facebookLink = carte.facebook;
    const linkedinLink = carte.linkdin;

    // Styles pour les éléments du composant
    const styles = {
        card: {
            backgroundImage: `url(http://localhost:9000/${carte.background_image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '300px',
            borderRadius: '10px',
            overflow: 'hidden',
            color: 'white',
            textShadow: '1px 1px 2px black',
            padding: '15px',
            position: 'relative',
        },
        button: {
            margin: '0 5px',
        },
        footer: {
            background: '#007bff',
            color: 'white',
            textAlign: 'center',
            padding: '20px 0',
            marginTop: '30px',
        },
        footerText: {
            margin: 0,
        },
        returnButton: {
            position: 'absolute',
            bottom: '10px',
            right: '10px',
        },
    };

    // Rendu du composant
    return (
        <div className="container py-5">
            <ToastContainer /> {/* Container pour les notifications */}
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    <div className="card" style={styles.card}>
                        <div className="card-body">
                            <div className='d-flex justify-content-between'>
                                <button onClick={handlePrint} className='btn btn-primary' style={styles.button} disabled={loadingPrint}>
                                    {loadingPrint ? 'Téléchargement en cours...' : <><FaPrint className="me-1" /> Télécharger</>}
                                </button>
                                <button onClick={() => handleRedirect(whatsappLink)} className="btn btn-success" style={styles.button}>
                                    <FaWhatsapp className="me-1" /> WhatsApp
                                </button>
                                <button onClick={() => handleRedirect(websiteLink)} className="btn btn-primary" style={styles.button}>
                                    <FaGlobe className="me-1" /> Site Web
                                </button>
                                <button onClick={() => handleRedirect(facebookLink)} className="btn btn-primary" style={styles.button}>
                                    <FaFacebook className="me-1" /> Facebook
                                </button>
                                <button onClick={() => handleRedirect(linkedinLink)} className="btn btn-primary" style={styles.button}>
                                    <FaLinkedin className="me-1" /> LinkedIn
                                </button>
                            </div>
                            <button onClick={() => navigate(-1)} className='btn btn-secondary' style={styles.returnButton}>
                                <FaArrowLeft /> Retour
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <footer style={styles.footer}>
                <div className="container text-center">
                    <p style={styles.footerText}>&copy; 2024 Carte de Visite. Tous droits réservés.</p>
                </div>
            </footer>
        </div>
    );
};

export default CarteDetail;

