import axios from "axios";

const fetchItems = () => axios.get(`${import.meta.env.VITE_API_BASE_URL}/items`);
const addItem = (todoTitle: string) => {
    const data = {
        title: todoTitle
    };
    return axios.post(`${import.meta.env.VITE_API_BASE_URL}/item`, data);
};
const deleteItem = (id: string) => axios.delete(`${import.meta.env.VITE_API_BASE_URL}/item/${id}`);

export {
    fetchItems,
    addItem,
    deleteItem
};