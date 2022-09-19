import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Logo from '../../components/UI/Logo/Logo';
import getRandomInt from '../../hooks/getRandomInt';
import { useAppSelector } from '../../hooks/redux';
import useInput from '../../hooks/useInput';
import { REGISTRATION_ROUTE } from '../../utils/constRoutes';
import './AuthPage.scss'

export default function AuthPage() {
    const { theme, screen} = useAppSelector((state) => state.reducerUI);
    const formEmail = useInput('', { isEmail: true });
    const formPassword = useInput('');

    const loginUser = () => {
        formEmail.onBlur()
        formPassword.onBlur()      
    }

    const memoGetRandomInt = useMemo(() => getRandomInt(1, 4), [])

    return (
        <div className='auth-block'>
            {(screen === 'laptop' || screen === 'desktop') && 
                <img src={`./img/auth/image-${memoGetRandomInt}.png`} alt='Image' className='auth-block__img' />
            }
            <div className='auth-wrapper'>
                <div className='auth-form'>
                    <Logo size='md' theme={theme} />
                    <h1>Вход</h1>
                    <p>Войдите в систему сейчас, чтобы получить доступ к вашим питомцам</p>
                    <form>
                        <Input
                            theme={theme}
                            label='Адресс эл.почты'
                            onChange={formEmail.onChange}
                            onBlur={formEmail.onBlur}
                            valid={formEmail.inputValid}
                            errorMessage={formEmail.errorMessage}
                            value={formEmail.value} />
                        <Input
                            theme={theme}
                            label='Пароль'
                            onChange={formPassword.onChange}
                            onBlur={formPassword.onBlur}
                            valid={formPassword.inputValid}
                            errorMessage={formPassword.errorMessage}
                            value={formPassword.value} />
                        <Button 
                            disabled={Boolean(formEmail.errorMessage || formPassword.errorMessage)}
                            onClick={loginUser}>Войти</Button>
                    </form>
                    <div className='auth-redirect'>
                        <p>У вас ещё нет аккаунта?</p>
                        <Link to={REGISTRATION_ROUTE}>Зарегистрироваться</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
