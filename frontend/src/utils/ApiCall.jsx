import api from './api';

 export const login = async (finalData) => {
    const start = Date.now();

    const response = await api.post("/auth/login", finalData);
    return response.data;
}

export const apiRequest = async (method, endpoint, data = null) => {
    try {
        const response = await api({
            method: method,
            url: `admin${endpoint}`,
            data: data
        });
        return response.data;
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
};
