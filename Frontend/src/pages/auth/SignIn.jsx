import React, { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { theme } from '../../theme';
import { Toggle } from '../../components/toggle';
import Header from '../../components/Header';
import { useAuth } from '../../context/AuthContext';
// import '../style/auth/authStyle.css';


const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();
    const { accessToken, loading } = useAuth();


    // Чтоб не переходить на Регистрацию и авторизацию
    if (loading) return <div>Загрузка...</div>;
    if (accessToken) return <Navigate to="/profile" replace />;

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });

            if (!response.ok) {
                throw new Error('Ошибка авторизации');
            }

            const data = await response.json();
            console.log('Успешно', data);
            login(data.token);
            navigate('/profile')

        } catch (err) {
            console.error('Ошибка', err);
            alert('Неверный логин или пароль')
        }


    }

    return (
        <>
            {/* <Header /> */}


            <Section>
                <Card>
                    <TitleLogin>Авторизация</TitleLogin>
                    <Form onSubmit={handleSubmit}>

                        <div>
                            <Label htmlFor='email'>Email</Label>
                            <Input
                                id='email'
                                placeholder="Email"
                                type='email'
                                autoComplete="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div>
                            <Label htmlFor='password'>Password</Label>
                            <Input
                                id='password'
                                type="password"
                                placeholder="Пароль"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} />
                        </div>

                        <ToggleWrapper>
                            <Toggle checked={remember} onChange={setRemember} />
                            <span>Запомнить меня</span>
                        </ToggleWrapper>

                        <Button type='submit'>Войти</Button>

                        <FooterText>Нет аккаунта ? <LogicLink to="/auth/register">Регистрация</LogicLink></FooterText>
                    </Form>
                </Card>

            </Section>
        </>
    );
}

const Section = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    width: 100vw;
    background: linear-gradient(
    135deg,
    #def1f1 0%,
    rgba(255, 255, 255, 1) 100%
  );
`

const Card = styled.div`
    max-width: 450px;
    width: 100%;
    background-color: ${theme.colors.white};
    padding: 41px 50px;
    color: ${theme.colors.gray700};
    border-radius: ${theme.radius.md};
    box-shadow: ${theme.shadows.md};
`

const TitleLogin = styled.h2`
    font-size: 18px;
    text-align: center;
    font-weight: ${theme.fontWeights.bold};
    text-align: center;
    margin-bottom: 2rem;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
`
const Label = styled.label`
        display: block;
        font-size: ${theme.fontSizes.sm};
        font-weight: ${theme.fontWeights.medium};
        margin-bottom: 5.5px;
        margin-left: 4.5px;
`

const ToggleWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: ${theme.spacing.sm};
    margin-top: 0.5rem;
    margin-bottom: 2rem;
  `;


const Input = styled.input`
    width: 100%;
    border-radius: ${theme.radius.md};
    padding: ${`${theme.spacing.sm} ${theme.spacing.md}`};
    border: solid 1px ${theme.colors.gray300};
    font-size: ${theme.fontSizes.base};
    margin-bottom: 1rem;
    &:focus {
        outline: 0;
    }
    &:focus {
        border-color: ${theme.colors.blue600};
        box-shadow: 0 0 0 3px rgba(79, 209, 197, 0.3);
    }
`

const TitleToggle = styled.span`
    font-size: 0.875rem;
`

const Button = styled.button`
  background-color: ${theme.colors.blue600};
  border-radius: ${theme.radius.md};
  border: none;
  padding: 0.75rem 0;
  color: ${theme.colors.white};
  font-size: ${theme.fontSizes.base};
  cursor: pointer;
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

const LogicLink = styled(Link)`
    color: ${theme.colors.blue600};
    font-weight: ${theme.fontWeights.semibold};
`
const FooterText = styled.p`
    margin-top: 1rem;
    text-align: center;
    font-weight: ${theme.fontWeights.medium};
`

export default SignIn;
