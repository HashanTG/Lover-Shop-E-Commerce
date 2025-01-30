import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddProduct.css";

const AddEditProduct = ({ editProduct, onClose }) => {
  const [productDetails, setProductDetails] = useState({
    name: "",
    description: "",
    category: "Gift",
    subCategory: "Girls",
    price: "",
    previousPrice: "",
    stock: "",
    sku: "",
    images: [],
  });

  const [variations, setVariations] = useState([]);
  const [newVariationType, setNewVariationType] = useState("");
  const [newVariationOptions, setNewVariationOptions] = useState([{ value: "", stock: "" }]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  // Load product details if editing
  useEffect(() => {
    if (editProduct) {
      setProductDetails({
        name: editProduct.name,
        description: editProduct.description,
        category: editProduct.category,
        subCategory: editProduct.subCategory,
        price: editProduct.price,
        previousPrice: editProduct.previousPrice,
        stock: editProduct.stock,
        sku: editProduct.sku,
        images: editProduct.images || [],
      });
      setVariations(editProduct.variations || []);
    }
  }, [editProduct]);

  // Handle input changes for product details
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductDetails({ ...productDetails, [name]: value });
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles((prev) => [...prev, ...files]);
  };

  // Remove an image
  const handleRemoveImage = (index) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // Add a new option to the variation
  const handleAddOption = () => {
    setNewVariationOptions([...newVariationOptions, { value: "", stock: "" }]);
  };

  // Update option values
  const handleOptionChange = (index, field, value) => {
    const updatedOptions = [...newVariationOptions];
    updatedOptions[index][field] = value;
    setNewVariationOptions(updatedOptions);
  };

  // Add variation
  const handleAddVariation = () => {
    if (newVariationType && newVariationOptions.length > 0) {
      setVariations([...variations, { type: newVariationType, options: newVariationOptions }]);
      setNewVariationType("");
      setNewVariationOptions([{ value: "", stock: "" }]);
    }
  };

  // Remove variation
  const handleRemoveVariation = (index) => {
    setVariations(variations.filter((_, i) => i !== index));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const uploadedUrls = [...productDetails.images]; // Keep existing images
    setUploading(true);

    try {
      // Upload new images
      for (const file of selectedFiles) {
        const { data: presignedUrl } = await axios.post(
          `http://localhost:8080/api/products/generate-presigned-url?fileName=${file.name}`
        );

        await axios.put(presignedUrl, file, {
          headers: { "Content-Type": file.type },
        });

        const publicUrl = presignedUrl.split("?")[0];
        uploadedUrls.push(publicUrl);
      }

      // Prepare product data
      const productData = {
        ...productDetails,
        images: uploadedUrls,
        variations,
      };

      if (editProduct) {
        // Update existing product
        await axios.put(`http://localhost:8080/api/products/${editProduct.id}`, productData, {
          withCredentials: true,
        });
        alert("Product updated successfully!");
      } else {
        // Create new product
        await axios.post("http://localhost:8080/api/products", productData, {
          withCredentials: true,
        });
        alert("Product added successfully!");
      }

      onClose(); // Close form after submission
    } catch (error) {
      console.error("Error uploading images or saving product:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="add-product-container">
      <h2>{editProduct ? "Edit Product" : "Add Product"}</h2>
      <form onSubmit={handleSubmit}>
        {/* Image Upload Section */}
        <div className="form-section">
          <label>Upload Images</label>
          <div className="image-upload">
            {productDetails.images.map((img, index) => (
              <div className="image-box" key={index}>
                <img src={img} alt="Preview" className="uploaded-image" />
                <button type="button" onClick={() => handleRemoveImage(index)}>✕</button>
              </div>
            ))}
            <label className="image-box">
              <input
                type="file"
                multiple
                accept="image/*"
                className="file-input"
                onChange={handleImageUpload}
                disabled={uploading}
              />
              {uploading ? "Uploading..." : "Upload"}
            </label>
          </div>
        </div>

        {/* Product Details */}
        <div className="form-section">
          <label>Product Name</label>
          <input type="text" name="name" value={productDetails.name} onChange={handleInputChange} />
        </div>

        <div className="form-section">
          <label>Product Description</label>
          <textarea name="description" value={productDetails.description} onChange={handleInputChange} />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Price</label>
            <input type="number" name="price" value={productDetails.price} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label>Stock</label>
            <input type="number" name="stock" value={productDetails.stock} onChange={handleInputChange} />
          </div>
        </div>

        {/* Variation Section */}
        <div className="variation-section">
          <h3>Variations</h3>
          {variations.map((variation, index) => (
            <div key={index}>
              <h4>{variation.type}</h4>
              <ul>
                {variation.options.map((opt, idx) => (
                  <li key={idx}>{opt.value} (Stock: {opt.stock})</li>
                ))}
              </ul>
              <button type="button" onClick={() => handleRemoveVariation(index)}>Remove</button>
            </div>
          ))}
          {/* Add new variations */}
        </div>

        <button type="submit">{editProduct ? "Update Product" : "Add Product"}</button>
      </form>
    </div>
  );
};

export default AddEditProduct;
