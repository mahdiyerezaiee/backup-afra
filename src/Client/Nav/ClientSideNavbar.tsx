import React from 'react'
import {Menu, MenuItem, Sidebar, SubMenu} from 'react-pro-sidebar'
import "./sideNavStyle.css"
import {FaUserCircle, FaUserCog} from "react-icons/fa"
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import {RiDashboardLine} from "react-icons/ri";
import {FaRegHandshake} from "react-icons/fa";
import{TiPencil} from "react-icons/ti"
import {MdSupportAgent} from "react-icons/md"
import {Link, NavLink} from "react-router-dom";
const ClientSideNavbar: React.FC = () => {
    const user = useSelector((state:RootState) => state.user);
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
          <MenuItem icon={<FaRegHandshake size={'1.2rem'} />} routerLink={<Link to="/client/coulist" />}>سفارشات</MenuItem>

          <SubMenu     icon={<MdSupportAgent size='2rem' />} label="پشتیبانی" >
                    <MenuItem  routerLink={<Link to='ticket'></Link>} >لیست تیکت ها</MenuItem>
                    <MenuItem   routerLink={<Link to='newTicket'></Link>}>ثبت تیکت جدید </MenuItem>

                </SubMenu>
                <SubMenu  icon={<FaUserCog size='2rem' />} label="حساب کاربری" >
                    <MenuItem  icon={<i className="fa fa-hashtag" />} routerLink={<Link to='userProfile'></Link>}  >اطلاعات کاربری </MenuItem>
                    <MenuItem  icon={<i className="fa fa-share-square-o" />} routerLink={<Link to='/logout'></Link>}  > خروج از سامانه</MenuItem>
                </SubMenu>

      </Menu>


    </Sidebar>
  )
}

export default ClientSideNavbar