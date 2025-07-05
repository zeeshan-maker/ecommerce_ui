import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetail.css';
import { getProductById } from '../../services/productService';
import getImagePath from '../../utils/getImageURL';
import { useAuthSelector } from '../../redux/useSelectors';
import { toast } from 'react-toastify';
import { addToCart } from '../../services/cartService';
import useDispatcher from '../../redux/useDispatcher';
import { getCart } from '../../services/cartService';

const ProductDetail = () => {
  const { product_id } = useParams();
  const [product, setProduct] = useState(null);
  const { isAuthenticated } = useAuthSelector();
  const { setCart } = useDispatcher();

  // Simulate fetching product by product_id
  useEffect(() => {
    const getProductBy_Id = async () => {
      try {
        const response = await getProductById(product_id);
        setProduct(response)
      } catch (error) {
        console.log(error);
      }
    }

    getProductBy_Id()

  }, [product_id]);



  const handleAddToCart = async () => {
    if (isAuthenticated) {
      try {
        const response = await addToCart(product_id);
        toast.success(response.message);

        const cartData = await getCart();
        setCart(cartData.CartItems)

      } catch (error) {
        toast.error(error.response.data.error);
      }
    }
    else {
      toast.warning("Login required.")
    }

  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="detail-container">
      <div className="image-section">
        <img src={getImagePath(product.image)} alt={product.name} />
      </div>

      <div className="info-section">
        <h2>{product.name}</h2>
        <p className="detail-price">₹{product.price}</p>
        <p className="detail-desc">{product.description}</p>
        <button className="add-cart-btn" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
