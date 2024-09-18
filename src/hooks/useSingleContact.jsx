"use client";

import { baseUrl, token } from '@/constants/constants';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const useSingleContact = ({ id }) => {
    const [contact, setContact] = useState({});

    useEffect(() => {
        axios.get(`${baseUrl}/contacts/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then(res => {
                setContact(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, [id]);

    return { contact };
};

export default useSingleContact;