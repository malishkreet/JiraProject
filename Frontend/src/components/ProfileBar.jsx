import React from "react";
import styled from "@emotion/styled"
import { AuthProvider, useAuth } from "../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import { useProfile } from "../hooks/useProfile";
import profileLogo from "../assets/images/ProfileLogo.svg"

export const ProfileBar = ({ isOpen }) => {

    const { profile, loading } = useProfile();
    const { logout } = useAuth();
    const navigate = useNavigate();


    if (loading) return null;

    const handleLogout = async () => {
        await logout();
        navigate('/auth/login')
    }

    return (
        <Bar isOpen={isOpen}>
            <InfoProfile>
                <div>
                    <ProfileLogoImage src={profileLogo} alt="#" />
                </div>
                <div>
                    <div>{profile?.firstName || "Имя не указано"}</div>
                    <div>{profile?.email || "Email не указан"}</div>
                </div>
            </InfoProfile>
            <div>
                <span>
                    <img src="#" alt="#Pf" />
                </span>
                <div>Профиль</div>
            </div>
            <div>
                <span>
                    <img src="#" alt="#Pf" />
                </span>
                <div>Настройка аккаунта</div>
            </div>

            <span></span>

            <button onClick={handleLogout}>
                Выйти
            </button>

        </Bar>
    )

}
// ===== STYLES =====
const ProfileLogoImage = styled.img`
    width: 4rem;
    height: 4rem;
`

const InfoProfile = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: #18191a;
    padding: 0.9rem;

`

const Bar = styled.div`

    
    position: fixed;
    width: 310px;
    padding: 0.5rem;
    top: 44px;
    right: 0;
    box-shadow: -5px 6px 9px -4px rgba(99, 108, 114, 0.2);
    height: auto;
    z-index: 1000;
    background: #2a2a2d;
    overflow: hidden;
    transition: width 0.3s ease-in-out;
  transform-origin: right;
  transition: transform 0.3s ease-in-out;
  transform: ${props => (props.isOpen ? 'scaleX(1)' : 'scaleX(0)')};
    `