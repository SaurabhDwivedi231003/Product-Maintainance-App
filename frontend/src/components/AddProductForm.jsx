import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css'; // Import the CSS file

function AddProductForm() {
  const [newProduct, setNewProduct] = useState({
    productId: '',
    name: '',
    price: '',
    featured: false,
    rating: '',
    company: ''
  });
  const navigate = useNavigate();

  const addProduct = async () => {
    try {
      const token = localStorage.getItem('token'); // get token from local storage
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      };
      await axios.post('http://localhost:5000/api/products/addproduct', newProduct, config);
      setNewProduct({
        productId: '',
        name: '',
        price: '',
        featured: false,
        rating: '',
        company: ''
      });
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  return (
    <div className="add-product-container"> {/* Apply classname to the container */}
      <div className="input-container"> {/* Container for input fields */}
        <h2>Add Product</h2>
        <input type="text" name="productId" value={newProduct.productId} onChange={handleInputChange} placeholder="Product ID" className="add-product-input" />
        <input type="text" name="name" value={newProduct.name} onChange={handleInputChange} placeholder="Name" className="add-product-input" />
        <input type="number" name="price" value={newProduct.price} onChange={handleInputChange} placeholder="Price" className="add-product-input" />
        <label>
          <input type="checkbox" name="featured" checked={newProduct.featured} onChange={() => setNewProduct({ ...newProduct, featured: !newProduct.featured })} className="add-product-checkbox" />
          Featured
        </label>
        <input type="number" name="rating" value={newProduct.rating} onChange={handleInputChange} placeholder="Rating" className="add-product-input" />
        <input type="text" name="company" value={newProduct.company} onChange={handleInputChange} placeholder="Company" className="add-product-input" />
      </div>
      <div className="button-container"> {/* Container for buttons */}
        <button onClick={addProduct} className="add-product-button">Add Product</button>
        {/* Buttons for navigating to different pages */}
        <div className="redirect-buttons">
          <button onClick={() => navigate('/')} className="redirect-button">Home Page</button>
          <button onClick={() => navigate('/product')} className="redirect-button">View Products</button>
          <button onClick={() => navigate('/update')} className="redirect-button">Update Product</button>
        </div>
      </div>
    </div>
  );
}

export default AddProductForm;
