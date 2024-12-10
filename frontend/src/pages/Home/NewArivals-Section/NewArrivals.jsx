import React from "react";
import "./NewArrivals.css";

const products = [
  {
    id: 1,
    name: "Red Heart Gift Pack",
    price: 3950,
    image: "/images/image.png",
    isNew: true,
    rating: 5,
  },
  {
    id: 2,
    name: "You are Mine",
    price: 8500,
    image: "/images/image2.png",
    isNew: true,
    rating: 5,
  },
  {
    id: 3,
    name: "Fogg Body Spray",
    price: 1500,
    image: "/images/image2.png",
    isNew: true,
    rating: 5,
  },
  {
    id: 4,
    name: "Facial Trimmer",
    price: 575,
    image: "/images/image3.png",
    isNew: true,
    rating: 5,
  },
  {
    id: 5,
    name: "Bra Strap",
    price: 20,
    image: "/images/image.png",
    isNew: true,
    rating: 5,
  },
  {
    id: 6,
    name: "Bra Strap",
    price: 20,
    image: "/images/image.png",
    isNew: true,
    rating: 5,
  },
  {
    id: 7,
    name: "Bra Strap",
    price: 20,
    image: "/images/image.png",
    isNew: true,
    rating: 5,
  },
  {
    id: 8,
    name: "Red Heart Gift Pack",
    price: 3950,
    image: "/images/image.png",
    isNew: true,
    rating: 5,
  },
  {
    id: 9,
    name: "You are Mine",
    price: 8500,
    image: "/images/image2.png",
    isNew: true,
    rating: 5,
  },
  {
    id: 10,
    name: "Fogg Body Spray",
    price: 1500,
    image: "/images/image2.png",
    isNew: true,
    rating: 5,
  },
  {
    id: 11,
    name: "Facial Trimmer",
    price: 575,
    image: "/images/image3.png",
    isNew: true,
    rating: 3,
  },
  {
    id: 12,
    name: "Bra Strap",
    price: 20,
    image: "/images/image.png",
    isNew: true,
    rating: 4,
  },{
    id: 13,
    name: "Fogg Body Spray",
    price: 1500,
    image: "/images/image2.png",
    isNew: true,
    rating: 5,
  },
  {
    id: 14,
    name: "Facial Trimmer",
    price: 575,
    image: "/images/image3.png",
    isNew: true,
    rating: 3,
  },
  {
    id: 15,
    name: "Bra Strap",
    price: 20,
    image: "/images/image.png",
    isNew: true,
    rating: 4,
  },
];

function NewArrivals() {
  return (
    <div className="new-arrivals">
      <h1>New Arrivals</h1>
      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <div className="product-image">
              <img src={product.image} alt={product.name} />
              {product.isNew && <span className="new-label">NEW</span>}
              <button className="add-to-cart">Add to cart</button>
            </div>
            <div className="product-info">
              <h3>{product.name}</h3>
              <p>Rs.{product.price}</p>
              <div className="product-rating">
                {"★".repeat(product.rating)}
                {"☆".repeat(5 - product.rating)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewArrivals;
