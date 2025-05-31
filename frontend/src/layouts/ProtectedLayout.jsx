import React, { useEffect, useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';

const ProtectedLayout = () => {
    const navigate = useNavigate();
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login', { replace: true });
        } else {
            setIsChecking(false);
        }
    }, [navigate]);

    if (isChecking) {
        return <div className="text-center mt-10">Checking authentication...</div>;
    }

    return <Outlet />;
};

export default ProtectedLayout;
