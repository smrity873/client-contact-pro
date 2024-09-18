import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import ContactCard from './ContactCard';
import { baseUrl, token } from '@/constants/constants';

const SearchBox = () => {
    const { register, watch } = useForm();
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [lock, setLock] = useState(false); // Concurrency lock
    const searchQuery = useRef(null); // Keep track of the latest search query

    // Watch input changes using react-hook-form
    const searchInput = watch("search");

    useEffect(() => {
        const search = async (query) => {
            // Check if another search is in progress
            if (lock) {
                console.log("Waiting for the previous search to complete...");
                return;
            }

            setLock(true); // Acquire lock

            try {
                setLoading(true);
                console.log(`Searching for: ${query}`);

                // Simulate API call
                const response = await axios.get(`${baseUrl}/contacts/search?query=${query}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}` // Ensure correct format without extra quotes
                    },
                });

                // Store results if no other search query has been entered during this time
                if (searchQuery.current === query) {
                    setSearchResults(response.data);
                }

            } catch (error) {
                console.error("Error fetching search results:", error);
            } finally {
                setLoading(false);
                setLock(false); // Release lock
            }
        };

        if (searchInput) {
            searchQuery.current = searchInput; // Store the latest query
            search(searchInput);
        } else {
            setSearchResults([]); // Clear results if input is empty
        }
    }, [searchInput, lock]);

    return (
        <div>
            <input
                type="text"
                placeholder="Search..."
                {...register("search")}
                className="p-2 border rounded-md w-full"
            />


            <div>
                {searchResults.map((result) => (
                    <ContactCard key={result.id} contact={result} />
                ))}

                {searchResults.length === 0 && !loading && (
                    <p>No results found</p>
                )}
            </div>
        </div>
    );
};

export default SearchBox;