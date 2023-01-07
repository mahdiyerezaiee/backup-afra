import {NavLink} from "react-router-dom";
import {Table} from "react-bootstrap";
import News from './../../news/news';
import SalesBoard from "../../../Common/Shared/Common/salesBoard";
import { Fragment } from 'react';

const DashbordGuess = () => {



    return (
    <Fragment><div>
        <div className=" statbox widget-content widget-content-area">
            <div className="card component-card_2 m-2">
                <div className="card-body">
                    <p className="card-text d-inline m-auto">برای ثبت سفارش جدید لازم است که حتما احزار هویت انجام دهید</p>
                    <NavLink to="identitypannel" className="btn btn-primary float-right ">احراز هویت</NavLink>
                </div>
            </div>
        
        </div>
     
               
    </div>
    <hr/>
    <SalesBoard/>
    <hr/>
    <News/>
    </Fragment>)
}
export default DashbordGuess