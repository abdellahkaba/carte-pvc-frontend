import React from 'react';
import { FaCheckCircle, FaCog, FaShareAlt, FaChartLine } from 'react-icons/fa';

const howItWorksStyles = {
    section: {
        background: '#fff',
        padding: '60px 0',
        textAlign: 'center',
    },
    title: {
        fontSize: '2em',
        marginBottom: '40px',
        color: '#333',
    },
    step: {
        margin: '20px 0',
    },
    stepNumber: {
        fontSize: '1.5em',
        marginBottom: '10px',
        color: '#007bff',
    },
    stepIcon: {
        fontSize: '4em',
        color: '#007bff',
        marginBottom: '20px',
    },
    stepTitle: {
        fontSize: '1.2em',
        marginBottom: '10px',
    },
    stepDescription: {
        color: '#777',
    },
};

export default function HowItWorksSection() {
    return (
        <section style={howItWorksStyles.section}>
            <h2 style={howItWorksStyles.title}>Le processus de création de votre carte de visite digitale</h2>
            <div className="container">
                <div className="row">
                    <div className="col-md-3" style={howItWorksStyles.step}>
                        <FaCheckCircle style={howItWorksStyles.stepIcon} />
                        <div style={howItWorksStyles.stepNumber}>01</div>
                        <h3 style={howItWorksStyles.stepTitle}>Créez votre carte</h3>
                        <p style={howItWorksStyles.stepDescription}>Utilisez notre plateforme pour créer vos cartes de visite professionnelles en quelques minutes.</p>
                    </div>
                    <div className="col-md-3" style={howItWorksStyles.step}>
                        <FaCog style={howItWorksStyles.stepIcon} />
                        <div style={howItWorksStyles.stepNumber}>02</div>
                        <h3 style={howItWorksStyles.stepTitle}>Configurez votre profil</h3>
                        <p style={howItWorksStyles.stepDescription}>Personnalisez les informations de votre carte de visite selon vos besoins.</p>
                    </div>
                    <div className="col-md-3" style={howItWorksStyles.step}>
                        <FaShareAlt style={howItWorksStyles.stepIcon} />
                        <div style={howItWorksStyles.stepNumber}>03</div>
                        <h3 style={howItWorksStyles.stepTitle}>Partagez votre carte</h3>
                        <p style={howItWorksStyles.stepDescription}>Partagez vos cartes de visite avec vos contacts en un clic.</p>
                    </div>
                    <div className="col-md-3" style={howItWorksStyles.step}>
                        <FaChartLine style={howItWorksStyles.stepIcon} />
                        <div style={howItWorksStyles.stepNumber}>04</div>
                        <h3 style={howItWorksStyles.stepTitle}>Mesurez vos KPI</h3>
                        <p style={howItWorksStyles.stepDescription}>Analysez les performances de vos cartes de visite et mesurez vos KPI.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
