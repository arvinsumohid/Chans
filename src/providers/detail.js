import { axiosInstance } from '../utils/axiosInstance';
import { tryCatch } from '../utils/tryCatch';

export const getDoctorServicesByServiceId = async (id) => {
    const data = await tryCatch(() => axiosInstance.get(`/doctor-services/service/${id}`));

    return data;
}