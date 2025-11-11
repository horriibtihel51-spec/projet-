import { useState, useEffect } from 'react';
import { patientService } from '../services/patientService';

export const usePatients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPatients = async () => {
    setLoading(true);
    try {
      const data = await patientService.getAll();
      setPatients(data);
      setError(null);
    } catch (err) {
      setError('Erreur lors du chargement des patients');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addPatient = async (patientData) => {
    try {
      const newPatient = await patientService.create(patientData);
      setPatients(prev => [...prev, newPatient]);
      return newPatient;
    } catch (err) {
      setError('Erreur lors de l\'ajout du patient');
      throw err;
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  return {
    patients,
    loading,
    error,
    addPatient,
    refreshPatients: fetchPatients
  };
};