
import React, { useState, useEffect } from "react";

import "./ProductPage.css";
import ProductCard from "../components/ProductCard";
import Loading from "../components/shared/Loading/Loading";

const ProductPage = () => {
  // Single array for all products
  const allProducts = [
    { id: 1, name: "Pink Teddy", price: 3500, description: "Soft and cuddly pink teddy.", image: "/images/image150.png", category: "Teddy" },
    { id: 2, name: "Brown Teddy", price: 4500, description: "Cute brown teddy bear.", image: "/images/image150.png", category: "Teddy" },
    { id: 3, name: "Gold Necklace", price: 3500, description: "Beautiful gold necklace.", image: "/images/image150.png", category: "Jewelry" },
    { id: 4, name: "Silver Bracelet", price: 4500, description: "Elegant silver bracelet.", image: "/images/image150.png", category: "Jewelry" },
    { id: 5, name: "Red Roses", price: 3500, description: "Fresh red roses.", image: "/images/image150.png", category: "Flowers" },
    { id: 6, name: "White Lilies", price: 4500, description: "Beautiful white lilies.", image: "/images/image150.png", category: "Flowers" },
    { id: 7, name: "Diamond Ring", price: 3500, description: "Sparkling diamond ring.", image: "/images/image150.png", category: "Jewelry" },
    { id: 8, name: "Tulip Bouquet", price: 4500, description: "Colorful tulip bouquet.", image: "/images/image150.png", category: "Flowers" }
  ];

  // States for filtering
  const [priceFilter, setPriceFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [isLoading, setIsLoading] = useState(true);

  // Filtered products
  const filteredProducts = allProducts.filter(product => {
    const matchesPrice = priceFilter === "All" ? true : product.price <= parseInt(priceFilter);
    const matchesCategory = categoryFilter === "All" ? true : product.category === categoryFilter;
    return matchesPrice && matchesCategory;
  });

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000); // 2 seconds loading time, adjust as needed

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="product-page">
      {/* Header Banner */}
      <div className="banner">
        <img src="/productpagefooter.png" alt="Banner" className="banner-image" />
        <div className="banner-content">
          <h1>Our Products</h1>
          <p>Explore our amazing collection of products at affordable prices!</p>
        </div>
      </div>

      {/* Filters */}
      <div className="filters">
        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
          <option value="All">All Categories</option>
          <option value="Teddy">Teddy</option>
          <option value="Jewelry">Jewelry</option>
          <option value="Flowers">Flowers</option>
        </select>
        <select value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)}>
          <option value="All">All Prices</option>
          <option value="1000">Up to Rs. 1000</option>
          <option value="2000">Up to Rs. 2000</option>
          <option value="5000">Up to Rs. 5000</option>
        </select>
      </div>

      <div className="product-grid">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductPage;