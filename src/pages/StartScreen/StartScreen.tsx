import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Button from '../../components/UI/Button/Button';
import Logo from '../../components/UI/Logo/Logo';
import { useAppSelector } from '../../hooks/redux';
import { useGetPetsQuery } from '../../store/services/PetsService';
import { HOME_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from '../../utils/constRoutes';
import './StartScreen.scss'

export default function StartScreen() {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const {screen, theme} = useAppSelector(state => state.reducerUI)
    const {user} = useAppSelector(state => state.reducerUser)

    setTimeout(() => {
        if(user) navigate(HOME_ROUTE.path)
        setLoading(false)
    }, 2000)

    if (loading) {
        return (
            <div className='launch-screen'>
                <Logo size={screen === 'mobile' ? 'md' : 'lg'} 
                    theme={theme === 'light' ? 'light' : 'dark'} 
                    classes='logo_animation'/>
                <div className='launch-screen__text'>Pets</div>
            </div>
        );
    }

    return (
        <div className='start-screen'>
            <div className='start-screen__logo-block'>
                <Logo size='lg' theme={theme === 'light' ? 'light' : 'dark'}/>
                <h1 className='start-screen__heading'>Pets</h1>
                <p className='start-screen__desc'>Лапки. Ушки. Хвостик и доза любви</p>
            </div>
            <div className='start-screen__links'>
                <Button href={LOGIN_ROUTE}>Войти</Button>
                <p className='start-screen__question'>У вас еще нет аккаунта?</p>
                <NavLink to={REGISTRATION_ROUTE} className='register-link'>Зарегистрироваться</NavLink>
            </div>
        </div>
    )
}
