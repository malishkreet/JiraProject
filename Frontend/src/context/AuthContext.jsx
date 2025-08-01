import { useState, useEffect, useContext, createContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const refreshAccessToken = async () => {
            try {
                const res = await fetch("http://localhost:8080/auth/refresh", {
                    method: "POST",
                    credentials: "include",
                });
                if (res.ok) {
                    const data = await res.json();
                    setAccessToken(data.token);
                }
            } catch (e) {
                console.warn("Не удалось обновить токен");
                setAccessToken(null);
                navigate("/auth/login");
            } finally {
                setLoading(false);
            }
        };
        refreshAccessToken();
    }, [navigate]);

    const login = (token) => setAccessToken(token);

    const logout = async () => {
        await fetch("http://localhost:8080/auth/logout", {
            method: "POST",
            credentials: "include",
        });
        setAccessToken(null);
        navigate("/auth/login");
    };

    return (
        <AuthContext.Provider value={{ accessToken, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
