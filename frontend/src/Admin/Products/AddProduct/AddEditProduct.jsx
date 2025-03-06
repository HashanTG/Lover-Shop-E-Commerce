import React, { useState, useEffect } from "react";
import axios from "axios";
import { addProductApi, editProductApi } from "../../../api/productService";
import "./AddProduct.css";

const AddEditProduct = ({ editProduct, onClose }) => {
  // State for product details
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

  // State for variations
  const [variations, setVariations] = useState([]);
  const [newVariationType, setNewVariationType] = useState("");
  const [newVariationOptions, setNewVariationOptions] = useState([{ value: "", stock: "" }]);

  // State for image files and uploading status
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

    // State for new category input visibility
    const [isNewCategory, setIsNewCategory] = useState(false);
    const [newCategory, setNewCategory] = useState("");

    //error Message
    const [errorMessage, setErrorMessage] = useState("");

  // Load product details if editing an existing product
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

  // Update product details on input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Handle file input change for image uploads
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
  };

  // Remove an image from the selected list
  const handleRemoveImage = (index) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  // Variation handling
  const handleAddOption = () => {
    setNewVariationOptions((prevOptions) => [...prevOptions, { value: "", stock: "" }]);
  };

  const handleRemoveOption = (index) => {
    const updatedOptions = newVariationOptions.filter((_, i) => i !== index);
    setNewVariationOptions(updatedOptions);
  };

  const handleOptionChange = (index, field, value) => {
    const updatedOptions = [...newVariationOptions];
    updatedOptions[index][field] = value;
    setNewVariationOptions(updatedOptions);
  };

  const handleAddVariation = () => {
    // Prevent adding empty variation options
    if (newVariationType.trim() && newVariationOptions.every(option => option.value.trim() && option.stock.trim())) {
      setVariations((prevVariations) => [
        ...prevVariations,
        { type: newVariationType.trim(), options: newVariationOptions },
      ]);
      setNewVariationType("");
      setNewVariationOptions([{ value: "", stock: "" }]);
      setErrorMessage(""); // Clear any error
    } else {
      setErrorMessage("Please fill in all variation options and stock.");
    }
  };

  const handleRemoveVariation = (index) => {
    setVariations((prevVariations) => prevVariations.filter((_, i) => i !== index));
  };

  // Handle category change
  const handleCategoryChange = (e) => {
    const { value } = e.target;
    setProductDetails((prevDetails) => ({
      ...prevDetails,
      category: value,
    }));

    if (value === "Add New") {
      setIsNewCategory(true); // Show input for new category
    } else {
      setIsNewCategory(false); // Hide input if not adding new
    }
  };

  // Handle form submission (add or update product)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    const uploadedUrls = [...productDetails.images]; // Retain any existing images

    try {
      // Upload each new image file
      for (const file of selectedFiles) {
        const { data: presignedUrl } = await axios.post(
          `http://localhost:8080/api/products/generate-presigned-url?fileName=${encodeURIComponent(file.name)}`
        );

        await axios.put(presignedUrl, file, {
          headers: { "Content-Type": file.type },
        });

        // Get public URL (assumes presigned URL contains query parameters)
        const publicUrl = presignedUrl.split("?")[0];
        uploadedUrls.push(publicUrl);
      }

      // Prepare complete product data
      const productData = {
        ...productDetails,
        images: uploadedUrls,
        variations,
      };

      // Send data to API
      if (editProduct) {
        await editProductApi(editProduct.id, productData);
        alert("Product updated successfully!");
      } else {
        await addProductApi(productData);
        alert("Product added successfully!");
      }

      onClose(); // Close the form after successful submission
    } catch (error) {
      console.error("Error uploading images or saving product:", error);
      alert("An error occurred while saving the product. Please try again.");
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
            {selectedFiles.map((file, index) => (
              <div className="image-box" key={index}>
                <img src={URL.createObjectURL(file)} alt="Preview" className="uploaded-image" />
                <button type="button" onClick={() => handleRemoveImage(index)}>
                  ✕
                </button>
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

        {/* Product Details Section */}
        <div className="form-section">
          <label>Product Name</label>
          <input type="text" name="name" value={productDetails.name} onChange={handleInputChange} />
        </div>

        <div className="form-section">
          <label>Product Description</label>
          <textarea name="description" value={productDetails.description} onChange={handleInputChange} />
        </div>

        {/* Category and Sub Category Section */}
        <div className="form-row">
          <div className="form-group">
            <label>Category</label>
            <select name="category" value={productDetails.category} onChange={handleCategoryChange}>
              <option value="Gift">Gift</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Add New">Add New</option>
            </select>
          </div>
          {isNewCategory && (
            <div className="form-group">
              <label>New Category</label>
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Enter new category"
              />
            </div>
          )}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Price</label>
            <input
              type="number"
              name="price"
              value={productDetails.price}
              onChange={handleInputChange}
              placeholder="Enter price"
            />
          </div>
          <div className="form-group">
            <label>Previous Price</label>
            <input
              type="number"
              name="previousPrice"
              value={productDetails.previousPrice}
              onChange={handleInputChange}
              placeholder="Enter previous price"
            />
          </div>
          <div className="form-group">
            <label>Stock</label>
            <input
              type="number"
              name="stock"
              value={productDetails.stock}
              onChange={handleInputChange}
              placeholder="Enter stock"
            />
          </div>
          <div className="form-group">
            <label>SKU</label>
            <input
              type="text"
              name="sku"
              value={productDetails.sku}
              onChange={handleInputChange}
              placeholder="Enter SKU"
            />
          </div>
        </div>

        {/* Variation Section */}
        <div className="variation-section">
          <h3>Add Variations</h3>
          <div className="form-group">
            <label>Variation Type</label>
            <input
              type="text"
              placeholder="e.g., Color, Size"
              value={newVariationType}
              onChange={(e) => setNewVariationType(e.target.value)}
            />
          </div>
          {newVariationOptions.map((option, index) => (
            <div className="form-row" key={index}>
              <input
                type="text"
                placeholder="Option Value (e.g., Red)"
                value={option.value}
                onChange={(e) => handleOptionChange(index, "value", e.target.value)}
              />
              <input
                type="number"
                placeholder="Stock"
                value={option.stock}
                onChange={(e) => handleOptionChange(index, "stock", e.target.value)}
              />
              <button type="button" onClick={() => handleRemoveOption(index)}>Remove Option</button>
            </div>
          ))}
          <button type="button" className="add-option-button" onClick={handleAddOption}>
            Add Option
          </button>
      {errorMessage && <div className="error">{errorMessage}</div>}
          <button type="button" onClick={handleAddVariation}>
            Add Variation
          </button>
        </div>

        {/* Variation List */}
        <div className="variation-list">
          <h3>Existing Variations</h3>
          {variations.map((variation, index) => (
            <div className="variation-item" key={index}>
              <h4>{variation.type}</h4>
              <ul>
                {variation.options.map((option, idx) => (
                  <li key={idx}>
                    {option.value} (Stock: {option.stock})
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className="edit-button"
                onClick={() => handleRemoveVariation(index)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <button type="submit" className="add-button">
          {editProduct ? "Update Product" : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddEditProduct;
