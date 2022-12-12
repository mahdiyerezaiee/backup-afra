
import React, { Fragment,Suspense, lazy, useEffect, useLayoutEffect } from 'react';
import Login from './../components/login/Login';

import { decodeToken } from './../utils/decodeToken';
import { GetUsersRoles, RefreshToken } from '../services/userService';
import { Route, Router, Routes, Navigate } from 'react-router-dom';
import { addUser, addUserInfo, addUserRoles, clearUser } from './../actions/user';
import { useSelector, useDispatch } from 'react-redux';
import { isEmpty } from 'lodash';
import Logout from './../components/login/Logout';
import CodeForMobile from './../components/login/CodeForMobile';
import PrivateRoute from '../utils/PrivateRoute';
import { GetUserInfo } from './../services/userService';
import MainLayout from './../components/layouts/MainLayout';
import LoginWithPassword from '../components/common/loginWithPassword';

const MainLazyLoad=lazy(()=>import('./../components/layouts/MainLayout'))



const AdminPannel = () => {
  const token = localStorage.getItem("token");


  const User = useSelector(state => state.User);
 
 
 

  return (

    <Routes>
     
      <Route path='/*' element={
          <PrivateRoute>
        <MainLayout/>
       
        </PrivateRoute>} />
     
      
      <Route path='/login' element={<Login />} />
      <Route path='/verify' element={<CodeForMobile />} />
   
      <Route path='/logout' element={token===null?<Navigate to='/login' />:<Logout/>} />
    </Routes>


  )
}
export default AdminPannel;