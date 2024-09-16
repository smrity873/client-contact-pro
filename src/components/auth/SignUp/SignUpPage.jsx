"use client";

import { baseUrl } from '@/constants/constants';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const SignUpPage = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const router = useRouter()

    const onSubmit = (data) => {
        console.log(data)

        const payload = {
            username: data.username,
            email: data.email,
            password: data.password
        }

        axios.post(`${baseUrl}/auth/register`, payload)
            .then(res => {
                console.log(res.data)

                if (res.data?.message) {
                    toast.success(res.data.message)
                    router.push('/sign-in')
                }
            })
            .catch(err => {
                console.log(err)
                toast.error(err?.message)
            })
    }

    return (
        <div className='space-y-4'>
            <div className="title space-y-2">
                <h3 className="font-bold">Sign Up</h3>
                <p className='text-gray-700'>Already have an account? <Link href={"/sign-in"} className='text-primary font-medium hover:text-accent'>Sign In</Link></p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="login flex flex-col space-y-4">
                <input placeholder='Username' type='username' {...register("username", { required: true })} className='bg-[#D9D9D9] px-4 py-2 rounded-md outline-none' />
                {/* errors will return when field validation fails  */}
                {errors.username && <span>This field is required</span>}

                <input placeholder='Email' type='email' {...register("email", { required: true })} className='bg-[#D9D9D9] px-4 py-2 rounded-md outline-none' />
                {/* errors will return when field validation fails  */}
                {errors.email && <span>This field is required</span>}

                <input placeholder='Password' type='password' {...register("password", { required: true })} className='bg-[#D9D9D9] px-4 py-2 rounded-md outline-none' />
                {errors.password && <span>This field is required</span>}

                <input type="submit" value={"Sign Up"} className='bg-primary text-white font-semibold py-2 rounded-md hover:bg-accent cursor-pointer' />
            </form>
        </div>
    );
};

export default SignUpPage;