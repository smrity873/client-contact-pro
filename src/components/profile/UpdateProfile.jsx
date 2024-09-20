"use client";

import { baseUrl, token } from '@/constants/constants';
import useImgBBUpload from '@/hooks/useImgBbUpload';
import useUserProfile from '@/hooks/useUserProfile';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaUserCircle } from 'react-icons/fa';
import { IoIosSave } from 'react-icons/io';
import { MdCancelPresentation } from 'react-icons/md';

const UpdateProfile = () => {
    const { userProfile } = useUserProfile(); // Custom hook to get user profile data
    const [imageFile, setImageFile] = useState(null);  // Store the file
    const [imagePreview, setImagePreview] = useState(userProfile?.profile_picture_url);  // Store image preview URL
    const [uploadedImageUrl, setUploadedImageUrl] = useState("");  // Store uploaded image URL
    const { register, handleSubmit, setValue } = useForm();
    const { uploadImage, loading, imageUrl } = useImgBBUpload();

    const handleUpdateProfile = (data) => {
        const image = uploadedImageUrl || imageUrl || userProfile?.profile_picture_url;  // Use the uploaded image URL or the existing image URL

        axios.put(`${baseUrl}/auth/profile`, { ...data, profile_picture_url: image }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                if (res?.data?.message) {
                    toast.success(res.data.message);
                }
            })
            .catch(err => {
                console.error(err);
                toast.error(err.message)
            })
    }

    // Handle file input change and create image preview
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);  // Set the image file
            setImagePreview(URL.createObjectURL(file));  // Generate preview URL
        }
    };

    useEffect(() => {
        if (imageFile) {
            uploadImage(imageFile);
        }

        if (imageUrl) {
            setUploadedImageUrl(imageUrl);
        }
    }, [imageFile, uploadImage, imageUrl]);

    useEffect(() => {
        if (!imagePreview && userProfile?.profile_picture_url) {
            setImagePreview(userProfile?.profile_picture_url);
        }

        setValue("username", userProfile?.username);
        setValue("full_name", userProfile?.full_name);
        setValue("email", userProfile?.email);
    }, [setValue, userProfile, imagePreview]);

    return (
        <div className='mt-16'>
            <h2 className='font-medium'>Update Profile</h2>

            <div className="image border border-primary w-20 h-20 aspect-square rounded-full mx-auto flex flex-col justify-center items-center mt-10">
                {/* Conditional rendering for the image preview */}
                {
                    imagePreview && !loading ? (
                        <Image src={imagePreview} alt={"user-dp-preview"} width={80} height={80} className="rounded-full aspect-square" />
                    )
                        :
                        imageUrl && !loading ? (
                            <Image src={imageUrl} alt={"user-dp"} width={80} height={80} className="rounded-full aspect-square" />
                        )
                            :
                            (
                                <FaUserCircle className='text-7xl text-primary' />
                            )
                }

                {loading && <p>Uploading...</p>}
            </div>

            <form onSubmit={handleSubmit(handleUpdateProfile)} className='space-y-2 mt-4'>
                <label>
                    <span className='font-medium'>
                        Profile Picture:
                    </span>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}  // Handle file change
                        className='px-4 py-2 rounded-md outline-none w-full mt-1 bg-inputBg'
                    />
                </label>

                <label className='flex flex-col'>
                    <span className='font-medium'>Username:</span>
                    <input type="text" placeholder='Username' {...register('username')} className='px-4 py-2 bg-inputBg outline-none rounded-md' />
                </label>

                <label className='flex flex-col'>
                    <span className='font-medium'>Full Name:</span>
                    <input type="text" placeholder='Full Name' {...register('full_name')} className='px-4 py-2 bg-inputBg outline-none rounded-md' />
                </label>

                <label className='flex flex-col'>
                    <span className='font-medium'>Email:</span>
                    <input type="email" placeholder='username' {...register('email')} className='px-4 py-2 bg-inputBg outline-none rounded-md' />
                </label>

                <div className='flex items-center justify-around pt-4'>
                    <button className="save btn text-4xl text-primary hover:text-accent">
                        <Link href={"/profile"}><MdCancelPresentation /></Link>
                    </button>

                    <button type='submit' className="save btn text-4xl text-primary hover:text-accent">
                        <IoIosSave />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateProfile;