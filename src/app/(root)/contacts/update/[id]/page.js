import UpdateContactPage from '@/components/contacts/pageContainers/UpdateContactPage';
import PrivateRoute from '@/components/shared/PrivateRoute';
import React from 'react';

const page = () => {
    return (
        <PrivateRoute>
            <UpdateContactPage />
        </PrivateRoute>);
};

export default page;