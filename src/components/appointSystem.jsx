import React from 'react';

const AppointmentSystem = ({ appointments, setAppointments }) => {
  return (
    <div className="appointment-system">
      <div className="section-header">
        <h2>Gestion des Rendez-vous</h2>
        <button className="btn-primary">
          + Nouveau Rendez-vous
        </button>
      </div>
      
      <div className="appointments-list">
        {appointments.map(appointment => (
          <div key={appointment.id} className="appointment-card">
            <div className="appointment-info">
              <h4>{appointment.patientName}</h4>
              <p><strong>Date:</strong> {appointment.date} à {appointment.time}</p>
              <p><strong>Médecin:</strong> {appointment.doctor}</p>
              <p><strong>Statut:</strong> <span className={`status ${appointment.status.toLowerCase()}`}>{appointment.status}</span></p>
            </div>
            <div className="appointment-actions">
              <button className="btn-secondary">Confirmer</button>
              <button className="btn-outline">Modifier</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppointmentSystem;