import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css'; 

function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const signIn = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signin', {
        email,
        password
      });
     
      setMessage('Signed in successfully!');
      localStorage.setItem('token', response.data.token); // Store the token in local storage
      // Redirect user to Home Page after successful login
      navigate('/');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setMessage('Incorrect email or password. Please try again.');
      } else {
        setMessage('An error occurred while signing in. Please try again later.');
      }
    }
  };

  return (
    <div className="signin-container"> 
      <h2 className="signin-title">Sign In</h2>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="signin-input" /> {/* Apply classname to the input */}
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="signin-input" /> {/* Apply classname to the input */}
      <button onClick={signIn} className="signin-button">Sign In</button> 
      {message && <p className="signin-message">{message}</p>} 
      <div className="signin-link-container">
        <Link to="/signup" className="signin-link">Sign Up</Link> 
      </div>
      {/* Buttons for redirecting to different pages */}
      <div className="redirect-buttons">
        <button onClick={() => navigate('/')} className="redirect-button">Home Page</button>
        <button onClick={() => navigate('/product')} className="redirect-button">Product List</button>
        <button onClick={() => navigate('/add')} className="redirect-button">Add Product</button>
        <button onClick={() => navigate('/update')} className="redirect-button">Update Product</button>
      </div>
    </div>
  );
}

export default SignInForm;
