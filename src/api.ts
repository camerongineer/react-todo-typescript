import axios from "axios";

const fetchItems = () => axios.get(`${process.env.REACT_APP_API_BASE_URL}/items`);

export {
    fetchItems
};