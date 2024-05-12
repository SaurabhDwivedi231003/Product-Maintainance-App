import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link component
import '../App.css'; // Import the CSS file

function UpdateProductForm() {
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState('');
  const [updatedProduct, setUpdatedProduct] = useState({
    name: '',
    price: '',
    featured: false,
    rating: '',
    company: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      };
      const response = await axios.get('http://localhost:5000/api/products', config);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const updateProduct = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      };
      await axios.put(`http://localhost:5000/api/products/${productId}`, updatedProduct, config);
      setMessage('Product updated successfully');
    } catch (error) {
      console.error('Error updating product:', error);
      setMessage('An error occurred while updating the product');
    }
  };

  const handleInputChange = (e) => {
    setUpdatedProduct({ ...updatedProduct, [e.target.name]: e.target.value });
  };

  return (
    <div className="update-product-container">
      <h2>Update Product</h2>
      <select value={productId} onChange={(e) => setProductId(e.target.value)} className="update-product-select">
        <option value="">Select a product</option>
        {products.map(product => (
          <option key={product._id} value={product._id}>{product.name}</option>
        ))}
      </select>
      <input type="text" name="name" value={updatedProduct.name} onChange={handleInputChange} placeholder="Name" className="update-product-input" />
      <input type="number" name="price" value={updatedProduct.price} onChange={handleInputChange} placeholder="Price" className="update-product-input" />
      <label className="update-product-checkbox-label">
        <input type="checkbox" name="featured" checked={updatedProduct.featured} onChange={() => setUpdatedProduct({ ...updatedProduct, featured: !updatedProduct.featured })} className="update-product-checkbox" />
        Featured
      </label>
      <input type="number" name="rating" value={updatedProduct.rating} onChange={handleInputChange} placeholder="Rating" className="update-product-input" />
      <input type="text" name="company" value={updatedProduct.company} onChange={handleInputChange} placeholder="Company" className="update-product-input" />
      <button onClick={updateProduct} className="update-product-button">Update Product</button>
      {message && <p className="update-product-message">{message}</p>}
      <div className="update-product-nav-buttons"> {/* Apply a class to style the navigation buttons container */}
        <Link to="/" className="update-product-nav-button">Home</Link> {/* Button to home */}
        <Link to="/product" className="update-product-nav-button">View Products</Link> {/* Button to view products */}
        <Link to="/add" className="update-product-nav-button">Add Product</Link> {/* Button to add product */}
      </div>
    </div>
  );
}

export default UpdateProductForm;
