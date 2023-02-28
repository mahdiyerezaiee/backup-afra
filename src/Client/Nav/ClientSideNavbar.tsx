import React, { useEffect, useState } from 'react'
import { Menu, MenuItem, Sidebar, SubMenu } from 'react-pro-sidebar'
import "./sideNavStyle.css"
import { FaUserCircle, FaUserCog } from "react-icons/fa"
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { RiDashboardLine } from "react-icons/ri";
import { FaRegHandshake } from "react-icons/fa";
import { TiPencil } from "react-icons/ti"
import { MdOutlineAdminPanelSettings, MdPayment, MdSupportAgent } from "react-icons/md"
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ImExit } from 'react-icons/im';
import { SlOrganization } from 'react-icons/sl';
import { GetUsersRoles } from '../../services/userService';
import { TbFileInvoice } from 'react-icons/tb';
import QueryString from 'qs';
import { GetAttachments } from './../../services/attachmentService';

const attachmetURL = (window as any).globalThis.stie_att


const ClientSideNavbar: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  
  const [attachments, Setattachments] = useState([]);

  const token = localStorage.getItem("token")
  const roles = useSelector((state: RootState) => state.roles);
  const navigate = useNavigate();
  const sideChanger = () => {

    document.body.classList.remove('clientBody')
    navigate('/admin')

  }

  const handelGetAttachment = async () => {

    let config = {
      headers: { "Content-Type": "application/json" },
      params: {
        entityTypeId: 1,
        entityId: Number(localStorage.getItem('connect')),
        attachmentTypeId:3


      },
      paramsSerializer: (params: any) => {
        return QueryString.stringify(params);
      },
    };
    try {
      const { data, status } = await GetAttachments(config);
      if (status === 200) {
        Setattachments(data.result.attachments);


      }
    } catch (error) {
      console.log(error);


    }
  }

  useEffect(() => {

    handelGetAttachment()


  }, [])

console.log(user);


  let newAttachment: any = []
  newAttachment = attachments.filter((item: any) => item.deleted === false && item.attachmentTypeId===3)
  
  return (
    <Sidebar defaultCollapsed={false} className="client-sideBar sticky-menu ">
      <div className="m-2 text-center   text-black-50 p-3 info-client">
        {newAttachment.length===0?<div className="circle pb-3 ">
          <FaUserCircle size="5rem" color="lightgray" />
          <Link to="userProfile"><TiPencil size="1.5rem" color="white" className="edit-svg" /></Link>
        </div>:
        
        <div className="circle pb-3 ">
          <img src={`${attachmetURL}${newAttachment[0].path}`} className="rounded-circle " alt={`${user.firstName} ${user.lastName}`} style={{height:"80px",width:"80px"}} />
          <Link to="userProfile"><TiPencil size="1.5rem" color="white" className="edit-svg" /></Link>
        </div>
        }
        <h5 className="text-center">
          {user.firstName} {user.lastName}
        </h5>
        <h6 className="text-center">
          {user.email}
        </h6>
      </div>

      <Menu >
        <MenuItem icon={<RiDashboardLine size={'1.2rem'} />}  routerLink={user.requireInfo?<Link to='/client/editProfile'/>:<Link to="/client" />}>داشبورد</MenuItem>
        <MenuItem icon={<FaRegHandshake size={'1.2rem'} />} routerLink={user.requireInfo?<Link to='/client/editProfile'/>:<Link to="orderlist" />}> سفارشات من</MenuItem>
        <MenuItem icon={<MdSupportAgent size='2rem' />} routerLink={user.requireInfo?<Link to='/client/editProfile'/>:<Link to="ticket" />}> تیکت های من</MenuItem>
        <MenuItem icon={<FaUserCog size='2rem' />} routerLink={user.requireInfo?<Link to='/client/editProfile'/>:<Link to="userProfile" />}>   اطلاعات کاربری</MenuItem>
        <MenuItem icon={<SlOrganization size='2rem' />} routerLink={user.requireInfo?<Link to='/client/editProfile'/>:<Link to="organization" />}>    سازمان</MenuItem>
        <MenuItem icon={<TbFileInvoice size='2rem' />} routerLink={user.requireInfo?<Link to='/client/editProfile'/>:<Link to="invoice" />}>    صورتحساب های من</MenuItem>
        <MenuItem icon={<MdPayment size='2rem' />} routerLink={user.requireInfo?<Link to='/client/editProfile'/>:<Link to="payment" />}>    پرداخت های من</MenuItem>

        <MenuItem hidden={roles.some((item: any) => item > 2) ? false : true} className='bg-light-success' icon={<MdOutlineAdminPanelSettings size='2rem' color='green' />} onClick={sideChanger}>    ورود به پنل ادمین</MenuItem>


        <MenuItem className='bg-light-danger' icon={<ImExit size='2rem' color='red' />} routerLink={<Link to='/logout'></Link>}  > خروج از سامانه</MenuItem>




      </Menu>


    </Sidebar>
  )
}

export default ClientSideNavbar