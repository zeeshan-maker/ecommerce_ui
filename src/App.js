import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import AppRoutes from './routes/AppRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useDispatcher from './redux/useDispatcher';
import { getCart } from './services/cartService';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useAuthSelector } from './redux/useSelectors';

function App() {
    const { setCart } = useDispatcher();
    const { isAuthenticated  } = useAuthSelector();
    
   

    useEffect(()=>{
     const  getCartItem = async ()=>{
       try {
        const cartData = await getCart();
        setCart(cartData.CartItems);
       } catch (error) {
        toast.error(error.response.data.message)
       }
      }
      if(isAuthenticated){
          getCartItem();
      }

  },[setCart, isAuthenticated]);

  return (
      <BrowserRouter>
        <Navbar />
        <AppRoutes />
         <ToastContainer position="top-right" autoClose={3000} />
      </BrowserRouter>
  );
}

export default App;
