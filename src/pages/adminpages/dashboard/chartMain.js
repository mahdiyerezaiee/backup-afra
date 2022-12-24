import React from 'react';
import {ChartLineCount} from "../../../components/chart/chartLineCount";
import {ChartLineValue} from "../../../components/chart/chartLineValue";
import {useEffect, useState} from "react";
import {GetPeriodicSalesReport} from "../../../services/reportService";

const ChartMain = () => {

    const [datas , setDatas]=useState([])
    const [TypeId , setTypeId]=useState(3 )
    useEffect(()=>{
        const GetReport = async () => {
            try {
                const {data , status}= await GetPeriodicSalesReport(TypeId)
                setDatas(data.result.ordersPerSchedule)
            }catch (e) {
                console.log(e)
            }

        }
        GetReport()
    },[TypeId])
    return (
        <div className=" row sales ">

            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12  ">

                <ChartLineCount datas={datas} setTypeId={setTypeId}/>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12  ">

                <ChartLineValue datas={datas} setTypeId={setTypeId}/>
            </div>

        </div>
    )
}
export default ChartMain