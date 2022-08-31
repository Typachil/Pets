import React from 'react';
import { useAppSelector } from '../../hooks/redux';
import './Home.scss';

export default function Home() {
    const { user } = useAppSelector(state => state.reducerUser)

    return (
        <div className='home'>
            <div className='home__banner'>
                <div className='home__banner-text'>
                    <h1>С возвращением, {user?.name}</h1>
                    <p>Не забудь покормить своего питомца</p>
                    <p>Хорошего дня!</p>
                </div>
                <img src='img/Banner.png' alt="Banner"></img>
            </div>
            <div className='home__daily-progress'>daily-progress</div>
            <div className='home__time'>time</div>
            <div className='home__date'>date</div>
            <div className='home__posts'>
                <div className='home__posts-item'>posts-item</div>
                <div className='home__posts-item'>posts-item</div>
                <div className='home__posts-item'>posts-item</div>
                <div className='home__posts-item'>posts-item</div>
            </div>
            <div className='home__pets'>
                <div className='home__pets-item'>pets-item</div>
                <div className='home__pets-item'>pets-item</div>
            </div>
            <div className='home__write-now'>write-now</div>
            <div className='home__stats-pet'>stats-pet</div>
        </div>
    );
}
