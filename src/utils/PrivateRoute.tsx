import React, { useState, useEffect } from "react";
import { ImTab } from "react-icons/im";
import { useSelector ,useDispatch} from "react-redux";
import { Navigate } from "react-router-dom";
import { GetUsersRoles } from "../services/userService";
import { RootState } from "../store";
import { userRoles } from "../store/Slice/user/userRole/userRoleSlice";
import { decryptStirng } from './DecryptionUtill';
interface Props {
    children: JSX.Element
}

const PrivateRoute: React.FC<Props> = ({ children }: Props) => {
  
   
    const token = localStorage.getItem("token")
    const roles = useSelector((state:RootState) => state.roles);
    
    const role=decryptStirng(localStorage.getItem('rd'))
    

  
   
 

   


if(roles.length>0){
    return token && roles.some((item: any) => item > 2) ? children : <Navigate to="/client" />
}
else if(role)
{
    return token && role.some((item: any) => item > 2) ? children :  <Navigate to="/client" />

}
else{
    return token? <Navigate to="/client" />:<Navigate to="/login"/>
}
};

export default PrivateRoute;