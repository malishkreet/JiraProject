import { useAuth } from "../context/AuthContext";

export const useAuthFetch = () => {
    const { accessToken } = useAuth();

    const authFetch = async (url, options = {}) => {
        const headers = {
            ...options.headers,
            Authorization: `Bearer ${accessToken}`,
        };

        return fetch(url, {
            ...options,
            headers,
            credentials: 'include',
        });
    };

    return authFetch;
}