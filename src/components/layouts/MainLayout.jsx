import React, { Fragment, useState, useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Footer from '../common/Footer';
import SideNavbar from '../navs/SideNavbar';
import Header from './../common/Header';
import IdentityPannel from './../IdentityRegister/IdentityPannel';
import AddresForm from './../IdentityRegister/AddresForm';
import PersonIdetity from './../IdentityRegister/PersonIdetity';
import PersonBankAccount from './../IdentityRegister/PersonBankAccount';
import { GetUserInfo, GetUsersRoles } from './../../services/userService';
import { addUserInfo, addUserRoles } from '../../actions/user';
import { useDispatch, useSelector } from 'react-redux';
import ProductList from '../../pages/adminpages/product/ProductList';
import NewProduct from './../../pages/adminpages/product/NewProduct';
import NewWareHouse from '../../pages/adminpages/wareHouse/NewWareHouse';
import WareHouseList from '../../pages/adminpages/wareHouse/WareHouseList';
import UserList from './../../pages/adminpages/users/UserList';

import UserProfile from './../../pages/profile/userProfile';
import EditProfile from './../../pages/profile/editProfile';
import EditProduct from "../../pages/adminpages/product/editProduct";
import EditWareHouse from "../../pages/adminpages/wareHouse/EditWareHouse";
import AttributeCreator from './../../pages/adminpages/setting/AttributeCreator';
import NewsAdmin from "../../pages/adminpages/news/newsAdmin";
import NewNews from "../../pages/adminpages/news/NewNews"
import EditNews from "../../pages/adminpages/news/editNews"
import ProductGroup from './../../pages/adminpages/product/ProductGroup';
import NewProductGroup from '../../pages/adminpages/product/NewProductGroup';
import EditUserRole from './../../pages/adminpages/users/editUserRole';
import ProductSupply from './../../pages/adminpages/sales/productSupply/ProductSupplyList';
import AddProductSupplyToSalesBoard from './../../pages/adminpages/sales/productSupply/AddProductSupplyToSalesBoard';
import TicketList from './../../pages/ticket/ticketList';
import NewTicket from './../../pages/ticket/newTicket';
import Message from './../../pages/ticket/message';
import { CustomersGroup } from './../../pages/adminpages/customers/CustomersGroup';
import CustomersList from './../../pages/adminpages/customers/CustomersList';
import NewCustomerGroup from './../../pages/adminpages/customers/NewCustomerGroup';
import QlickViewReport from './../../pages/adminpages/transport/QlickViewReport';
import BazargahList from './../../pages/adminpages/sales/Bazargah/BazargahList';
import Setting from './../../pages/setting/setting';
import Dashboard from './../common/Dashboard';

import ProductSupplyEdit from '../../pages/adminpages/sales/productSupply/ProductSupplyEdit';
import EditUserInfo from './../../pages/adminpages/users/editUserInfo';
import AddNewUser from './../../pages/adminpages/users/addNewUser';
import EditCustomerGroup from './../../pages/adminpages/customers/EditCustomerGroup';
import OrderList from './../../pages/order/orderList';
import OrderDetail from './../../pages/order/orderDetail';
import NewsPage from './../../pages/news/newsPage';
import SupplierList from './../../pages/adminpages/supply/SupplierList';
import NewSupplier from './../../pages/adminpages/supply/NewSupplier';
import EditSupplier from './../../pages/adminpages/supply/EditSupplier';
import NewSupply from '../../pages/adminpages/supply/NewSupply';
import NewsList from "../../pages/news/NewsList";
import SupplyList from './../../pages/adminpages/supply/SupplyList';
import GroupCreator from './../../pages/adminpages/setting/GroupCreator';
import EditeSupply from '../../pages/adminpages/supply/EditSupply';
import EditProductGroup from '../../pages/adminpages/product/EditProductGroup';
import OrganizationList from '../../pages/adminpages/organizations/OrganizationList';
import NewOrganizaion from './../../pages/adminpages/organizations/NewOrganizaion';
import EditOrganizaion from './../../pages/adminpages/organizations/EditOrganization';
import WareHouseType from '../../pages/adminpages/wareHouse/WareHouseType';
import NewWareHouseType from '../../pages/adminpages/wareHouse/NewWareHouseType';
import EditWareHouseType from '../../pages/adminpages/wareHouse/EditWareHouseType';
import EditCustomer from "../../pages/adminpages/customers/EditCustomer";
import Logout from './../login/Logout';
import ShippingCompanyList from "../../pages/adminpages/Shipping/ShippingCompany/ShippingCompanyList";
import NewShippingCompany from "../../pages/adminpages/Shipping/ShippingCompany/ShippimgCompanyNew";
import ShippingContractList from "../../pages/adminpages/Shipping/ShippingContracts/ShippingContractList";
import NewShippingContract from "../../pages/adminpages/Shipping/ShippingContracts/ShippingContractNew";
import EditShippingContract from "../../pages/adminpages/Shipping/ShippingContracts/ShippingContractEdit";
import EditShippingCompany from './../../pages/adminpages/Shipping/ShippingCompany/ShippingCompanyEdit';
import EditCustomerGroupName from './../../pages/adminpages/customers/EditCustomerGroupName';
import EditProductGroupName from './../../pages/adminpages/product/EditProductGroupName';
import EditWareHouseTypeName from './../../pages/adminpages/wareHouse/EditWareHouseTypeName';
import OrderCustomer from '../../pages/customerpages/OrderCustomer';
import NotFound from "../common/notFound";
import UpdateShippingReports from "../../pages/adminpages/Shipping/updateShippingReports/updateShippingReports";
import OrderDetailTest from './../../pages/order/orderDetailtest2';
import CustomerOrderDetailTest from './../../pages/customerpages/customerOrderDetailTest';
import UpdateAllShiping from '../../pages/adminpages/Shipping/updateShippingReports/UpdateAllShiping';
import EditAddress from "../../pages/profile/editAddress";
import ProceessAttachments from "../../pages/adminpages/report/ProceessAttachments";
import UsedBarBariReport from "../../pages/adminpages/report/UsedBarBariReports";
import CustomerReports from "../../pages/adminpages/report/CustomersReports";
import OrdersReports from "../../pages/adminpages/report/OrdersReports";
import DetailCustomerAttachment from "../../pages/adminpages/report/DetailCustomerAttachment";
import AddOrder from "../../pages/order/addOrder";
import ShippingList from "../../pages/adminpages/Shipping/ShippingList";
const MainLayout = (props) => {
  const [isloading, setIsloading] = useState(true);
  const navigate = useNavigate();
  const refreshPage = () => {
    window.location.reload();
  }
  const dispatch = useDispatch();
  async function fetchApi() {
    const { data, status } = await GetUserInfo();
    if (status === 200) {
      dispatch(addUserInfo(data.result.customer));
    }
  }
  const userInfo = useSelector(state => state.userInfo);
  const id = userInfo.id;
  const getRole = async () => {
    try {
      const { data, status } = await GetUsersRoles(localStorage.getItem('connect'));
      if (status === 200) {
        dispatch(addUserRoles(data.result.userRoleIds));
        setIsloading(false);
      }
    } catch (error) {
      refreshPage();
      console.log(error)
    }
  }

  useEffect(() => {
    fetchApi();
    getRole();
    }, [])

  const [collapsed, setCollapsed] = useState(true);
  const handleCollapsedChange = (checked) => {
    setCollapsed(!collapsed);
  };

  return (
    <Fragment>

      <Header collapsed={collapsed} handelChange={handleCollapsedChange} />
      <div className="main-container" id="container">
        <SideNavbar collapsed={collapsed} loading={isloading} />
        <div id="content" className="main-content main-Layout">
          <div className="layout-px-spacing">
            <div className="row layout-top-spacing">
              <div className="col-xl-12 col-lg-12 col-md-12 col-12 layout-spacing">
                <Routes>
                  <Route path="404" element={<NotFound />} />
                  <Route path="*" element={<Navigate to="/404" replace />} />
                  {/* dashboard */}

                  <Route path='dashboard' element={<Dashboard />} />
                  <Route path='/' element={<Navigate to="dashboard" replace />} />


                  {/* useORCustomer  Oganizations*/}

                  <Route path='userProfile' element={<UserProfile />} />
                  <Route path='editProfile' element={<EditProfile />} />
                  <Route path='editAddress/:id' element={<EditAddress />} />
                  <Route path='identitypannel' element={<IdentityPannel />} />
                  <Route path='addresform' element={<AddresForm />} />
                  <Route path='personidentity' element={<PersonIdetity />} />
                  <Route path='personBankAccount' element={<PersonBankAccount />} />
                  <Route path='userlist' element={<UserList />} />
                  <Route path='editInfo/:id' element={<EditUserInfo />} />
                  <Route path='adduser' element={<AddNewUser />} />
                  <Route path='editrole/:id' element={<EditUserRole />} />
                  <Route path='editcustomergroup/:id' element={<EditCustomerGroup />} />
                  <Route path='editcustomergroupName/:id' element={<EditCustomerGroupName />} />
                  <Route path='customergroup' element={<CustomersGroup />} />
                  <Route path='editCustumer/:id' element={<EditCustomer />} />
                  <Route path='customerlist' element={<CustomersList />} />
                  <Route path='newcustomergroup' element={<NewCustomerGroup />} />
                  <Route path='organizationlist' element={<OrganizationList />} />
                  <Route path='addorganization' element={<NewOrganizaion />} />
                  <Route path='editorganization/:id' element={<EditOrganizaion />} />

                  {/* PRODUCT */}
                  <Route path='productList' element={<ProductList />} />
                  <Route path='productgroup' element={<ProductGroup />} />
                  <Route path='editproductgroup/:id' element={<EditProductGroup />} />
                  <Route path='EditProductGroupName/:id' element={<EditProductGroupName />} />
                  <Route path='newproductgroup' element={<NewProductGroup />} />
                  <Route path='newproduct' element={<NewProduct />} />
                  <Route path='editproduct/:id' element={<EditProduct />} />

                  {/* WareHouse */}


                  <Route path='newwarehouse' element={<NewWareHouse />} />
                  <Route path='warehouselist' element={<WareHouseList />} />
                  <Route path='editwarehouse/:id' element={<EditWareHouse />} />
                  <Route path='warehousetypes' element={<WareHouseType />} />
                  <Route path='newwarehousetype' element={<NewWareHouseType />} />
                  <Route path='editwarehousetype/:id' element={<EditWareHouseType />} />
                  <Route path='EditWareHouseTypeName/:id' element={<EditWareHouseTypeName />} />

                  {/*Attributes */}

                  <Route path='createAttribute' element={<AttributeCreator />} />
                  <Route path='creategroup' element={<GroupCreator />} />


                  {/* News */}

                  <Route path='user-news' element={<NewsAdmin />} />
                  <Route path='newNews' element={<NewNews />} />
                  <Route path='editNews/:id' element={<EditNews />} />
                  <Route path='newsList' element={<NewsList />} />
                  <Route path='news/:id' element={<NewsPage />} />

                  {/* Sales&Order&Bazargah*/}

                  <Route path='editproductsupply/:id' element={<ProductSupplyEdit />} />
                  <Route path='productSupply' element={<ProductSupply />} />
                  <Route path='newProductsupply' element={<AddProductSupplyToSalesBoard />} />
                  <Route path='orderList' element={<OrderList />} />
                  <Route path='addOrder' element={<AddOrder />} />
                  <Route path='orderDetail/:id' element={<OrderDetailTest />} />
                  <Route path='bazargah' element={<BazargahList />} />
                  <Route path='cuoList' element={<OrderCustomer />} />

                  <Route path='cuoDetail/:id' element={<CustomerOrderDetailTest />} />







                  {/* Ticket */}


                  <Route path='ticket' element={<TicketList />} />
                  <Route path='newTicket' element={<NewTicket />} />
                  <Route path='message/:id/:title' element={<Message />} />



                  {/* SUPPLY */}

                  <Route path='supplierList' element={<SupplierList />} />
                  <Route path='newsupplier' element={<NewSupplier />} />
                  <Route path='editsupplier/:id' element={<EditSupplier />} />
                  <Route path='newsupply' element={<NewSupply />} />
                  <Route path='supply' element={<SupplyList />} />
                  <Route path='editsupply/:id' element={<EditeSupply />} />

                  {/* SHIPPING */}
                  <Route path='editshippingcompany/:id' element={<EditShippingCompany />} />
                  <Route path='newshippingcompany' element={<NewShippingCompany />} />
                  <Route path='shippingcompanyList' element={<ShippingCompanyList />} />
                  <Route path='ShippingContract' element={<ShippingContractList />} />
                  <Route path='editShippingContract/:id' element={<EditShippingContract />} />
                  <Route path='newShippingContract' element={<NewShippingContract />} />
                  <Route path='updateShippingReports' element={<UpdateShippingReports />} />
                  <Route path='updateAllShipping' element={<UpdateAllShiping/>}/>




                  {/* COMMON & ODERCOMPONENT */}

                  <Route path='reportfromsql' element={<QlickViewReport />} />
                  <Route path='setting' element={<Setting />} />
                   {/* Report */}
                  <Route path='ShippingReport' element={<ShippingList />} />
                  <Route path='ProceessAttachments' element={<ProceessAttachments />} />
                  <Route path='customerAttachment/:id' element={<DetailCustomerAttachment />} />
                  <Route path='UsedBarBariReports' element={<UsedBarBariReport />} />
                  <Route path='CustomersReports' element={<CustomerReports />} />
                  <Route path='OrdersReports' element={<OrdersReports />} />

                </Routes>
              </div>

            </div>
          </div>
        </div>

      </div>

      <Footer />

    </Fragment>

  )
}
export default MainLayout;
