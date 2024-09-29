import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { API } from '../API/api.jsx';

const Login = () => {
    // ==================== Constants ====================
    // DefaultInputs object for managing form state
    const DefaultInputs = {
        username: "",
        password: "",
        error: ""
    };

    // ==================== State ====================
    const [DefaultInputsData, setDefaultInputsData] = useState(DefaultInputs);
    
    // Get login function from AuthContext
    const { login } = useAuth();
    // Hook for navigation
    const navigate = useNavigate();

    // ==================== Error Handling ====================
    const handleError = (errorMessage) => {
        // Update the state with the provided error message
        setDefaultInputsData((prev) => ({
            ...prev,
            error: errorMessage
        }));
        // Clear error message after 5 seconds
        setTimeout(() => {
            setDefaultInputsData((prev) => ({
                ...prev,
                error: ""
            }));
        }, 5000);
    };

    // ==================== Input Handlers ====================
    // Handler for username input change
    const handleUsernameChange = (e) => {
        setDefaultInputsData((prev) => ({ 
            ...prev, 
            username: e.target.value // Update username state
        }));
    };

    // Handler for password input change
    const handlePasswordChange = (e) => {
        setDefaultInputsData((prev) => ({ 
            ...prev, 
            password: e.target.value // Update password state
        }));
    };

    // ==================== Form Submission ====================
    const submitHandle = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        
        // Destructure username and password from state
        const { username, password } = DefaultInputsData;

        // Check if both fields are filled
        if (!username || !password) {
            handleError("⚠️ Both fields are required"); // Show error if fields are empty
            return;
        }

        try {
            // Send login request to the API
            const res = await axios.post(API.SIGNIN, DefaultInputsData, { withCredentials: true });
            const token = res.data.JWtoken; // Adjust based on your API response
            localStorage.setItem('JWtoken', token); 
            login(); // Trigger login from AuthContext
            navigate('/dashboard'); // Redirect after successful login
        } catch (error) {
            console.error("Login error:", error); // Log any errors
            handleError("⚠️ User Not Found"); // Handle login error
        }
    };

    // ==================== Render ====================
    return (
        <div className='formclass'>
            <div className="form">
                <h1 className='heading text-3xl'>Sign In</h1>

                {/* Display error message if present */}
                <h5 className={`error ${DefaultInputsData.error ? 'error-visible' : ''}`}>{DefaultInputsData.error}</h5>

                {/* Username input field */}
                <input
                    className='inputclass'
                    value={DefaultInputsData.username}
                    type="text"
                    placeholder="Username"
                    onChange={handleUsernameChange} // Use the new handler
                />
                {/* Password input field */}
                <input
                    className='inputclass'
                    value={DefaultInputsData.password}
                    type="password"
                    placeholder="Password"
                    onChange={handlePasswordChange} // Use the new handler
                />
                
                <div className='button'>
                    {/* Button for login submission */}
                    <button className='btn' onClick={submitHandle}>Login</button>
                    {/* Button to navigate to signup page */}
                    <button className='btn' onClick={() => navigate('/signup')}>Sign Up</button>
                </div>
            </div>
        </div>
    );
};

export default Login;