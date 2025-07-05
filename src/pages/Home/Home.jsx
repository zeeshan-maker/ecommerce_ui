import React, { useEffect, useState } from 'react';
import ProductCard from "../../components/ProductCard/ProductCard";
import './Home.css';
import { getAllProducts } from '../../services/productService';
const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
   const  getAllProduct = async ()=>{
      try {
        const product = await getAllProducts();
        setProducts(product)
      } catch (error) {
        console.log(error)
      }
    }
    getAllProduct();
  }, []);

  return (
    <div className="home-container">
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard key={product.product_id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
