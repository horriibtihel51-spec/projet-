import React from "react";
import "../styles/components.css";

const PatientCard = ({ patient }) => {
  const getConditionColor = (condition) => {
    switch (condition) {
      case "Critique": return "critical";
      case "Stable": return "stable";
      case "Amélioration": return "improvement";
      default: return "stable";
    }
  };

  return (
    <div className="patient-card">
      <div className="patient-header">
        <h3 className="patient-name">{patient.name}</h3>
        <span className={`status-badge ${getConditionColor(patient.condition)}`}>
          {patient.condition}
        </span>
      </div>
      
      <div className="patient-info">
        <div className="info-item">
          <span className="info-label">Âge:</span>
          <span className="info-value">{patient.age} ans</span>
        </div>
        
        <div className="info-item">
          <span className="info-label">Dernière visite:</span>
          <span className="info-value">{patient.lastVisit}</span>
        </div>
      </div>
      
      <div className="patient-actions">
        <button className="btn btn-outline">Voir dossier</button>
        <button className="btn btn-primary">Modifier</button>
      </div>
    </div>
  );
};

export default PatientCard;