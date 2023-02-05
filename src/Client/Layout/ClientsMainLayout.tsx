import React, {Fragment, useEffect, useState} from 'react'
import { Routes, Route } from 'react-router-dom';
import FooterClient from './Footer/FooterClient';
import HeaderClient from './Header/HeadrClient';
import ClientSideNavbar from './../Nav/ClientSideNavbar';
import "./mainclient.css"
import {useDispatch} from "react-redux";
import {GetUserInfo, GetUsersRoles} from "../../services/userService";
import {addUser} from "../../store/Slice/user/userSlice";
import {userRoles} from "../../store/Slice/user/userRole/userRoleSlice";
import {GetCompanyChild} from "../../services/companiesService";
import {AllCompanies} from "../../store/Slice/companies/companySlice";
import OrderCustomer from "../Order/Component/OrderCustomer"
import HeaderClientMian from './Header/headerClientMian';





const ClientsMainLayout: React.FC = () => {
    const [collapsed, Setcollapsed] = useState(true)
    const refreshPage = () => {
        window.location.reload();
    }
    useEffect(() => {
        fetchApi();
        getUserRole();
        getUserCompanies()
    }, [])
    const dispatch = useDispatch();
    async function fetchApi() {
        const { data, status } = await GetUserInfo();
        try {
            if (status === 200) {
                localStorage.setItem('connect', data.result.customer.id)
                localStorage.setItem('com',data.result.customer.companyId)
                dispatch(addUser(data.result.customer));
            }
        } catch (error) {

            refreshPage()

        }

    }

    const getUserRole = async () => {


        const { data, status } = await GetUsersRoles()
        try {
            if (status === 200) {
                dispatch(userRoles(data.result.userRoleIds))


            }
        } catch (error) {


            refreshPage()

        }


    }

    const getUserCompanies=async()=>{
        const {data,status}=await GetCompanyChild()
        if(status===200){

            dispatch(AllCompanies(data.result.companies))
        }
    }

    return (
        <Fragment>

            <HeaderClient collapsed={collapsed} />
            <HeaderClientMian/>
            <div className="main-container-Client" id="container-Client">
                <ClientSideNavbar />
                <div id="content-Client" className="main-content-Client main-Layout-Client">
                    <div className="layout-px-spacing">
                        <div className="row layout-top-spacing">
                            <div className="col-xl-12 col-lg-12 col-md-12 col-12 layout-spacing">
                                <Routes>
                                                      {/* Sales&Order&Bazargah*/}

                                <Route path='coulist' element={<OrderCustomer />} />
                                </Routes>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <FooterClient />
        </Fragment>
    )
}

export default ClientsMainLayout