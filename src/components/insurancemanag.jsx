// src/components/InsuranceManagement.js
import React, { useState } from 'react';

const InsuranceManagement = () => {
  const [activeTab, setActiveTab] = useState('providers');

  const insuranceProviders = [
    {
      id: 1,
      name: 'CNAM',
      logo: '🏛️',
      coverage: '80%',
      status: 'Actif',
      contractDate: '2023-01-15',
      contact: '71 123 456'
    },
    {
      id: 2,
      name: 'AXA Assurance',
      logo: '🔷',
      coverage: '70%',
      status: 'Actif',
      contractDate: '2023-03-20',
      contact: '70 987 654'
    },
    {
      id: 3,
      name: 'GAT Assurance',
      logo: '🛡️',
      coverage: '75%',
      status: 'En attente',
      contractDate: '2024-01-10',
      contact: '52 456 789'
    }
  ];

  const billingRecords = [
    {
      id: 1,
      patient: 'Mohamed Ben Ali',
      amount: '250 TND',
      date: '2023-10-15',
      insurance: 'CNAM',
      status: 'Payé',
      reference: 'FAC-2023-001'
    },
    {
      id: 2,
      patient: 'Fatima Zohra',
      amount: '180 TND',
      date: '2023-10-20',
      insurance: 'AXA Assurance',
      status: 'En attente',
      reference: 'FAC-2023-002'
    }
  ];

  const claims = [
    {
      id: 1,
      patient: 'Hassan Trabelsi',
      amount: '320 TND',
      date: '2023-11-01',
      insurance: 'CNAM',
      status: 'Approuvé',
      claimNumber: 'REC-2023-045'
    }
  ];

  return (
    <div className="insurance-management">
      <div className="page-header">
        <div className="header-content">
          <h1>Gestion des Assurances</h1>
          <p>Gérez les relations avec les assureurs et la facturation</p>
        </div>
        <button className="btn-primary">
          + Nouvelle Convention
        </button>
      </div>

      {/* Navigation par onglets */}
      <div className="tabs-navigation">
        <button 
          className={activeTab === 'providers' ? 'active' : ''}
          onClick={() => setActiveTab('providers')}
        >
          🏛️ Assureurs
        </button>
        <button 
          className={activeTab === 'billing' ? 'active' : ''}
          onClick={() => setActiveTab('billing')}
        >
          💰 Facturation
        </button>
        <button 
          className={activeTab === 'claims' ? 'active' : ''}
          onClick={() => setActiveTab('claims')}
        >
          📋 Remboursements
        </button>
        <button 
          className={activeTab === 'reports' ? 'active' : ''}
          onClick={() => setActiveTab('reports')}
        >
          📊 Rapports
        </button>
      </div>

      {/* Contenu des onglets */}
      <div className="tab-content">
        {activeTab === 'providers' && (
          <div className="providers-section">
            <h2>Assureurs Partenaires</h2>
            <div className="providers-grid">
              {insuranceProviders.map(provider => (
                <div key={provider.id} className="provider-card">
                  <div className="provider-header">
                    <div className="provider-logo">{provider.logo}</div>
                    <div className="provider-info">
                      <h3>{provider.name}</h3>
                      <span className={`status-badge ${provider.status.toLowerCase()}`}>
                        {provider.status}
                      </span>
                    </div>
                  </div>

                  <div className="provider-details">
                    <div className="detail-item">
                      <label>Couverture:</label>
                      <span className="coverage">{provider.coverage}</span>
                    </div>
                    <div className="detail-item">
                      <label>Contrat depuis:</label>
                      <span>{provider.contractDate}</span>
                    </div>
                    <div className="detail-item">
                      <label>Contact:</label>
                      <span>{provider.contact}</span>
                    </div>
                  </div>

                  <div className="provider-actions">
                    <button className="btn-outline">Détails</button>
                    <button className="btn-primary">Contacter</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'billing' && (
          <div className="billing-section">
            <div className="section-header">
              <h2>Facturation Récente</h2>
              <button className="btn-primary">+ Nouvelle Facture</button>
            </div>

            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Référence</th>
                    <th>Patient</th>
                    <th>Montant</th>
                    <th>Date</th>
                    <th>Assurance</th>
                    <th>Statut</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {billingRecords.map(record => (
                    <tr key={record.id}>
                      <td>
                        <strong>{record.reference}</strong>
                      </td>
                      <td>{record.patient}</td>
                      <td className="amount">{record.amount}</td>
                      <td>{record.date}</td>
                      <td>
                        <span className="insurance-tag">{record.insurance}</span>
                      </td>
                      <td>
                        <span className={`status-badge ${record.status.toLowerCase()}`}>
                          {record.status}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button className="btn-icon" title="Voir">👁️</button>
                          <button className="btn-icon" title="Télécharger">📥</button>
                          <button className="btn-icon" title="Modifier">✏️</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'claims' && (
          <div className="claims-section">
            <h2>Demandes de Remboursement</h2>
            <div className="claims-stats">
              <div className="stat-card">
                <h3>1</h3>
                <p>En attente</p>
              </div>
              <div className="stat-card success">
                <h3>1</h3>
                <p>Approuvés</p>
              </div>
              <div className="stat-card warning">
                <h3>0</h3>
                <p>En traitement</p>
              </div>
            </div>

            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>N° Demande</th>
                    <th>Patient</th>
                    <th>Montant</th>
                    <th>Date</th>
                    <th>Assurance</th>
                    <th>Statut</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {claims.map(claim => (
                    <tr key={claim.id}>
                      <td>
                        <strong>{claim.claimNumber}</strong>
                      </td>
                      <td>{claim.patient}</td>
                      <td className="amount">{claim.amount}</td>
                      <td>{claim.date}</td>
                      <td>
                        <span className="insurance-tag">{claim.insurance}</span>
                      </td>
                      <td>
                        <span className={`status-badge ${claim.status.toLowerCase()}`}>
                          {claim.status}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button className="btn-icon" title="Suivi">📊</button>
                          <button className="btn-icon" title="Documents">📄</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InsuranceManagement;