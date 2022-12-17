import React, { useState } from 'react';
import NavTop from "../navbar/navBar";
import Sidebar from "../sidebar/sidebar";
import {Route, Routes} from "react-router-dom";
import Newproduct from "../product/Newproduct";





const MainLayout:React.FC = () => {
  const [show, setShow] = useState<boolean>(false)
  const [showSubMenu , setShowSubMenu] = useState<boolean>(false)
  return (
    <div className="rtl">

      <div id="app-container" className=" menu-sub-hidden sub-show-temporary rtl">
        {showSubMenu ? (<NavTop onclick={function() {
              if (show === false){
                setShow(true)

              }

              setShowSubMenu(false)

              if (show === false){
                setShowSubMenu(false)

              }

            }} />):
           ( <NavTop onclick={function() {setShow(!show)}} />)}

        <Sidebar show={show}  setShowSubMenu={setShowSubMenu} showSubMenu={showSubMenu}/>
      </div>





      <main style={{marginRight: !show ? "60px": "150px"}}>
        <div className="container-fluid">

          <div className="dashboard-wrapper ">
                <Routes>

                  {/*<Route path="404" element={<NotFound />} />*/}
                  {/*<Route path="*" element={<Navigate to="/404" replace />} />*/}
                  {/*/!* dashboard *!/*/}

                  {/*<Route path='dashboard' element={<Dashboard />} />*/}
                  {/*<Route path='/' element={<Navigate to="dashboard" replace />} />*/}


                  {/*/!* useORCustomer  Oganizations*!/*/}

                  {/*<Route path='userProfile' element={<UserProfile />} />*/}
                  {/*<Route path='editProfile' element={<EditProfile />} />*/}
                  {/*<Route path='editAddress/:id' element={<EditAddress />} />*/}
                  {/*<Route path='identitypannel' element={<IdentityPannel />} />*/}
                  {/*<Route path='addresform' element={<AddresForm />} />*/}
                  {/*<Route path='personidentity' element={<PersonIdetity />} />*/}
                  {/*<Route path='personBankAccount' element={<PersonBankAccount />} />*/}
                  {/*<Route path='userlist' element={<UserList />} />*/}
                  {/*<Route path='editInfo/:id' element={<EditUserInfo />} />*/}
                  {/*<Route path='adduser' element={<AddNewUser />} />*/}
                  {/*<Route path='editrole/:id' element={<EditUserRole />} />*/}
                  {/*<Route path='editcustomergroup/:id' element={<EditCustomerGroup />} />*/}
                  {/*<Route path='editcustomergroupName/:id' element={<EditCustomerGroupName />} />*/}
                  {/*<Route path='customergroup' element={<CustomersGroup />} />*/}
                  {/*<Route path='editCustumer/:id' element={<EditCustomer />} />*/}
                  {/*<Route path='customerlist' element={<CustomersList />} />*/}
                  {/*<Route path='newcustomergroup' element={<NewCustomerGroup />} />*/}
                  {/*<Route path='organizationlist' element={<OrganizationList />} />*/}
                  {/*<Route path='addorganization' element={<NewOrganizaion />} />*/}
                  {/*<Route path='editorganization/:id' element={<EditOrganizaion />} />*/}

                  {/*/!* PRODUCT *!/*/}
                  {/*<Route path='productList' element={<ProductList />} />*/}
                  {/*<Route path='productgroup' element={<ProductGroup />} />*/}
                  {/*<Route path='editproductgroup/:id' element={<EditProductGroup />} />*/}
                  {/*<Route path='EditProductGroupName/:id' element={<EditProductGroupName />} />*/}
                  {/*<Route path='newproductgroup' element={<NewProductGroup />} />*/}
                  <Route path='newproduct' element={<Newproduct />} />
                  {/*<Route path='editproduct/:id' element={<EditProduct />} />*/}

                  {/*/!* WareHouse *!/*/}


                  {/*<Route path='newwarehouse' element={<NewWareHouse />} />*/}
                  {/*<Route path='warehouselist' element={<WareHouseList />} />*/}
                  {/*<Route path='editwarehouse/:id' element={<EditWareHouse />} />*/}
                  {/*<Route path='warehousetypes' element={<WareHouseType />} />*/}
                  {/*<Route path='newwarehousetype' element={<NewWareHouseType />} />*/}
                  {/*<Route path='editwarehousetype/:id' element={<EditWareHouseType />} />*/}
                  {/*<Route path='EditWareHouseTypeName/:id' element={<EditWareHouseTypeName />} />*/}

                  {/*/!*Attributes *!/*/}

                  {/*<Route path='createAttribute' element={<AttributeCreator />} />*/}
                  {/*<Route path='creategroup' element={<GroupCreator />} />*/}


                  {/*/!* News *!/*/}

                  {/*<Route path='user-news' element={<NewsAdmin />} />*/}
                  {/*<Route path='newNews' element={<NewNews />} />*/}
                  {/*<Route path='editNews/:id' element={<EditNews />} />*/}
                  {/*<Route path='newsList' element={<NewsList />} />*/}
                  {/*<Route path='news/:id' element={<NewsPage />} />*/}

                  {/*/!* Sales&Order&Bazargah*!/*/}

                  {/*<Route path='editproductsupply/:id' element={<ProductSupplyEdit />} />*/}
                  {/*<Route path='productSupply' element={<ProductSupply />} />*/}
                  {/*<Route path='newProductsupply' element={<AddProductSupplyToSalesBoard />} />*/}
                  {/*<Route path='orderList' element={<OrderList />} />*/}
                  {/*<Route path='orderDetail/:id' element={<OrderDetailTest />} />*/}
                  {/*<Route path='bazargah' element={<BazargahList />} />*/}
                  {/*<Route path='cuoList' element={<OrderCustomer />} />*/}

                  {/*<Route path='cuoDetail/:id' element={<CustomerOrderDetailTest />} />*/}







                  {/*/!* Ticket *!/*/}


                  {/*<Route path='ticket' element={<TicketList />} />*/}
                  {/*<Route path='newTicket' element={<NewTicket />} />*/}
                  {/*<Route path='message/:id/:title' element={<Message />} />*/}



                  {/*/!* SUPPLY *!/*/}

                  {/*<Route path='supplierList' element={<SupplierList />} />*/}
                  {/*<Route path='newsupplier' element={<NewSupplier />} />*/}
                  {/*<Route path='editsupplier/:id' element={<EditSupplier />} />*/}
                  {/*<Route path='newsupply' element={<NewSupply />} />*/}
                  {/*<Route path='supply' element={<SupplyList />} />*/}
                  {/*<Route path='editsupply/:id' element={<EditeSupply />} />*/}

                  {/*/!* SHIPPING *!/*/}
                  {/*<Route path='editshippingcompany/:id' element={<EditShippingCompany />} />*/}
                  {/*<Route path='newshippingcompany' element={<NewShippingCompany />} />*/}
                  {/*<Route path='shippingcompanyList' element={<ShippingCompanyList />} />*/}
                  {/*<Route path='ShippingContract' element={<ShippingContractList />} />*/}
                  {/*<Route path='editShippingContract/:id' element={<EditShippingContract />} />*/}
                  {/*<Route path='newShippingContract' element={<NewShippingContract />} />*/}
                  {/*<Route path='updateShippingReports' element={<UpdateShippingReports />} />*/}
                  {/*<Route path='updateAllShipping' element={<UpdateAllShiping/>}/>*/}




                  {/*/!* COMMON & ODERCOMPONENT *!/*/}

                  {/*<Route path='reportfromsql' element={<QlickViewReport />} />*/}
                  {/*<Route path='setting' element={<Setting />} />*/}

                </Routes>
              </div>

            </div>
      </main>



    </div>

  )
}
export default MainLayout;
