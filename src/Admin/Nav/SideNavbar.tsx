import React, { useRef, useState, FormEvent ,useEffect} from 'react'
import { Menu, MenuItem, Sidebar, SubMenu, useProSidebar } from 'react-pro-sidebar'
import { FaWarehouse, FaRegHandshake, FaUserCog, FaCashRegister, FaShippingFast } from 'react-icons/fa';
import { FiUsers } from 'react-icons/fi';
import { BsReceiptCutoff, BsBoxSeam, BsWindowSidebar } from 'react-icons/bs';
import { RiShipLine, RiDashboardLine } from 'react-icons/ri'
import { GiMineTruck } from 'react-icons/gi';
import { MdSupportAgent } from 'react-icons/md';
import { NavLink,Link } from 'react-router-dom';
import { CgFileDocument } from 'react-icons/cg';
import { TbReport } from 'react-icons/tb';
import { IoSettingsOutline } from 'react-icons/io5'

import { useSelector } from 'react-redux';
import { RootState } from '../../store';

require('./styles.css')

const SideNavbar: React.FC = () => {
    

   const [width,setWidth]=useState(window.innerWidth)
   const { collapseSidebar } = useProSidebar();
   const getSize=()=>{
     setWidth(window.innerWidth)
   }
   useEffect(()=>{

window.addEventListener('resize',getSize)

   },[])
    const roles = useSelector((state: RootState) => state.roles)

    

    const handleHeaderClick = (event: any) => {

        if(width<600){

            collapseSidebar()
        }
        event.stopPropagation();
    };
    const ref1 = useRef<HTMLLIElement>(null)
    const ref2 = useRef<HTMLLIElement>(null)
    const ref3 = useRef<HTMLLIElement>(null)
    const ref4 = useRef<HTMLLIElement>(null)
    const ref5 = useRef<HTMLLIElement>(null)
    const ref6 = useRef<HTMLLIElement>(null)
    const ref7 = useRef<HTMLLIElement>(null)
    const ref8 = useRef<HTMLLIElement>(null)
    const ref9 = useRef<HTMLLIElement>(null)
    const ref10 = useRef<HTMLLIElement>(null)
    const ref11 = useRef<HTMLLIElement>(null)
    const ref12 = useRef<HTMLLIElement>(null)
    const ref13 = useRef<HTMLLIElement>(null)
    const ref14 = useRef<HTMLLIElement>(null)
    const ref15 = useRef<HTMLLIElement>(null)
    const ref16 = useRef<HTMLLIElement>(null)

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
        item16: false
    })


    return (
        <Sidebar defaultCollapsed={true} rtl={true} className="admin-sideBar"  >

            <Menu  >

                <MenuItem icon={<RiDashboardLine size={'2rem'} />} routerLink={<Link to="/admin" />}  onClick={handleHeaderClick}>داشبورد</MenuItem>

                {/* <SubMenu hidden={roles.includes(1) ? false : true} icon={<FiUsers size={'2rem'} />} label="تکمیل اطلاعات" >
                    <MenuItem onClick={handleHeaderClick} icon={<i className="fa fa-align-justify" />}><NavLink to='identitypannel'> احراز هویت</NavLink></MenuItem>
                    <MenuItem onClick={handleHeaderClick} icon={<i className="fa fa-upload" />}>  بارگزاری مدارک</MenuItem>
                    <MenuItem onClick={handleHeaderClick} icon={<i className="fa fa-pencil-square" />}><NavLink to="editProfile" > ویرایش اطلاعات</NavLink></MenuItem>
                </SubMenu> */}
                <SubMenu ref={ref1} open={show.item1 === true ? true : false} onClick={() => setShow({ ...show, item1: !show.item1, item2: false, item3: false, item4: false, item5: false, item6: false, item7: false, item8: false, item9: false, item11: false, item12: false, item14: false, item13: false, item16: false })} hidden={roles.includes(7) || roles.includes(8) ? false : true} icon={<FiUsers size={'2rem'} />} label='کاربران'>


                    <MenuItem onClick={handleHeaderClick}><NavLink to='userlist'> لیست کاربران</NavLink></MenuItem>
                    <MenuItem onClick={handleHeaderClick}><NavLink to='customergroup'>گروه کاربران</NavLink> </MenuItem>

                    <MenuItem onClick={handleHeaderClick}><NavLink to='organizationlist'> لیست سازمان ها</NavLink></MenuItem>

                </SubMenu>

                <SubMenu ref={ref3} open={show.item3 === true ? true : false} onClick={() => setShow({ ...show, item3: !show.item3, item1: false, item2: false, item4: false, item5: false, item6: false, item8: false, item9: false, item10: false, item7: false, item11: false, item12: false, item14: false, item13: false, item16: false })} hidden={roles.includes(7) || roles.includes(6) || roles.includes(3) || roles.includes(8) ? false : true} label='کالا' icon={<BsBoxSeam size={'2rem'} />}>
                    <MenuItem onClick={handleHeaderClick}> <NavLink to='productList'> لیست کالاها</NavLink></MenuItem>
                    <MenuItem onClick={handleHeaderClick}><NavLink to='productgroup'> گروه کالا</NavLink></MenuItem>
                </SubMenu>
                <SubMenu ref={ref4} open={show.item4 === true ? true : false} onClick={() => setShow({ ...show, item4: !show.item4, item1: false, item3: false, item2: false, item5: false, item6: false, item8: false, item9: false, item10: false, item7: false, item11: false, item12: false, item14: false, item13: false, item16: false })} hidden={roles.includes(7) || roles.includes(6) || roles.includes(3) || roles.includes(8) ? false : true} label='انبار' icon={<FaWarehouse size={'2rem'} />}>
                    <MenuItem onClick={handleHeaderClick}> <NavLink to='warehouselist'> لیست انبارها</NavLink></MenuItem>
                    <MenuItem onClick={handleHeaderClick}> <NavLink to='warehousetypes'> گروه انبار</NavLink></MenuItem>



                </SubMenu>
                <SubMenu ref={ref5} open={show.item5 === true ? true : false} onClick={() => setShow({ ...show, item5: !show.item5, item1: false, item3: false, item4: false, item2: false, item6: false, item8: false, item9: false, item10: false, item7: false, item11: false, item12: false, item14: false, item13: false, item16: false })} hidden={roles.includes(7) || roles.includes(6) || roles.includes(3) || roles.includes(8) ? false : true} label='تامین' icon={<RiShipLine size={'2rem'} />}>
                    <MenuItem onClick={handleHeaderClick} ><NavLink to="supplierList">لیست تامین کنندگان</NavLink></MenuItem>
                    <MenuItem onClick={handleHeaderClick}><NavLink to="supply">لیست تامین </NavLink></MenuItem>
                </SubMenu>
                <SubMenu ref={ref6} open={show.item6 === true ? true : false}  onClick={() => setShow({ ...show, item6: !show.item6, item1: false, item3: false, item4: false, item5: false, item2: false, item8: false, item9: false, item10: false, item7: false, item11: false, item12: false, item14: false, item13: false, item16: false })} hidden={roles.includes(7) || roles.includes(4) || roles.includes(3) || roles.includes(8) ? false : true} label='فروش' icon={<FaRegHandshake size='2rem' />}>
                    <MenuItem onClick={handleHeaderClick}><NavLink to="productSupply" >عرضه</NavLink></MenuItem>
                    <MenuItem onClick={handleHeaderClick}> <NavLink to="orderList">سفارشات</NavLink></MenuItem>
                    <MenuItem hidden={roles.includes(7) || roles.includes(8) ? false : true} onClick={handleHeaderClick}> <NavLink to="addOrder">ثبت سفارش</NavLink></MenuItem>
                    <MenuItem hidden={roles.includes(7) || roles.includes(8) ? false : true} onClick={handleHeaderClick}> <NavLink to="InvoiceList">صورتحساب</NavLink></MenuItem>
                    <MenuItem hidden={roles.includes(7) || roles.includes(8) ? false : true} onClick={handleHeaderClick}> <NavLink to="PaymentLists">پرداخت ها</NavLink></MenuItem>
                    <MenuItem hidden={roles.includes(7) || roles.includes(8) ? false : true} onClick={handleHeaderClick}> <NavLink to="Credits">گروه اعتباری</NavLink></MenuItem>


                    <MenuItem><NavLink to='bazargah'>  بازارگاه </NavLink></MenuItem>

                </SubMenu>

                <SubMenu  hidden={roles.includes(7) || roles.includes(8) ? false : true} icon={<TbReport size={'2rem'} />} ref={ref16} open={show.item16 === true ? true : false} onClick={() => setShow({ ...show, item16: !show.item16, item1: false, item3: false, item4: false, item5: false, item6: false, item8: false, item9: false, item10: false, item2: false, item11: false, item12: false, item14: false, item13: false, item7: false })} label="گزارشات">
                    <MenuItem onClick={handleHeaderClick}  ><NavLink to='ShippingReport'> گزارش  تخصیص و ارسال کالا</NavLink></MenuItem>
                    <MenuItem onClick={handleHeaderClick}  ><NavLink to='UsedBarBariReports'> گزارش بارنامه های صادر شده</NavLink> </MenuItem>
                    <MenuItem onClick={handleHeaderClick}  > <NavLink to='CustomersReports'> گزارش مشتریان</NavLink></MenuItem>
                    {/* <MenuItem onClick={handleHeaderClick}  > <NavLink to='OrdersReports'>سفارشات</NavLink> </MenuItem> */}
                    {/* <MenuItem onClick={handleHeaderClick}  > <NavLink to='ProceessAttachments'>اعتبار و اسناد</NavLink> </MenuItem> */}

                </SubMenu>
                <SubMenu ref={ref7} open={show.item7 === true ? true : false} onClick={() => setShow({ ...show, item7: !show.item7, item1: false, item3: false, item4: false, item5: false, item6: false, item8: false, item9: false, item10: false, item2: false, item11: false, item12: false, item14: false, item13: false, item16: false })} hidden={roles.includes(7) || roles.includes(8) ? false : true} label='تحویل کالا' icon={<GiMineTruck size='2rem' />}>

                    {/* <MenuItem onClick={handleHeaderClick}>ثبت بارنامه و کسری سرک</MenuItem>
                <MenuItem onClick={handleHeaderClick}><NavLink to='/reportfromsql'> ترافیک بارگیری</NavLink></MenuItem> */}
                    <MenuItem onClick={handleHeaderClick}  ><NavLink to='shippingcompanyList'>لیست باربری</NavLink> </MenuItem>
                    <MenuItem onClick={handleHeaderClick}  > <NavLink to='ShippingContract'>لیست قرارداد باربری</NavLink></MenuItem>
                    
                        <MenuItem onClick={handleHeaderClick} > <NavLink to='updateShippingReports'>بروز رسانی باربری</NavLink></MenuItem>
                        
                    
                </SubMenu>
                {/* <SubMenu ref={ref8} open={show.item8 === true? true:false} onClick={() => setShow({...show , item8: !show.item8 , item1: false,item3: false,item4: false,item5: false,item6: false,item2: false,item9: false,item10: false,item7: false,item11: false,item12: false,item14: false,item13: false})} hidden={roles.includes(7)||roles.includes(5) ? false : true} icon={<FaCashRegister size='2rem' />} label='حسابداری'>

              </SubMenu> */}
                {/* <MenuItem hidden={roles.includes(7) || roles.includes(5) || roles.includes(8) ? false : true} icon={<FaCashRegister size='2rem' />} >حسابداری</MenuItem> */}
                
                {/* <MenuItem onClick={handleHeaderClick} hidden={roles.includes(2)?false:true } routerLink={<Link to='cuoList'/>} icon={<FaRegHandshake size={'2rem'} /> }>سفارش ها</MenuItem> */}
                


                {/*<MenuItem hidden={ false } icon={<FaCashRegister size='2rem' />} > w,vj pshf </MenuItem>*/}
                <SubMenu ref={ref12} open={show.item12 === true ? true : false} onClick={() => setShow({ ...show, item12: !show.item12, item16: false, item1: false, item3: false, item4: false, item5: false, item6: false, item8: false, item9: false, item10: false, item7: false, item2: false, item11: false, item13: false, item14: false })} hidden={(roles.includes(2) || roles.includes(7) || roles.includes(8)) || roles.includes(5) ? false : true} icon={<MdSupportAgent size='2rem' />} label="پشتیبانی" >
                    <MenuItem onClick={handleHeaderClick} hidden={roles.includes(7) || roles.includes(8) || roles.includes(5) ? false : true}><NavLink to="user-news" >اطلاعیه و اعلان ها</NavLink></MenuItem>
                    <MenuItem onClick={handleHeaderClick} routerLink={<Link to='ticket'></Link>} >لیست تیکت ها</MenuItem>
                    {/* <MenuItem onClick={handleHeaderClick} hidden={roles.includes(2) || roles.includes(1) ? false : true}  routerLink={<Link to='newTicket'></Link>}>ثبت تیکت جدید </MenuItem> */}

                </SubMenu>

                <SubMenu ref={ref13} open={show.item13 === true ? true : false} onClick={() => setShow({ ...show, item13: !show.item13, item1: false, item16: false, item3: false, item4: false, item5: false, item6: false, item8: false, item9: false, item10: false, item7: false, item2: false, item11: false, item12: false, item14: false })} hidden={roles.includes(7) || roles.includes(8) ? false : true} label='تنظیمات' icon={<IoSettingsOutline size='2rem' />}>

                    <SubMenu onClick={handleHeaderClick} label='تعاریف'>
                        <MenuItem onClick={handleHeaderClick} > <NavLink to='createAttribute'>دسته بندی</NavLink></MenuItem>
                        <MenuItem onClick={handleHeaderClick} > <NavLink to='creategroup'>گروه بندی</NavLink></MenuItem>

                    </SubMenu>

                </SubMenu>
                <SubMenu ref={ref14} open={show.item14 === true ? true : false} onClick={() => setShow({ ...show, item14: !show.item14, item1: false, item16: false, item3: false, item4: false, item5: false, item6: false, item8: false, item9: false, item10: false, item7: false, item2: false, item11: false, item12: false, item13: false })} icon={<FaUserCog size='2rem' />} label="حساب کاربری" >
                    <MenuItem onClick={handleHeaderClick} icon={<i className="fa fa-hashtag" />} ><NavLink to='/client/userProfile'>اطلاعات کاربری</NavLink> </MenuItem>
                    <MenuItem onClick={handleHeaderClick} icon={<i className="fa fa-share-square-o" />} > <NavLink to='/logout'>خروج از سامانه</NavLink></MenuItem>
                </SubMenu>

                {/* ... hiiii ..... */}
                <MenuItem hidden={roles.includes(1) ? false : true} icon={<CgFileDocument size={'2rem'} />} >تایید پروفایل</MenuItem>


            </Menu>

        </Sidebar>
    )
}

export default SideNavbar