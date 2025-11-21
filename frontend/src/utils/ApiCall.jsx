import api from './api';

 export const login = async (finalData) => {
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

export const editTeachers = async (finalData, id) => {
    const response = await api.put(`edit/teacher/${id}`, finalData);
    return response.data;
}

export const deleteTeacherData = async(id) => {
    const response = await api.delete(`/teacher/delete/${id}`);
    return response.data;
}

export const getImages = async(endp) => {
    const start = Date.now();
    const response = await api.get(endp);
    const end = Date.now();
    console.log(`⏱️ API call took ${end - start} ms`);
    return response.data;
}

export const uploadImages = async(finalData) => {
    const response = await api.post('/upload', finalData);
    return response.data;
}

export const deleteImages = async(id) => {
    const response = await api.delete(`/delete/${id}`);
    return response.data;
}

export const getHeroSectionImages = async() => {
    const response = await api.get('/getHero');
    return response.data
}


export const getEvents = async() => {
    const response = await api.get('/getEvents');
    console.log(response.data.events);
    return response.data.events;
}

export const addEvents = async(form) => {
    console.log(form);
    const response = await api.post('/addEvents', form);
    return response.data
}

export const editEvents = async(id, formData) => {
    const response = await api.post(`edit/Events/${id}`, formData);
    return response.data
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
