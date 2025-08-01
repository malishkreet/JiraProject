import React, { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { theme } from "../../theme";
import { Toggle } from '../../components/toggle';
import { useAuth } from '../../context/AuthContext';
// import '../style/auth/authStyle.css';



const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [remember, setRemember] = useState(false);
    const navigate = useNavigate();
    const { accessToken, loading } = useAuth();

    // Чтоб не переходить на Регистрацию и авторизацию
    if (loading) return null; // Фича
    if (accessToken) {
        return <Navigate to="/profile" replace />
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/auth/register',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ firstName, email, password }),
                }
            );
            if (!response.ok) {
                throw new Error('Ошибка регистрации');
            }

            const result = await response.text();
            console.log('Регистрация успешна', result);
            // alert('Успешная регистрация');
            navigate('/auth/login')
        } catch (error) {
            console.error('Ошибка регистрации', error);
            alert('Регистрация не удалась')
        }


    }



    return (
        <Section>
            <Card>
                <TitleRegister>Регистрация</TitleRegister>
                <Form onSubmit={handleSubmit}>

                    <div>
                        <Label htmlFor="firstName">Имя</Label>
                        <Input
                            type="text"
                            id="firstName"
                            name="firstName"
                            placeholder="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>



                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email"
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>



                    <div>
                        <Label htmlFor="password">Пароль</Label>
                        <Input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <ToggleWrapper>
                        <Toggle checked={remember} onChange={setRemember} />
                        <TitleToggle>Запомнить меня</TitleToggle>
                    </ToggleWrapper>


                    <Button type="submit" >Зарегистрироваться</Button>

                    <FooterText>
                        Уже есть аккаунт?{' '}
                        <LogicLink to="/auth/login">Войти</LogicLink>
                    </FooterText>
                </Form>
            </Card>
        </Section>

    )
}

const TitleToggle = styled.span`
    font-size: 0.875rem;
`

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
    width: 100%;
    max-width: 450px;
    background-color: ${theme.colors.white};
    color: ${theme.colors.gray700};
    padding: 41px 50px;
    border-radius: ${theme.radius.md};
    box-shadow: ${theme.shadows.md};
    `
const TitleRegister = styled.h2`
        font-size: 18px;
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
const Input = styled.input`
        width: 100%;
        border-radius: ${theme.radius.md};
        padding: ${`${theme.spacing.sm} ${theme.spacing.md}`};
        border: solid 1px ${theme.colors.gray300};
        font-size: ${theme.fontSizes.base};
        margin-bottom: 1.5rem;
        &:focus {
            outline: none;
        }
        &:focus {
            border-color: ${theme.colors.blue600};
            box-shadow: 0 0 0 3px rgba(79, 209, 197, 0.3);
        }
    `

const ToggleWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: ${theme.spacing.sm};
    margin-top: 0.5rem;
    margin-bottom: 2rem;
  `;

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
`;

const FooterText = styled.p`
    margin-top: 1rem;
    text-align: center;
    font-weight: ${theme.fontWeights.medium};
`

const LogicLink = styled(Link)`
    color: ${theme.colors.blue600};
    font-weight: ${theme.fontWeights.semibold};
`

export default SignUp