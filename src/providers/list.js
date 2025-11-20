import { axiosInstance } from '../utils/axiosInstance';
import { tryCatch } from '../utils/tryCatch';

export const getDoctors = async (params) => {
    const { page, size, search } = params;
    const data = await tryCatch(() => axiosInstance.get('/doctors', { params: { page, size, search } }));

    return data;
}

export const getServices = async (params) => {
    const { page, size, search } = params;
    const data = await tryCatch(() => axiosInstance.get('/services', { params: { page, size, search } }));

    return data;
}