import React from "react";
import { Link } from "react-router-dom";
import "../styles/main.css";

const Home = () => {
  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Système de Gestion des Patients
          </h1>
          <p className="hero-subtitle">
            Solution professionnelle pour la gestion et le suivi médical de vos patients
          </p>
          <div className="hero-buttons">
            <Link to="/dashboard" className="btn btn-primary">
              Accéder au Dashboard
            </Link>
            <Link to="/login" className="btn btn-secondary">
              Se Connecter
            </Link>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Fonctionnalités</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Tableau de Bord Complet</h3>
              <p>Visualisez l'état de tous vos patients en temps réel</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">📋</div>
              <h3>Gestion des Dossiers</h3>
              <p>Accédez et gérez les dossiers médicaux facilement</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Sécurité des Données</h3>
              <p>Vos données patients sont sécurisées et confidentielles</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;