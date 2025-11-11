import api from './api';

export const messagingService = {
  // Récupérer tous les messages
  getAll: async () => {
    const response = await api.get('/messages');
    return response.data;
  },

  // Envoyer un message
  send: async (messageData) => {
    const response = await api.post('/messages', messageData);
    return response.data;
  },

  // Marquer un message comme lu
  markAsRead: async (id) => {
    const response = await api.patch(`/messages/${id}/read`);
    return response.data;
  },

  // Supprimer un message
  delete: async (id) => {
    const response = await api.delete(`/messages/${id}`);
    return response.data;
  }
};