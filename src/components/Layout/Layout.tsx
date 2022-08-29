import React from 'react';
import classNames from 'classnames';
import { Outlet } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import './Layout.scss'

export default function Layout() {
  const {screen} = useAppSelector(state => state.reducerUI);
  const classWrapper = classNames('wrapper-layout', {
      'wrapper-layout_mobile' : screen === 'mobile' || screen === 'tablet'
  })
  return (
    <>
        <Header />
        <Sidebar />
        <div className={classWrapper}>
            <Outlet />
        </div>
    </>
  )
}
