import React, { FC } from 'react';
import classNames from 'classnames';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux';
import { logout } from '../../store/reducers/reducerUser';
import { LOGIN_ROUTE } from '../../utils/constRoutes';
import './ModalNav.scss';
import { navItemsArr } from '../Sidebar/navItemsArr';
import LogoutIcon from '../Sidebar/icons/Logout.svg';
import { getAuth, signOut } from 'firebase/auth';

interface PropsModal{
    visible? : boolean
    onClick? : () => void;
}

const ModalNav:FC<PropsModal> = ({visible, onClick}) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const auth = getAuth();

    const logoutUser = () => {
        signOut(auth).then(() => {
            dispatch(logout());
            navigate(LOGIN_ROUTE);
        }).catch(error => {
            console.log(error)
        })
    };

    const modalClass = classNames('modal-nav', {
        'modal-nav_active': visible
    })

    return (
        <div className={modalClass}>
            <div className='modal-nav__navigate'>
                <button className='modal-nav__close' onClick={onClick}></button>
                {navItemsArr.map((item, index) => {
                    return (
                        <NavLink key={index} to={item.path} className='modal-nav__link' onClick={onClick}>
                            <div className='modal-nav__icon'>
                                <item.icon viewBox="0 0 24 24"/>
                            </div>
                            <span>{item.title}</span>
                        </NavLink>
                    )
                })}          
            </div>
            <div className='modal-nav__logout' onClick={logoutUser}>
                <button className='modal-nav__icon'>
                    <LogoutIcon viewBox="0 0 24 24"/>
                </button>
                <span>Logout</span>
            </div>
        </div>
    );
}

export default ModalNav;
