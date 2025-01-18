import React from "react";
import "./NewArrivals.css";
import { getNewArrivals } from "../../../api/productService";
import { useState, useEffect } from "react";
import ProductCard from "../../../components/ProductCard";

function NewArrivals() {
  const [products, setProducts] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getNewArrivals();
        setProducts(response);
      } catch (error) {
        console.error("Error fetching new arrivals:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="new-arrivals">
      <h1>New Arrivals</h1>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default NewArrivals;
