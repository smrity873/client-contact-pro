"use client"

import { useState, useCallback } from 'react';
import axios from 'axios';

const useImgBBUpload = (apiKey) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);

    const uploadImage = useCallback(async (imageFile) => {
        setLoading(true);
        setError(null);
        setImageUrl(null);

        const formData = new FormData();
        formData.append('image', imageFile);

        try {
            const response = await axios.post(`https://api.imgbb.com/1/upload?key=${apiKey}`, formData);
            if (response.data && response.data.data && response.data.data.url) {
                setImageUrl(response.data.data.url);
            } else {
                throw new Error('Image upload failed');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [apiKey]);

    return { uploadImage, loading, error, imageUrl };
};

export default useImgBBUpload;