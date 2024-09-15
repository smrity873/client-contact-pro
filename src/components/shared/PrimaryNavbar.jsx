import React from 'react';
import SmallLogo from '../../../public/icons/small-logo';
import { FaUserCircle } from "react-icons/fa";
import Link from 'next/link';

const PrimaryNavbar = () => {
    return (
        <>
            <div className='flex justify-between items-center'>
                <Link href={"/contacts"}>
                    <div className="logo flex flex-col items-center space-y-1 py-2">
                        <SmallLogo />
                        <h2 className='text-sm text-accent font-bold'>CONTACT PRO</h2>
                    </div>
                </Link>

                <Link href={"/profile"}>
                    <div className="user flex flex-col items-center space-y-1">
                        <FaUserCircle className='text-4xl' />
                        <h3 className='font-bold text-sm uppercase'>User Name</h3>
                    </div>
                </Link>
            </div>

            <hr className='border-primary my-2' />
        </>
    );
};

export default PrimaryNavbar;