"use client";

import React from 'react';
import useSingleContact from '@/hooks/useSingleContact';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FaRegEdit } from 'react-icons/fa';
import { AiOutlineDelete } from 'react-icons/ai';
import Swal from 'sweetalert2';

const ContactDetailsPage = () => {
    const { id } = useParams();
    const { contact, isLoading } = useSingleContact({ id });
    const { NAME, address, phone, id: contactId, profile_picture_url, email } = contact;

    const handleDelete = () => {
        Swal.fire({
            title: "Are you sure? Want to delete this contact?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#114084",
            cancelButtonColor: "#CE0000",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                // Delete the contact
                axios.delete(`${baseUrl}/contacts/${contactId}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                })
                    .then((response) => {
                        if (response?.data?.message) {

                            refetch(true);

                            Swal.fire({
                                title: "Deleted!",
                                text: "Your contact has been deleted.",
                                icon: "success"
                            });
                        }
                    })

                    .catch((error) => {
                        console.error("Error deleting contact:", error);
                        Swal.fire({
                            title: "Error!",
                            text: "Error deleting contact.",
                            icon: "error"
                        });
                    });
            } else {
                Swal.fire({
                    title: "Cancelled!",
                    text: "Your contact is safe.",
                    icon: "info"
                });
            }
        });
    };

    if (isLoading) {
        return <div>loading...</div>
    }

    return (
        <div className='mt-16 space-y-5'>
            <h2 className='font-medium capitalize'> contact Details </h2>

            <div className="body-profile flex flex-col space-y-5">
                <div className="profile-picture image border border-primary w-20 h-20 aspect-square rounded-full mx-auto flex flex-col justify-center items-center">
                    {
                        profile_picture_url && (<Image src={profile_picture_url} alt={"profile-picture"} width={80} height={80} className="rounded-full aspect-square" />)
                    }

                    {
                        !profile_picture_url && (<span className="text-primary text-5xl font-semibold">{NAME[0]}</span>)
                    }
                </div>

                <div className="w-full bg-inputBg border-primary h-10 flex flex-col justify-center px-4 border font-bold rounded-md">
                    <p className='gap-x-2 flex items-center'><span className='border-r border-primary pr-2 w-16 text-accent'>Name</span> <span>{NAME}</span></p>
                </div>

                <div className="w-full bg-inputBg border-primary h-10 flex flex-col justify-center px-4 border font-bold rounded-md">
                    <p className='gap-x-2 flex items-center'><span className='border-r border-primary pr-2 w-16 text-accent'>Phone</span> <span>{phone}</span></p>
                </div>

                <div className="w-full bg-inputBg border-primary h-10 flex flex-col justify-center px-4 border font-bold rounded-md">
                    <p className='gap-x-2 flex items-center'><span className='border-r border-primary pr-2 w-16 text-accent'>Email</span> {email && (<span>{email}</span>)}</p>
                </div>

                <div className="w-full bg-inputBg border-primary h-10 flex flex-col justify-center px-4 border font-bold rounded-md">
                    <p className='gap-x-2 flex items-center'><span className='border-r border-primary pr-2 w-16 text-accent' text-accent>Address</span> {address && (<span>{address}</span>)}</p>
                </div>

                <div className="actions-btn flex items-center justify-end">
                    <Link href={`/contacts/update/${id}`} className="hover:bg-primary text-primary hover:text-white p-2 rounded-md flex justify-center items-center">
                        <FaRegEdit className='text-xl' />
                    </Link>

                    <button onClick={handleDelete} className="hover:bg-warning text-warning hover:text-white p-2 rounded-md flex justify-center items-center">
                        <AiOutlineDelete className='text-xl' />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ContactDetailsPage;