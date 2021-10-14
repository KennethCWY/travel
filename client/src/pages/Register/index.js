import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import Token from '../../auth';
import './styles.css';

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
        <div className="register">
            <div className="register__spotlight">
                <div className="register__text">
                    <h1>Explore Beautiful Places</h1>
                    <p>The simple way to plan your next vacation with friends</p>
                </div>
            </div>

            {/* Registration */}
            <form>
                <h1>Register</h1>
                <input
                    type="text"
                    required
                    id="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                />
                <input
                    type="text"
                    required
                    id="username"
                    name="username"
                    placeholder="Username"
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
                <input type="submit" onClick={handleSubmit} value="Sign Up" />
                <div>
                    <NavLink to="/login">Already have an account? Sign in</NavLink>
                </div>
            </form>
        </div>
    );
};

export default Register;
