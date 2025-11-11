import React from 'react';

const MedicalServices = () => {
  const services = [
    {
      id: 1,
      name: 'Service Potenti',
      description: 'Cluster médical et historique des patients',
      icon: '🏥'
    },
    {
      id: 2,
      name: 'Service Médian',
      description: 'Gestion des emplois du temps et spécialités',
      icon: '📊'
    },
    {
      id: 3,
      name: 'Service Rendez-vous',
      description: 'Système de rendez-vous et notifications',
      icon: '📅'
    },
    {
      id: 4,
      name: 'Service Assurance',
      description: 'Gestion des facturations et assurances',
      icon: '🛡️'
    },
    {
      id: 5,
      name: 'Service Messagerie',
      description: 'Système de messagerie interne',
      icon: '✉️'
    }
  ];

  return (
    <div className="medical-services">
      <h2>Services Médicaux</h2>
      <p className="section-description">
        Notre plateforme SOA intègre tous les services nécessaires pour une gestion médicale optimale.
      </p>
      
      <div className="services-grid">
        {services.map(service => (
          <div key={service.id} className="service-card">
            <div className="service-icon">{service.icon}</div>
            <h3>{service.name}</h3>
            <p>{service.description}</p>
            <button className="btn-primary">Accéder au service</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MedicalServices;