import React,{useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearUser,clearUserInfo, clearUserRoles } from '../../actions/user';






const Logout = () => {
    const history=useNavigate();
    const dispatch = useDispatch();
const token=localStorage.getItem('token');

    dispatch(clearUserRoles());
      
    dispatch(clearUserInfo());
    dispatch(clearUser());

        localStorage.removeItem("token");
        localStorage.removeItem("refresh");
        localStorage.removeItem('connect');
        localStorage.removeItem('username');


      
        history("/login",{replace:true});
      

    return null;
};

export default Logout;