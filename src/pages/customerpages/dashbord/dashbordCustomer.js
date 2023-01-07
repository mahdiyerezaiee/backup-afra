import {NavLink} from "react-router-dom";
import {Table} from "react-bootstrap";
import News from "../../news/news";
import { Fragment } from 'react';
import SalesBoardForCustomer from '../../../Common/Shared/common/salesBoard';

const DashbordCustomer = () => {



    return (<Fragment>
        
    <hr/>
    <SalesBoardForCustomer/>
    <hr/>
    <News/>

            <button > </button>
    </Fragment>
    )
}
export default DashbordCustomer