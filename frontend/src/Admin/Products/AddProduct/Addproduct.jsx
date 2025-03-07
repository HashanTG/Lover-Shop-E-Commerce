import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddProduct.css";

const AddProduct = ({ editProduct, onClose }) => {
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
  const [newVariationOptions, setNewVariationOptions] = useState([
    { value: "", stock: "" },
  ]);
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
    const { name, value, type, checked } = e.target;
    setProductDetails({
      ...productDetails,
      [name]: value,
    });
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
      setVariations([
        ...variations,
        { type: newVariationType, options: newVariationOptions },
      ]);
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

    const uploadedUrls = [];
    setUploading(true);

    try {
      // Generate pre-signed URLs and upload files
      for (const file of selectedFiles) {
        console.log(file.name);
        const { data: presignedUrl } = await axios.post(
          "http://localhost:8080/api/products/generate-presigned-url?fileName=" +
            file.name
        );

        console.log(presignedUrl);

        await axios.put(presignedUrl, file, {
          headers: {
            "Content-Type": file.type,
          },
        });

        const publicUrl = presignedUrl.split("?")[0];
        uploadedUrls.push(publicUrl);
      }

      // Prepare the product data
      const productData = {
        ...productDetails,
        images: uploadedUrls, // Include uploaded S3 URLs
        variations,
      };

      // Save product to backend
      await axios.post("http://localhost:8080/api/products", productData, {
        withCredentials: true, // Include cookies in the request
      });

      console.log(productData);

      alert("Product added successfully!");
      setProductDetails({
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
      setSelectedFiles([]);
      setVariations([]);
    } catch (error) {
      console.error("Error uploading images or saving product:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="add-product-container">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        {/* Image Upload Section */}
        <div className="form-section">
          <label>Upload Images</label>
          <div className="image-upload">
            {selectedFiles.map((file, index) => (
              <div className="image-box" key={index}>
                <img
                  src={URL.createObjectURL(file)}
                  alt="Preview"
                  className="uploaded-image"
                />
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

        {/* Product Details */}
        <div className="form-section">
          <label>Product Name</label>
          <input
            type="text"
            name="name"
            value={productDetails.name}
            onChange={handleInputChange}
            placeholder="Enter product name"
          />
        </div>

        <div className="form-section">
          <label>Product Description</label>
          <textarea
            name="description"
            value={productDetails.description}
            onChange={handleInputChange}
            placeholder="Enter product description"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Category</label>
            <select
              name="category"
              value={productDetails.category}
              onChange={handleInputChange}
            >
              <option value="Gift">Gift</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
            </select>
          </div>
          {/* <div className="form-group">
            <label>Sub Category</label>
            <select
              name="subCategory"
              value={productDetails.subCategory}
              onChange={handleInputChange}
            >
              <option value="Girls">Girls</option>
              <option value="Boys">Boys</option>
              <option value="Unisex">Unisex</option>
            </select>
          </div> */}
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
                onChange={(e) =>
                  handleOptionChange(index, "value", e.target.value)
                }
              />
              <input
                type="number"
                placeholder="Stock"
                value={option.stock}
                onChange={(e) =>
                  handleOptionChange(index, "stock", e.target.value)
                }
              />
            </div>
          ))}
          <button
            type="button"
            className="add-option-button"
            onClick={handleAddOption}
          >
            Add Option
          </button>
          <button
            type="button"
            className="add-variation-button"
            onClick={handleAddVariation}
          >
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

        <button type="submit" className="add-button">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
