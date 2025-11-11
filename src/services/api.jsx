import React, { useState, useEffect } from 'react';
import './styles/App.css';

// Composants de base
const Header = () => (
  <header className="header">
    <div className="header-content">
      <div className="logo">
        <h1>Clinique SOA</h1>
        <span>Système de Gestion Médicale</span>
      </div>
      <div className="user-info">
        <div className="user-avatar">MB</div>
        <span>Dr. Mohamed Ben Salah</span>
      </div>
    </div>
  </header>
);

const Sidebar = ({ activeSection, setActiveSection }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Tableau de Bord', icon: '📊' },
    { id: 'patients', label: 'Gestion des Patients', icon: '👥' },
    { id: 'appointments', label: 'Rendez-vous', icon: '📅' },
    { id: 'services', label: 'Services Médicaux', icon: '🏥' },
    { id: 'insurance', label: 'Assurances', icon: '🛡️' },
    { id: 'messaging', label: 'Messagerie Interne', icon: '✉️' }
  ];

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <ul>
          {menuItems.map(item => (
            <li key={item.id} className={activeSection === item.id ? 'active' : ''}>
              <button onClick={() => setActiveSection(item.id)}>
                <span className="icon">{item.icon}</span>
                <span className="label">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

const Dashboard = ({ patients, appointments, messages }) => {
  const unreadMessages = messages.filter(msg => !msg.read).length;
  
  return (
    <div className="dashboard">
      <h2>Tableau de Bord</h2>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-info">
            <h3>{patients.length}</h3>
            <p>Patients enregistrés</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">📅</div>
          <div className="stat-info">
            <h3>{appointments.length}</h3>
            <p>Rendez-vous programmés</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">✉️</div>
          <div className="stat-info">
            <h3>{unreadMessages}</h3>
            <p>Messages non lus</p>
          </div>
        </div>
      </div>
      
      <div className="dashboard-sections">
        <div className="section">
          <h3>Derniers patients</h3>
          <ul className="patients-list">
            {patients.slice(0, 3).map(patient => (
              <li key={patient.id} className="patient-item">
                <span className="name">{patient.name}</span>
                <span className="condition">{patient.condition}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="section">
          <h3>Prochains rendez-vous</h3>
          <ul className="appointments-list">
            {appointments.slice(0, 3).map(appointment => (
              <li key={appointment.id} className="appointment-item">
                <span className="patient">{appointment.patientName}</span>
                <span className="date">{appointment.date}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const PatientManagement = ({ patients }) => {
  return (
    <div className="patient-management">
      <h2>Gestion des Patients</h2>
      <div className="patients-table">
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Âge</th>
              <th>Condition</th>
              <th>Dernière visite</th>
            </tr>
          </thead>
          <tbody>
            {patients.map(patient => (
              <tr key={patient.id}>
                <td>{patient.name}</td>
                <td>{patient.age}</td>
                <td>{patient.condition}</td>
                <td>{patient.lastVisit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const AppointmentSystem = ({ appointments }) => {
  return (
    <div className="appointment-system">
      <h2>Gestion des Rendez-vous</h2>
      <div className="appointments-list">
        {appointments.map(appointment => (
          <div key={appointment.id} className="appointment-card">
            <div className="appointment-info">
              <h4>{appointment.patientName}</h4>
              <p><strong>Date:</strong> {appointment.date} à {appointment.time}</p>
              <p><strong>Médecin:</strong> {appointment.doctor}</p>
              <p><strong>Statut:</strong> {appointment.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const MedicalServices = () => {
  return (
    <div className="medical-services">
      <h2>Services Médicaux</h2>
      <div className="services-grid">
        <div className="service-card">
          <div className="service-icon">🏥</div>
          <h3>Service Potenti</h3>
          <p>Cluster médical et historique des patients</p>
        </div>
        <div className="service-card">
          <div className="service-icon">📊</div>
          <h3>Service Médian</h3>
          <p>Gestion des emplois du temps</p>
        </div>
        <div className="service-card">
          <div className="service-icon">📅</div>
          <h3>Service Rendez-vous</h3>
          <p>Système de rendez-vous et notifications</p>
        </div>
      </div>
    </div>
  );
};

const InsuranceManagement = () => {
  return (
    <div className="insurance-management">
      <h2>Gestion des Assurances</h2>
      <p>Interface de gestion des assurances et facturation...</p>
    </div>
  );
};

const InternalMessaging = ({ messages }) => {
  return (
    <div className="internal-messaging">
      <h2>Messagerie Interne</h2>
      <div className="messages-list">
        {messages.map(message => (
          <div key={message.id} className="message-item">
            <div className="message-header">
              <span className="sender">{message.from}</span>
              <span className="date">{message.date}</span>
            </div>
            <div className="message-subject">{message.subject}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

function App() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [messages, setMessages] = useState([]);

  // Charger les données initiales
  useEffect(() => {
    const mockPatients = [
      { id: 1, name: 'Mohamed Ben Ali', age: 45, condition: 'Hypertension', lastVisit: '2023-10-15' },
      { id: 2, name: 'Fatima Zohra', age: 32, condition: 'Diabète', lastVisit: '2023-10-20' },
      { id: 3, name: 'Hassan Trabelsi', age: 58, condition: 'Cardiopathie', lastVisit: '2023-10-18' }
    ];
    
    const mockAppointments = [
      { id: 1, patientName: 'Mohamed Ben Ali', date: '2023-11-05', time: '09:00', doctor: 'Dr. Smith', status: 'Confirmé' },
      { id: 2, patientName: 'Fatima Zohra', date: '2023-11-05', time: '10:30', doctor: 'Dr. Johnson', status: 'En attente' }
    ];
    
    const mockMessages = [
      { id: 1, from: 'Dr. Smith', subject: 'Réunion du personnel', date: '2023-10-25', read: false },
      { id: 2, from: 'Administration', subject: 'Nouveaux protocoles', date: '2023-10-24', read: true }
    ];
    
    setPatients(mockPatients);
    setAppointments(mockAppointments);
    setMessages(mockMessages);
  }, []);

  const renderActiveSection = () => {
    switch(activeSection) {
      case 'dashboard':
        return <Dashboard patients={patients} appointments={appointments} messages={messages} />;
      case 'patients':
        return <PatientManagement patients={patients} />;
      case 'appointments':
        return <AppointmentSystem appointments={appointments} />;
      case 'services':
        return <MedicalServices />;
      case 'insurance':
        return <InsuranceManagement />;
      case 'messaging':
        return <InternalMessaging messages={messages} />;
      default:
        return <Dashboard patients={patients} appointments={appointments} messages={messages} />;
    }
  };

  return (
    <div className="app">
      <Header />
      <div className="app-body">
        <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
        <main className="main-content">
          {renderActiveSection()}
        </main>
      </div>
    </div>
  );
}

export default App;