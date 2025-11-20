import { axiosInstance } from '../utils/axiosInstance';
import { tryCatch } from '../utils/tryCatch';

export const getDoctorServices = async (id) => {
    const data = await tryCatch(() => axiosInstance.get(`/doctor-services/doctor/${id}`));

    return data;
}