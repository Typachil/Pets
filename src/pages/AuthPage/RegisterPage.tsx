import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Logo from '../../components/UI/Logo/Logo';
import getRandomInt from '../../hooks/getRandomInt';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import useInput from '../../hooks/useInput';
import { setUser } from '../../store/reducers/reducerUser';
import { HOME_ROUTE, LOGIN_ROUTE } from '../../utils/constRoutes';
import './AuthPage.scss';
import Alert from '../../components/UI/Alert/Alert';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';

export default function RegisterPage() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const { theme, screen } = useAppSelector((state) => state.reducerUI);
    const [errorReg, setErrorReg] = useState(null)
    const formName = useInput('');
    const formEmail = useInput('', { isEmail: true });
    const formPassword = useInput('', { minLength: 6 });

    const memoGetRandomInt = useMemo(() => getRandomInt(1, 4), [])

    const registrationUser = () => {
        formName.onBlur()
        formEmail.onBlur()
        formPassword.onBlur()

        if(formName.inputValid || formEmail.inputValid || formPassword.inputValid){
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, formEmail.value, formPassword.value)
            .then((userCredential) => {
                const user = userCredential.user;
                updateProfile(user, {
                    displayName: formName.value
                }).then(() => {
                    dispatch(setUser({
                        email: user.email,
                        id: user.uid,
                        token: user.refreshToken,
                        name: user.displayName,
                        photoURL: user.photoURL
                    }))
                    setDoc(doc(db, 'users', user.uid), {
                        name: user.displayName,
                        email: user.email,
                        photoURL: user.photoURL,
                        createdAt: serverTimestamp()
                    });
                    navigate(HOME_ROUTE.path)
                })
            })
            .catch((error) => {
                console.log(error)
            });
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
                            value={formPassword.value}
                            type='password' />
                        {/* <Alert classes='auth-form__alert' variant='error'>Ошибка</Alert> */}
                        <Button 
                            disabled={Boolean(formName.errorMessage || formEmail.errorMessage || formPassword.errorMessage)}
                            onClick={registrationUser}
                            classes='auth-form__button'>
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
