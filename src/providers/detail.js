import { axiosInstance } from '../utils/axiosInstance';
import { tryCatch } from '../utils/tryCatch';

export const getDoctorServicesByServiceId = async (id) => {
    const data = await tryCatch(() => axiosInstance.get(`/doctor-services/service/${id}`));

    return data;
}

export const getServiceById = async (id) => {
    const data = await tryCatch(() => axiosInstance.get(`/services/${id}`));

    return data;
}

export const getDoctorById = async (id) => {
    const data = await tryCatch(() => axiosInstance.get(`/doctors/${id}`));

    return data;
}

export const getEventById = async (id) => {
    const data = await tryCatch(() => axiosInstance.get(`/events/${id}`));

    return data;
}