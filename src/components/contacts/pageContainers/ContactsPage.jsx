"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseUrl, getToken } from '@/constants/constants';
import ContactCard from '../AllContacts/ContactCard';

const ContactsPage = () => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);

    const token = getToken();

    useEffect(() => {
        if (token) {
            axios.get(`${baseUrl}/contacts`, {
                headers: {
                    Authorization: `Bearer ${token}`  // Ensure correct format without extra quotes
                }
            })
                .then(res => {
                    setContacts(res.data);
                    setLoading(false);
                })
                .catch(err => {
                    console.log("Error Response:", err.response?.data || err.message);
                });
        }
    }, [token]);

    return (
        <div className='flex flex-col mt-10'>
            <div className='flex-1'>
                <div className='capitalize mb-2'>
                    all contacts
                </div>

                {
                    !loading ? (<div>
                        {contacts.length > 0 ? contacts.map(contact => (
                            <ContactCard key={contact.id} contact={contact} />
                        )) : "No contacts available"}
                    </div>)
                        :
                        <p>Loading...</p>
                }
            </div>
        </div>
    );
};

export default ContactsPage;
