import React, { useMemo, useState } from 'react';
import classNames from 'classnames';
import './Header.scss';
import { useLocation } from 'react-router-dom';
import Avatar from '../UI/Avatar/Avatar';
import Checkbox from '../UI/Checkbox/Checkbox';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { changeTheme } from '../../store/reducers/reducerUI';
import { ERROR_ROUTE, PETS_DETAIL, routesLayout } from '../../utils/constRoutes';
import NotificationIcon from '../../../public/img/icons/Notification.svg';
import ModalNav from '../ModalNav/ModalNav';

export default function Header() {
    const { theme, screen } = useAppSelector((state) => state.reducerUI);
    const { user } = useAppSelector((state) => state.reducerUser);
    const { petPage } = useAppSelector(state => state.reducerPets)
    const [visibleModal, setVisibleModal] = useState<boolean>(false);
    const [notification, setNotification] = useState<boolean>(true);
    const dispatch = useAppDispatch();
    const location = useLocation();

    const changeHeading = () => {
        const route = routesLayout.filter((item) => item.path === location.pathname);
        let heading = ERROR_ROUTE.title;
        if (route.length) {
            heading = route[0].title;
        }
        if (location.pathname.includes(PETS_DETAIL.path + '/')) heading = PETS_DETAIL.title + '\\' + petPage?.name;
        return heading;
    };
    const memoChangeHeading = useMemo(() => changeHeading(), [location.pathname, petPage]);

    const handleChange = () => {
        const next = theme === 'dark' ? 'light' : 'dark';
        dispatch(changeTheme(next));
    };

    const classNotification = classNames('header-actions__notification', {
        'header-actions__notification_online': notification,
    });

    return (
        <>
            <div className='header'>
                {screen === 'desktop' || screen === 'laptop' ? (
                    <h1>{memoChangeHeading}</h1>
                ) : (
                    <button
                        className='header__modal-button'
                        onClick={() => setVisibleModal(!visibleModal)}>
                        <div></div>
                        <div></div>
                        <div></div>
                    </button>
                )}
                <div className='header-actions'>
                    <Checkbox
                        variant='theme'
                        checked={theme === 'light'}
                        onChange={handleChange}
                        classes='header-actions__checkbox'
                    />
                    <button className={classNotification}>
                        <NotificationIcon viewBox='0 0 24 24' />
                    </button>
                    <Avatar size={screen === 'mobile' ? 'xs' : 'sm'} name={user?.name} img={user?.photoURL}/>
                </div>
            </div>
            {(screen === 'mobile' || screen === 'tablet') && (
                <ModalNav visible={visibleModal} onClick={() => setVisibleModal(!visibleModal)} />
            )}
        </>
    );
}
