import React from 'react';
import {ChartLine} from "../../../components/chart/chartLine";
import {ChartPie} from "../../../components/chart/chartPie";

const ChartMain = () => {
    return (
        <div className=" row sales ">

            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">

                <ChartLine/>
            </div>
            {/*<div className="col-xl-1 col-lg-12 col-md-12 col-sm-12 col-12 ">*/}
            {/*</div>*/}
            {/*<div className="col-xl-4 col-lg-12 col-md-12 col-sm-12 col-12 ">*/}

            {/*    <ChartPie/>*/}
            {/*</div>*/}
        </div>
    )
}
export default ChartMain