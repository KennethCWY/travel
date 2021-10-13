import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ path, component: Component }) => {
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');

    function sendAlert(){
        alert('Please sign in to access this information!')
    }

    return (
        <Route
            path={path}
            render={() => {
                if (accessToken || refreshToken) {
                    return <Component />;
                } else {sendAlert()
                    return <Redirect to="/login" />;
                }
            }}
        />
    );
};

export default PrivateRoute;
