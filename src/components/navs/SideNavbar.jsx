import React, { useEffect, useState,useRef } from 'react';
import { useSelector } from 'react-redux';
import { Menu, MenuItem, ProSidebar, SubMenu, SidebarContent, SidebarHeader } from 'react-pro-sidebar';
import {FaWarehouse, FaRegHandshake, FaUserCog, FaCashRegister, FaShippingFast} from 'react-icons/fa';
import { FiUsers } from 'react-icons/fi';
import { BsReceiptCutoff, BsBoxSeam } from 'react-icons/bs';
import { RiShipLine, RiDashboardLine } from 'react-icons/ri'
import { GiMineTruck } from 'react-icons/gi';
import { MdSupportAgent } from 'react-icons/md';
import { IoReloadCircleSharp, IoSettingsOutline } from 'react-icons/io5';
import { CgFileDocument } from 'react-icons/cg';
import { TbTransferOut } from 'react-icons/tb';
import { IoIosPeople } from 'react-icons/io';
import './styles.css';
import { Link, NavLink } from 'react-router-dom';

import { Spinner } from 'react-bootstrap';
import UpdateAllShiping from './../../pages/adminpages/Shipping/updateShippingReports/UpdateAllShiping';







// public enum Roles
// {
//     Registered = 1,
//     Customer,
//     Admin,
//     SuperAdmin
// }



