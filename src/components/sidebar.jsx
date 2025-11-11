import React from 'react';

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

export default Sidebar;