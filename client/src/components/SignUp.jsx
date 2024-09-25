import React, { useEffect, useState, useCallback } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API } from '../API/api.jsx';

const SignUp = () => {
    // ==================== Constants ====================
    // Default state for input fields
    const DefaultInputs = {
        username: "",
        password: "",
        city: "",
        error: ""
    }

    // ==================== Hooks ====================
    // Hook for navigation
    const navigate = useNavigate();
    // State to hold input data and error message
    const [DefaultInputsData, setDefaultInputsData] = useState(DefaultInputs);
    // State to manage loading status
    const [loading, setLoading] = useState(false);

    // ==================== Handlers ====================
    // Handler for username input
    const handleUserName = useCallback((e) => {
        const username = e.target.value;
        setDefaultInputsData(prev => ({ ...prev, username: username.toLowerCase() }));
    }, []);

    // Handler for password input
    const handlePassword = useCallback((e) => {
        setDefaultInputsData(prev => ({ ...prev, password: e.target.value }));
    }, []);

    // Handler for city input, filtering out non-alphabetic characters
    const handleCity = useCallback((e) => {
        const city = e.target.value.replace(/[^a-zA-Z]/g, '').toLowerCase();
        setDefaultInputsData(prev => ({ ...prev, city }));
    }, []);

    // Function to handle displaying error messages
    const handleError = (errorMessage) => {
        setDefaultInputsData(prev => ({ ...prev, error: errorMessage }));
        // Clear the error message after 5 seconds
        setTimeout(() => {
            setDefaultInputsData(prev => ({ ...prev, error: "" }));
        }, 5000);
    }

    // Function to handle form submission
    const submitHandle = async (e) => {
        e.preventDefault();
        // Check if any input field is empty
        if (!DefaultInputsData.username || !DefaultInputsData.password || !DefaultInputsData.city) {
            handleError("⚠️ All fields are required.");
            return;
        }

        // Set loading state to true before sending request
        setLoading(true);
        try {
            // Send a POST request to the registration API
            const res = await axios.post(API.REGISTER, DefaultInputsData, { withCredentials: true });
            console.log(res);
            // Navigate to the home page upon successful registration
            navigate('/');
        } catch (error) {
            console.error("Registration error:", error);
            // Handle any errors that occur during registration
            handleError("⚠️ Something went wrong. Please try again.");
        } finally {
            // Reset loading state after the request is complete
            setLoading(false);
        }
    }

    // ==================== Render ====================
    return (
        <div className='formclass'>
            <div className="form">
                <h1 className='heading text-3xl'>Sign Up</h1>
                {/* Display error message if present */}
                <h5 className={`error ${DefaultInputsData.error ? 'error-visible' : ''}`}>{DefaultInputsData.error}</h5>

                {/* Username input field */}
                <input
                    className='inputclass'
                    value={DefaultInputsData.username}
                    type="text"
                    placeholder="Username"
                    onChange={handleUserName}
                />
                {/* Password input field */}
                <input
                    className='inputclass'
                    value={DefaultInputsData.password}
                    type="password"
                    placeholder="Password"
                    onChange={handlePassword}
                />
                {/* City input field */}
                <input
                    className='inputclass'
                    value={DefaultInputsData.city}
                    type="text"
                    placeholder="City"
                    onChange={handleCity}
                />
                <div className='button'>
                    {/* Submit button for signing up */}
                    <button
                        className='btn'
                        onClick={submitHandle}
                        disabled={loading} // Disable button while loading
                    >
                        {loading ? 'Signing Up...' : 'SignUp'}
                    </button>

                    {/* Button to navigate to the login page */}
                    <button
                        className='btn'
                        onClick={() => navigate('/')}>
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
