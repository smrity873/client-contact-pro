"use client";

import React, { useEffect, useState } from 'react';
import SmallLogo from '../../../public/icons/small-logo';
import { FaTruckLoading, FaUserCircle } from "react-icons/fa";
import Link from 'next/link';
import useUserProfile from '@/hooks/useUserProfile';
import Image from 'next/image';
import DropdownLogout from '../Buttons/DropdownLogout';
import { useRouter } from 'next/navigation';
import { RxCaretLeft } from 'react-icons/rx';

const PrimaryNavbar = () => {
    const { userProfile, loading } = useUserProfile();
    const router = useRouter();

    const handleLogout = () => {
        if (window !== undefined) {
            localStorage.removeItem('token');
            router.push('/sign-in');
        }
    }

    const handlePreviousPage = () => {
        router.back();
    }

    return (
        <div className='fixed left-0 right-0 max-w-96 mx-auto px-4 bg-colorBg border-primary border-b'>
            <div className='flex justify-between items-center py-2'>
                <div className='flex items-center'>
                    <button onClick={handlePreviousPage}>
                        <RxCaretLeft className='text-xl text-accent hover:text-primary' />
                    </button>

                    <Link href={"/contacts"}>
                        <div className="logo">
                            <SmallLogo />
                            {/* <h2 className='text-sm text-accent font-bold'>CONTACT PRO</h2> */}
                        </div>
                    </Link>
                </div>

                <div className='flex items-center'>
                    <Link href={"/profile"}>
                        <div className="user flex flex-col items-center space-y-1">
                            {
                                !userProfile?.profile_picture_url && !loading ? (<FaUserCircle className='text-4xl text-primary' />)
                                    :
                                    (<Image src={userProfile?.profile_picture_url} width={40} height={40} alt='dp' className='aspect-square rounded-full border border-primary' />)
                            }

                            {/* <h3 className='font-bold text-sm uppercase text-accent'>User Name</h3> */}
                        </div>
                    </Link>

                    <div className="logout">
                        <DropdownLogout onLogout={handleLogout} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrimaryNavbar;