import React, { FC } from 'react';
import { useSwiper } from 'swiper/react';
import { useAppSelector } from '../../hooks/redux';
import SearchBar from '../UI/SearchBar/SearchBar';
import './SwiperCustom.scss'

const SwiperButtonPrev: FC = () => {
    const swiper = useSwiper();
    const {theme} = useAppSelector(state => state.reducerUI)
    return <SearchBar theme={theme} onClick={() => swiper.slidePrev()} classes='swiper-custom__button-prev'/>;
};

export default SwiperButtonPrev;
