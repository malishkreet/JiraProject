import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export const useProfile = () => {
    const { accessToken } = useAuth();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);



    useEffect(() => {
        console.log(">>> useProfile, token=", accessToken);
        if (!accessToken) {
            setProfile(null);
            setLoading(false);
            return;
        }
        (async () => {
            try {
                const res = await fetch("http://localhost:8080/user/me", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + accessToken
                    },
                    credentials: "include",
                });
                console.log(">>> статус профиля", res.status);
                if (!res.ok) throw new Error("Failed to fetch profile");
                const data = await res.json();
                console.log("PROFILE DATA:", data);
                setProfile(data);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        })();
    }, [accessToken]);



    return { profile, loading };
};
