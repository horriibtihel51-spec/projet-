export const validatePatient = (patientData) => {
  const errors = {};

  if (!patientData.firstName?.trim()) {
    errors.firstName = 'Le prénom est requis';
  }

  if (!patientData.lastName?.trim()) {
    errors.lastName = 'Le nom est requis';
  }

  if (!patientData.dateOfBirth) {
    errors.dateOfBirth = 'La date de naissance est requise';
  } else if (new Date(patientData.dateOfBirth) > new Date()) {
    errors.dateOfBirth = 'La date de naissance ne peut pas être dans le futur';
  }

  if (patientData.phone && !/^[0-9+\-\s()]{10,}$/.test(patientData.phone)) {
    errors.phone = 'Numéro de téléphone invalide';
  }

  if (patientData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(patientData.email)) {
    errors.email = 'Adresse email invalide';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateAppointment = (appointmentData) => {
  const errors = {};

  if (!appointmentData.patientId) {
    errors.patientId = 'Le patient est requis';
  }

  if (!appointmentData.doctorId) {
    errors.doctorId = 'Le médecin est requis';
  }

  if (!appointmentData.date) {
    errors.date = 'La date est requise';
  }

  if (!appointmentData.time) {
    errors.time = 'L\'heure est requise';
  }

  if (!appointmentData.reason?.trim()) {
    errors.reason = 'Le motif de consultation est requis';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};