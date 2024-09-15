"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getToken } from '@/constants/constants';

const ContactsPage = () => {
    const [contacts, setContacts] = useState([]);

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
                })
                .catch(err => {
                    console.log("Error Response:", err.response?.data || err.message);
                });
        }
    }, [token]);

    console.log(contacts);

    return (
        <div>
            {contacts.length > 0 ? contacts.map(contact => (
                <div key={contact.id}>
                    {contact.name} - {contact.phone}
                </div>
            )) : "No contacts available"}
        </div>
    );
};

export default ContactsPage;
