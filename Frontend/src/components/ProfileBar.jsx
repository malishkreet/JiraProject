import React from "react";
import styled from "@emotion/styled"
import { AuthProvider, useAuth } from "../context/AuthContext";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { useProfile } from "../hooks/useProfile";
import profileLogo from "../assets/images/ProfileLogo.svg"
import logoutMenu from "../assets/images/LogoutMenu.svg"
import profileMenu from '../assets/images/ProfileMenu.svg'
import { theme } from "../theme";

export const ProfileBar = ({ isOpen, onClose }) => {

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
                <span>
                    <ProfileLogoImage src={profileLogo} alt="#" />
                </span>
                <InfoProfileme>
                    <InfoProfileName>{profile?.firstName || "Имя не указано"}</InfoProfileName>
                    <InfoProfileEmail>{profile?.email || "Email не указан"}</InfoProfileEmail>
                </InfoProfileme>
            </InfoProfile>

            <ButtonMenu>
                <ButtonLink to={'/profile'} onClick={onClose}>
                    <span>
                        <MenuImageElement src={profileMenu} alt="#Pf" />
                    </span>
                    <MenuTextElement>Профиль</MenuTextElement>
                </ButtonLink>
            </ButtonMenu>
            {/* 
            <div>
                <span>
                    <img src="#" alt="#Pf" />
                </span>  
                <span>Настройка аккаунта</span>
                // TODO реализовать когда настрою бэк
            </div> */}

            <ul></ul>

            <ButtonMenu>
                <ButtonLink onClick={handleLogout} >
                    <span>
                        <MenuImageElement src={logoutMenu} alt="" />
                    </span>
                    <MenuTextElement>Выйти</MenuTextElement>

                </ButtonLink>
            </ButtonMenu>



        </Bar>
    )

}
// ===== STYLES =====
const ProfileImageBlock = styled.span`
    display: flex;
    align-items: center;
`
const MenuTextElement = styled.span`
    font-size: 1rem;
    width: 100%;
    margin-left: 8px;
`

const MenuImageElement = styled.img`
    width: 1.2rem;
    height: 1.2rem;
`

const ButtonMenu = styled.div`



`

const ButtonLink = styled(Link)`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0.5rem 1rem;
    &:hover {
        background-color: #37383b;
    }
 
`

const ProfileLogoImage = styled.img`
    width: 4rem;
    height: 4rem;
`

const InfoProfileName = styled.h3`
    display: block;
    max-width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 1rem;
    
`
const InfoProfileEmail = styled.p`
    font-size: 0.875rem;
    font-weight: ${theme.fontWeights.medium};
    display: block;
    max-width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`

const InfoProfileme = styled.div`
    margin: 9px 0px 9px 16px;
`

const InfoProfile = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: start;
    background-color: #18191a;
    margin: 7px 7px 7px 7px;
    padding: 0.8rem;
    border-radius: 5px;
`

const Bar = styled.div`

    display: ${props => (props.isOpen ? 'block' : 'none')};
    position: fixed;
    width: 310px;

    top: 44px;
    right: 0;
    box-shadow: -5px 6px 9px -4px rgba(99, 108, 114, 0.2);
    height: auto;
    z-index: 1000;
    background: #2a2a2d;
    overflow: hidden;
    transition: width 0.3s ease-in-out;
    `