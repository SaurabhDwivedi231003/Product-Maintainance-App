import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css'; // Import the CSS file

function ProductList() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('token'); // get token from local storage
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

  return (
    <div className="product-list-container">
      <div className="nav-buttons">
        <button onClick={() => navigate('/')} className="nav-button">Home</button>
        <button onClick={() => navigate('/add')} className="nav-button">Add Product</button>
        <button onClick={() => navigate('/update')} className="nav-button">Update Product</button>
      </div>
      <h2>All Products</h2>
      <ul className="product-list">
        {products.map(product => (
          <li key={product._id} className="product-item">
            {product.name} - {product.price} - {product.featured} - {product.company} - {product.rating} - {product.createdAt}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
