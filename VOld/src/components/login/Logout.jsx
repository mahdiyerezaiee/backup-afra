import React,{useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearUser,clearUserInfo, clearUserRoles } from '../../actions/user';
import Login from './Login';






const Logout = () => {
    const history=useNavigate();
    const dispatch = useDispatch();
const token=localStorage.getItem('token');
useEffect(()=>{

    redirectTologin()
dispatch(clearUser())
dispatch(clearUserInfo())

    
},[])
   
const redirectTologin=()=>{
        localStorage.removeItem("token");
        localStorage.removeItem("refresh");
        localStorage.removeItem('connect');
        localStorage.removeItem('username');
        localStorage.removeItem('mobile')
       localStorage.clear()

      
        history("/login");
}
return (null)
    
};

export default Logout;