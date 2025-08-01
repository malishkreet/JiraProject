import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';
import Header from "../components/Header";
import { useProfile } from "../hooks/useProfile";


const Profile = () => {
    // Test GET API
    const { profile, loading } = useProfile();
    if (!profile) return <div>Нет профиля</div>;
    if (loading) return null;


    
    return (
        <div>Привет, {profile.firstName} ({profile.email})</div>
    );
    // const { logout } = useAuth();
    // const navigate = useNavigate();

    // const handleLogout = async () => {
    //     await logout();
    //     navigate('/auth/login');
    // };
    return (
        <>

            <section>
                <div >
                    <h2>Профиль</h2>

                </div>
            </section>

        </>


    );
}

export default Profile;
