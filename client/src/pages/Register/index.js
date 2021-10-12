import React, { useState } from 'react';
import Token from '../../auth';
import { useHistory } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

const Register = () => {
    const history = useHistory();

    // Object.freeze prevents any change to object

    const initialFormData = Object.freeze({
        email: '',
        username: '',
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

        Token.post(`user/register/`, {
            email: formData.email,
            user_name: formData.username,
            password: formData.password
        }).then(history.push('/login'));
    };

    return (
        <div>
            <h1>Registration Form</h1>
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
                    type="text"
                    required
                    id="username"
                    name="username"
                    placeholder="username"
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
                <input type="submit" onClick={handleSubmit} value="Sign Up" />
                <div>
                    <NavLink to="/login">Already have an account? Sign in</NavLink>
                </div>
            </form>
        </div>
    );
};

export default Register;
