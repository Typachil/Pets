import React, { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Logo from '../../components/UI/Logo/Logo';
import getRandomInt from '../../hooks/getRandomInt';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import useInput from '../../hooks/useInput';
import { registration } from '../../store/reducers/reducerUser';
import { HOME_ROUTE, LOGIN_ROUTE } from '../../utils/constRoutes';
import './AuthPage.scss';

export default function RegisterPage() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const { theme, screen } = useAppSelector((state) => state.reducerUI);
    const formName = useInput('');
    const formEmail = useInput('', { isEmail: true });
    const formPassword = useInput('', { minLength: 4 });

    const memoGetRandomInt = useMemo(() => getRandomInt(1, 4), [])

    const registrationUser = () => {
        formName.onBlur()
        formEmail.onBlur()
        formPassword.onBlur()

        if(formName.inputValid || formEmail.inputValid || formPassword.inputValid){
            dispatch(registration({
                name: formName.value, 
                email: formEmail.value, 
                password: formPassword.value
            }))
            navigate(HOME_ROUTE.path)
        }
    }

    return (
        <div className='auth-block'>
            {(screen === 'laptop' || screen === 'desktop') && 
                <img src={`./img/auth/image-${memoGetRandomInt}.png`} alt='Image' className='auth-block__img' />
            }
            <div className='auth-wrapper'>
                <div className='auth-form'>
                    <Logo size='md' theme={theme} />
                    <h1>Регистрация</h1>
                    <p>Зарегистрируйтесь сейчас бесплатно и добавьте своего питомца</p>
                    <form>
                        <Input
                            theme={theme}
                            label='Имя'
                            onChange={formName.onChange}
                            onBlur={formName.onBlur}
                            valid={formName.inputValid}
                            errorMessage={formName.errorMessage}
                            value={formName.value} />
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
                            disabled={formName.errorMessage || formEmail.errorMessage || formPassword.errorMessage}
                            onClick={registrationUser}>
                            Зарегистрироваться
                        </Button>
                    </form>
                    <div className='auth-redirect'>
                        <p>Уже есть аккаунт?</p>
                        <Link to={LOGIN_ROUTE}>Войти</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
