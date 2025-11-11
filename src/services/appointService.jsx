import api from './api';

export const appointmentService = {
  // Récupérer tous les rendez-vous
  getAll: async () => {
    const response = await api.get('/appointments');
    return response.data;
  },

  // Récupérer un rendez-vous par ID
  getById: async (id) => {
    const response = await api.get(`/appointments/${id}`);
    return response.data;
  },

  // Créer un nouveau rendez-vous
  create: async (appointmentData) => {
    const response = await api.post('/appointments', appointmentData);
    return response.data;
  },

  // Mettre à jour un rendez-vous
  update: async (id, appointmentData) => {
    const response = await api.put(`/appointments/${id}`, appointmentData);
    return response.data;
  },

  // Supprimer un rendez-vous
  delete: async (id) => {
    const response = await api.delete(`/appointments/${id}`);
    return response.data;
  },

  // Récupérer les rendez-vous par date
  getByDate: async (date) => {
    const response = await api.get(`/appointments/date/${date}`);
    return response.data;
  }
};