import React from 'react';
import ClockIcon from './icon/Clock.svg';
import CalendarIcon from './icon/Calendar.svg';
import { getDate, getTime } from '../../hooks/useDate';
import './HomeDate.scss';
import { useAppSelector } from '../../hooks/redux';

export default function HomeDate() {
    const {screen} = useAppSelector(state => state.reducerUI)

    return (
        <div className='time-metrics'>
            <div className='time'>
                <div className='time-metrics__wrapper'>
                    {screen !== 'laptop' && 
                        <div className='time-metrics__icon'>
                            <ClockIcon />
                        </div>}
                    <span>На часах у нас</span>
                </div>
                <div className='time__timer'>{getTime()}</div>
            </div>
            <div className='date'>
                <div className='time-metrics__wrapper'>
                    {screen !== 'laptop' && 
                        <div className='time-metrics__icon'>
                            <CalendarIcon />
                        </div>}
                    <span>На календаре у нас</span>
                </div>
                <div className='date__calendar'>{getDate()}</div>
            </div>
        </div>
    );
}
