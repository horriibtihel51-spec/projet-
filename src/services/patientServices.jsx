import api from './api';

export const patientService = {
  // Récupérer tous les patients
  getAll: async () => {
    const response = await api.get('/patients');
    return response.data;
  },

  // Récupérer un patient par ID
  getById: async (id) => {
    const response = await api.get(`/patients/${id}`);
    return response.data;
  },

  // Créer un nouveau patient
  create: async (patientData) => {
    const response = await api.post('/patients', patientData);
    return response.data;
  },

  // Mettre à jour un patient
  update: async (id, patientData) => {
    const response = await api.put(`/patients/${id}`, patientData);
    return response.data;
  },

  // Supprimer un patient
  delete: async (id) => {
    const response = await api.delete(`/patients/${id}`);
    return response.data;
  },

  // Rechercher des patients
  search: async (query) => {
    const response = await api.get(`/patients/search?q=${query}`);
    return response.data;
  }
};