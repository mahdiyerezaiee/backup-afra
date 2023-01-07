
import React, { Fragment, Suspense, lazy, useEffect, useLayoutEffect } from 'react';
import Login from '../Common/Shared/login/Login';
import NotFound from '../Common/Shared/common/notFound';

import { decodeToken } from '../Utils/decodeToken';
import { GetUsersRoles, RefreshToken } from '../services/userService';
import { Route, Router, Routes, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Logout from '../Common/Shared/login/Logout';
import CodeForMobile from '../Common/Shared/login/CodeForMobile';
import PrivateRoute from '../Utils/PrivateRoute';
import { GetUserInfo } from '../services/userService';
import AdminMainLayout from '../Admin/Layout/AdminMainLayout';
import LoginWithPassword from '../Common/Shared/login/loginWithPassword';
import SysPlus from '../pages/landingPage/SysPlus';

const MainLazyLoad = lazy(() => import('../Admin/Layout/AdminMainLayout'))

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