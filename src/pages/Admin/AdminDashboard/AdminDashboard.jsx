import './AdminDashboard.css';
import { getAllProducts, removeProduct } from '../../../services/productService';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
  const [products, setProducts] = useState([])
 

  useEffect(()=>{
   const getProducts = async ()=>{
    try {
      const response = await getAllProducts();
      setProducts(response);
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
   }
   
   getProducts();
  },[])


  const handleRemove = async (product_id) => {
    try {
      const res = await removeProduct(product_id);
      toast.success(res.message)

      const response = await getAllProducts();
      setProducts(response);
      
    } catch (error) {
      toast.error(error.response.data.error)
    }
  };
  if(products.length === 0){
    return(
      <h1 className='product-heading'>Data Not Found</h1>
    )
  }

  return (
    <div className="product-list-container">
      <h1 className='product-heading'>All Products List</h1>
      <div className="product-table">
        <div className="product-header">
          <span>Image</span>
          <span>Title</span>
          <span>Price</span>
          <span>Category</span>
          <span>Action</span>
        </div>
        <div className='list'>
        {products.map(product => (
          <div className="product-row" key={product.product_id}>
            <div><img src={product.image} alt={product.name} /></div>
            <div>{product.name}</div>
            <div>₹{product.price}</div>
            <div>{product.Category.name}</div>
            <div>
              <button className="remove-btn" onClick={() => handleRemove(product.product_id)}>Remove</button>
            </div>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
