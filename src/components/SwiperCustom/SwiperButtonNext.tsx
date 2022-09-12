import React, { FC, useEffect } from 'react';
import { useSwiper } from 'swiper/react';
import { useAppSelector } from '../../hooks/redux';
import SearchBar from '../UI/SearchBar/SearchBar';
import './SwiperCustom.scss'

const SwiperButtonNext: FC = () => {
    const swiper = useSwiper();
    const {theme} = useAppSelector(state => state.reducerUI)
    return <SearchBar theme={theme} onClick={() => swiper.slideNext()} classes='swiper-custom__button-next'/>;
};

export default SwiperButtonNext;
