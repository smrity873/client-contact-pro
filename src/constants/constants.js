"use client";

export const baseUrl = process.env.NEXT_PUBLIC_API_URL;
export const imgbbApiKey = process.env.NEXT_IMGBB_API_KEY;

export const getToken = () => {
    if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        const parsedToken = JSON.parse(token);

        return parsedToken;
    }
}

export const token = getToken();