// React Component for Product Addition Form
import React, { useState, useEffect } from "react";
import "./AddProduct.css"; // Importing CSS file

const AddProduct = () => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  // Hardcoded product categories data
  const categoryData = [
    { id: 1, name: "Gift", subCategories: ["Girls", "Boys", "General"] },
    { id: 2, name: "Electronics", subCategories: ["Mobile", "Laptop", "Accessories"] },
    { id: 3, name: "Fashion", subCategories: ["Men", "Women", "Kids"] },
  ];

  useEffect(() => {
    // Simulating fetching categories dynamically
    setCategories(categoryData);
  }, []);

  const handleCategoryChange = (e) => {
    const selectedCategory = categoryData.find(
      (category) => category.name === e.target.value
    );
    setSubCategories(selectedCategory ? selectedCategory.subCategories : []);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    console.log("Form Data Submitted:", data);
    // Submit via REST API
  };

  return (
    <form className="add-product-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Product Name</label>
        <input type="text" name="productName" placeholder="Type here" required />
      </div>

      <div className="form-group">
        <label>Product Description</label>
        <textarea name="productDescription" placeholder="Write content here" required></textarea>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Product Category</label>
          <select name="productCategory" onChange={handleCategoryChange} required>
            <option value="">Select</option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Sub Category</label>
          <select name="subCategory" required>
            <option value="">Select</option>
            {subCategories.map((sub, index) => (
              <option key={index} value={sub}>
                {sub}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Product Price</label>
          <input type="number" name="productPrice" placeholder="25" required />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Stock</label>
          <input type="number" name="stock" placeholder="25" required />
        </div>

        <div className="form-group">
          <label>Previous Price</label>
          <input type="number" name="previousPrice" placeholder="15" />
        </div>

        <div className="form-group">
          <label>SKU</label>
          <input type="text" name="sku" placeholder="adb123#" required />
        </div>
      </div>

      <div className="form-group">
        <label>
          <input type="checkbox" name="bestseller" /> Add to bestseller
        </label>
      </div>

      <button type="submit" className="add-button">
        Add
      </button>
    </form>
  );
};

export default AddProduct;
