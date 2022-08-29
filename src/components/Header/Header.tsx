import React, { useMemo, useState } from 'react';
import classNames from 'classnames';
import './Header.scss';
import { useLocation } from 'react-router-dom';
import Avatar from '../UI/Avatar/Avatar';
import Checkbox from '../UI/Checkbox/Checkbox';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { changeTheme } from '../../store/reducers/reducerUI';
import { ERROR_ROUTE, routesLayout } from '../../utils/constRoutes';
import ModalNav from '../ModalNav/ModalNav';

export default function Header() {
    const {theme, screen} = useAppSelector(state => state.reducerUI);
    const {user} = useAppSelector(state => state.reducerUser);
    const [visibleModal, setVisibleModal] = useState(false)
    const [notification, setNotification] = useState(true)
    const dispatch = useAppDispatch();
    const location = useLocation();

    const changeHeading = () => {
        const route = routesLayout.filter(item => item.path === location.pathname)
        let heading = ERROR_ROUTE.title;
        if(route.length){
            heading = route[0].title
        }
        return heading;
    }
    const memoChangeHeading = useMemo(() => changeHeading(), [location.pathname])

    const handleChange = () => {
        const next = theme === 'dark' ? 'light' : 'dark';
        dispatch(changeTheme(next));
    };

    const classNotification = classNames('header-actions__notification', {
        'header-actions__notification_online': notification
    })

    return (
        <div className='header'>
            {(screen === 'desktop' || screen === 'laptop') ? 
                <h1>{memoChangeHeading}</h1> : 
                <button className='header__modal-button' onClick={() => setVisibleModal(!visibleModal)}>
                    <div></div>
                    <div></div>
                    <div></div>
                </button>
            }
            <div className='header-actions'>
                <Checkbox variant='theme' checked={theme === 'light'} onChange={handleChange} classes="header-actions__checkbox" />
                <button className={classNotification}>
                    <svg
                        width='17'
                        height='21'
                        viewBox='0 0 17 21'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'>
                        <path
                            fillRule='evenodd'
                            clipRule='evenodd'
                            d='M7.03382 18.4305C7.48707 18.9594 8.06894 19.25 8.67269 19.25H8.67357C9.27995 19.25 9.86445 18.9594 10.3186 18.4296C10.5618 18.1482 10.9766 18.1253 11.2452 18.3792C11.5147 18.6331 11.5366 19.0685 11.2942 19.3499C10.5872 20.1722 9.65707 20.625 8.67357 20.625H8.67182C7.69094 20.6241 6.76257 20.1713 6.05819 19.349C5.81582 19.0676 5.83769 18.6322 6.10719 18.3792C6.37669 18.1244 6.79144 18.1473 7.03382 18.4305ZM8.71627 0.916687C12.6056 0.916687 15.2184 4.09019 15.2184 7.05377C15.2184 8.57819 15.5885 9.22444 15.9814 9.9101C16.3699 10.5866 16.81 11.3548 16.81 12.8068C16.5046 16.5165 12.8078 16.819 8.71627 16.819C4.62477 16.819 0.92702 16.5165 0.625134 12.8654C0.62252 11.3548 1.06265 10.5866 1.45115 9.9101L1.5883 9.66825C1.92599 9.06022 2.21415 8.39884 2.21415 7.05377C2.21415 4.09019 4.82689 0.916687 8.71627 0.916687ZM8.71627 2.29169C5.65814 2.29169 3.52665 4.80152 3.52665 7.05377C3.52665 8.95952 3.02177 9.84044 2.57552 10.6178C2.21765 11.242 1.93502 11.7352 1.93502 12.8068C2.08115 14.5356 3.17052 15.444 8.71627 15.444C14.2314 15.444 15.3549 14.4953 15.5001 12.7472C15.4975 11.7352 15.2149 11.242 14.857 10.6178C14.4108 9.84044 13.9059 8.95952 13.9059 7.05377C13.9059 4.80152 11.7744 2.29169 8.71627 2.29169Z'
                            fill={theme === 'dark' ? '#EDF2F7' : '#17171B'}
                        />
                    </svg>
                </button>
                <Avatar size={screen === 'mobile' ? 'xs' : 'sm'} name={user?.name}/>
            </div>
            {(screen === 'mobile' || screen === 'tablet') && 
                <ModalNav visible={visibleModal} onClick={() => setVisibleModal(!visibleModal)}/>
            }
        </div>
    );
}
