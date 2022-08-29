import React, { FC } from 'react';
import classNames from 'classnames';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux';
import { logout } from '../../store/reducers/reducerUser';
import {
    BLOG_ROUTE,
    CHAT_ROUTE,
    HOME_ROUTE,
    LOGIN_ROUTE,
    PETS_ROUTE,
    PROFILE_ROUTE,
} from '../../utils/constRoutes';
import './ModalNav.scss';

interface PropsModal{
    visible? : boolean
    onClick? : () => void;
}

const ModalNav:FC<PropsModal> = ({visible, onClick}) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const logoutUser = () => {
        dispatch(logout());
        navigate(LOGIN_ROUTE);
    };

    const modalClass = classNames('modal-nav', {
        'modal-nav_active': visible
    })

    return (
        <div className={modalClass}>
            <div className='modal-nav__navigate'>
                <button className='modal-nav__close' onClick={onClick}></button>
                <NavLink to={HOME_ROUTE.path} className='modal-nav__link' onClick={onClick}>
                    <div className='modal-nav__icon'>
                        <img alt='Home' src='img/icons/Home.png'/>
                    </div>
                    <span>Home</span>
                </NavLink>
                <NavLink to={PETS_ROUTE.path} className='modal-nav__link' onClick={onClick}>
                    <div className='modal-nav__icon'>
                        <img alt='Pets' src='img/icons/Pets.png'/>
                    </div>
                    <span>Pets</span>
                </NavLink>
                <NavLink to={BLOG_ROUTE.path} className='modal-nav__link' onClick={onClick}>
                    <div className='modal-nav__icon'>
                        <img alt='Blog' src='img/icons/Blog.png'/>
                    </div>
                    <span>Blog</span>
                </NavLink>
                <NavLink to={CHAT_ROUTE.path} className='modal-nav__link' onClick={onClick}>
                    <div className='modal-nav__icon'>
                        <img alt='Chat' src='img/icons/Chat.png'/>
                    </div>
                    <span>Chat</span>
                </NavLink>
                <NavLink to={PROFILE_ROUTE.path} className='modal-nav__link' onClick={onClick}>
                    <div className='modal-nav__icon'>
                        <img alt='Profile' src='img/icons/Profile.png'/>
                    </div>
                    <span>Profile</span>
                </NavLink>
            </div>
            <div className='modal-nav__logout' onClick={logoutUser}>
                <button className='modal-nav__icon'>
                    <img alt='Logout' src='img/icons/Logout.png'></img>
                </button>
                <span>Logout</span>
            </div>
        </div>
    );
}

export default ModalNav;
