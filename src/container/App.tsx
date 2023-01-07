import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Router, Routes,Navigate, HashRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import AdminPannel from './AdminPannel';
import Login from '../components/login/Login';
import { decodeToken } from '../utils/decodeToken';
import { RefreshToken } from '../services/userService';
import CodeForMobile from '../components/login/CodeForMobile';
import SubmitInfo from '../components/login/SubmitInfo';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserContext from '../context/userContext';
import { ProSidebarProvider } from 'react-pro-sidebar';








const App:React.FC=()=>{
  const [font, setFont] = useState(getDefaultFont());
  const [mode, setMode] = useState(getDefaultMode());

  function getDefaultMode() {
      const savedMode = localStorage.getItem('mode');
      return savedMode ? savedMode : 'light';
  } function getDefaultFont() {
      const savedFont = localStorage.getItem('font');
      return savedFont ? savedFont : 'small';
  }
  useEffect(()=>{
      const body = document.body
      if (mode === 'dark'){
          body.classList.add('dark-mode')
      }else {
          body.classList.remove('dark-mode')

      }
      localStorage.setItem('mode', mode); // mode saved to local storage

  },[mode])

  useEffect(()=>{
      const body = document.body
      if (font === 'small'){
          body.classList.remove('medium')
          body.classList.remove('large')
          body.classList.add('small')
      }if (font === 'medium'){
          body.classList.remove('small')
          body.classList.remove('large')

          body.classList.add('medium')
      }if (font === 'large'){
          body.classList.remove('medium')
          body.classList.remove('small')
          body.classList.add('large')
      }
      localStorage.setItem('font', font); // mode saved to local storage

  },[font])


  const [currentUser, setCurrentUser] = useState({}); 

  return (
    <BrowserRouter>
    <ProSidebarProvider>
      <AdminPannel />
      <ToastContainer position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false} />
        </ProSidebarProvider>
    </BrowserRouter>
  )
}

export default App;
