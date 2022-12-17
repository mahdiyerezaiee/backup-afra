import { Nav, NavItem} from "reactstrap";
import PerfectScrollbar from 'react-perfect-scrollbar';
// import {NavLink} from "react-bootstrap";
import {MdKeyboardArrowDown} from "react-icons/md"
import menuItems from '../../constants/menu';
import React, {Dispatch, SetStateAction, useState} from "react";
import {NavLink} from "react-router-dom"
import {ProSidebarProvider} from "react-pro-sidebar";
interface Props {
    show:boolean,
    showSubMenu:boolean,
    setShowSubMenu: Dispatch<SetStateAction<boolean>>
}
const Sidebar:React.FC<Props> = ({show , showSubMenu , setShowSubMenu}) => {
    const [selectedParentMenu , setSelectedParentMenu]=useState<number>(0)
    const [activeId , setActive]=useState<boolean>(false)
    const [showMore , setShowMore] = useState<boolean>(false)


const submemuHandler = (id :number ) => {

        if (!show){
            setShowSubMenu(false)

        }
if (showMore){
    setShowSubMenu(true)

}
    setShowSubMenu(true)
    setSelectedParentMenu(id)
    setActive(false)
}
const activeHandel = ( id :number) => {
setShowSubMenu(false)
    setActive(true)
    setSelectedParentMenu(id)

}

    return (
        <div className="sidebar"   style={{ right: show ? "0px" : "-20rem",}}>
            {/*{show &&(*/}

            <div className="main-menu border" style={{borderRadius: showSubMenu === true? "0" : " 0.75rem 0 0 0.75rem" , boxShadow:showSubMenu === true? "none": "0 3px 30px rgb(0 0 0 / 10%), 0 3px 20px rgb(0 0 0 / 10%)" }} >
                <div className="scroll" id="menu"   >


                    <PerfectScrollbar
                        options={{suppressScrollX: true, wheelPropagation: true}}
                    >

                        <ProSidebarProvider>


                            <Nav className="list-unstyled nav flex-column "   >

                            {menuItems.map((item:any , index)=>
                            <NavItem   className={  !item.subs && activeId && selectedParentMenu === item.id ? "nav-item active " : selectedParentMenu === item.id ? "nav-item active ":" nav-item"} key={`${item.d}_${index}`}>
                                {!item.subs ?
                                    <NavLink className="underline-content" onClick={()=>activeHandel(item.id)} to={item.to}>
                                            <i className={item.icon}></i>
                                            <span>{item.name}</span></NavLink>:
                                <a onClick={()=>submemuHandler(item.id)}  aria-current="page" className="active"  >
                                    <i className={item.icon}></i>
                                    <span>{item.name}</span>
                                   </a>

                                    }
                            </NavItem>

                            )}
                            </Nav>

                        </ProSidebarProvider>
                    </PerfectScrollbar>
                </div>
            </div>
                    {/*)}*/}

              <div  className="sub-menu" style={{ right:    showSubMenu ? "118px" : "-20rem"}} >
                    <div className="scroll">

                        {menuItems && menuItems.map((item:any) =>
                            <Nav className=" nav d-block  " key={item.id}>

                                {item.subs && item.subs.filter((subs :any) => subs.id === selectedParentMenu).map((subs :any, index :number) =>
!subs.subs ?
                                    <NavItem className="m-2" key={`${subs.id}_${index}_${item.id}`}>
                                        <NavLink to={subs.to} >
                                            <i className={subs.icon}></i>
                                            <span> {subs.name}</span>
                                        </NavLink>
                                    </NavItem>:
    <NavItem>
    <a className="rotate-arrow-icon opacity-50 m-2" key={`${subs.id}_${index}_${item.id}`}>

            <i className={subs.icon}></i>
        <MdKeyboardArrowDown style={{float:'left'}} size='2rem'/>

<span>{subs.name}</span>
    </a>
                                    <div className="collapsed show">
                                {subs.subs.map((i:any)=>
                                    <NavItem  className="m-2 px-3" key={`${i.id}_${index}_${item.id}`}>
                                    <NavLink to={i.to} >
                                    <i className={i.icon}></i>
                                    <span> {i.name}</span>
                                    </NavLink>
                                    </NavItem>
                                    )}
                                    </div></NavItem>

                                )}
                            </Nav>
                        ) }

                    </div>
                </div>


        </div>

    )

}
export default Sidebar