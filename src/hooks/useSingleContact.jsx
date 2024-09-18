"use client";

import { baseUrl, token } from '@/constants/constants';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { set } from 'react-hook-form';

const useSingleContact = ({ id }) => {
    const [contact, setContact] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get(`${baseUrl}/contacts/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then(res => {
                setContact(res.data);
                setIsLoading(false);
            })
            .catch(err => {
                console.log(err);
                setIsLoading(false);
            });
    }, [id]);

    return { contact, isLoading };
};

export default useSingleContact;