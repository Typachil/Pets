import React, { useEffect, useState } from 'react';
import { Navigation } from 'swiper';
import { SwiperSlide, Swiper } from 'swiper/react';
import { useAppSelector } from '../../hooks/redux';
import { Graphic } from '../../store/models/Pets';
import './HomeStatistic.scss';

export default function HomeStatistic() {
    const { statistic } = useAppSelector((state) => state.reducerPets);
    const [currentPetStatistic, setCurrentPetStatistic] = useState(0);
    const [namePet, setNamePet] = useState(null);
    const [likesPet, setLikesPet] = useState(null);
    const [graphicPet, setGraphicPet] = useState(null);
    const [valueViewsAverage, setValueViewsAverage] = useState(0);
    const [valueLikesAverage, setValueLikesAverage] = useState(0);

    const weekDay = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];

    const heightMainColumn = 140;

    useEffect(() => {
        if (statistic) {
            let valueViewsMax = 0;
            let valueLikesMax = 0;
            let stats = statistic[currentPetStatistic];
            setNamePet(stats.name);
            setLikesPet(stats.likes);
            setGraphicPet(stats.graphic);

            stats.graphic.map(item => {
                valueViewsMax += item.views;
                valueLikesMax += item.likes;
            })

            setValueLikesAverage(valueLikesMax / stats.graphic.length)
            setValueViewsAverage(valueViewsMax / stats.graphic.length)
        }
    }, [currentPetStatistic, statistic]);

    const getDay = (dateNumber: number) : Array<number> => {
        let weekNumber = 7;
        let date = new Date();
        date.setDate(date.getDate() - (weekNumber - dateNumber));
        const numberMonth = date.getDate();
        const numberWeek = date.getDay();

        return [
            numberMonth, 
            numberWeek 
        ]
    }

    const calculateHeight = (amount : number, average : number) : number => {
        console.log(average)
        return (average / 100) * amount * heightMainColumn;
        // return (heightMainColumn / 100) * (average / amount);
    }

    return (
        <div className='home-statistic'>
            <div>
                <Swiper slidesPerView={1} 
                    className='home-statistic__swiper'
                    modules={[Navigation]}
                    navigation
                    onSlideChangeTransitionEnd={(swiper) => {
                        setCurrentPetStatistic(swiper.activeIndex)
                    }}>
                    {statistic?.map((item, index) => {
                        return (
                            <SwiperSlide key={index}>
                                <img src='https://loremflickr.com/320/240/cat' alt='petImgStats' />
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
                <div className='home-statistic__info'>
                    <h5>{namePet}</h5>
                    <span>{likesPet} лайка</span>
                </div>
            </div>
            <div className='home-statistic__chart'>
                <div className='home-statistic__chart-header'>
                    <div>
                        Лайки <span></span>
                    </div>
                    <div>
                        Просмотры <span></span>
                    </div>
                </div>
                <div className='home-statistic__chart-items'>
                    {graphicPet?.map((item : Graphic) => {
                        const [numberMonth, numberWeek] = getDay(item.id)
                        return (
                            <div className='home-statistic__chart-item' key={item.id}>
                                <div className='home-statistic__column-main' style={{height: heightMainColumn + 'px'}}>
                                    <div className='home-statistic__column-like'
                                        style={{height: calculateHeight(item.likes, valueLikesAverage),
                                                bottom: calculateHeight(item.views, valueViewsAverage)}}></div>
                                    <div className='home-statistic__column-views' 
                                        style={{height: calculateHeight(item.views, valueViewsAverage)}}>    
                                    </div>
                                </div>
                                <div className='home-statistic__chart-date'>
                                    <div>{numberMonth}</div>
                                    <small>{weekDay[numberWeek]}</small>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
