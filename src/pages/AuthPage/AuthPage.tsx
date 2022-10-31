import React, { useMemo, useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Logo from '../../components/UI/Logo/Logo';
import getRandomInt from '../../hooks/getRandomInt';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import useInput from '../../hooks/useInput';
import { HOME_ROUTE, REGISTRATION_ROUTE } from '../../utils/constRoutes';
import './AuthPage.scss';
import { setUser } from '../../store/reducers/reducerUser';
import Alert from '../../components/UI/Alert/Alert';
import GoogleIcon from '../../assets/Google.svg';
import GitHubIcon from '../../assets/GitHub.svg';
import TwitterIcon from '../../assets/Twitter.svg';
import FacebookIcon from '../../assets/Facebook.svg';
import useSignWithSocial from '../../hooks/useSignWithSocial';

export default function AuthPage() {
    const { theme, screen } = useAppSelector((state) => state.reducerUI);
    const dispatch = useAppDispatch();
    const formEmail = useInput('', { isEmail: true });
    const formPassword = useInput('', { minLength: 6 });
    const [errorAuth, setErrorAuth] = useState(null);
    const navigate = useNavigate();

    const auth = getAuth();
    const signWithSocial = useSignWithSocial(auth)

    const memoGetRandomInt = useMemo(() => getRandomInt(1, 4), []);

    const loginUser = () => {
        auth.languageCode = 'ru';
        formEmail.onBlur();
        formPassword.onBlur();

        signInWithEmailAndPassword(auth, formEmail.value, formPassword.value)
            .then((userCredential) => {
                console.log(userCredential);
                const user = userCredential.user;
                dispatch(
                    setUser({
                        email: user.email,
                        id: user.uid,
                        token: user.refreshToken,
                        name: user.displayName,
                    })
                );
                navigate(HOME_ROUTE.path);
            })
            .catch((error) => {
                console.log(error.code);
                if (error.code === 'auth/user-not-found') {
                    setErrorAuth('Такой пользователь не найден');
                } else {
                    setErrorAuth('Почта или пароль неверны');
                }
            });
    };

    return (
        <div className='auth-block'>
            {(screen === 'laptop' || screen === 'desktop') && (
                <img
                    src={`./img/auth/image-${memoGetRandomInt}.png`}
                    alt='Image'
                    className='auth-block__img'
                />
            )}
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
                            value={formEmail.value}
                        />
                        <Input
                            theme={theme}
                            label='Пароль'
                            onChange={formPassword.onChange}
                            onBlur={formPassword.onBlur}
                            valid={formPassword.inputValid}
                            errorMessage={formPassword.errorMessage}
                            value={formPassword.value}
                            type='password'
                        />
                        {errorAuth && (
                            <Alert classes='auth-form__alert' variant='error'>
                                {errorAuth}
                            </Alert>
                        )}
                        <Button
                            disabled={Boolean(formEmail.errorMessage || formPassword.errorMessage)}
                            onClick={loginUser}
                            classes='auth-form__button'>
                            Войти
                        </Button>
                    </form>
                    <div className='auth-media'>
                        <p>Войдите через:</p>
                        <div className='auth-media__icons'>
                            <a href='#' onClick={() => {}} className='auth-media__icon'>
                                <GoogleIcon />
                            </a>
                            <a href='#' className='auth-media__icon'>
                                <TwitterIcon />
                            </a>
                            <a href='#' className='auth-media__icon'>
                                <GitHubIcon />
                            </a>
                            <a href='#' className='auth-media__icon'>
                                <FacebookIcon />
                            </a>
                        </div>
                    </div>
                    <div className='auth-redirect'>
                        <p>У вас ещё нет аккаунта?</p>
                        <Link to={REGISTRATION_ROUTE}>Зарегистрироваться</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
