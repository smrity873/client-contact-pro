"use client";

import useImgBBUpload from '@/hooks/useImgBbUpload';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaUserCircle } from 'react-icons/fa';
import { IoIosSave } from "react-icons/io";
import { MdCancelPresentation } from "react-icons/md";

const AddContactPage = () => {
    const [imageFile, setImageFile] = useState(null);  // Store the file
    const [imagePreview, setImagePreview] = useState(null);  // Store image preview URL

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { uploadImage, loading, imageUrl } = useImgBBUpload();

    const onSubmit = (data) => {
        console.log(data);
        if (imageFile) {
            // Call the uploadImage function from the custom hook
            uploadImage(imageFile);
        }
    };

    // Handle file input change and create image preview
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);  // Set the image file
            setImagePreview(URL.createObjectURL(file));  // Generate preview URL
        }
    };

    return (
        <div className='space-y-5'>
            <h2 className='capitalize font-medium'>Add Contact</h2>

            <div className="image border border-primary w-20 h-20 aspect-square rounded-full mx-auto flex flex-col justify-center items-center">
                {/* Conditional rendering for the image preview */}
                {imagePreview && !loading ? (
                    <Image src={imagePreview} alt={"user-dp-preview"} width={80} height={80} className="rounded-full" />
                ) : imageUrl && !loading ? (
                    <Image src={imageUrl} alt={"user-dp"} width={80} height={80} className="rounded-full" />
                ) : (
                    <FaUserCircle className='text-7xl text-primary' />
                )}

                {loading && <p>Uploading...</p>}
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
                <label>
                    Profile Picture:
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}  // Handle file change
                        className='bg-[#D9D9D9] px-4 py-2 rounded-md outline-none w-full mt-1'
                    />
                </label>

                <input
                    placeholder='Name'
                    type='text'
                    {...register("name", { required: true })}
                    className='bg-[#D9D9D9] px-4 py-2 rounded-md outline-none w-full'
                />
                {errors.name && <span>This field is required</span>}

                <input
                    placeholder='Phone'
                    type='number'
                    {...register("phone", { required: true })}
                    className='bg-[#D9D9D9] px-4 py-2 rounded-md outline-none w-full'
                />
                {errors.phone && <span>This field is required</span>}

                <input
                    placeholder='Email'
                    type='email'
                    {...register("email", { required: true })}
                    className='bg-[#D9D9D9] px-4 py-2 rounded-md outline-none w-full'
                />
                {errors.email && <span>This field is required</span>}

                <div className='flex items-center justify-around'>
                    <button className="save btn text-4xl text-primary hover:text-accent">
                        <Link href={"/contacts"}><MdCancelPresentation /></Link>
                    </button>

                    <button type='submit' className="save btn text-4xl text-primary hover:text-accent">
                        <IoIosSave />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddContactPage;
