"use client";

import { useRouter } from 'next/navigation';
import React from 'react';

const Redirect = () => {
    const router = useRouter();
    return (
        router.push('/sign-in')
    );
};

export default Redirect;