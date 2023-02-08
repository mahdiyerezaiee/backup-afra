import React, { Fragment, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import FooterClient from "./Footer/FooterClient";
import HeaderClient from "./Header/HeadrClient";
import ClientSideNavbar from "./../Nav/ClientSideNavbar";
import "./mainclient.css";
import { useDispatch } from "react-redux";
import { GetUserInfo, GetUsersRoles } from "../../services/userService";
import { addUser } from "../../store/Slice/user/userSlice";
import { userRoles } from "../../store/Slice/user/userRole/userRoleSlice";
import { GetCompanyChild } from "../../services/companiesService";
import { AllCompanies } from "../../store/Slice/companies/companySlice";
import OrderCustomer from "../Order/Component/OrderCustomer";
import HeaderClientMian from "./Header/headerClientMian";
import OrderDetailTest from "../Order/Component/customerOrderDetailTest";
import Ticket from "../Ticket/ticket_v2";
import NewTicket from "../Ticket/newTicket";
import UserProfile from "../../Common/Shared/Profile/userProfile";
import EditProfile from "../../Common/Shared/Profile/editProfile";
import EditAddress from "../../Common/Shared/Profile/editAddress";
import DashbordCustomer from "../Dashboard/Component/dashbordCustomer";
import InvoiceCreator from "../../Utils/invoiceCreator";

const ClientsMainLayout: React.FC = () => {
  const [collapsed, Setcollapsed] = useState(true);
  const refreshPage = () => {
    window.location.reload();
  };
  useEffect(() => {
    fetchApi();
   getUserRole();
    // getUserCompanies();
  }, []);

  const dispatch = useDispatch();
  async function fetchApi() {
    const { data, status } = await GetUserInfo();
    try {
      if (status === 200) {
        localStorage.setItem("connect", data.result.customer.id);
        localStorage.setItem("com", data.result.customer.companyId);
        
        dispatch(addUser(data.result.customer));
      }
    } catch (error) {
      refreshPage();
    }
  }
  document.body.classList.add('clientBody')

  const getUserRole = async () => {
    localStorage.removeItem('rd')
    const { data, status } = await GetUsersRoles();
    try {
      if (status === 200) {
        dispatch(userRoles(data.result.userRoleIds));
      }
    } catch (error) {
      refreshPage();
    }
  };

  const getUserCompanies = async () => {
    const { data, status } = await GetCompanyChild();
    if (status === 200) {
      dispatch(AllCompanies(data.result.companies));
    }
  };

  return (
    <Fragment>
      <div className="headerClient">
        {" "}
        <HeaderClient collapsed={collapsed} />
        <HeaderClientMian />
      </div>

      <div className="hero-section style-2">
        <div
          className="bg_img hero-bg bottom_center"
          data-background="./hero-bg.png"
        ></div>
      </div>
      <section className="dashboard-section padding-bottom mt--240 mt-lg--440 pos-rel">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-sm-10 col-md-7 col-lg-3">
              <ClientSideNavbar />
            </div>
            <div className=" col-lg-9">
              <Routes>
                <Route path="/" element={<DashbordCustomer />} />
                {/* Sales&Order&Bazargah*/}

                <Route path="orderlist" element={<OrderCustomer />} />
                <Route path="orderDetail/:id" element={<OrderDetailTest />} />
                <Route path='invoice/:id' element={<InvoiceCreator closeModal={null} />} />

                {/* Ticket*/}

                <Route path="ticket" element={<Ticket />} />
                <Route path="newTicket" element={<NewTicket />} />
                {/* Profile*/}

                <Route path="userProfile" element={<UserProfile />} />
                <Route path="editProfile" element={<EditProfile />} />
                <Route path="editAddress/:id" element={<EditAddress />} />
              </Routes>
            </div>
          </div>
        </div>
      </section>
      <FooterClient />
    </Fragment>
  );
};

export default ClientsMainLayout;
