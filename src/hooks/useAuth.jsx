import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté
    const token = localStorage.getItem('authToken');
    if (token) {
      // Ici, vous feriez une requête pour vérifier le token
      setUser({
        id: 1,
        name: 'Dr. Mohamed Ben Salah',
        role: 'doctor'
      });
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Simulation de connexion
      const userData = {
        id: 1,
        name: 'Dr. Mohamed Ben Salah',
        role: 'doctor',
        token: 'fake-jwt-token'
      };
      
      localStorage.setItem('authToken', userData.token);
      setUser(userData);
      return userData;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
  };

  return {
    user,
    loading,
    login,
    logout
  };
};