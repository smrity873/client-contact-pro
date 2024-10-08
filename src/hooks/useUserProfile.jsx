import { baseUrl, token } from '@/constants/constants';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const useUserProfile = () => {
    const [userProfile, setUserProfile] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch user profile data
        axios.get(`${baseUrl}/auth/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                setUserProfile(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.log("Error Response:", err.response?.data || err.message);
            });
    }, [])

    if (loading) {
        return <div>Loading...</div>;
    }

    return { userProfile, loading };
};

export default useUserProfile;