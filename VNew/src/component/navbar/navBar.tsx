import {DropdownItem, DropdownMenu, DropdownToggle, NavLink, UncontrolledDropdown} from "reactstrap";
import React from "react";



interface Props {
    onclick:any
}

const NavTop:React.FC<Props> = ({onclick }) => {

    return (
        <nav className="navbar fixed-top">
        <div className="d-flex align-items-center navbar-left">
        <NavLink

            onClick={onclick}
    id="sidebar"
    to="#"
    className="menu-button  d-md-block"

    >
    <svg  viewBox="0 0 100 80" width="40" height="40">
    <rect width="80" height="3"></rect>
        <rect y="20" width="80" height="3"></rect>
        <rect y="40" width="80" height="3"></rect>
        </svg>
        </NavLink>
        <NavLink
    to="#"
    className="menu-button-mobile d-xs-block d-sm-block d-md-none"
        >
        </NavLink>


        </div>
        <NavLink className="navbar-logo" >
    <span className="logo d-none d-xs-block" />
    <span className="logo-mobile d-block d-xs-none" />
        </NavLink>

        <div className="navbar-right">
    <div className=" d-none d-md-inline-block align-middle mr-3 header-icons d-inline-block align-middle">
    <div className="position-relative d-none d-sm-inline-block">
    <button
        className="header-icon btn btn-empty d-none d-sm-inline-block"
    type="button"
    id="fullScreenButton"
        // onClick={toggleFullScreen}
        >
        {/*{isInFullScreen ? (*/}
    {/*) : (*/}
    <i className="simple-icon-size-fullscreen d-block" />
        {/*)}*/}
        </button>
        </div>
        <div className="position-relative d-none d-sm-inline-block">
    <button
        className="header-icon btn btn-empty d-none d-sm-inline-block"
    type="button"
    id="fullScreenButton"
        // onClick={toggleFullScreen}
        >
        {/*{isInFullScreen ? (*/}
        <i className="simple-icon-size-actual d-block" />
        {/*) : (*/}
    {/*)}*/}
    </button>
    </div>

    </div>
    <div className="user d-inline-block">
    <UncontrolledDropdown className="dropdown-menu-right">
    <DropdownToggle className="p-0" color="empty">
    <span className="name mr-1">فاطمه کاظمی زاده</span>
    <span>
    <img alt="Profile" src="/assets/img/profiles/l-1.jpg" />
        </span>
        </DropdownToggle>
        <DropdownMenu className="mt-3" end>
    <DropdownItem>حساب کاربری</DropdownItem>
    <DropdownItem>ویژگی ها</DropdownItem>
    <DropdownItem>تاریخچه</DropdownItem>
    <DropdownItem>پشتیبانی</DropdownItem>
    <DropdownItem divider />
    <DropdownItem >
        خروج از حساب
    </DropdownItem>
    </DropdownMenu>
    </UncontrolledDropdown>
    </div>
    </div>
    </nav>
);
}
export default NavTop