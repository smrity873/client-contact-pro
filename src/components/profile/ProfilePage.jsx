"use client";

import useUserProfile from '@/hooks/useUserProfile';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaRegEdit, FaUserCircle } from 'react-icons/fa';

// userProfile?.profile_picture_url &&

const ProfilePage = () => {
    const { userProfile } = useUserProfile();          // Custom hook to get user profile data

    return (
        <div className='mt-16'>
            <h2 className='font-medium'>Profile</h2>

            <div className="profile w-fit mx-auto space-y-4 mt-10">
                <div className="profile__picture h-20 w-20 aspect-square rounded-full border border-primary mx-auto flex justify-center items-center">
                    {
                        userProfile?.profile_picture_url && (<Image src={userProfile?.profile_picture_url} priority={false} alt={"dp"} height={80} width={80} className='aspect-square rounded-full' />)
                    }

                    {
                        !userProfile?.profile_picture_url && (<FaUserCircle className='text-7xl text-primary' />)
                    }
                </div>

                <div className="profile__info space-y-2">
                    <p><strong>Username:</strong> {userProfile?.username}</p>
                    <p><strong>Full Name:</strong> {userProfile?.full_name}</p>
                    <p><strong>Email:</strong> {userProfile?.email}</p>
                </div>

                <div className="update-profile">
                    <Link href="/profile/update">
                        <FaRegEdit className='text-2xl text-primary hover:text-white float-right' />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;