import { useEffect, useState } from "react";
import { HiOutlineUserCircle } from "react-icons/hi";
import { useParams } from "react-router-dom";
import { GaugeChart } from "../../../Common/Shared/Chart/GaugeChart";
import { GetCustomerBrief } from "../../../services/reportService";

const CustomerBrief:React.FC =()=>{
    const params = useParams()
    const [Berief , setBrief] = useState<any>({})
    const [customer , setCustomer] = useState<any>({})
    const [ordersBrief , setOrdersBrief] = useState<any>({})
    const [shippingsBrief , setShippingsBrief] = useState<any>([])

    const GetBerief  = async () => {
        try{
    const { data , status} = await GetCustomerBrief(params.id)
    setBrief(data.result.customerBrief)
    setCustomer(data.result.customerBrief.customer)
    setOrdersBrief(data.result.customerBrief.ordersBrief)
    setShippingsBrief(data.result.customerBrief.shippingsBrief)
        }catch(err){
            console.log(err);
            
        }
    }
    useEffect(()=>{
        GetBerief()
        
    },[])
return(
    <div className=" statbox widget-content widget-content-area">
<div className="row  ">
    <div className="col-12  rounded shadow  p-4">
        <div className="row">
    <div className="col-lg-2">
        <HiOutlineUserCircle size="5rem"/>
    </div>
    <div className="col-lg-9 ">
<div className="row">
    <div className="col-lg-4 my-2"><span>نام</span> : {customer.fullName}</div>
    <div className="col-lg-4 my-2"><span>کد ملی</span> : {customer.nationalCode}</div>
    <div className="col-lg-4 my-2"><span>شناسه</span> : {customer.userName}</div>
    <div className="col-lg-4 my-2"><span>نام سازمان</span> : {customer.organizationName ? customer.organizationName :"--"}</div>
</div>
    </div>
    </div>
    </div>
<div className="col-12 ">
    <div className="row mt-2">

        <div className="col-6  text-center">
            <h4 >سفارشات</h4>
            <GaugeChart labels={["کل خرید","صورت حساب ها","پرداخت شده ها"]} data1={ordersBrief.totalBought} data2={ordersBrief.totalInvoices} data3={ordersBrief.totalPaid}/>
            </div>
            <div className="col-6 text-center">
            <h4 >حواله</h4>
{shippingsBrief.map((item:any)=>
    item.measureUnitId === 5 ? 
    <>
            <GaugeChart labels={[" کل درخواست های ارسال","  ارسال شده ها"]} data1={item.totalShippingRequest} data2={item.totalShipped} data3={null}/>
<span >وزنی</span></>
:
<>
            <GaugeChart labels={[" کل درخواست های ارسال","  ارسال شده ها"]} data1={item.totalShippingRequest} data2={item.totalShipped} data3={null}/>
<span >تعدادی</span></>


)}
            </div>
    </div>
</div>
</div>
    </div>
)
}
export default CustomerBrief