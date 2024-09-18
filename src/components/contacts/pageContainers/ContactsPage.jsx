"use client";

import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { baseUrl, getToken } from '@/constants/constants';
import ContactCard from '../AllContacts/ContactCard';
import { useForm } from 'react-hook-form';

const ContactsPage = () => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refetch, setRefetch] = useState(false);

    // Initialize React Hook Form
    const { register, watch } = useForm();
    const [searchResults, setSearchResults] = useState([]);
    const searchInput = watch("search");
    const token = getToken();

    // Fetch all contacts on initial load or when refetch is triggered
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
    }, [token, refetch]);

    // Handle search input change and search API request
    useEffect(() => {
        axios.get(`${baseUrl}/contacts/search?query=${searchInput}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}` // Ensure correct format without extra quotes
            },
        })
            .then((response) => {
                // Store results if no other search query has been entered during this time
                if (response?.data) {
                    setSearchResults(response.data);
                } else {
                    setSearchResults([]);
                }
            })
            .catch((error) => {
                console.error("Error fetching search results:", error);
            })

        if (!searchInput) {
            setSearchResults([]);
        }
    }, [refetch, searchInput]);

    return (
        <>
            {/* search box */}
            <div className='fixed z-20 top-14 max-w-full min-w-[353px] bg-colorBg py-1'>
                <input
                    type="text"
                    placeholder="Search..."
                    {...register("search")}
                    className="py-2 px-4 border border-primary bg-transparent text-black placeholder:text-black rounded-md w-full my-1 outline-none"
                />
            </div>

            <div className='flex flex-col mt-28 min-h-screen'>
                <div className='flex-1'>
                    {
                        searchResults.length > 0 && (
                            <>
                                <h1 className="capitalize font-medium">Search Results</h1>

                                {searchResults.map((result) => (
                                    <ContactCard key={result.id} contact={result} refetch={setRefetch} />
                                ))}
                            </>
                        )
                    }


                    {
                        !searchResults.length > 0 && (
                            <>
                                {/* title of page */}
                                <div>
                                    <h1 className="capitalize font-medium">All Contacts</h1>
                                </div>

                                {/* contact cards */}
                                {
                                    !loading ? (
                                        <>
                                            {contacts.length > 0 ? contacts.map(contact => (
                                                <ContactCard key={contact.id} contact={contact} refetch={setRefetch} />
                                            )) : "No contacts available"}
                                        </>
                                    ) : (
                                        <p>Loading...</p>
                                    )
                                }
                            </>
                        )
                    }
                </div>
            </div>
        </>
    );
};

export default ContactsPage;