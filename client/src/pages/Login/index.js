import React, { useState } from 'react';
import Token from '../../auth';
import { useHistory } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

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
        console.log(formData);

        Token.post(`token/`, {
            email: formData.email,
            password: formData.password
        }).then(res => {
            localStorage.setItem('access_token', res.data.access);
            localStorage.setItem('refresh_token', res.data.refresh);
            Token.defaults.headers['Authorization'] =
                'JWT ' + localStorage.getItem('access_token');
            history.push('/');
            console.log(res);
            console.log(res.data);
        });
    };

    return (
        <div>
            <h1>Login</h1>
            <form>
                <input
                    type="text"
                    required
                    id="email"
                    name="email"
                    placeholder="email"
                    onChange={handleChange}
                />
                <input
                    type="password"
                    required
                    name="password"
                    id="password"
                    placeholder="password"
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
