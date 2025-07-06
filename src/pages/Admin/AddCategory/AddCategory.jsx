import React, { useState } from "react";
import "./AddCategory.css";
import { addCategories } from "../../../services/categoryService";
import { toast } from "react-toastify";
const CategoryPage = () => {
  const [name, setName] = useState("");
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    try {
        const res= await addCategories(name);
        toast.success(res.message);
        setName("");
    } catch (error) {
        toast.error(error?.response?.data?.message || "Some error")
    }

  };

  return (
    <div className="page-wrapper">
      <div className="category-card">
        <h2 className="title">Add New Category</h2>

        <form className="form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Category Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input"
          />
          <button type="submit" className="btn">
            Add
          </button>
        </form>

     
      </div>
    </div>
  );
};

export default CategoryPage;
