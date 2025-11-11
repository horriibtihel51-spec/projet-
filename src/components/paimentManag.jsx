// src/components/PatientManagement.js
import React, { useState } from 'react';

const PatientManagement = ({ patients, setPatients }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const PatientForm = ({ patient, onSave, onCancel }) => {
    const [formData, setFormData] = useState(patient || {
      name: '',
      age: '',
      phone: '',
      email: '',
      condition: '',
      address: ''
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      onSave(formData);
    };

    return (
      <div className="modal-overlay">
        <div className="modal">
          <h3>{patient ? 'Modifier le patient' : 'Nouveau patient'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Nom complet *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Âge *</label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({...formData, age: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Téléphone *</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Condition médicale *</label>
              <input
                type="text"
                value={formData.condition}
                onChange={(e) => setFormData({...formData, condition: e.target.value})}
                required
              />
            </div>

            <div className="form-group">
              <label>Adresse</label>
              <textarea
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                rows="3"
              />
            </div>

            <div className="form-actions">
              <button type="button" onClick={onCancel}>Annuler</button>
              <button type="submit" className="btn-primary">
                {patient ? 'Modifier' : 'Créer'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const handleSavePatient = (patientData) => {
    if (selectedPatient) {
      // Modification
      setPatients(patients.map(p => 
        p.id === selectedPatient.id ? {...p, ...patientData} : p
      ));
    } else {
      // Nouveau patient
      const newPatient = {
        id: patients.length + 1,
        ...patientData,
        lastVisit: new Date().toISOString().split('T')[0]
      };
      setPatients([...patients, newPatient]);
    }
    setShowForm(false);
    setSelectedPatient(null);
  };

  return (
    <div className="patient-management">
      <div className="page-header">
        <div className="header-content">
          <h1>Gestion des Patients</h1>
          <p>Gérez les dossiers patients et les informations médicales</p>
        </div>
        <button 
          className="btn-primary"
          onClick={() => setShowForm(true)}
        >
          + Nouveau Patient
        </button>
      </div>

      {/* Barre de recherche et filtres */}
      <div className="toolbar">
        <div className="search-box">
          <input
            type="text"
            placeholder="Rechercher un patient..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="search-icon">🔍</span>
        </div>
        
        <div className="filters">
          <select>
            <option>Tous les statuts</option>
            <option>Actif</option>
            <option>Inactif</option>
          </select>
        </div>
      </div>

      {/* Tableau des patients */}
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Patient</th>
              <th>Âge</th>
              <th>Condition</th>
              <th>Contact</th>
              <th>Dernière visite</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map(patient => (
              <tr key={patient.id}>
                <td>
                  <div className="patient-cell">
                    <div className="patient-avatar small">
                      {patient.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="patient-info">
                      <strong>{patient.name}</strong>
                    </div>
                  </div>
                </td>
                <td>{patient.age} ans</td>
                <td>
                  <span className="condition-tag">{patient.condition}</span>
                </td>
                <td>
                  <div className="contact-info">
                    <div>{patient.phone}</div>
                    <div className="email">{patient.email}</div>
                  </div>
                </td>
                <td>{patient.lastVisit}</td>
                <td>
                  <div className="action-buttons">
                    <button 
                      className="btn-icon"
                      onClick={() => {
                        setSelectedPatient(patient);
                        setShowForm(true);
                      }}
                      title="Modifier"
                    >
                      ✏️
                    </button>
                    <button className="btn-icon" title="Dossier médical">
                      📁
                    </button>
                    <button className="btn-icon danger" title="Supprimer">
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredPatients.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">👥</div>
            <h3>Aucun patient trouvé</h3>
            <p>Aucun patient ne correspond à votre recherche</p>
          </div>
        )}
      </div>

      {/* Formulaire modal */}
      {showForm && (
        <PatientForm
          patient={selectedPatient}
          onSave={handleSavePatient}
          onCancel={() => {
            setShowForm(false);
            setSelectedPatient(null);
          }}
        />
      )}
    </div>
  );
};

export default PatientManagement;