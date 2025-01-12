import React from "react";
import { useState } from "react";
import AddProduct from "./AddProduct/Addproduct";
import "./ProductList.css";

const ProductRow = ({ product }) => {
  return (
    <div className="product-row">
      <div>
        <input type="checkbox" />
      </div>
      <div>{product.name}</div>
      <div>{product.sku}</div>
      <div>{product.stock}</div>
      <div>{product.price}</div>
      <div
        className={`status ${product.status.toLowerCase().replace(/\s/g, "-")}`}
      >
        {product.status}
      </div>
      <div>
        <button className="action-button">🗑️</button>
      </div>
    </div>
  );
};

const ProductList = () => {
  const products = [
    {
      name: "Handmade Pouch",
      sku: "302012",
      stock: 10,
      price: "$121.00",
      status: "Low Stock",
    },
    {
      name: "Smartwatch E2",
      sku: "302011",
      stock: 204,
      price: "$590.00",
      status: "Published",
    },
    {
      name: "Smartwatch E1",
      sku: "302002",
      stock: 48,
      price: "$125.00",
      status: "Draft",
    },
    {
      name: "Headphone G1 Pro",
      sku: "301901",
      stock: 401,
      price: "$348.00",
      status: "Published",
    },
    {
      name: "Iphone X",
      sku: "301900",
      stock: 120,
      price: "$607.00",
      status: "Published",
    },
    {
      name: "Puma Shoes",
      sku: "301881",
      stock: 432,
      price: "$234.00",
      status: "Published",
    },
    {
      name: "Imac 2021",
      sku: "301643",
      stock: 0,
      price: "$760.00",
      status: "Out of Stock",
    },
    {
      name: "Nike Shoes",
      sku: "301600",
      stock: 347,
      price: "$400.00",
      status: "Published",
    },
    {
      name: "Lego Car",
      sku: "301555",
      stock: 299,
      price: "$812.00",
      status: "Published",
    },
    {
      name: "Skincare A1a 1",
      sku: "301002",
      stock: 38,
      price: "$123.00",
      status: "Draft",
    },
  ];

  const [product, setProduct] = useState(true);

  return (
    <div className="product-list-container">
      {/* Main Content */}
      {product ?(
        <main className="main-content">
          <div className="product-add-header">
            <h1>Product</h1>
            <button className="add-product-button" onClick={() =>setProduct(false)}>+ Add Product</button>
          </div>
          <div className="search-bar">
            <input type="text" placeholder="Search product..." />
          </div>

          {/* Product Table */}
          <div className="product-table">
            <div className="table-header">
              <div>Product</div>
              <div>SKU</div>
              <div>Stock</div>
              <div>Price</div>
              <div>Status</div>
              <div>Action</div>
            </div>
            {products.map((product, index) => (
              <ProductRow key={index} product={product} />
            ))}
          </div>
        </main>
      ):(<main className="main-content"><AddProduct></AddProduct></main>)}
    </div>
  );
};

export default ProductList;
