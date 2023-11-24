import axios from "axios";

const fetchItems = () => axios.get("/api/items");

export {
    fetchItems
};