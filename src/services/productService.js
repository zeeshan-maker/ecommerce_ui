import API from "./api"

// Get all products
export const getAllProducts = async () => {
    try {
        const response = await API.get('/products/');
        return response.data;
    } catch (error) {
        throw error;
    }
}


export const getProductById = async (product_id) => {
    try {
        const response = await API.get(`/products/${product_id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const addProduct = async (product) => {
    try {
        const response = await API.post("/products", product, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const removeProduct = async (product_id)=>{
    try {
        const response = await API.delete(`/products/${product_id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}