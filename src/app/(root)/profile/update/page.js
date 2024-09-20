import UpdateProfile from '@/components/profile/UpdateProfile';
import PrivateRoute from '@/components/shared/PrivateRoute';
import React from 'react';

const page = () => {
    return (
        <PrivateRoute>
            <UpdateProfile />
        </PrivateRoute>
    );
};

export default page;