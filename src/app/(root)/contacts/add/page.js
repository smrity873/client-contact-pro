import AddContactPage from '@/components/contacts/pageContainers/AddContactPage';
import PrivateRoute from '@/components/shared/PrivateRoute';
import React from 'react';

const page = () => {
    return (
        <PrivateRoute>
            <AddContactPage />
        </PrivateRoute>
    );
};

export default page;