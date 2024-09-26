import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const isAuthenticated = !!localStorage.getItem('access_token');  // Check if access token exists

    return isAuthenticated ? (
        <Component {...rest} />
    ) : (
        <Navigate to="/" replace />
    );
};

export default ProtectedRoute;
