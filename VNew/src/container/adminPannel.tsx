import {Navigate, Route, Routes} from "react-router-dom";
import MainLayout from "../component/layouts/MainLayout";
import Login from "../component/login/login";
import PrivateRoute from "../utils/PrivateRoute";
const AdminPannel:React.FC = () => {

    return (

        <Routes>

            <Route path='/*' element={ <PrivateRoute><MainLayout/></PrivateRoute>} />

    {/*// <Route path='/sysplus' element={<SysPlus/>} />*/}
     <Route path='/login' element={<Login />} />
    {/*// <Route path='/verify' element={<CodeForMobile />} />*/}

    {/*// <Route path='/logout' element={token===null?<Navigate to='/login' />:<Logout/>} />*/}
    </Routes>


)
}
    export default AdminPannel;