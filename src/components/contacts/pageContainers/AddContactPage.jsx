"use client";

import { token } from '@/constants/constants';
import useImgBBUpload from '@/hooks/useImgBbUpload';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaUserCircle } from 'react-icons/fa';
import { IoIosSave } from "react-icons/io";
import { MdCancelPresentation } from "react-icons/md";

const AddContactPage = () => {
    const [imageFile, setImageFile] = useState(null);  // Store the file
    const [imagePreview, setImagePreview] = useState(null);  // Store image preview URL
    const [uploadedImageUrl, setUploadedImageUrl] = useState("");  // Store uploaded image URL

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm();

    const { uploadImage, loading, imageUrl } = useImgBBUpload();

    const handleClearForm = () => {
        setImageFile(null);
        setImagePreview(null);
        setUploadedImageUrl("");
        setValue("name", "");
        setValue("phone", "");
        setValue("email", "");
        setValue("address", "");
    };

    const onSubmit = (data) => {
        console.log(data, "image url: ", uploadedImageUrl);
        const image = uploadedImageUrl || imageUrl;
        const { name, phone, email, address } = data;

        const payload = {
            name: name,
            phone: phone,
            email: email,
            address: address,
            profile_picture_url: image,
        };

        axios.post("http://localhost:3000/contacts", payload, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then(res => {
                console.log(res);
                if (res?.data?.message) {
                    toast.success(res.data.message);
                    handleClearForm();
                }
            })
            .catch(err => {
                console.log(err);
                toast.error(err?.message);
            });
    };

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

    return (
        <div className='space-y-5'>
            <h2 className='capitalize font-medium'>Add Contact</h2>

            <div className="image border border-primary w-20 h-20 aspect-square rounded-full mx-auto flex flex-col justify-center items-center">
                {/* Conditional rendering for the image preview */}
                {imagePreview && !loading ? (
                    <Image src={imagePreview} alt={"user-dp-preview"} width={80} height={80} className="rounded-full aspect-square" />
                ) : imageUrl && !loading ? (
                    <Image src={imageUrl} alt={"user-dp"} width={80} height={80} className="rounded-full aspect-square" />
                ) : (
                    <FaUserCircle className='text-7xl text-primary' />
                )}

                {loading && <p>Uploading...</p>}
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
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

                <input
                    placeholder='Address (Optional)'
                    type='text'
                    {...register("address")}
                    className='bg-[#D9D9D9] px-4 py-2 rounded-md outline-none w-full'
                />

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
