import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API } from '../API/api.jsx';

const SignUp = () => {

    const [error, setError] = useState('');
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [city, setCity] = useState("");
    const data = { username, password, city };
    
    const navigate = useNavigate();

    const submitHandle = async (e) => {
        setTimeout(() => {
            setError('');
        }, 5000)
        e.preventDefault();
        try {
            const res = await axios.post(API.REGISTER, data, { withCredentials: true });
            console.log(res)
            navigate('/login');

            // // FOR CONSOLE USE ONLY
            // console.log(res.data.message);
        } catch (e) {
            console.log(e)
            setError("Error From Server Side")
        }
    }

    return (
        <>
            <div className='formclass'>
                <div className="form">
                    <h1 className='heading text-3xl'>Sign Up</h1>

                    <h5 className={`error ${error ? 'error-visible' : ''}`}>{error}</h5>

                    <input className='inputclass' value={username} type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                    <input className='inputclass' value={password} type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    <input className='inputclass' value={city} type="text" placeholder="City" onChange={(e) => setCity(e.target.value)} />
                    <div className='button'>
                        <button className='btn' onClick={(e) => navigate('/')}>Login</button>
                        <button className='btn' onClick={submitHandle}>SignUp</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;