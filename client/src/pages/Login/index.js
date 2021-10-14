import React, { useState } from 'react';
import Token from '../../auth';
import { useHistory } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import jwt from 'jwt-decode'
import './styles.css'

const Login = () => {
    const history = useHistory();

    // Object.freeze prevents any change to object

    const initialFormData = Object.freeze({
        email: '',
        password: ''
    });

    const [formData, updateFormData] = useState(initialFormData);

    const handleChange = e => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        });
    };

    const handleSubmit = e => {
        e.preventDefault();

        Token.post(`token/`, {
            email: formData.email,
            password: formData.password
        }).then(res => {
            localStorage.setItem('access_token', res.data.access);
            localStorage.setItem('refresh_token', res.data.refresh);
            Token.defaults.headers['Authorization'] =
                'JWT ' + localStorage.getItem('access_token');
            const {user_id} = jwt(res.data.access)
            localStorage.setItem('user_id', user_id)
            history.push('/');
        });
    };

    return (
        <div className="login">
            <div className="login__spotlight">
                <div className="login__text">
                    <h1>Explore Beautiful Places</h1>
                    <p>The simple way to plan your next vacation with friends</p>
                </div>
            </div>

            {/* Login */}
            <form>
            <h1>Login</h1>
                <input
                    type="text"
                    required
                    id="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                />
                <input
                    type="password"
                    required
                    name="password"
                    id="password"
                    placeholder="Password"
                    onChange={handleChange}
                />
                <input type="submit" onClick={handleSubmit} value="Sign In" />
                <div>
                    <NavLink to="/register">Don't have an account? Register here</NavLink>
                </div>
            </form>
        </div>
    );
};

export default Login;
