"use client";

import { baseUrl, token } from '@/constants/constants';
import useImgBBUpload from '@/hooks/useImgBbUpload';
import useSingleContact from '@/hooks/useSingleContact';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaUserCircle } from 'react-icons/fa';
import { IoIosSave } from "react-icons/io";
import { MdCancelPresentation } from "react-icons/md";

const UpdateContactPage = () => {
    const [imageFile, setImageFile] = useState(null);  // Store the file

    const { id } = useParams();
    const { contact, isLoading } = useSingleContact({ id });
    const { NAME, address, phone, id: contactId, profile_picture_url, email } = contact;

    const [imagePreview, setImagePreview] = useState(profile_picture_url);  // Store image preview URL

    const [uploadedImageUrl, setUploadedImageUrl] = useState("");  // Store uploaded image URL

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm();

    const { uploadImage, loading, imageUrl } = useImgBBUpload();

    const onSubmit = (data) => {
        const image = uploadedImageUrl || imageUrl || profile_picture_url;  // Use the uploaded image URL or the existing image URL

        const { name, phone, email, address } = data;

        const payload = {
            name: name,
            phone: phone,
            email: email,
            address: address,
            profile_picture_url: image,
        };

        axios.put(`${baseUrl}/contacts/${contactId}`, payload, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        })
            .then(res => {
                if (res?.data?.message) {
                    toast.success(res.data.message);
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

    // Set the form values
    useEffect(() => {
        if (!imagePreview && profile_picture_url) {
            setImagePreview(profile_picture_url);
        }

        setValue("name", NAME);
        setValue("phone", phone);
        setValue("email", email);
        setValue("address", address);
    }, [NAME, address, phone, setValue, email, profile_picture_url, imagePreview]);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <div className='space-y-4 mt-16'>
            <h2 className='capitalize font-medium'>Update Contact</h2>

            <div className="image border border-primary w-20 h-20 aspect-square rounded-full mx-auto flex flex-col justify-center items-center">
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

                <label>
                    Name:
                    <input
                        placeholder='Name'
                        type='text'
                        {...register("name", { required: true })}
                        className='bg-[#D9D9D9] px-4 py-2 rounded-md outline-none w-full'
                    />
                </label>
                {errors.name && <span>This field is required</span>}

                <label>
                    Phone:
                    <input
                        placeholder='Phone'
                        type='number'
                        {...register("phone", { required: true })}
                        className='bg-[#D9D9D9] px-4 py-2 rounded-md outline-none w-full'
                    />
                </label>
                {errors.phone && <span>This field is required</span>}

                <label>
                    Email:
                    <input
                        placeholder='Email'
                        type='email'
                        {...register("email", { required: true })}
                        className='bg-[#D9D9D9] px-4 py-2 rounded-md outline-none w-full'
                    />
                </label>
                {errors.email && <span>This field is required</span>}

                <label>
                    Address:
                    <input
                        placeholder='Address (Optional)'
                        type='text'
                        {...register("address")}
                        className='bg-[#D9D9D9] px-4 py-2 rounded-md outline-none w-full'
                    />
                </label>

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

export default UpdateContactPage;
