import axios from 'axios';

const API_URL = 'https://vigilant-system-9pg74q45p97cx7vr-8080.app.github.dev/'; // URL API của backend

export const login = async (username, password) => {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    return response.data;
};

export const getRooms = async () => {
    const response = await axios.get(`${API_URL}/room`);
    return response.data;
};

export const createRoom = async (name, price) => {
    const response = await axios.post(`${API_URL}/room`, { name, price });
    return response.data;
};

export const deleteRoom = async (roomId) => {
    const response = await axios.delete(`${API_URL}/room/${roomId}`);
    return response.data;
};
