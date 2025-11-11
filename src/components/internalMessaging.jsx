// src/components/InternalMessaging.js
import React, { useState } from 'react';

const InternalMessaging = ({ messages, setMessages }) => {
  const [activeTab, setActiveTab] = useState('inbox');
  const [showCompose, setShowCompose] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);

  const ComposeModal = ({ onSend, onCancel }) => {
    const [formData, setFormData] = useState({
      to: '',
      subject: '',
      content: '',
      priority: 'normal'
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      const newMessage = {
        id: messages.length + 1,
        from: 'Dr. Mohamed Ben Salah',
        to: formData.to,
        subject: formData.subject,
        content: formData.content,
        date: new Date().toISOString().split('T')[0],
        time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        priority: formData.priority,
        read: true,
        attachments: []
      };
      onSend(newMessage);
    };

    return (
      <div className="modal-overlay">
        <div className="modal large">
          <h3>Nouveau Message</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Destinataire *</label>
                <select
                  value={formData.to}
                  onChange={(e) => setFormData({...formData, to: e.target.value})}
                  required
                >
                  <option value="">Sélectionner un destinataire</option>
                  <option value="Dr. Smith">Dr. Smith</option>
                  <option value="Dr. Johnson">Dr. Johnson</option>
                  <option value="Administration">Administration</option>
                  <option value="Tout le personnel">Tout le personnel</option>
                </select>
              </div>
              <div className="form-group">
                <label>Priorité</label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({...formData, priority: e.target.value})}
                >
                  <option value="low">Basse</option>
                  <option value="normal">Normale</option>
                  <option value="high">Haute</option>
                  <option value="urgent">Urgente</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Sujet *</label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                placeholder="Objet du message..."
                required
              />
            </div>

            <div className="form-group">
              <label>Message *</label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                rows="8"
                placeholder="Tapez votre message ici..."
                required
              />
            </div>

            <div className="form-actions">
              <button type="button" onClick={onCancel}>Annuler</button>
              <button type="submit" className="btn-primary">
                📤 Envoyer le message
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const MessageDetail = ({ message, onBack, onReply }) => {
    return (
      <div className="message-detail">
        <div className="detail-header">
          <button onClick={onBack} className="btn-back">← Retour</button>
          <div className="message-actions">
            <button className="btn-icon" onClick={onReply}>↩️ Répondre</button>
            <button className="btn-icon">🖨️ Imprimer</button>
            <button className="btn-icon">🗑️ Supprimer</button>
          </div>
        </div>

        <div className="message-content">
          <div className="message-header detailed">
            <div className="message-meta">
              <h2>{message.subject}</h2>
              <div className="message-info">
                <span className="sender">De: {message.from}</span>
                <span className="recipient">À: {message.to}</span>
                <span className="date">{message.date} à {message.time}</span>
                <span className={`priority ${message.priority}`}>
                  {message.priority}
                </span>
              </div>
            </div>
          </div>

          <div className="message-body">
            <p>{message.content}</p>
          </div>

          {message.attachments && message.attachments.length > 0 && (
            <div className="message-attachments">
              <h4>Pièces jointes</h4>
              <div className="attachments-list">
                {message.attachments.map((attachment, index) => (
                  <div key={index} className="attachment-item">
                    <span className="attachment-icon">📎</span>
                    <span className="attachment-name">{attachment.name}</span>
                    <button className="btn-download">Télécharger</button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const markAsRead = (id) => {
    setMessages(messages.map(msg => 
      msg.id === id ? {...msg, read: true} : msg
    ));
  };

  const unreadCount = messages.filter(msg => !msg.read).length;

  if (selectedMessage) {
    return (
      <MessageDetail
        message={selectedMessage}
        onBack={() => setSelectedMessage(null)}
        onReply={() => {
          setShowCompose(true);
          setSelectedMessage(null);
        }}
      />
    );
  }

  return (
    <div className="internal-messaging">
      <div className="page-header">
        <div className="header-content">
          <h1>Messagerie Interne</h1>
          <p>Communication sécurisée entre le personnel médical</p>
        </div>
        <button 
          className="btn-primary"
          onClick={() => setShowCompose(true)}
        >
          ✏️ Nouveau Message
        </button>
      </div>

      {/* Navigation des dossiers */}
      <div className="mail-folders">
        <button 
          className={activeTab === 'inbox' ? 'active' : ''}
          onClick={() => setActiveTab('inbox')}
        >
          📥 Boîte de réception {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
        </button>
        <button 
          className={activeTab === 'sent' ? 'active' : ''}
          onClick={() => setActiveTab('sent')}
        >
          📤 Messages envoyés
        </button>
        <button 
          className={activeTab === 'drafts' ? 'active' : ''}
          onClick={() => setActiveTab('drafts')}
        >
          📝 Brouillons
        </button>
        <button 
          className={activeTab === 'archive' ? 'active' : ''}
          onClick={() => setActiveTab('archive')}
        >
          🗄️ Archives
        </button>
      </div>

      {/* Liste des messages */}
      <div className="messages-list">
        {messages.map(message => (
          <div 
            key={message.id} 
            className={`message-item ${!message.read ? 'unread' : ''} ${message.priority}`}
            onClick={() => {
              setSelectedMessage(message);
              markAsRead(message.id);
            }}
          >
            <div className="message-checkbox">
              <input type="checkbox" />
            </div>
            
            <div className="message-sender">
              <div className="sender-avatar">
                {message.from.split(' ').map(n => n[0]).join('')}
              </div>
            </div>

            <div className="message-content-preview">
              <div className="message-header">
                <span className="sender-name">{message.from}</span>
                <span className="message-date">{message.date}</span>
              </div>
              <div className="message-subject">{message.subject}</div>
              <div className="message-preview">
                {message.content.substring(0, 100)}...
              </div>
            </div>

            <div className="message-meta">
              {!message.read && <div className="unread-indicator"></div>}
              {message.priority === 'urgent' && <span className="priority-flag">🚩</span>}
            </div>
          </div>
        ))}

        {messages.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">✉️</div>
            <h3>Aucun message</h3>
            <p>Votre boîte de réception est vide</p>
            <button 
              className="btn-primary"
              onClick={() => setShowCompose(true)}
            >
              Écrire un message
            </button>
          </div>
        )}
      </div>

      {/* Modal de composition */}
      {showCompose && (
        <ComposeModal
          onSend={(newMessage) => {
            setMessages([newMessage, ...messages]);
            setShowCompose(false);
          }}
          onCancel={() => setShowCompose(false)}
        />
      )}
    </div>
  );
};

export default InternalMessaging;