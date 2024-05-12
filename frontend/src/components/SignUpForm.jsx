import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css'; // Import the CSS file

function SignUpForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const signUp = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', {
        username,
        email,
        password
      });
 
      setMessage('Signed up successfully!');
      localStorage.setItem('token', response.data.token); // Store the token in local storage
      // Redirect to sign-in page after successful sign-up
      navigate('/signin');
    } catch (error) {
      console.error('Error signing up:', error);
      setMessage('An error occurred while signing up. Please try again later.');
    }
  };

  return (
    <div className="signup-container"> {/* Apply classname to the container */}
      <h2>Sign Up</h2>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" className="signup-input" /> {/* Apply classname to the input */}
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="signup-input" /> {/* Apply classname to the input */}
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="signup-input" /> {/* Apply classname to the input */}
      <button onClick={signUp} className="signup-button">Sign Up</button> {/* Apply classname to the button */}
      {message && <p className="signup-message">{message}</p>} {/* Apply classname to the message */}
      <div>
        <Link to="/signin" className="signup-link">Sign In</Link> {/* Apply classname to the link */}
      </div>
    </div>
  );
}

export default SignUpForm;
