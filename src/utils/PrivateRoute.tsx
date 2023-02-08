import React, { useState, useEffect } from "react";
import { ImTab } from "react-icons/im";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { GetUsersRoles } from "../services/userService";
import { RootState } from "../store";
interface Props {
    children: JSX.Element
}

const PrivateRoute: React.FC<Props> = ({ children }: Props) => {
    let [userRole, SetUserRole] = useState([])
    const token = localStorage.getItem("token")
    const roles = useSelector((state:RootState) => state.roles);

    const userRoles = async () => {

        const { data, status } = await GetUsersRoles()
        SetUserRole(data.result.userRoleIds)

    }
    useEffect(() => {
        userRoles()
    }, [])

 console.log(roles);
 

    return token && roles.some((item: any) => item > 2) ? children : <Navigate to="/client" />
};

export default PrivateRoute;