import API from "./api"

export const createOrder = async (data)=>{
    try {
        const res = await API.post('/order',data);
        return res.data
    } catch (error) {
        throw error;
    }
}

export const getMyOrders = async () =>{
    try {
        const res = await API.get('/order');
        return res.data;
    } catch (error) {
        throw error;
    }
}