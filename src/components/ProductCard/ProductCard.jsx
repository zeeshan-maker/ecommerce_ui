import React from 'react';
import './ProductCard.css';
import { Link } from 'react-router-dom';
import getImagePath from '../../utils/getImageURL';
const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img src={getImagePath(product.image)} alt={product.name} />

      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="price">₹{product.price}</p>
        <p className="desc">{product.description.slice(0, 60)}...</p>
        <Link to={`/products/${product.product_id}`} className="view-btn">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
