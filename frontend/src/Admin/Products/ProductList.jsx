import React, { useEffect, useState } from "react";
import { getProducts } from "../../api/productService";
import AddEditProduct from "./AddProduct/AddEditProduct";
import AddProduct from "./AddProduct/Addproduct";
import "./ProductList.css";

const ProductRow = ({ product, onDelete, onEdit }) => {
  return (
    <div className="product-row">
      <div>
        <img src={product.images[0]} alt={product.name} className="product-thumbnail" />
      </div>
      <div>{product.name}</div>
      <div>{product.sku}</div>
      <div>{product.price}</div>
      <div>
        {product.stock < 5 ? <span className="low-stock">Low Stock</span> : product.stock}
      </div>
      <div className="action-buttons">
        <button className="edit-button" onClick={() => onEdit(product)}>✏️</button>
        <button className="delete-button" onClick={() => onDelete(product.id)}>🗑️</button>
      </div>
    </div>
  );
};

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [editProduct, setEditProduct] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false); 
  const pageSize = 20;

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const fetchProducts = async () => {
    try {
      const response = await getProducts(page, pageSize);
      setProducts(response.content);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleDelete = async (productId) => {
    try {
      // await deleteProduct(productId);
      // setProducts(products.filter((product) => product.id !== productId));
      console.log("Delete product with ID:", productId);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEdit = (product) => {
    setEditProduct(product); 
    setShowEditForm(true); 
  };

  return (
    showEditForm ? (
      <AddProduct
        editProduct={editProduct} 
        onClose={() => setShowEditForm(false)} 
      />
    ) : (
      <div className="product-list-container">
        <div className="product-add-header">
          <h1>Products</h1>
          <button className="add-product-button" onClick={() => setShowEditForm(true)}>
            + Add Product
          </button>
        </div>
  
        <div className="product-table">
          <div className="table-header">
            <div>Image</div>
            <div>Product</div>
            <div>SKU</div>
            <div>Price</div>
            <div>Stock</div>
            <div>Actions</div>
          </div>
          {products.map((product) => (
            <ProductRow
              key={product.id}
              product={product}
              onDelete={handleDelete}
              onEdit={handleEdit} 
            />
          ))}
        </div>
  
        <div className="pagination">
          <button disabled={page === 0} onClick={() => setPage(page - 1)}>⬅️ Prev</button>
          <span>Page {page + 1}</span>
          <button onClick={() => setPage(page + 1)}>Next ➡️</button>
        </div>
      </div>
    )
  );
};

export default ProductList;
