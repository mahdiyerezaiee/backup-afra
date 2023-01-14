import {NavLink} from "react-router-dom";
import {Table} from "react-bootstrap";
import News from "../../../Common/Shared/News/news";
import { Fragment } from 'react';
import SalesBoardForCustomer from '../../../Common/Shared/Common/salesBoard';

const DashbordCustomer = () => {



    return (<Fragment>
        
    <hr/>
    <SalesBoardForCustomer/>
    <hr/>
    <News/>

    </Fragment>
    )
}
export default DashbordCustomer