import React from 'react';
import { useHistory } from 'react-router-dom';
import Token from '../../auth';

const Logout = () => {
    const history = useHistory();

    const removeToken = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        history.push('/login');
        Token.defaults.headers['Authorization'] = null;
    };

    return (
        <div>
            <button onClick={removeToken}>Logout</button>
        </div>
    );
};

export default Logout;
