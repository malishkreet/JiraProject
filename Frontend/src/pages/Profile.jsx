import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';
import Header from "../components/Header";
import { useProfile } from "../hooks/useProfile";
import styled from '@emotion/styled'
import { theme } from "../theme";
import profileLogo from "../assets/images/ProfileLogo.svg"
import { JobIcon, DepoIcon, OrgIcon, MapsIcon, EmailIcon } from '../ui/components/ProfileIcons.jsx';

export


    const Profile = () => {
        // Test GET API
        const { profile, loading } = useProfile();
        if (loading) return null;



        return (


            <SectionProfile>
                <ProfileContainer >
                    <h1>Профиль</h1>

                    {/* <div></div> фон если понадобится */}

                    <Wrapper>
                        <ProfileLeft>
                            <ProfileImageName>   {/* //TODO Реализовать загрузку фото в базу */}
                                <div>

                                    <div>
                                        <ProfileImageBorder>
                                            <ProfileImageMe src={profileLogo} alt="me" />
                                        </ProfileImageBorder>
                                    </div>
                                    <div>
                                        {/* <div>
                                    <button>
                                        <span>
                                            сюда svg иконку и надо обрабатывать и делать PUT в базу и получать в img сверху 
                                        </span>
                                    </button>
                                </div>   */}
                                    </div>

                                </div>


                                <div>
                                    <h2>{profile?.firstName || 'Имя не указано'}</h2>
                                </div>

                            </ProfileImageName>

                            <div>
                                <div>
                                    <span>Управление аккаунтом</span> {/* Потом сделать на Link to= и ссылку где че как менять */}
                                </div>

                            </div>

                            <div>
                                <h3>Сведения</h3>

                                <MenuProfile>
                                    <div>
                                        <MenuProfileContent>
                                            <MenuProfileIcon>
                                                <JobIcon />
                                            </MenuProfileIcon>
                                            <form role="presentation">
                                                <div role="presentation">
                                                    <InfoMe>Ваша должность</InfoMe>
                                                </div>
                                            </form>

                                        </MenuProfileContent>

                                        <MenuProfileContent>
                                            <MenuProfileIcon>
                                                <DepoIcon />
                                            </MenuProfileIcon>
                                            <form role="presentation">
                                                <div role="presentation">
                                                    <InfoMe>Ваш отдел</InfoMe>
                                                </div>
                                            </form>

                                        </MenuProfileContent>


                                        <MenuProfileContent>
                                            <MenuProfileIcon>
                                                <OrgIcon />
                                            </MenuProfileIcon>
                                            <form role="presentation">
                                                <div role="presentation">
                                                    <InfoMe>Ваша организация</InfoMe>
                                                </div>
                                            </form>

                                        </MenuProfileContent>

                                        <MenuProfileContent>
                                            <MenuProfileIcon>
                                                <MapsIcon />
                                            </MenuProfileIcon>
                                            <form role="presentation">
                                                <div role="presentation">
                                                    <InfoMe>Ваше местоположение</InfoMe>
                                                </div>
                                            </form>

                                        </MenuProfileContent>
                                    </div>

                                    <div>
                                        <h4>Контактные данные</h4>
                                        <MenuProfileContent>
                                            <MenuProfileIcon>
                                                <EmailIcon />
                                            </MenuProfileIcon>

                                            <div>
                                                <InfoContactDate>{profile?.email || 'Email не найден'}</InfoContactDate>
                                            </div>
                                        </MenuProfileContent>
                                    </div>



                                </MenuProfile>


                            </div>





                        </ProfileLeft>


                        <ProfileRight>
                            {/* Реализовать таблицу с проектами после того как сделаю главный экран */}
                        </ProfileRight>
                    </Wrapper>

                </ProfileContainer>
            </SectionProfile>




        );
    }

const ProfileImageName = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const InfoContactDate = styled.div`
    color: ${theme.colors.gray300}
`

const InfoMe = styled.div`
    font-size: 14px;
    color: ${theme.colors.gray200};
`

const MenuProfileIcon = styled.span`
    width: 1.5rem;
    height: 1.5rem;
    margin-right: 1rem;
`


const MenuProfileContent = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 50px;
`

const MenuProfile = styled.div`
    display: flex;
    flex-direction: column;
    padding: 16px 12px ;
    border: 1px solid ${theme.colors.back100};
    border-radius: 10px;
`

const Wrapper = styled.div`
    display: flex;
    width: 100%;
    @media (max-width: 800px) {
        flex-direction: column;
    }
`

const ProfileLeft = styled.div`
    padding: 1rem;
    flex: 0 0 320px;
    @media (max-width: 800px) {
        width: 100%;
    }
`

const ProfileRight = styled.div`
   flex: 1 1 0;
   @media (max-width: 800px) {
        width: 100%;
   } 
`

const ProfileImageMe = styled.img`
    width: 128px;
    height: 128px;
`
const ProfileImageBorder = styled.span`
    border-radius: 50%;
    background-color: ${theme.colors.black};
    width: 130px;
    height: 130px;
`

const SectionProfile = styled.div`
    max-width: 100%;
    height: 100hv;

`

const ProfileContainer = styled.div`
    width: 1200px;
    margin: auto;
`

export default Profile;
