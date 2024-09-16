"use client";

import React, { useEffect, useState } from 'react';
import SmallLogo from '../../../public/icons/small-logo';
import { FaTruckLoading, FaUserCircle } from "react-icons/fa";
import Link from 'next/link';
import useUserProfile from '@/hooks/useUserProfile';
import Image from 'next/image';

const PrimaryNavbar = () => {
    const { userProfile, loading } = useUserProfile();

    return (
        <>
            <div className='flex justify-between items-center'>
                <Link href={"/contacts"}>
                    <div className="logo flex flex-col items-center space-y-1 py-2">
                        <SmallLogo />
                        {/* <h2 className='text-sm text-accent font-bold'>CONTACT PRO</h2> */}
                    </div>
                </Link>

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
            </div>

            <hr className='border-primary my-1 pb-1' />
        </>
    );
};

export default PrimaryNavbar;