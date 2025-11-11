import React from "react";
import { Navigate } from "react-router-dom";
import PatientCard from "../components/PatientCard";
import "../styles/components.css";

const Dashboard = ({ patients, loading, isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const stats = {
    total: patients.length,
    stable: patients.filter(p => p.condition === "Stable").length,
    critical: patients.filter(p => p.condition === "Critique").length
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Tableau de Bord des Patients</h1>
        <p>Gestion et suivi des patients</p>
      </div>

      {/* Statistiques */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Patients</h3>
          <div className="stat-number">{stats.total}</div>
        </div>
        <div className="stat-card">
          <h3>Stables</h3>
          <div className="stat-number stat-stable">{stats.stable}</div>
        </div>
        <div className="stat-card">
          <h3>Critiques</h3>
          <div className="stat-number stat-critical">{stats.critical}</div>
        </div>
      </div>

      {/* Liste des patients */}
      <div className="patients-section">
        <h2>Liste des Patients</h2>
        
        {loading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Chargement des données patients...</p>
          </div>
        ) : (
          <div className="patients-grid">
            {patients.map(patient => (
              <PatientCard key={patient.id} patient={patient} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;