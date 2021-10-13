import React, { useState } from 'react';
import Token from '../../auth';
import { useHistory } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import jwt from 'jwt-decode';
import axios from 'axios';

const Invite = () => {

    const [formData, updateFormData] = useState(initialFormData);

    const initialFormData = Object.freeze({
        name: '',
        toEmail: '',
    });

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    }

    const handleSubmit = e => {
        e.preventDefault();
        axios({
            method: 'post',
            url: '/sharetrip/',
            data: formData,
        })
    }

    return (
        <form action="" onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="What's your name?" value={formData.name} onChange={handleChange}/>
            <input type="email" name="toEmail" placeholder="Invitee's email address" value={formData.toEmail} onChange={handleChange}/>
            <input type="submit" value="Share!"/>
        </form>
    )
}

export default Invite