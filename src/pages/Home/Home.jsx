import { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./Home.css";
import { getAllProducts } from "../../services/productService";
import { fetchCategories } from "../../services/categoryService";

const Home = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    const getAllProduct = async () => {
      try {
        const productData = await getAllProducts();
        setAllProducts(productData);
        const res = await fetchCategories();
        setCategories(res);
      } catch (error) {
        console.log(error);
      }
    };
    getAllProduct();
  }, []);

  const handleCategoryToggle = (categoryName) => {
    let updated;
    if (selectedCategories.includes(categoryName)) {
      // Uncheck: remove
      updated = selectedCategories.filter((name) => name !== categoryName);
    } else {
      // Check: add
      updated = [...selectedCategories, categoryName];
    }

    setSelectedCategories(updated);
  };

  return (
    <div className="home-container">
      <div className="sidebar">
        <h3>Filter by Category</h3>
        <ul className="category-list">
          {categories.map((cat) => (
            <li key={cat.category_id}>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat?.name)}
                  onChange={() => handleCategoryToggle(cat?.name)}
                />
                {cat?.name}
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className="products-area">
        <div className="products-grid">
          {allProducts.map((product) => (
            <ProductCard key={product.product_id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
