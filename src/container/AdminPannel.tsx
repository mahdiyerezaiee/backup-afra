
import React, { Fragment, Suspense, lazy, useEffect, useLayoutEffect } from 'react';
import Login from './../components/login/Login';
import NotFound from './../components/common/notFound';

import { decodeToken } from './../utils/decodeToken';
import { GetUsersRoles, RefreshToken } from '../services/userService';
import { Route, Router, Routes, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Logout from './../components/login/Logout';
import CodeForMobile from './../components/login/CodeForMobile';
import PrivateRoute from '../utils/PrivateRoute';
import { GetUserInfo } from './../services/userService';
import AdminMainLayout from '../components/layouts/AdminMainLayout';
import LoginWithPassword from '../components/common/loginWithPassword';
import SysPlus from '../pages/landingPage/SysPlus';

const MainLazyLoad = lazy(() => import('../components/layouts/AdminMainLayout'))

const AdminPannel: React.FC = () => {
  const token = localStorage.getItem('Token');

  return (

    <Routes>

      <Route path='/admin/*' element={<PrivateRoute><AdminMainLayout /></PrivateRoute>} />

      {/* // <Route path='/sysplus' element={<SysPlus/>} /> */}
      <Route path='/login' element={<Login />} />
      // <Route path='/verify' element={<CodeForMobile />} />

      <Route path='/logout' element={<Logout />} />

    </Routes>


  )
}
export default AdminPannel;