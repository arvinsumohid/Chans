import { axiosInstance } from '../utils/axiosInstance';
import { tryCatch } from '../utils/tryCatch';

export const register = async (userData) => {
    const data = await tryCatch(() => axiosInstance.post('/users', userData));

    return data;
}