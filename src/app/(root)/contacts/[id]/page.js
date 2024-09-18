import ContactDetailsPage from '@/components/contacts/pageContainers/ContactDetailsPage';
import PrivateRoute from '@/components/shared/PrivateRoute';
import React from 'react';

const page = () => {
    return (
        <PrivateRoute>
            <ContactDetailsPage />
        </PrivateRoute>
    );
};

export default page;