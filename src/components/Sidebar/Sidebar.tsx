import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { logout } from '../../store/reducers/reducerUser';
import { LOGIN_ROUTE } from '../../utils/constRoutes';
import Logo from '../UI/Logo/Logo';
import './Sidebar.scss';
import { navItemsArr } from './navItemsArr';
import LogoutIcon from './icons/Logout.svg';

export default function Sidebar() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { theme, screen } = useAppSelector((state) => state.reducerUI);

    const logoutUser = () => {
        dispatch(logout())
        navigate(LOGIN_ROUTE);
    }

    if(screen === 'mobile' || screen === 'tablet'){
        return <></>
    }

    return (
        <div className='sidebar'>
            <div className='sidebar-navigate'>
                <Link to='#' className='sidebar-navigate__logo'>
                    <Logo size='sm' theme={theme} />
                </Link>
                {navItemsArr.map((item, index) => {
                    return (
                        <NavLink key={index} to={item.path} className='sidebar-navigate__link'>
                            {item.icon}
                        </NavLink>
                    )
                })} 
            </div>
            <button onClick={logoutUser} className='sidebar-navigate__logout'>
                <LogoutIcon />
            </button>
        </div>
    );
}
