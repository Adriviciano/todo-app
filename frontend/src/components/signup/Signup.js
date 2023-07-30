import './Signup.css';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

export default function Signup() {

    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('')

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (nickname === '') {
            alert('You must provide a name')
        } else if (password === '') {
            alert('You must provide a password')
        } else {
            let userInfo
            try {
                userInfo = await axios.get(`http://localhost:4000/api/users/${nickname}`)
            } catch (error) {
                console.error(error);
            }

            if (userInfo.data !== null) {
                console.log('Successfully logged in')
                setNickname('');
                setPassword('');
                navigate('/')
            } else {
                setNickname('');
                setPassword('');
                console.log('Failed to log in')
                alert('User does not exist')
            }
        }
    };

    return (
        <div className="login">
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <div className='loginDiv'>
                    <div>Name:</div>
                    <input
                        className='loginInput'
                        type="text"
                        name="name"
                        onChange={(e) => {
                            setNickname(e.target.value);
                        }}
                    />
                </div>
                <div className='loginDiv'>
                    <div>Password:</div>
                    <input
                        className='loginInput'
                        type="text"
                        name="password"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                </div>
                <div>
                    <button className='modalButton loginButton'>
                        <Link to={'/login'}>Login</Link>
                    </button>
                    <button className='modalButton loginButton' type="submit">
                        <Link to={'/'} onClick={handleSubmit}>Submit</Link>
                    </button>
                </div>
            </form>
        </div>
    )
}