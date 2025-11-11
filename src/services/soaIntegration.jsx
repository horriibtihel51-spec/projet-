import api from './api';

export const SOAServices = {
  // Service Potenti (Cluster médical)
  medicalCluster: {
    getPatientHistory: (patientId) => 
      api.get(`/potenti/patients/${patientId}/history`),
    
    updateMedicalRecord: (patientId, record) =>
      api.put(`/potenti/patients/${patientId}/records`, record)
  },

  // Service Médian (Emploi du temps)
  scheduling: {
    getDoctorSchedule: (doctorId, date) =>
      api.get(`/median/doctors/${doctorId}/schedule?date=${date}`),
    
    bookAppointment: (appointmentData) =>
      api.post('/median/appointments', appointmentData)
  },

  // Service Assurance
  insurance: {
    verifyCoverage: (patientId, serviceCode) =>
      api.get(`/insurance/patients/${patientId}/coverage?service=${serviceCode}`),
    
    submitClaim: (claimData) =>
      api.post('/insurance/claims', claimData)
  }
};