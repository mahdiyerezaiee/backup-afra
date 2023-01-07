import React, { Fragment, useState, useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Footer from '../../Common/Shared/Common/Footer';
import SideNavbar from '../Nav/SideNavbar';
import Header from '../../Common/Shared/Common/Header';
import IdentityPannel from '../../Client/IdentityRegister/IdentityPannel';
import AddresForm from '../../Client/IdentityRegister/AddresForm';
import PersonIdetity from '../../Client/IdentityRegister/PersonIdetity';
import PersonBankAccount from '../../Client/IdentityRegister/PersonBankAccount';
import { GetUserInfo, GetUsersRoles } from '../../services/userService';
import { useDispatch, useSelector } from 'react-redux';
import ProductList from '../../pages/adminpages/product/ProductList';
import NewProduct from '../../pages/adminpages/product/NewProduct';
import NewWareHouse from '../../pages/adminpages/wareHouse/NewWareHouse';
import WareHouseList from '../../pages/adminpages/wareHouse/WareHouseList';
import UserList from '../../pages/adminpages/users/UserList';

import UserProfile from '../../pages/profile/userProfile';
import EditProfile from '../../pages/profile/editProfile';
import EditProduct from "../../pages/adminpages/product/editProduct";
import EditWareHouse from "../../pages/adminpages/wareHouse/EditWareHouse";
import AttributeCreator from '../../pages/adminpages/setting/AttributeCreator';
import NewsAdmin from "../../pages/adminpages/news/newsAdmin";
import NewNews from "../../pages/adminpages/news/NewNews"
import EditNews from "../../pages/adminpages/news/editNews"
import ProductGroup from '../../pages/adminpages/product/ProductGroup';
import NewProductGroup from '../../pages/adminpages/product/NewProductGroup';
import EditUserRole from '../../pages/adminpages/users/editUserRole';
import ProductSupply from '../../pages/adminpages/sales/productSupply/ProductSupplyList';
import AddProductSupplyToSalesBoard from '../../pages/adminpages/sales/productSupply/AddProductSupplyToSalesBoard';
import TicketList from '../../pages/ticket/ticketList';
import NewTicket from '../../pages/ticket/newTicket';
import Message from '../../pages/ticket/message';
import { CustomersGroup } from '../../pages/adminpages/Customers/CustomersGroup';
import CustomersList from '../../pages/adminpages/Customers/CustomersList';
import NewCustomerGroup from '../../pages/adminpages/Customers/NewCustomerGroup';
import QlickViewReport from '../../pages/adminpages/transport/QlickViewReport';
import BazargahList from '../../pages/adminpages/sales/Bazargah/BazargahList';
import Setting from '../../pages/setting/setting';
import Dashboard from '../../Common/Shared/Common/Dashboard';

import ProductSupplyEdit from '../../pages/adminpages/sales/productSupply/ProductSupplyEdit';
import EditUserInfo from '../../pages/adminpages/users/editUserInfo';
import AddNewUser from '../../pages/adminpages/users/addNewUser';
import EditCustomerGroup from '../../pages/adminpages/Customers/EditCustomerGroup';
import OrderList from '../../pages/order/orderList';
import OrderDetail from '../../pages/order/orderDetail';
import NewsPage from '../../pages/news/newsPage';
import SupplierList from '../../pages/adminpages/supply/SupplierList';
import NewSupplier from '../../pages/adminpages/supply/NewSupplier';
import EditSupplier from '../../pages/adminpages/supply/EditSupplier';
import NewSupply from '../../pages/adminpages/supply/NewSupply';
import NewsList from "../../pages/news/NewsList";
import SupplyList from '../../pages/adminpages/supply/SupplyList';
import GroupCreator from '../../pages/adminpages/setting/GroupCreator';
import EditeSupply from '../../pages/adminpages/supply/EditSupply';
import EditProductGroup from '../../pages/adminpages/product/EditProductGroup';
import OrganizationList from '../../pages/adminpages/organizations/OrganizationList';
import NewOrganizaion from '../../pages/adminpages/organizations/NewOrganizaion';
import EditOrganizaion from '../../pages/adminpages/organizations/EditOrganization';
import WareHouseType from '../../pages/adminpages/wareHouse/WareHouseType';
import NewWareHouseType from '../../pages/adminpages/wareHouse/NewWareHouseType';
import EditWareHouseType from '../../pages/adminpages/wareHouse/EditWareHouseType';
import EditCustomer from "../../pages/adminpages/Customers/EditCustomer";
import Logout from '../../Common/Shared/Login/Logout';
import ShippingCompanyList from "../../pages/adminpages/Shipping/ShippingCompany/ShippingCompanyList";
import NewShippingCompany from "../../pages/adminpages/Shipping/ShippingCompany/ShippimgCompanyNew";
import ShippingContractList from "../../pages/adminpages/Shipping/ShippingContracts/ShippingContractList";
import NewShippingContract from "../../pages/adminpages/Shipping/ShippingContracts/ShippingContractNew";
import EditShippingContract from "../../pages/adminpages/Shipping/ShippingContracts/ShippingContractEdit";
import EditShippingCompany from '../../pages/adminpages/Shipping/ShippingCompany/ShippingCompanyEdit';
import EditCustomerGroupName from '../../pages/adminpages/Customers/EditCustomerGroupName';
import EditProductGroupName from '../../pages/adminpages/product/EditProductGroupName';
import EditWareHouseTypeName from '../../pages/adminpages/wareHouse/EditWareHouseTypeName';
import OrderCustomer from '../../pages/customerpages/OrderCustomer';
import NotFound from "../../Common/Shared/Common/notFound";
import UpdateShippingReports from "../../pages/adminpages/Shipping/updateShippingReports/updateShippingReports";
import OrderDetailTest from '../../pages/order/orderDetailtest2';
import CustomerOrderDetailTest from '../../pages/customerpages/customerOrderDetailTest';
import UpdateAllShiping from '../../pages/adminpages/Shipping/updateShippingReports/UpdateAllShiping';
import EditAddress from "../../pages/profile/editAddress";
import ProceessAttachments from "../../pages/adminpages/report/ProceessAttachments";
import UsedBarBariReport from "../../pages/adminpages/report/UsedBarBariReports";
import CustomerReports from "../../pages/adminpages/report/CustomersReports";
import OrdersReports from "../../pages/adminpages/report/OrdersReports";
import DetailCustomerAttachment from "../../pages/adminpages/report/DetailCustomerAttachment";
import AddOrder from "../../pages/order/addOrder";
import ShippingList from "../../pages/adminpages/Shipping/ShippingList";
import InvoiceCreator from "../../Utils/invoiceCreator";
import Ticket from "../../pages/ticket/ticket_v2";
import { addUser } from '../../store/Slice/user/userSlice';
import { userRoles } from '../../store/Slice/user/userRole/userRoleSlice';

const AdminMainLayout = (props) => {
  const [isloading, setIsloading] = useState(true);
  const navigate = useNavigate();
  const refreshPage = () => {
    window.location.reload();
  }
  const dispatch = useDispatch();
  async function fetchApi() {
    const { data, status } = await GetUserInfo();
    if (status === 200) {
      dispatch(addUser(data.result.customer));
    }
  }
  
  const userId = localStorage.getItem('connect')
  const getUserRole = async () => {


    const { data, status } = await GetUsersRoles(Number(userId))
    try {
      if (status === 200) {

         dispatch(userRoles(data.result.userRoleIds))


      }
    } catch (error) {
      console.log(error);

    }


  }
  useEffect(() => {
    fetchApi();
    getUserRole();
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
                  <Route path="*" element={<Navigate to="404" replace />} />
                  {/* dashboard */}

                  <Route path='/' element={<Dashboard />} />
                  <Route path='/' element={<Navigate to="/" replace />} />


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


                  <Route path='ticket' element={<Ticket />} />
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
                  {/* InvoiceCreator*/}
                  <Route path='invoice/:id' element={<InvoiceCreator />} />

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
export default AdminMainLayout;
