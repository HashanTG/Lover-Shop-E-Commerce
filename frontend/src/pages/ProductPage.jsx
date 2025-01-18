import React, { useState, useEffect } from "react";
import { getProducts, getCategories,searchProducts} from "../api/productService";
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
  const [products, setProducts] = useState([]);//All products
  const [categories, setCategories] = useState([]);//All categories
  const [isLoading, setIsLoading] = useState(true);//Loading state

  //Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

 
//Fetch Products and Categories
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true); // Show loader while fetching
        const data = await getProducts();
        console.log("Fetched products:", data.content);

        setProducts(data.content);
      } catch (error) {
        console.error("Failed to fetch products.", error);
      } finally {
        setIsLoading(false); // Hide loader after fetching
      }
    };

    const fetchCategories = async () => {
      try {
        setIsLoading(true); // Show loader while fetching
        const data = await getCategories();

        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories.", error);
      } finally {
        setIsLoading(false); // Hide loader after fetching
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);


// Search Products
const search = async () => {
  try {
    setIsLoading(true);
    console.log(minPrice !== "")
    console.log(minPrice)

    // Convert filters into optional query parameters
    const minPriceVal = minPrice !== "" ? parseFloat(minPrice) : undefined;
    const maxPriceVal = maxPrice !== "" ? parseFloat(maxPrice) : undefined;
    const category = categoryFilter !== "All" ? categoryFilter : undefined;

    const data = await searchProducts({
      searchQuery: searchQuery || undefined,
      category,
      minPriceVal,
      maxPriceVal // If you want to add a maximum price filter later
    });

    console.log("Searched products:", data.content);

    // Update the products state with the response
    setProducts(data.content);
  } catch (error) {
    console.error("Failed to search products.", error);
  } finally {
    setIsLoading(false); // Ensure loading state is reset
  }
};





return (
  <>
    {isLoading && <Loading />}
    {!isLoading && (
      <div className="product-page">
        {/* Header Banner */}
        <div className="banner">
          <img
            src="/productpagefooter.png"
            alt="Banner"
            className="banner-image"
          />
          <div className="banner-content">
            <h1>Our Products</h1>
            <p>
              Explore our amazing collection of products at affordable prices!
            </p>
          </div>
          <div className="search-container">
            <div className="search-container">
              <input
                type="text"
                className="search"
                placeholder="Search for something..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="search-button" onClick={() => search()}>
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="filters">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="All" selected="true">
              All Categories
            </option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <div className="price-range">
            <input
              type="number"
              placeholder="Min Price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
            <input
              type="number"
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
          <button onClick={() => search()}>Apply Filter</button>
        </div>

        {/* Products Grid */}
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    )}
  </>
);

};

export default ProductPage;
