import React, { useState, useEffect } from "react";
import { getProducts } from "../api/productService";
import "./ProductPage.css";
import ProductCard from "../components/ProductCard";
import Loading from "../components/shared/Loading/Loading";

/**
 * @typedef {Object} Product
 * @property {string} id - Corresponds to _id
 * @property {string} name
 * @property {string} category
 * @property {number} price
 * @property {number} previousPrice
 * @property {number} stock
 * @property {string} description
 * @property {string[]} images - Array of image URLs
 * @property {string} createdAt - ISO date string
 * @property {Object[]} variations - Array of variation objects
 */



const ProductPage = () => {
  // Single array for all products
  // const allProducts = [
  //   { id: 1, name: "Pink Teddy", price: 3500, description: "Soft and cuddly pink teddy.", image: "/images/image150.png", category: "Teddy" },
  //   { id: 2, name: "Brown Teddy", price: 4500, description: "Cute brown teddy bear.", image: "/images/image150.png", category: "Teddy" },
  //   { id: 3, name: "Gold Necklace", price: 3500, description: "Beautiful gold necklace.", image: "/images/image150.png", category: "Jewelry" },
  //   { id: 4, name: "Silver Bracelet", price: 4500, description: "Elegant silver bracelet.", image: "/images/image150.png", category: "Jewelry" },
  //   { id: 5, name: "Red Roses", price: 3500, description: "Fresh red roses.", image: "/images/image150.png", category: "Flowers" },
  //   { id: 6, name: "White Lilies", price: 4500, description: "Beautiful white lilies.", image: "/images/image150.png", category: "Flowers" },
  //   { id: 7, name: "Diamond Ring", price: 3500, description: "Sparkling diamond ring.", image: "/images/image150.png", category: "Jewelry" },
  //   { id: 8, name: "Tulip Bouquet", price: 4500, description: "Colorful tulip bouquet.", image: "/images/image150.png", category: "Flowers" }
  // ];
  const [products, setProducts] = useState([]);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true); // Show loader while fetching
        const data = await getProducts();
        console.log("Fetched products:", data.content);

        setProducts(data.content);
      } catch (error) {
        console.error('Failed to fetch products.', error);
      } finally {
        setIsLoading(false); // Hide loader after fetching
      }
    };
  
    fetchProducts();
  }, []);



  



  // States for filtering
  const [priceFilter, setPriceFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [inputValue, setInputValue] = useState("");
const [searchQuery, setSearchQuery] = useState("");


  

  // Filtered products
  const filteredProducts = products.filter(product => {
    let matchesPrice;
    switch(priceFilter) {
      case "1000":
        matchesPrice = product.price >= 1000;
        break;
      case "2000":
        matchesPrice = product.price >= 2000;
        break;
      case "5000":
        matchesPrice = product.price >= 5000;
        break;
      default:
        matchesPrice = true; // "All" case
    }
  
    const matchesCategory = categoryFilter === "All" ? true : product.category === categoryFilter;
    const matchesSearch = searchQuery === "" || product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPrice && matchesCategory && matchesSearch;
  });
  
  

  // useEffect(() => {
  //   // Simulate loading time
  //   const timer = setTimeout(() => {
  //     setIsLoading(false);
  //   }, 5000); // 2 seconds loading time, adjust as needed

  //   return () => clearTimeout(timer);
  // }, []);

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
        <div className="search-container">
        <form onSubmit={(e) => {
    e.preventDefault();
    setSearchQuery(inputValue);
  }} className="search-container">
    <input
      type="text"
      className="search"
      placeholder="Search for something..."
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
    />
    <button type="submit" className="search-button">
      Search
    </button>
  </form>
    </div>
      </div>

      {/* Filters */}
      <div className="filters">
        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
          <option value="All">All Categories</option>
          <option value="Teddy">Teddy</option>
          <option value="Gifts">Gifts</option>
          <option value="Flowers">Flowers</option>
        </select>
        <select value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)}>
  <option value="All">All Prices</option>
  <option value="1000">Above Rs. 1000</option>
  <option value="2000">Above Rs. 2000</option>
  <option value="5000">Above Rs. 5000</option>
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