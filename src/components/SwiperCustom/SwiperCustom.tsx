import React, { FC, useState } from 'react';
import { Swiper, SwiperProps } from 'swiper/react';
import SwiperButtonNext from './SwiperButtonNext';
import SwiperButtonPrev from './SwiperButtonPrev';
import classNames from 'classnames';
import './SwiperCustom.scss'

interface propsSwiperCustom{
    children: React.ReactNode
    customContollers?: boolean
}

const SwiperCustom : FC<propsSwiperCustom & SwiperProps> = ({
    children,
    customContollers,
    ...attrs
}) => {
    const [swiperEnd, setSwiperEnd] = useState<boolean>(true);
    const [swiperStart, setSwiperStart] = useState<boolean>(true);

    const computedClasses = classNames('swiper-custom', {
        'swiper-custom_scrollability-right': customContollers && !swiperEnd,
        'swiper-custom_scrollability-left': customContollers && !swiperStart,
    })

    return (
        <Swiper
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
            {...attrs}
            className={computedClasses}>
                {customContollers && !swiperStart && <SwiperButtonPrev />}
                {children}
                {customContollers && !swiperEnd && <SwiperButtonNext />}
        </Swiper>
    );
}

export default SwiperCustom;
