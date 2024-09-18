"use client";

import { token } from '@/constants/constants';
import { useRouter } from 'next/navigation';
import React from 'react';

const Redirect = () => {
    const router = useRouter();

    if (!token) {
        return (
            router.push('/sign-in')
        );
    } else {
        return (
            router.push('/contacts')
        );
    }
};

export default Redirect;