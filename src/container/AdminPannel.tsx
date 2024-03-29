
import React, { Fragment, Suspense, lazy, useEffect, useLayoutEffect } from 'react';
import Login from '../Common/Shared/Login/Login';
import NotFound from '../Common/Shared/Common/notFound';

import { decodeToken } from '../Utils/decodeToken';
import { GetUsersRoles, RefreshToken } from '../services/userService';
import { Route, Router, Routes, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Logout from '../Common/Shared/Login/Logout';
import CodeForMobile from '../Common/Shared/Login/CodeForMobile';
import PrivateRoute from '../Utils/PrivateRoute';
import { GetUserInfo } from '../services/userService';
import AdminMainLayout from '../Admin/Layout/AdminMainLayout';
import LoginWithPassword from '../Common/Shared/Login/loginWithPassword';
import { addUser } from '../store/Slice/user/userSlice';
import { userRoles } from '../store/Slice/user/userRole/userRoleSlice';
import ClientsMainLayout from './../Client/Layout/ClientsMainLayout';
import PrivateRouteClients from './../Utils/PrivateRouteClients';
import SysPlus from './../Landing/SysPlus';

const MainLazyLoad = lazy(() => import('../Admin/Layout/AdminMainLayout'))


const AdminPannel: React.FC = () => {
  const token = localStorage.getItem('Token');
  const dispatch=useDispatch()


  

  return (
    

    <Routes>

      <Route path='/admin/*' element={<PrivateRoute><AdminMainLayout /></PrivateRoute>} />
      <Route path='/client/*' element={<ClientsMainLayout /> }/>

      <Route path='/' element={<SysPlus/>} /> 
      <Route path='/login' element={<Login />} />
      <Route path='/*' element={<NotFound/>}/>
     <Route path='/verify' element={<CodeForMobile />} />

      <Route path='/logout' element={<Logout />} />

    </Routes>


  )
}
export default AdminPannel;