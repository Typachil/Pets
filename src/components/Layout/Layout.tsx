import React from 'react';
import classNames from 'classnames';
import { Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import './Layout.scss'
import { PETS_DETAIL } from '../../utils/constRoutes';

export default function Layout() {
  const {screen} = useAppSelector(state => state.reducerUI);
  const location = useLocation();
  const classWrapper = classNames('wrapper-layout', {
      'wrapper-layout_mobile' : screen === 'mobile' || screen === 'tablet',
      'wrapper-layout_mobile-pet' : location.pathname.includes(PETS_DETAIL.path + '/') && (screen === 'mobile' || screen === 'tablet')
  })
  return (
    <>
      {!location.pathname.includes(PETS_DETAIL.path + '/') || 
        screen !== 'mobile' && screen !== 'tablet' ?
        <>
          <Header />
          <Sidebar />
        </> : null}
        <div className={classWrapper}>
            <Outlet />
        </div>
    </>
  )
}
