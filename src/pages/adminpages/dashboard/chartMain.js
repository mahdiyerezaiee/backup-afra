import React from 'react';
import {ChartLineCount} from "../../../components/chart/chartLineCount";
import {ChartLineValue} from "../../../components/chart/chartLineValue";

const ChartMain = () => {
    return (
        <div className=" row sales ">

            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12  ">

                <ChartLineCount/>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12  ">

                <ChartLineValue/>
            </div>

        </div>
    )
}
export default ChartMain