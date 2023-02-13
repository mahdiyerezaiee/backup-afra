import React, { useEffect, useState } from 'react'
import {Menu, MenuItem, Sidebar, SubMenu} from 'react-pro-sidebar'
import "./sideNavStyle.css"
import {FaUserCircle, FaUserCog} from "react-icons/fa"
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import {RiDashboardLine} from "react-icons/ri";
import {FaRegHandshake} from "react-icons/fa";
import{TiPencil} from "react-icons/ti"
import {MdOutlineAdminPanelSettings, MdSupportAgent} from "react-icons/md"
import {Link, NavLink, useNavigate} from "react-router-dom";
import { ImExit } from 'react-icons/im';
import { SlOrganization } from 'react-icons/sl';
import { GetUsersRoles } from '../../services/userService';
import { TbFileInvoice } from 'react-icons/tb';
const ClientSideNavbar: React.FC = () => {
    const user = useSelector((state:RootState) => state.user);
    let [userRole, SetUserRole] = useState([])
    const token = localStorage.getItem("token")
const roles = useSelector((state:RootState) => state.roles);
    const navigate=useNavigate();
    // console.log(roles.some((i:any)=>i > 2));
    const sideChanger=()=>{

  document.body.classList.remove('clientBody')
  navigate('/admin')
        
    }
    return (
    <Sidebar defaultCollapsed={false} className="client-sideBar sticky-menu ">
        <div className="m-2 text-center   text-black-50 p-3 info-client">
            <div className="circle pb-3 ">
                <FaUserCircle size="5rem" color="lightgray"/>
                <Link to="userProfile"><TiPencil size="1.5rem" color="white" className="edit-svg"/></Link>
            </div>
            <h5 className="text-center">
{user.firstName} { user.lastName}
                </h5>
                <h6 className="text-center">
 { user.email}
                </h6>
        </div>
      <Menu >
          <MenuItem icon={<RiDashboardLine size={'1.2rem'} />} routerLink={<Link to="/client" />}>داشبورد</MenuItem>
          <MenuItem icon={<FaRegHandshake size={'1.2rem'} />} routerLink={<Link to="orderlist" />}> سفارشات من</MenuItem>
          <MenuItem icon={<MdSupportAgent size='2rem' />} routerLink={<Link to="ticket" />}> تیکت های من</MenuItem>
          <MenuItem icon={<FaUserCog size='2rem' />} routerLink={<Link to="userProfile" />}>   اطلاعات کاربری</MenuItem>
          <MenuItem icon={<SlOrganization size='2rem' />} routerLink={<Link to="organization" />}>    سازمان</MenuItem>
          <MenuItem icon={<TbFileInvoice size='2rem' />} routerLink={<Link to="invoice" />}>    صورت حساب</MenuItem>

          <MenuItem hidden={roles.some((item: any ) => item > 2) ? false : true } className='bg-light-success' icon={<MdOutlineAdminPanelSettings size='2rem' color='green'/>} onClick={sideChanger}>    ورود به پنل ادمین</MenuItem>


          <MenuItem className='bg-light-danger' icon={<ImExit size='2rem' color='red' />} routerLink={<Link to='/logout'></Link>}  > خروج از سامانه</MenuItem>

          
          

      </Menu>


    </Sidebar>
  )
}

export default ClientSideNavbar