const SideNavbar = ({ collapsed, loading }) => {
  const handleHeaderClick = (event) => {

    event.stopPropagation();
  };
  const ref1 = useRef()
  const ref2 = useRef()
  const ref3 = useRef()
  const ref4 = useRef()
  const ref5 = useRef()
  const ref6 = useRef()
  const ref7 = useRef()
  const ref8 = useRef()
  const ref9 = useRef()
  const ref10 = useRef()
  const ref11 = useRef()
  const ref12 = useRef()
  const ref13 = useRef()
  const ref14 = useRef()
  const ref15 = useRef()
  const ref16=useRef()

  const roles = useSelector(state => state.userRole);
  const [show, setShow] = useState({
    item1: false,
    item2: false,
    item3: false,
    item4: false,
    item5: false,
    item6: false,
    item7: false,
    item8: false,
    item9: false,
    item10: false,
    item11: false,
    item12: false,
    item13: false,
    item14: false,
    item15: false,
    item16:false
  })



  useEffect(() => {
    const checkIfClickedOutside = e => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (show.item1 && ref1.current && !ref1.current.contains(e.target)) {
        setShow(false)
      }
      if (show.item2 && ref2.current && !ref2.current.contains(e.target)) {
        setShow(false)
      }
      if (show.item3 && ref3.current && !ref3.current.contains(e.target)) {
        setShow(false)
      }
      if (show.item4 && ref4.current && !ref4.current.contains(e.target)) {
        setShow(false)
      }
      if (show.item5 && ref5.current && !ref5.current.contains(e.target)) {
        setShow(false)
      }
      if (show.item6 && ref6.current && !ref6.current.contains(e.target)) {
        setShow(false)
      }
      if (show.item7 && ref7.current && !ref7.current.contains(e.target)) {
        setShow(false)
      }
      if (show.item8 && ref8.current && !ref8.current.contains(e.target)) {
        setShow(false)
      }
      if (show.item9 && ref9.current && !ref9.current.contains(e.target)) {
        setShow(false)
      } if (show.item10 && ref10.current && !ref10.current.contains(e.target)) {
        setShow(false)
      } if (show.item11 && ref11.current && !ref11.current.contains(e.target)) {
        setShow(false)
      } if (show.item12 && ref12.current && !ref12.current.contains(e.target)) {
        setShow(false)
      } if (show.item13 && ref13.current && !ref13.current.contains(e.target)) {
        setShow(false)
      } if (show.item14 && ref14.current && !ref14.current.contains(e.target)) {
        setShow(false)
      }if (show.item15 && ref15.current && !ref15.current.contains(e.target)) {
        setShow(false)
      }

    }
let el = document.getElementById("sidebar");
    el && el.addEventListener("click", checkIfClickedOutside);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("click", checkIfClickedOutside);
    }
  }, [show])


  if (loading) { return (<Spinner />) }
  else {
    return (

      <div className='sidebar-wrapper sidebar-theme ' id="sidbar">


        <ProSidebar
          rtl={true}
          collapsed={collapsed}
          style={{ alignItems: 'center' }}
        >

          <SidebarContent >
            <Menu   iconShape="square">

              <MenuItem   icon={<RiDashboardLine size={'2rem'} />} ><NavLink to='dashboard'>  داشبورد </NavLink></MenuItem>

              <SubMenu   hidden={roles.includes(1) ? false : true} icon={<FiUsers size={'2rem'} />} title="تکمیل اطلاعات" >
                <MenuItem  onClick={handleHeaderClick} icon={<i className="fa fa-align-justify" />}><NavLink to='identitypannel'> احراز هویت</NavLink></MenuItem>
                <MenuItem onClick={handleHeaderClick} icon={<i className="fa fa-upload" />}>  بارگزاری مدارک</MenuItem>
                <MenuItem onClick={handleHeaderClick} icon={<i className="fa fa-pencil-square" />}><NavLink to="editProfile" > ویرایش اطلاعات</NavLink></MenuItem>
              </SubMenu>
              <SubMenu ref={ref1}   open={show.item1 === true? true:false} onClick={() => setShow({...show , item1: !show.item1 ,item2: false , item3: false,item4: false,item5: false,item6: false,item7: false,item8: false,item9: false,item11: false,item12: false,item14: false,item13: false})} hidden={roles.includes(7) ? false : true} icon={<FiUsers size={'2rem'} />} title='کاربران'>


                    <MenuItem onClick={handleHeaderClick}><NavLink to='userlist'> لیست کاربران</NavLink></MenuItem>
                <MenuItem onClick={handleHeaderClick}><NavLink to='organizationlist'> لیست سازمان ها</NavLink></MenuItem>
                <MenuItem onClick={handleHeaderClick}><NavLink to='customergroup'>گروه ها</NavLink> </MenuItem>

              </SubMenu>
              
              <SubMenu  ref={ref3} open={show.item3 === true? true:false} onClick={() => setShow({...show , item3: !show.item3 , item1: false,item2: false,item4: false,item5: false,item6: false,item8: false,item9: false,item10: false,item7: false,item11: false,item12: false,item14: false,item13: false})} hidden={roles.includes(7)||roles.includes(6) ||roles.includes(3)? false : true} title='کالا' icon={<BsBoxSeam size={'2rem'} />}>
                <MenuItem onClick={handleHeaderClick}> <NavLink to='productList'> لیست کالاها</NavLink></MenuItem>
                <MenuItem onClick={handleHeaderClick}><NavLink to='productgroup'> گروه کالا</NavLink></MenuItem>
              </SubMenu>
              <SubMenu ref={ref4} open={show.item4 === true? true:false} onClick={() => setShow({...show , item4: !show.item4, item1: false,item3: false,item2: false,item5: false,item6: false,item8: false,item9: false,item10: false,item7: false,item11: false,item12: false,item14: false,item13: false})} hidden={roles.includes(7)||roles.includes(6)||roles.includes(3) ? false : true} title='انبار' icon={<FaWarehouse size={'2rem'} />}>
                <MenuItem onClick={handleHeaderClick}> <NavLink to='warehouselist'> لیست انبارها</NavLink></MenuItem>
                <MenuItem onClick={handleHeaderClick}> <NavLink to='warehousetypes'> گروه انبار</NavLink></MenuItem>



              </SubMenu>
              <SubMenu ref={ref5} open={show.item5 === true? true:false} onClick={() => setShow({...show , item5: !show.item5 , item1: false,item3: false,item4: false,item2: false,item6: false,item8: false,item9: false,item10: false,item7: false,item11: false,item12: false,item14: false,item13: false})} hidden={roles.includes(7) || roles.includes(6)||roles.includes(3)? false : true} title='تامین' icon={<RiShipLine size={'2rem'} />}>
              <MenuItem onClick={handleHeaderClick}><NavLink to="supplierList">لیست تامین کنندگان</NavLink></MenuItem>
                <MenuItem onClick={handleHeaderClick}><NavLink to="supply">لیست تامین </NavLink></MenuItem>
              </SubMenu>
              <SubMenu ref={ref6} open={show.item6 === true? true:false} onClick={() => setShow({...show , item6: !show.item6 , item1: false,item3: false,item4: false,item5: false,item2: false,item8: false,item9: false,item10: false,item7: false,item11: false,item12: false,item14: false,item13: false})}  hidden={roles.includes(7)||roles.includes(4) ||roles.includes(3) ? false : true} title='فروش' icon={<FaRegHandshake size='2rem' />}>
                <MenuItem onClick={handleHeaderClick}><NavLink to="productSupply">عرضه</NavLink></MenuItem>
                <MenuItem onClick={handleHeaderClick}> <NavLink to="orderList">سفارشات</NavLink></MenuItem>
                <MenuItem><NavLink to='/bazargah'>  بازارگاه </NavLink></MenuItem>

              </SubMenu>
              <SubMenu ref={ref7} open={show.item7 === true? true:false} onClick={() => setShow({...show , item7: !show.item7, item1: false,item3: false,item4: false,item5: false,item6: false,item8: false,item9: false,item10: false,item2: false,item11: false,item12: false,item14: false,item13: false})} hidden={roles.includes(7) ? false : true} title='تحویل کالا' icon={<GiMineTruck size='2rem' />}>

                {/* <MenuItem onClick={handleHeaderClick}>ثبت بارنامه و کسری سرک</MenuItem>
                <MenuItem onClick={handleHeaderClick}><NavLink to='/reportfromsql'> ترافیک بارگیری</NavLink></MenuItem> */}
                <MenuItem onClick={handleHeaderClick}  ><NavLink to='/shippingcompanyList'>لیست باربری</NavLink> </MenuItem>
                <MenuItem onClick={handleHeaderClick}  > <NavLink to='/ShippingContract'>لیست قرارداد باربری</NavLink></MenuItem>
                <SubMenu title='بروزرسانی باربری' onClick={handleHeaderClick}>
                <MenuItem onClick={handleHeaderClick} > <NavLink to='/updateShippingReports'> براساس تاریخ </NavLink></MenuItem>
                <MenuItem onClick={handleHeaderClick}><NavLink to='/updateAllShipping'> براساس حواله </NavLink></MenuItem>
                </SubMenu>
              </SubMenu>
              {/* <SubMenu ref={ref8} open={show.item8 === true? true:false} onClick={() => setShow({...show , item8: !show.item8 , item1: false,item3: false,item4: false,item5: false,item6: false,item2: false,item9: false,item10: false,item7: false,item11: false,item12: false,item14: false,item13: false})} hidden={roles.includes(7)||roles.includes(5) ? false : true} icon={<FaCashRegister size='2rem' />} title='حسابداری'>

              </SubMenu> */}
              <MenuItem hidden={roles.includes(7)||roles.includes(5) ? false : true} icon={<FaCashRegister size='2rem' />}>حسابداری</MenuItem>

            

              {/* <SubMenu ref={ref9} open={show.item9 === true? true:false } onClick={() => setShow({...show , item9: !show.item9 , item1: false,item3: false,item4: false,item5: false,item6: false,item8: false,item2: false,item10: false,item7: false,item11: false,item12: false,item14: false,item13: false})}  hidden={roles.includes(2) ? false : true} title="سفارش ها" icon={<BsReceiptCutoff size={'2rem'} />}> */}
              <MenuItem onClick={handleHeaderClick} hidden={roles.includes(2) ? false : true}  icon={<BsReceiptCutoff size={'2rem'} />}> <NavLink to="cuoList">سفارش ها</NavLink></MenuItem>

              {/* </SubMenu> */}
              {/* <SubMenu ref={ref10} open={show.item10 === true? true:false} onClick={() => setShow({...show , item10: !show.item10 , item1: false,item3: false,item4: false,item5: false,item6: false,item8: false,item9: false,item2: false,item7: false,item11: false,item12: false,item14: false,item13: false})}  hidden={roles.includes(2) ? false : true} icon={<TbTransferOut size='2rem' />} title='تحویل کالا'>
               
              </SubMenu> */}
              <MenuItem   hidden={roles.includes(2) ? false : true} icon={<FaCashRegister size='2rem' />} title='صورت حساب'>
              صورت حساب
              </MenuItem>
              <SubMenu ref={ref12} open={show.item12 === true? true:false} onClick={() => setShow({...show , item12: !show.item12 , item1: false,item3: false,item4: false,item5: false,item6: false,item8: false,item9: false,item10: false,item7: false,item2: false,item11: false,item13: false,item14: false  })}  hidden={(roles.includes(2) || roles.includes(7) || roles.includes(8)) ||roles.includes(5) ? false : true} icon={<MdSupportAgent size='2rem' />} title="پشتیبانی" >
              <MenuItem onClick={handleHeaderClick} hidden={roles.includes(7)||roles.includes(8)||roles.includes(5)?false:true}><NavLink to="user-news" >اطلاعیه و اعلان ها</NavLink></MenuItem>
              
              <MenuItem  onClick={handleHeaderClick}  icon={<i className="fa fa-plus-square" />} ><NavLink to='ticket'>لیست تیکت ها</NavLink></MenuItem>
                <MenuItem onClick={handleHeaderClick} hidden={roles.includes(2)||roles.includes(1)?false:true} icon={<i className="fa fa-align-justify" />} ><NavLink to='newTicket'>ثبت تیکت جدید </NavLink></MenuItem>

              </SubMenu>

              <SubMenu ref={ref13} open={show.item13 === true? true:false} onClick={() => setShow({...show , item13: !show.item13 , item1: false,item3: false,item4: false,item5: false,item6: false,item8: false,item9: false,item10: false,item7: false,item2: false,item11: false,item12: false,item14: false})}  hidden={ roles.includes(7) ? false : true} title='تنظیمات' icon={<IoSettingsOutline size='2rem' />}>

                <SubMenu  onClick={handleHeaderClick} title='تعاریف'>
                  <MenuItem onClick={handleHeaderClick} icon={<i className="fa fa-align-justify" />}> <NavLink to='createAttribute'>دسته بندی</NavLink></MenuItem>
                  <MenuItem onClick={handleHeaderClick} icon={<i className="fa fa-align-justify" />}> <NavLink to='creategroup'>گروه بندی</NavLink></MenuItem>

                </SubMenu>

              </SubMenu>
              <SubMenu ref={ref14} open={show.item14 === true? true:false} onClick={() => setShow({...show , item14: !show.item14 , item1: false,item3: false,item4: false,item5: false,item6: false,item8: false,item9: false,item10: false,item7: false,item2: false ,item11: false,item12: false,item13: false})}  icon={<FaUserCog size='2rem' />} title="حساب کاربری" >
                <MenuItem onClick={handleHeaderClick} icon={<i className="fa fa-hashtag" />} ><NavLink to='/userProfile'>اطلاعات کاربری</NavLink> </MenuItem>
                <MenuItem onClick={handleHeaderClick} icon={<i className="fa fa-share-square-o" />} > <NavLink to='/logout'>خروج از سامانه</NavLink></MenuItem>
              </SubMenu>

              {/* ... hiiii ..... */}
              <MenuItem hidden={roles.includes(1) ? false : true} icon={<CgFileDocument size={'2rem'} />} >تایید پروفایل</MenuItem>


            </Menu>
          </ SidebarContent>

        </ProSidebar>

      </div>


    );
  }
}
export default SideNavbar;
