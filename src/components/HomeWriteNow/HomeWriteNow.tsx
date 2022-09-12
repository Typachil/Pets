import React, { memo } from 'react';
import './HomeWriteNow.scss';
import Avatar from '../UI/Avatar/Avatar';
import Button from '../UI/Button/Button';
import { useAppSelector } from '../../hooks/redux';
import getRandomInt from '../../hooks/getRandomInt';

const HomeWriteNow = () => {
    const {screen} = useAppSelector(state => state.reducerUI)
    const users = ['R', 'T', 'Q', 'Y', 'J', 'G'];
    let screenLimit = 5;

    if(screen === 'laptop') screenLimit = 3;
    if(screen === 'mobile') screenLimit = 6;

    const newArrUsers = users.filter((item, index) => {
        return index++ < screenLimit
    })

    return (
        <div className='write-now'>
            {newArrUsers.map((item, index) => {
                return <Avatar key={index} classes={`write-now__user_bacground-${getRandomInt(1, 5)}`} size='md' name={item} />
            })}
            <div className='write-now__add-user'>+</div>
            <Button size='medium' classes='write-now__button'>
                Напиши сейчас
            </Button>
        </div>
    );
}

const memoHomeWriteNow = memo(HomeWriteNow)
export default memoHomeWriteNow;
