import React, {useState, useEffect} from "react";
import { Navigate } from "react-router-dom";
import { GetUsersRoles } from "../services/userService";
 interface Props {
     children :JSX.Element
}

const PrivateRouteClients : React.FC<Props>= ({children}:Props) => {

    const token = localStorage.getItem("token")
    
    return token    ?
    children 
 : 
     <Navigate to="/login"/>
};

export default PrivateRouteClients;