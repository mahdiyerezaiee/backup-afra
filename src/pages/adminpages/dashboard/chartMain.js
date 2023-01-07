import React from 'react';
import {ChartLineCount} from "../../../Common/Shared/chart/chartLineCount";
import {ChartLineValue} from "../../../Common/Shared/chart/chartLineValue";
import {useEffect, useState} from "react";
import {GetPeriodicSalesReport} from "../../../services/reportService";


const ChartMain = () => {
    const [datas , setDatas]=useState(getDataReport().datas?getDataReport().datas:[])
    const [TypeId , setTypeId]=useState(3 )
    let d = new Date();
    d.setTime(d.getTime() +  (60 * 1000));
    let expires =  d.toUTCString();
    const dataReport = {
        expiresAt: expires,
       datas
    }

    function getDataReport() {
        let items = JSON.parse(sessionStorage.getItem('dataReport'));
        return items ? items : ''


    }
    useEffect(()=>{
        const GetReport = async () => {
            try {
                const {data , status}= await GetPeriodicSalesReport(TypeId)

                setDatas(data.result.ordersPerSchedule)
dataReport.datas=data.result.ordersPerSchedule
                sessionStorage.setItem('dataReport', JSON.stringify(dataReport));

            }catch (e) {
                console.log(e)
            }

        }
        if (getDataReport().expiresAt <  new Date().toUTCString()){
            sessionStorage.removeItem("dataReport")

        }
        if (!getDataReport().expiresAt ){
            GetReport()
            sessionStorage.setItem('dataReport', JSON.stringify(dataReport));

        }else if (TypeId){
            GetReport()

        }

    },[TypeId])


    return (
        <div className=" row sales mt-3 ">

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