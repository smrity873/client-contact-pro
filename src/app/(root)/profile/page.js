import ProfilePage from '@/components/profile/ProfilePage';
import PrivateRoute from '@/components/shared/PrivateRoute';
import React from 'react';

const page = () => {
    return (
        <PrivateRoute>
            <ProfilePage />
        </PrivateRoute>
    );
};

export default page;