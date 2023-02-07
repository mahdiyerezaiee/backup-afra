import {NavLink} from "react-router-dom";
import {Table} from "react-bootstrap";
import News from "../../../Common/Shared/News/news";
import { Fragment } from 'react';
import SalesBoardForCustomer from '../../../Common/Shared/Common/salesBoard';
import BlockReport from "../../Reports/BlockReport";

const DashbordCustomer:React.FC = () => {



    return (<Fragment>
        <BlockReport/>
    <hr/>
    <SalesBoardForCustomer/>
    <hr/>
    <News/>

    </Fragment>
    )
}
export default DashbordCustomer