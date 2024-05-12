// src/App.js
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import ProductList from './components/ProductList';
import AddProductForm from './components/AddProductForm';
import SignInForm from './components/SignInForm';
import SignUpForm from './components/SignUpForm';
import UpdateProductForm from './components/UpdateProductForm';
import HomePage from './components/HomePage';
import './App.css'; // Import the CSS file

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/signin" element={<SignInForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/add" element={<AddProductForm />} />
          <Route path="/update" element={<UpdateProductForm />} />
          <Route path="/product" element={<ProductList />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
