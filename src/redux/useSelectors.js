import { useSelector } from "react-redux";


export const useAuthSelector = () =>{
    return {
        isAuthenticated: useSelector((state)=>state.auth.isAuthenticated),
        accessToken: useSelector((state)=>state.auth.accessToken),
        user: useSelector((state) => state.auth.user)
    }
}

export const useCartSelector = ()=>{
    return{
        cart: useSelector((state) => state.cart.cartItems), 
        cartTotalQuantity: useSelector((state) => state.cart.totalQuantity)
        
    }
};


