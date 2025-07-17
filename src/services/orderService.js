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


export const getAllOrders = async () =>{
    try {
        const res = await API.get('/order/admin/all');
        return res.data;
    } catch (error) {
        throw error;
    }
}

export const updateOrder = async (orderId, status) =>{
    try {
        const res = await API.patch(`/order/admin/status/${orderId}`,{status})
        return res.data;
    } catch (error) {
        throw error;
    }
}