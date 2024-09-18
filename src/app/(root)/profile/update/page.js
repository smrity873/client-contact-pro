import PrivateRoute from '@/components/shared/PrivateRoute';
import React from 'react';

const page = () => {
    return (
        <PrivateRoute>
            <div>
                update profile
            </div>
        </PrivateRoute>
    );
};

export default page;