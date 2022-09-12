import React, { FC, useState } from 'react';
import { Swiper } from 'swiper/react';
import SwiperButtonNext from './SwiperButtonNext';
import SwiperButtonPrev from './SwiperButtonPrev';
import classNames from 'classnames';
import './SwiperCustom.scss'

interface propsSwiperCustom{
    children: React.ReactNode
    slidesPerView: number
    spaceBetween?: number
    customContollers?: boolean
}

const SwiperCustom : FC<propsSwiperCustom> = ({
    children,
    slidesPerView,
    spaceBetween,
    customContollers
}) => {
    const [swiperEnd, setSwiperEnd] = useState(true);
    const [swiperStart, setSwiperStart] = useState(true);

    const computedClasses = classNames('swiper-custom', {
        'swiper-custom_scrollability': customContollers && !swiperEnd
    })

    return (
        <Swiper
            spaceBetween={spaceBetween}
            slidesPerView={slidesPerView}
            onAfterInit={() => {
                setSwiperEnd(false)
            }}
            onSlideChange={(swiper) => {
                if(swiper.isEnd) setSwiperEnd(true)
                if(swiper.isBeginning) setSwiperStart(true);
                if(!swiper.isEnd && !swiper.isBeginning) {
                    setSwiperEnd(false)
                    setSwiperStart(false)
                }
            }}
            className={computedClasses}>
                {customContollers && !swiperStart && <SwiperButtonPrev />}
                {children}
                {customContollers && !swiperEnd && <SwiperButtonNext />}
        </Swiper>
    );
}

export default SwiperCustom;
