import { useDispatch } from "react-redux";

import { loginSuccess, logout } from "./reducer/authSlice";
import { setCart,addLocalItem, removeLocalItem,decreaseQuantity, clearLocalCart } from "./reducer/cartSlice"

const useDispatcher = () =>{
    const dispatch = useDispatch();

    return {
        login:(accessToken, refreshToken, user)=>{
            dispatch(loginSuccess(accessToken, refreshToken,user))
        },

        logout: ()=>{
            dispatch(logout());
            dispatch(clearLocalCart());
        },


        // cart action 

        setCart:(items)=>{
            dispatch(setCart(items));
        },

        addLocalItem:(item)=>{
            dispatch(addLocalItem(item));
        },

        removeLocalItem:(product_id)=>{
            dispatch(removeLocalItem(product_id));
        },
        decreaseQuantity:(product_id)=>{
            dispatch(decreaseQuantity(product_id));
        },

    }
};


export default useDispatcher;