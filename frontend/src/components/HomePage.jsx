import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css'; // Adjust the path accordingly

function HomePage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      // Clear authentication token from localStorage or sessionStorage
      localStorage.removeItem('token'); // or sessionStorage.removeItem('token')

      // Redirect user to sign-in page
      navigate('/signin');
    } catch (error) {
      console.error("Failed to logout", error);
    }
  };

  return (
    <div className="homepage-container">
      <div className="navbar">
        <h2 className="logo">Products App</h2>
        <nav>
          <ul className="navLinks">
            <li><Link to="/signin" className="link">Sign In</Link></li>
            <li><Link to="/signup" className="link">Sign Up</Link></li>
            <li><Link to="/add" className="link">Add Product</Link></li>
            <li><Link to="/update" className="link">Update Product</Link></li>
            <li><Link to="/product" className="link">View Products</Link></li>
            <li><button onClick={handleLogout} className="logoutButton">Logout</button></li>
          </ul>
        </nav>
      </div>
      <div className="homepage-content">
        <h1>Welcome to Products App</h1>
        <p>Manage your products efficiently</p>
        <p>Note : This App is not mobile responsive , use laptop for better experience. </p>
      </div>
    </div>
  );
}

export default HomePage;
