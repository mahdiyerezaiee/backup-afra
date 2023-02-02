import React, { useState, useEffect } from "react";
import { ImTab } from "react-icons/im";
import { Navigate } from "react-router-dom";
import { GetUsersRoles } from "../services/userService";
interface Props {
    children: JSX.Element
}

const PrivateRoute: React.FC<Props> = ({ children }: Props) => {
    let [userRole, SetUserRole] = useState([])
    const token = localStorage.getItem("token")

    const userRoles = async () => {

        const { data, status } = await GetUsersRoles()
        SetUserRole(data.result.userRoleIds)

    }
    useEffect(() => {
        userRoles()
    }, [])



    return token && userRole.every((item: any) => item > 2) ? children : <Navigate to="/login" />
};

export default PrivateRoute;