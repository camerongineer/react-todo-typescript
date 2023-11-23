import axios from "axios";

const fetchItems = () => axios.get("http://localhost:5000/items");

export {
    fetchItems
};