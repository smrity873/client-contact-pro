
import React from 'react';
import { Logo } from '../../../public/icons/logo';
import Redirect from './Redirect';

const page = () => {

    return (
        <header className="py-52 space-y-1">
            <div className="w-fit mx-auto">
                {
                    Logo()
                }

            </div>

            <h2 className="text-accent font-bold text-center">CONTACT PRO</h2>
            
            <Redirect />
        </header>
    );
};

export default page;