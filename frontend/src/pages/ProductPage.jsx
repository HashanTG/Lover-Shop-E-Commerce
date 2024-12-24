import React, { useState } from "react";
import "./ProductPage.css";
import ProductCard from "../components/ProductCard";
const ProductPage = ({ category }) => {
  // Static product data
  const allProducts = {
    Teddy: [
      { id: 1, name: "Pink Teddy", price: 3500, description: "Soft and cuddly pink teddy.", image: "https://via.placeholder.com/150" },
      { id: 2, name: "Brown Teddy", price: 4500, description: "Cute brown teddy bear.", image: "https://via.placeholder.com/150" },
      { id: 3, name: "Pink Teddy", price: 3500, description: "Soft and cuddly pink teddy.", image: "https://via.placeholder.com/150" },
      { id: 4, name: "Brown Teddy", price: 4500, description: "Cute brown teddy bear.", image: "https://via.placeholder.com/150" },
      { id: 5, name: "Pink Teddy", price: 3500, description: "Soft and cuddly pink teddy.", image: "https://via.placeholder.com/150" },
      { id: 6, name: "Brown Teddy", price: 4500, description: "Cute brown teddy bear.", image: "https://via.placeholder.com/150" },
      { id: 7, name: "Pink Teddy", price: 3500, description: "Soft and cuddly pink teddy.", image: "https://via.placeholder.com/150" },
      { id: 8, name: "Brown Teddy", price: 4500, description: "Cute brown teddy bear.", image: "https://via.placeholder.com/150" },
      

    ],
    Jewelry: [
      { id: 1, name: "Pink Teddy", price: 3500, description: "Soft and cuddly pink teddy.", image: "https://via.placeholder.com/150" },
      { id: 2, name: "Brown Teddy", price: 4500, description: "Cute brown teddy bear.", image: "https://via.placeholder.com/150" },
      { id: 3, name: "Pink Teddy", price: 3500, description: "Soft and cuddly pink teddy.", image: "https://via.placeholder.com/150" },
      { id: 4, name: "Brown Teddy", price: 4500, description: "Cute brown teddy bear.", image: "https://via.placeholder.com/150" },
      { id: 5, name: "Pink Teddy", price: 3500, description: "Soft and cuddly pink teddy.", image: "https://via.placeholder.com/150" },
      { id: 6, name: "Brown Teddy", price: 4500, description: "Cute brown teddy bear.", image: "https://via.placeholder.com/150" },
      { id: 7, name: "Pink Teddy", price: 3500, description: "Soft and cuddly pink teddy.", image: "https://via.placeholder.com/150" },
      { id: 8, name: "Brown Teddy", price: 4500, description: "Cute brown teddy bear.", image: "https://via.placeholder.com/150" },
    ],
    Flowers: [
      { id: 1, name: "Pink Teddy", price: 3500, description: "Soft and cuddly pink teddy.", image: "https://via.placeholder.com/150" },
      { id: 2, name: "Brown Teddy", price: 4500, description: "Cute brown teddy bear.", image: "https://via.placeholder.com/150" },
      { id: 3, name: "Pink Teddy", price: 3500, description: "Soft and cuddly pink teddy.", image: "https://via.placeholder.com/150" },
      { id: 4, name: "Brown Teddy", price: 4500, description: "Cute brown teddy bear.", image: "https://via.placeholder.com/150" },
      { id: 5, name: "Pink Teddy", price: 3500, description: "Soft and cuddly pink teddy.", image: "https://via.placeholder.com/150" },
      { id: 6, name: "Brown Teddy", price: 4500, description: "Cute brown teddy bear.", image: "https://via.placeholder.com/150" },
      { id: 7, name: "Pink Teddy", price: 3500, description: "Soft and cuddly pink teddy.", image: "https://via.placeholder.com/150" },
      { id: 8, name: "Brown Teddy", price: 5500, description: "Cute brown teddy bear.", image: "https://via.placeholder.com/150" },
    ],
  };

  // States for filtering
  const [selectedCategory, setSelectedCategory] = useState(category || "Teddy");
  const [priceFilter, setPriceFilter] = useState("All");

  // Filtered products
  const products = allProducts[selectedCategory].filter((product) => {
    if (priceFilter === "All") return true;
    return product.price <= parseInt(priceFilter);
  });

  return (
    <div className="product-page">
      {/* Header Banner */}
      <div className="banner">
        <img src="/productpagefooter.png" alt="Banner" className="banner-image" />
        <div className="banner-content">
          <h1>{selectedCategory} Products</h1>
          <p>Explore the best collection of {selectedCategory.toLowerCase()} products at affordable prices!</p>
        </div>
      </div>

      {/* Filters */}
      <div className="filters">
        {/* <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="Teddy">Teddy</option>
          <option value="Jewelry">Jewelry</option>
          <option value="Flowers">Flowers</option>
        </select> */}
        <select value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)}>
          <option value="All">All Prices</option>
          <option value="1000">Up to Rs. 1000</option>
          <option value="2000">Up to Rs. 2000</option>
          <option value="5000">Up to Rs. 5000</option>
        </select>
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
