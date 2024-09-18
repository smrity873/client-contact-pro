import PrivateRoute from '@/components/shared/PrivateRoute';
import React from 'react';

const page = () => {
    return (
        <PrivateRoute>
            <div>
                profile
            </div>
        </PrivateRoute>
    );
};

export default page;