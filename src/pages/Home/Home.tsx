import React from 'react';
import { useAppSelector } from '../../hooks/redux';
import './Home.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import Avatar from '../../components/UI/Avatar/Avatar';
import 'swiper/scss/navigation';
import 'swiper/scss';
import SwiperCustom from '../../components/SwiperCustom/SwiperCustom';
import Button from '../../components/UI/Button/Button';
import PetCard from '../../components/PetCard/PetCard';
import HomeProgress from '../../components/HomeProgress/HomeProgress';
import HomeStatistic from '../../components/HomeStatistic/HomeStatistic';
import { getTime } from '../../hooks/useDate';
import HomeDate from '../../components/HomeDate/HomeDate';
import HomeWriteNow from '../../components/HomeWriteNow/HomeWriteNow';

export default function Home() {
    const { user } = useAppSelector((state) => state.reducerUser);
    const { posts, pets } = useAppSelector((state) => state.reducerPets);
    const { screen } = useAppSelector((state) => state.reducerUI);

    const calculateViewForPosts = (): number => {
        if (screen === 'tablet' || screen === 'laptop') return 2;
        if (screen === 'mobile') return 1;
        return 4;
    };

    const calculateSpaceForSliders = (): number => {
        if (screen === 'tablet') return 30;
        if (screen === 'laptop') return 20;
        if (screen === 'mobile') return 10;
        return 40;
    };

    return (
        <div className='home'>
            <div className='home-banner'>
                <div className='home-banner__text'>
                    <h1>С возвращением, {user?.name}</h1>
                    <p>Не забудь покормить своего питомца</p>
                    <span>Хорошего дня!</span>
                </div>
                {screen !== 'mobile' && <img src='img/Banner.png' alt='Banner' />}
            </div>
            {screen === 'mobile' ? (
                <Swiper slidesPerView={1} className='home-mobile__slider'>
                    <SwiperSlide>
                        <HomeProgress />
                    </SwiperSlide>
                    <SwiperSlide>
                        <HomeDate />
                    </SwiperSlide>
                </Swiper>
            ) : (
                <>
                    <div className='home-progress'>
                        <HomeProgress />
                    </div>
                    <div className='home-dateAndTime'>
                        <HomeDate />
                    </div>
                </>
            )}
            <div className='home-posts'>
                <SwiperCustom
                    slidesPerView={calculateViewForPosts()}
                    spaceBetween={calculateSpaceForSliders()}
                    customContollers={screen === 'mobile' ? false : true}>
                    {posts?.map((item) => {
                        const { id, body, time, author, status, avatar } = item;
                        return (
                            <SwiperSlide className='home-posts__item' key={id}>
                                <div>
                                    <div className='home-posts__item-header'>
                                        <Avatar
                                            name={author}
                                            size='sm'
                                            classes='home-posts__item-avatar'
                                            img={avatar}
                                        />
                                        <div>
                                            <p className='home-posts__item-name'>{author}</p>
                                            <span className='home-posts__item-status'>{status}</span>
                                        </div>
                                        <span className='home-posts__item-date'>{getTime(time)}</span>
                                    </div>
                                    <p className='home-posts__item-content'>{body}</p>
                                </div>
                            </SwiperSlide>
                        );
                    })}
                </SwiperCustom>
            </div>
            <div className='home-pets'>
                <SwiperCustom
                    slidesPerView={screen === 'mobile' ? 1 : 2} 
                    spaceBetween={calculateSpaceForSliders()}
                    customContollers={screen === 'mobile' ? false : true}>
                    {pets?.map((item, index) => {
                        const { age, name, previewImg, likes, groupID, sex } = item;
                        return (
                            <SwiperSlide className='home-pets__item' key={index}>
                                <PetCard
                                    id={index}
                                    age={age}
                                    name={name}
                                    previewImg={previewImg}
                                    likes={likes}
                                    groupID={groupID}
                                    sex={sex}
                                />
                            </SwiperSlide>
                        );
                    })}
                </SwiperCustom>
            </div>
            <div className='home-writeNow'>
                <HomeWriteNow />
            </div>
            <div className='home-statsPet'>
                <HomeStatistic />
            </div>
        </div>
    );
}
