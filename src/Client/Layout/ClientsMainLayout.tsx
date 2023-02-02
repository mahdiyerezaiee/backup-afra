import React, { Fragment, useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import FooterClient from './Footer/FooterClient';
import HeaderClient from './Header/HeadrClient';
import ClientSideNavbar from './../Nav/ClientSideNavbar';







const ClientsMainLayout: React.FC = () => {
    const [collapsed, Setcollapsed] = useState(true)

    return (
        <Fragment>

            <HeaderClient collapsed={collapsed} />
            <div className="main-container" id="container">
                <ClientSideNavbar />
                <div id="content" className="main-content main-Layout">
                    <div className="layout-px-spacing">
                        <div className="row layout-top-spacing">
                            <div className="col-xl-12 col-lg-12 col-md-12 col-12 layout-spacing">
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