import API from "./api";

export const fetchCategories = async () =>{
    try {
        const response = await API.get('/category');
        return response.data;
    } catch (error) {
        throw error;
    }
}