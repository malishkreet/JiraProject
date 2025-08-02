import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";


// PUT
export const putUserProfile = async (data, accessToken) => {
    const res = await fetch('http://localhost:8080/profile/me', {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + accessToken,
        },
        credentials: "include",
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update profile");
    return await res.json();
}

// GET
export const getUserProfile = () => {
    const { accessToken } = useAuth();
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!accessToken) {
            setUserProfile(null);
            setLoading(false);
            return;
        }
        setLoading(true);
        (async () => {
            try {
                const res = await fetch('http://localhost:8080/profile/me', {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + accessToken,
                    },
                    credentials: "include",

                });
                if (!res.ok) throw new Error("Failed to fetch profile");
                const data = await res.json();
                setUserProfile(data);
            } catch (e) {
                console.warn(e);
            } finally {
                setLoading(false);
            }
        })();


    }, [accessToken]);

    return { userProfile, loading };
}