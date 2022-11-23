import React from 'react';
import { Outlet } from 'react-router-dom';
import Rightbar from './Rightbar';
import Sidebar from './Sidebar';

const Layout = () => {
  return (
    <div className="w-full min-h-[100vh] h-[100vh] flex flex-row">
      <div className="min-w-[1264px] h-full flex flex-row">
        <Sidebar></Sidebar>
        <div className="outlet ml-[260px] w-full h-full px-5">
          <Outlet></Outlet>
        </div>
      </div>
      <Rightbar></Rightbar>
    </div>
  );
};

export default Layout;
