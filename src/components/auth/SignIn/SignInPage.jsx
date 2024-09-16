"use client";

import { baseUrl } from '@/constants/constants';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const SignInPage = () => {
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
            email: data.email,
            password: data.password
        }

        axios.post(`${baseUrl}/auth/login`, payload)
            .then(res => {
                const token = res.data.token

                if (window !== undefined) {
                    localStorage.setItem('token', JSON.stringify(token))
                }

                if (token) {
                    toast.success('Logged in successfully')
                    router.push('/contacts')
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
                <h3 className="font-bold">Sign In</h3>
                <p className='text-gray-700'>Doesn’t have an account yet? <Link href={"/sign-up"} className='text-primary font-medium hover:text-accent'>Sign Up</Link></p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="login flex flex-col space-y-4">
                <input placeholder='Email' type='email' {...register("email", { required: true })} className='bg-[#D9D9D9] px-4 py-2 rounded-md outline-none' />
                {/* errors will return when field validation fails  */}
                {errors.email && <span>This field is required</span>}

                <input placeholder='Password' type='password' {...register("password", { required: true })} className='bg-[#D9D9D9] px-4 py-2 rounded-md outline-none' />
                {errors.password && <span>This field is required</span>}


                <input type="submit" value={"Sign In"} className='bg-primary text-white font-semibold py-2 rounded-md hover:bg-accent cursor-pointer' />
            </form>
        </div>
    );
};

export default SignInPage;