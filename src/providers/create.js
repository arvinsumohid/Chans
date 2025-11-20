import { axiosInstance } from '../utils/axiosInstance';
import { tryCatch } from '../utils/tryCatch';

export const register = async (userData) => {
    const data = await tryCatch(() => axiosInstance.post('/users', userData));

    return data;
}

export const createDoctor = async (doctorData) => {
    const data = await tryCatch(() => axiosInstance.post('/doctors', doctorData));

    return data;
}

export const createService = async (serviceData) => {
    const data = await tryCatch(() => axiosInstance.post('/services', serviceData));

    return data;
}

export const createDoctorService = async (doctorServiceData) => {
    const { doctor_id, ...serviceData } = doctorServiceData;
    const data = await tryCatch(() => axiosInstance.post(`/doctor-services/doctor/${doctor_id}`, serviceData));

    return data;
}


export const createAppointment = async (appointmentData) => {
    const data = await tryCatch(() => axiosInstance.post('/appointments', appointmentData));

    return data;
}