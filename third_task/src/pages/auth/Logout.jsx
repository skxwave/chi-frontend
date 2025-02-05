import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const Logout = () => {
    useEffect(() => {
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('refreshToken');
    }, []);

    return <Navigate to="/login" />;
};

export default Logout;