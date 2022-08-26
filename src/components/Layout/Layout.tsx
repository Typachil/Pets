import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import './Layout.scss'

export default function Layout() {
  return (
    <>
        <Header />
        <Sidebar />
        <div className='wrapper-layout'>
            <Outlet />
        </div>
    </>
  )
}
