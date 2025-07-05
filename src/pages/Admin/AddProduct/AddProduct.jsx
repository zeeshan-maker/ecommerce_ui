// src/pages/admin/AddProduct.js
import React, { useState, useEffect } from 'react';
import './AddProduct.css';
import { fetchCategories } from '../../../services/categoryService';
import { toast } from 'react-toastify';
import { addProduct } from '../../../services/productService';

const AddProduct = () => {
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    image: 'null',
    category_id: '',
  });
  const [categories, setCategories] = useState([]);


  const handleChange = e => {
    if (e.target.name === 'image') {
      setForm({ ...form, image: e.target.files[0] }); // handle file
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await addProduct(form);
      toast.success(res.message);
      setForm({
        name: '',
        description: '',
        price: '',
        stock: '',
        image: 'null',
        category_id: '',
      })
    } catch (error) {
      toast.error(error.response.data.error);
    }

  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setForm(prev => ({
        ...prev,
        image: file,             // the File object for upload
        imagePreview: previewURL // used for preview
      }));
    }
  }

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await fetchCategories();
        setCategories(res);
      } catch (error) {
        toast.error(error.response.data.error)
      }
    }
    getCategories();
  }, [])
  return (

    <div className="form-container">
      <h2 className="form-title">Add New Product</h2>
      <form className="product-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Product Name</label>
          <input
            type="text"
            name="name"
            required
            value={form.name}
            onChange={handleChange}
          // placeholder="e.g. iPhone 14"
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
          // placeholder="Enter product description"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Price</label>
            <input
              type="number"
              name="price"
              required
              value={form.price}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Stock</label>
            <input
              type="number"
              name="stock"
              required
              value={form.stock}
              onChange={handleChange}

            />
          </div>
        </div>

        <div className="form-group">
          <label>Upload Image</label>
          <div className="custom-file-input-wrapper">
            <label htmlFor="image-upload" className="upload-btn">Choose Image</label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            {form.imagePreview && (
              <img
                src={form.imagePreview}
                alt="Preview"
                className="image-preview"
              />
            )}
          </div>
        </div>



        <div className="form-group">
          <label>Category</label>
          <select
            name="category_id"
            value={form.category_id}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            {categories.map(cat => (
              <option key={cat.category_id} value={cat.category_id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div className='add-product-button'>
          <button type="submit" className="submit-btn">Add Product</button>
        </div>
      </form>
    </div>

  );
};

export default AddProduct;
