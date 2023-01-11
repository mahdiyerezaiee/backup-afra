import React, { Fragment, useState, useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Footer from '../../Common/Shared/Common/Footer';
import SideNavbar from '../Nav/SideNavbar';
import Header from '../../Common/Shared/Common/Header';
import IdentityPannel from '../../Client/IdentityRegister/Component/IdentityPannel';
import AddresForm from '../../Client/IdentityRegister/Component/AddresForm';
import PersonIdetity from '../../Client/IdentityRegister/Component/PersonIdetity';
import PersonBankAccount from '../../Client/IdentityRegister/Component/PersonBankAccount';
import { GetUserInfo, GetUsersRoles } from '../../services/userService';
import { useDispatch, useSelector } from 'react-redux';
import ProductList from '../Product/Component/ProductList';
import NewProduct from '../Product/Component/NewProduct';
import NewWareHouse from '../WareHouse/Component/NewWareHouse';
import WareHouseList from '../WareHouse/Component/WareHouseList';
import UserList from '../User/Component/UserList';

import UserProfile from '../../Common/Shared/Profile/userProfile';
import EditProfile from '../../Common/Shared/Profile/editProfile';
import EditProduct from "../Product/Component/editProduct";
import EditWareHouse from "../WareHouse/Component/EditWareHouse";
import AttributeCreator from '../Attribute/Component/AttributeCreator';
import NewsAdmin from "../News/Component/newsAdmin";
import NewNews from "../News/Component/NewNews"
import EditNews from "../News/Component//editNews"
import ProductGroup from '../Product/Component/ProductGroup';
import NewProductGroup from '../Product/Component/NewProductGroup';
import EditUserRole from '../User/Component/editUserRole';
import ProductSupply from '../ProductSupply/Component/ProductSupplyList';
import AddProductSupplyToSalesBoard from '../ProductSupply/Component/AddProductSupplyToSalesBoard';
import TicketList from '../../Common/Shared/Ticket/ticketList';
import NewTicket from '../../Common/Shared/Ticket/newTicket';
import Message from '../../Common/Shared/Ticket/message';
import { CustomersGroup } from '../Customer/Component/CustomersGroup';
import CustomersList from '../../Admin/Customer/Component/CustomersList';
import NewCustomerGroup from '../../Admin/Customer/Component/NewCustomerGroup';
import BazargahList from '../Report/Component/BazargahList';
import Setting from '../../Common/Setting/setting';
import Dashboard from '../../Common/Shared/Common/Dashboard';

import ProductSupplyEdit from '../ProductSupply/Component/ProductSupplyEdit';
import EditUserInfo from '../User/Component/editUserInfo';
import AddNewUser from '../User/Component/addNewUser';
import EditCustomerGroup from '../../Admin/Customer/Component/EditCustomerGroup';
import OrderList from '../../Admin/Order/Component/orderList';
import NewsPage from '../../Common/Shared/News/newsPage';
import SupplierList from '../Supplier/Component/SupplierList';
import NewSupplier from '../Supplier/Component/NewSupplier';
import EditSupplier from '../Supplier/Component/EditSupplier';
import NewSupply from '../Supply/Component/NewSupply';
import NewsList from "../../Common/Shared/News/NewsList";
import SupplyList from '../Supply/Component/SupplyList';
import GroupCreator from '../Attribute/Component/GroupCreator';
import EditeSupply from '../Supply/Component/EditSupply';
import EditProductGroup from '../Product/Component/EditProductGroup';
import OrganizationList from '../Organization/Component/OrganizationList';
import NewOrganizaion from '../Organization/Component/NewOrganizaion';
import EditOrganizaion from '../Organization/Component/EditOrganization';
import WareHouseType from '../WareHouse/Component/WareHouseType';
import NewWareHouseType from '../WareHouse/Component/NewWareHouseType';
import EditWareHouseType from '../WareHouse/Component/EditWareHouseType';
import EditCustomer from "../../Admin/Customer/Component/EditCustomer";
import Logout from '../../Common/Shared/Login/Logout';
import ShippingCompanyList from "../Shipping/Child/ShippingCompany/Component/ShippingCompanyList";
import NewShippingCompany from "../Shipping/Child/ShippingCompany/Component/ShippimgCompanyNew";
import ShippingContractList from "../Shipping/Child/ShippingContracts/Component/ShippingContractList";
import NewShippingContract from "../Shipping/Child/ShippingContracts/Component/ShippingContractNew";
import EditShippingContract from "../Shipping/Child/ShippingContracts/Component/ShippingContractEdit";
import EditShippingCompany from '../Shipping/Child/ShippingCompany/Component/ShippingCompanyEdit';
import EditCustomerGroupName from '../../Admin/Customer/Component/EditCustomerGroupName';
import EditProductGroupName from '../Product/Component/EditProductGroupName';
import EditWareHouseTypeName from '../WareHouse/Component/EditWareHouseTypeName';
import OrderCustomer from '../../Client/Order/Component/OrderCustomer';
import NotFound from "../../Common/Shared/Common/notFound";
import UpdateShippingReports from "../Report/Component/updateShippingReports";
import OrderDetailTest from '../../Admin/Order/Component/orderDetailtest2';
import CustomerOrderDetailTest from '../../Client/Order/Component/customerOrderDetailTest';
import UpdateAllShiping from '../Report/Component/updateShippingReports';
import EditAddress from "../../Common/Shared/Profile/editAddress";
import ProceessAttachments from "../Report/Component/ProceessAttachments";
import UsedBarBariReport from "../Report/Component/UsedBarBariReports";
import CustomerReports from "../Report/Component/CustomersReports";
import OrdersReports from "../Report/Component/OrdersReports";
import DetailCustomerAttachment from "../Report/Component/DetailCustomerAttachment";
import AddOrder from "../Order/Component/addOrder";
import ShippingList from "../Shipping/Component/ShippingList";
import InvoiceCreator from "../../Utils/invoiceCreator";
import Ticket from "../../Common/Shared/Ticket/ticket_v2";
import { addUser } from '../../store/Slice/user/userSlice';
import { userRoles } from '../../store/Slice/user/userRole/userRoleSlice';

const AdminMainLayout = (props) => {
  const [isloading, setIsloading] = useState(true);
  const navigate = useNavigate();
  const refreshPage = () => {
    window.location.reload();
  }
  useEffect(() => {
    fetchApi();
    getUserRole();
  }, [])
  const dispatch = useDispatch();
  async function fetchApi() {
    const { data, status } = await GetUserInfo();
    try {
      if (status === 200) {
        localStorage.setItem('connect', data.result.customer.id)
  
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


  const [collapsed, setCollapsed] = useState(true);
  const handleCollapsedChange = (checked) => {
    setCollapsed(!collapsed);
  };

  return (
    <Fragment>

      <Header collapsed={collapsed} handelChange={handleCollapsedChange} />
      <div className="main-container" id="container">
        <SideNavbar />
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
                  <Route path='updateAllShipping' element={<UpdateAllShiping />} />




                  {/* COMMON & ODERCOMPONENT */}

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
