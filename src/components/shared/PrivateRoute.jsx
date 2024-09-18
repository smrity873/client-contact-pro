"use client";

import React, { useEffect, useState } from 'react';
import { token } from '@/constants/constants';
import { useRouter } from 'next/navigation';

const PrivateRoute = ({ children }) => {
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);

        if (!token) {
            router.push('/sign-in');
        }
    }, [router]);

    if (!isMounted) {
        // Prevent rendering on the server side
        return null;
    }

    return (
        <>
            {children}
        </>
    );
};

export default PrivateRoute;