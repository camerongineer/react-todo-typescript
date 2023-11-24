import axios from "axios";

const fetchItems = () => axios.get(`${import.meta.env.VITE_API_BASE_URL}/items`);

export {
    fetchItems
};