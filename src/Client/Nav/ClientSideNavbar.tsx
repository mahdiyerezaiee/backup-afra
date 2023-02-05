import React from 'react'
import {Menu, MenuItem, Sidebar} from 'react-pro-sidebar'
import "./sideNavStyle.css"
import {FaUserCircle} from "react-icons/fa"
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import {RiDashboardLine} from "react-icons/ri";
import {FaRegHandshake} from "react-icons/fa";

import {Link} from "react-router-dom";
const ClientSideNavbar: React.FC = () => {
    const user = useSelector((state:RootState) => state.user);
    return (
    <Sidebar defaultCollapsed={false} className="client-sideBar">
        <div className="m-2 text-center   text-black-50 p-3 info-client">
            <div className="circle pb-3 ">
                <FaUserCircle size="5rem" color="lightgray"/>

            </div>
            <h5 className="text-center">
{user.firstName} { user.lastName}
                </h5>
        </div>
      <Menu >
          <MenuItem icon={<RiDashboardLine size={'1.2rem'} />} routerLink={<Link to="/client" />}>داشبورد</MenuItem>
          <MenuItem icon={<FaRegHandshake size={'1.2rem'} />} routerLink={<Link to="/client/coulist" />}>سفارشات</MenuItem>



      </Menu>


    </Sidebar>
  )
}

export default ClientSideNavbar