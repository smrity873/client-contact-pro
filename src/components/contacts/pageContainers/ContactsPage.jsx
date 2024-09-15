"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getToken } from '@/constants/constants';
import ContactCard from '../AllContacts/ContactCard';

const ContactsPage = () => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);

    const token = getToken();

    useEffect(() => {
        if (token) {
            axios.get("http://localhost:3000/contacts", {
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

    console.log(contacts);

    return (
        <>
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
        </>
    );
};

export default ContactsPage;
