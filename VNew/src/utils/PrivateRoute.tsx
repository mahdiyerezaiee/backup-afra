import React, {ReactChild, ReactChildren} from "react";
import { Navigate } from "react-router-dom";
 interface Props {
     children :JSX.Element
}

const PrivateRoute : React.FC<Props>= ({children}:Props) => {
    const token = localStorage.getItem("token")

    return token  ? children : <Navigate to="/sysplus"/>
};

export default PrivateRoute;