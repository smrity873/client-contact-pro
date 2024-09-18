
import ContactsPage from '@/components/contacts/pageContainers/ContactsPage';
import PrivateRoute from '@/components/shared/PrivateRoute';
import React from 'react';

const page = () => {
    return (
        <PrivateRoute>
            <ContactsPage />
        </PrivateRoute>
    );
};

export default page;