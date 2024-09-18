"use client";

import React, { useState, useEffect, useRef } from 'react';
import { RxCaretDown } from "react-icons/rx";
import { RiLogoutBoxLine } from "react-icons/ri";
import { FaPowerOff } from 'react-icons/fa';

const DropdownLogout = ({ onLogout }) => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);  // Create a ref to track the dropdown element

    const handleLogout = () => {
        // setOpen(false);  // Close the dropdown
        onLogout();      // Call the logout function
    };

    // Function to close the dropdown if clicked outside
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setOpen(false);
        }
    };

    // Add event listener for clicks outside of dropdown
    useEffect(() => {
        if (open) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open]);

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            <div>
                <button
                    onClick={() => setOpen(!open)}
                    className="flex items-center py-2 text-2xl text-accent hover:text-primary"
                >
                    <RxCaretDown />
                </button>
            </div>

            {open && (
                <div
                    className="absolute right-0 mt-2 rounded-md shadow-lg bg-slate-200 ring-1 ring-black ring-opacity-5"
                >
                    <div className="p-1">
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 text-sm font-semibold text-warning hover:bg-slate-300 w-full text-left flex items-center gap-2 rounded-md"
                        >
                            <FaPowerOff />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DropdownLogout;