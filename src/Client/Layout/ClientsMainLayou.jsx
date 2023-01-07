import React, { Fragment } from 'react'
import { Routes, Route } from 'react-router-dom';

const ClientsMainLayou = () => {
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

                                    <Route path='userProfile' element={<UserProfile />} />
                                    <Route path='editProfile' element={<EditProfile />} />
                                    <Route path='editAddress/:id' element={<EditAddress />} />
                                    <Route path='identitypannel' element={<IdentityPannel />} />
                                    <Route path='addresform' element={<AddresForm />} />
                                    <Route path='personidentity' element={<PersonIdetity />} />
                                    <Route path='personBankAccount' element={<PersonBankAccount />} />

                                </Routes>




                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default ClientsMainLayou