import './Cart.css';
import { useCartSelector } from "../../redux/useSelectors";
import { removeFromCart as removeItem, getCart } from "../../services/cartService";
import useDispatcher from "../../redux/useDispatcher"
import { toast } from 'react-toastify';
import getImageURL from "../../utils/getImageURL"
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart } = useCartSelector();
  const { setCart } = useDispatcher();
  const navgation = useNavigate();
  const totalPrice = cart.reduce((total, item) => total + item.Product.price * item.quantity, 0);

  const deleteItem = async (cartItem_id) => {
    try {
      const response = await removeItem(cartItem_id);
      toast.success(response.message);

      const cartData = await getCart();
      setCart(cartData.CartItems)

    } catch (error) {
      toast.error(error.response.data.error)
    }
  }

  return (

    <>
      <h2 className='cart-heading'>Your Shopping Cart</h2>
      
        <div className="cart-container">

          {cart.length === 0 ? (
            <p className="empty-cart">Your cart is empty.</p>
          ) : (
            <div className='cart-items-container'>
              <div className="cart-items">
                {cart.map((item) => (
                  <div key={item.cartItem_id} className="cart-item">
                    <img src={getImageURL(item.Product.image)} alt={item.Product.name} />
                    <div className="item-info">
                      <h4>{item.Product.name}</h4>
                      <p>Price: ₹{item.Product.price}</p>
                      <p>Quantity: {item.quantity}</p>
                      <button className="remove-btn" onClick={() => deleteItem(item.cartItem_id)}>Remove</button>
                    </div>
                  </div>
                ))}
              </div>
              <div className='cart-summary-container'>
                <div className="cart-summary">
                  <h4 className='order-summary'>Order Summary</h4><hr />
                  <h3><span>Total </span><span>₹ {totalPrice}</span></h3>
                </div>
                <div className='checkout-btn-container'>
                  <button className="checkout-btn" onClick={()=>navgation('/checkout')} >Proceed to Checkout</button>
                </div>
              </div>
            </div>
          )}
        </div>
    </>
  );
};

export default Cart;
