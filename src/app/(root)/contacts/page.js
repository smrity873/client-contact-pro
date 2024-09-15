
import ContactsPage from '@/components/contacts/pageContainers/ContactsPage';
import React from 'react';

const page = () => {
    return (
        <>
            <div className='capitalize mb-2'>
                all contacts
            </div>

            <ContactsPage />
        </>
    );
};

export default page;