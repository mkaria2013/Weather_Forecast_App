import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { API } from '../API/api.jsx';

const Login = () => {

    const [error, setError] = useState('');
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const data = { username, password };
    
    const { login } = useAuth();
    
    const navigate = useNavigate();

    const submitHandle = async (e) => {
        setTimeout(() => {
            setError('');
        }, 5000)
        e.preventDefault();
        try {
            const res = await axios.post(API.SIGNIN, data, { withCredentials: true });
            login();
            navigate('/dashboard');

            // // FOR CONSOLE USE ONLY
            // console.log(res.data.message);
        } catch (e) {
            setError("User Not Found")
        }
    }

    return (
        <>
            <div className='formclass'>
                <div className="form">
                    <h1 className='heading text-3xl'>Sign In</h1>

                    <h5 className={`error ${error ? 'error-visible' : ''}`}>{error}</h5>

                    <input className='inputclass' value={username} type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                    <input className='inputclass' value={password} type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />  <div className='button'>
                        <button className='btn' onClick={submitHandle}>Login</button>
                        <button className='btn' onClick={(e) => navigate('/signup')}>SignUp</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;