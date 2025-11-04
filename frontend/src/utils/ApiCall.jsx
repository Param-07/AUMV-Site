import api from './api';

 export const login = async (finalData) => {
    console.log(finalData);
    // baseUrl = baseUrl + "/auth/login";
    const start = Date.now();

    const response = await api.post("/auth/login", finalData);
    const end = Date.now();
    console.log(`⏱️ API call took ${end - start} ms`);
    return response.data;
}

export const addTeacher = async (finalData) => {
    const response = await api.post('/addTeacher', finalData);
    return response.data;
}

export const getTeachers = async () => {
    const response = await api.get('/teachers');
    return response.data;
}