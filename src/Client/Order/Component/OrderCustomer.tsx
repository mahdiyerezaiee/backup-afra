import React, { useState, useEffect, useMemo } from 'react'
import { useSelector } from "react-redux";
import {Link, useNavigate} from 'react-router-dom';
import { ShippingStatusEnums } from '../../../Common/Enums/ShippingStatusEnums';
import { OrderStatus } from '../../../Common/Enums/OrderStatusEnums';
import { PaymentStructureEnums } from '../../../Common/Enums/PaymentStructureEnums';
import QueryString from 'qs';
import {
   GetCustomerOrders,
  GetDataWithSearchOrder,
  GetOrder,
  GetOrderDetails
} from '../../../services/orderService';
import  Modal  from 'react-modal';
import { ExportToExcel } from '../../../Common/Shared/Common/ExportToExcel';
import InvoiceCreator from "../../../Utils/invoiceCreator";
import ImageFileUploader from "../../../Utils/ImageFileUploader";
import { RootState } from '../../../store';
import Pagination from '../../../Utils/pagination';

const customStyles:any = {
  content: {
    position:'fixed',
    inset: '-50px',
    backgroundColor:'transparent',
    height:'100%',
    overflow:'none',

  }
}
const OrderCustomer:React.FC = () => {
const [PageNumber, setPageNumber] = useState( getPage().PageNumber?getPage().PageNumber:0)
  const [PageSize, setPageSize] = useState(getPage().PageSize?getPage().PageSize:5)
  const [orderId, setOrderId] = useState(0)
  const roles = useSelector((state:RootState) => state.roles)
  const Navigate = useNavigate()
 const [modalIsOpenEdit, setIsOpenEdit] = useState(false);
  const [modalIsOpenUpload, setIsOpenUpload] = useState(false);
  const [getOrders, SetGetOrders] = useState(false);
  const [totalCount , setTotalCount]=useState(0) ;
const [order, setOrder] = useState([])
const[entity,setEntity]=useState(0)
  const param = { PageSize , PageNumber}
 function getPage() {
    let items = JSON.parse(String(sessionStorage.getItem(`param${window.location.pathname}`)));
    return items? items:''}
const closeModalEdit = () => {
    setIsOpenEdit(false);}
 const closeModalForUpload=()=>{
    setIsOpenUpload(false)
  }
 
  
useEffect(() => {
    GetOrders()
    sessionStorage.clear()

  }, [getOrders])
  const GetOrders = async () => {
    let userName = localStorage.getItem("mobile")

    let config = {

      headers: { 'Content-Type': 'application/json' },
      params: {
    UserName: userName,
        PageNumber,
        PageSize
      }
      ,
      paramsSerializer: (params:any) => {

        return QueryString.stringify(params)
      }


    };

    try {
     const { data, status } = await GetDataWithSearchOrder(config);
      SetGetOrders(false)
      setOrder(data.result.orderList.values)
      setTotalCount(data.result.orderList.totalCount)

      }
      

    catch (err) {
      console.log(err)
    }

  }
  
  var formatter = new Intl.NumberFormat('fa-IR', { maximumFractionDigits: 0, 
    minimumFractionDigits: 0, });

  const showOrder = (id:number) => {
    Navigate(`/admin/cuoDetail/${id}`)
  }
  const getDataByPage = async () => {
    let userName = localStorage.getItem("mobile")
    let config = {
      headers: { 'Content-Type': 'application/json' },
      params: {
        
        UserName: userName,
        
        PageNumber,
        PageSize
      }
      ,
      paramsSerializer: (params:any) => {
        return QueryString.stringify(params)
      }
    };

    try {
      const {data, status} = await GetDataWithSearchOrder(config);
      if (status === 200) {
        setOrder(data.result.orderList.values);
        sessionStorage.setItem(`param${window.location.pathname}`, JSON.stringify(param));
      }

    } catch (err) {
      console.log(err)
    }

  }
  const columns = useMemo(() => [

    { Header: 'شماره سفارش', accessor: 'id' },
    ,
    {
      Header: 'تاریخ', accessor: (d:any) => {
        let date = new Date(d.createDate).toLocaleDateString('fa-IR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        })
        return (`${date}`)
      }, Cell: (row:any) => {

        return (new Date(row.row.original.createDate).toLocaleDateString('fa-IR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        }))
      }

    },
  
    {
      Header: 'وضعیت تخصیص', accessor: 'shippingStatusId', Cell: (row:any) => {
        return (ShippingStatusEnums.filter((item:any) => item.id === row.row.original.shippingStatusId).map((item:any) => item.name))
      }
    },
    {
      Header: 'وضعیت سفارش', accessor: 'orderStatusId', Cell: (row:any) => {
        return (OrderStatus.filter((item:any) => item.id === row.row.original.orderStatusId).map((item:any) => item.name))
      }
    },
     {
      Header: 'نوع پرداخت', accessor: 'paymentMethodId', Cell: (row:any) => {
          return (PaymentStructureEnums.filter((item:any) => item.id === row.row.original.paymentMethodId).map((item:any) => item.name))
      }
  }
    , {
      Header: 'مبلغ-ریال',
      accessor: 'orderFinalizedPrice',
      Cell: row => (formatter.format(row.row.original.orderFinalizedPrice))
    },
    {
      Header: 'مشاهده جزییات ', accessor: '', Cell: row => (
          <Link className="border-0 bg-transparent non-hover edit-btn"  to={`/client/cuoDetail/${row.row.original.id}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width='25' height='25' viewBox="0 0 256 256"><rect
            width="256" height="256" fill="none" /><line x1="201.1" y1="127.3" x2="224" y2="166.8"
              fill="none" stroke="#000" strokeLinecap="round"
              strokeLinejoin="round" strokeWidth="12" /><line
              x1="154.2" y1="149.3" x2="161.3" y2="189.6" fill="none" stroke="#000" strokeLinecap="round"
              strokeLinejoin="round" strokeWidth="12" /><line x1="101.7" y1="149.2" x2="94.6" y2="189.6"
                fill="none" stroke="#000" strokeLinecap="round"
                strokeLinejoin="round" strokeWidth="12" /><line
              x1="54.8" y1="127.3" x2="31.9" y2="167" fill="none" stroke="#000" strokeLinecap="round"
              strokeLinejoin="round" strokeWidth="12" /><path
              d="M32,104.9C48.8,125.7,79.6,152,128,152s79.2-26.3,96-47.1" fill="none" stroke="#000"
              strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" /></svg>
        </Link>
      )
    },

   ],[])


  const data = useMemo(() => order,[order]);

if(order){
  const dataForExcel = order.map((item:any) => ({
    'شمراه فاکتور': item.id,
    'خریدار': item.customer.firstName,
    'شماره همراه': item.customer.userName,
    'شماره ملی': item.customer.nationalCode,
    'نوع پرداخت': item.paymentMethodId === 2 ? 'نقدی' : 'نسیه',
    'وضعیت ارسال': (ShippingStatusEnums.filter(data => data.id === item.shippingStatusId).map(data => data.name)[0]),
    'تخصیص': (OrderStatus.filter(data => data.id === item.orderStatusId).map(item => item.name)[0]),
    'تاریخ': (new Date(item.createDate).toLocaleDateString('fa-IR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })),
    'مبلغ': item.orderTotal
  }))
  return (
  <div>

    
    <Modal
      isOpen={modalIsOpenEdit}
      onRequestClose={closeModalEdit}
      style={customStyles}
      contentLabel="Selected Option"
      ariaHideApp={false}

    >
   <InvoiceCreator closeModal={closeModalEdit}/>
    </Modal>
    <ImageFileUploader modalIsOpen={modalIsOpenUpload} closeModal={closeModalForUpload} EntityId={entity} EntityTypesId={10} comment={"مشتری عزیز لطفا عکس پیش فاکتور تایید شده خود را بگذارید (پیش فاکتور حتما باید همراه با مهر و امضا شخص خریدار باشد)"}/>
  


    <div className="  ">
      <div>
        {order.map((item:any) =>
          <div className="col-sm-10 col-md-12 m-1">

          <div className="  auction-item-2 text-center  ">
          <div className="auction-content">
              <div className=" row bid-area">
                  <div className="col-lg-10">
                  <div className="row">
             <span className="col-lg-4 m-auto p-2"><b>شماره سفارش </b>: {item.id}</span>
             <span className=" col-lg-4 m-auto p-2 "> <b>تاریخ</b>: {new Date(item.createDate).toLocaleDateString('fa-IR', { year: 'numeric', month: '2-digit', day: '2-digit' })}</span>
             <span className="col-lg-4 m-auto p-2"> <b>وضعیت تخصیص</b>: {ShippingStatusEnums.filter((i:any) => i.id === item.shippingStatusId).map((item:any) => item.name)}</span>
             <span className="col-lg-4 m-auto p-2"><b>وضعیت سفارش</b> : {OrderStatus.filter((i:any) => i.id === item.orderStatusId).map((item:any) => item.name)}</span>
             <span className="col-lg-4 m-auto p-2"> <b>نوع پرداخت</b> : {PaymentStructureEnums.filter((i:any) => i.id === item.paymentMethodId).map((item:any) => item.name)}</span>
             <span className="col-lg-4 m-auto p-2"><b>مبلغ-ریال</b> : {formatter.format(item.orderFinalizedPrice)}</span>
             </div>
             </div>
             <span className="col-lg-2 text-center  m-auto button-auction" > <Link className="border-0 bg-transparent non-hover edit-btn"  to={`/client/orderDetail/${item.id}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width='25' height='25' viewBox="0 0 256 256"><rect
            width="256" height="256" fill="none" /><line x1="201.1" y1="127.3" x2="224" y2="166.8"
              fill="none" stroke="#000" strokeLinecap="round"
              strokeLinejoin="round" strokeWidth="12" /><line
              x1="154.2" y1="149.3" x2="161.3" y2="189.6" fill="none" stroke="#000" strokeLinecap="round"
              strokeLinejoin="round" strokeWidth="12" /><line x1="101.7" y1="149.2" x2="94.6" y2="189.6"
                fill="none" stroke="#000" strokeLinecap="round"
                strokeLinejoin="round" strokeWidth="12" /><line
              x1="54.8" y1="127.3" x2="31.9" y2="167" fill="none" stroke="#000" strokeLinecap="round"
              strokeLinejoin="round" strokeWidth="12" /><path
              d="M32,104.9C48.8,125.7,79.6,152,128,152s79.2-26.3,96-47.1" fill="none" stroke="#000"
              strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" /></svg>
        </Link> </span>
            
                  </div>
                  </div>
          </div>
          </div>
        )}
        <br/>
        <br/>
      <Pagination setPageNumber={setPageNumber} PageNumber={PageNumber} getDataBySearch={getDataByPage} PageSize={PageSize} total={totalCount} />

      </div>
      <div className="d-flex justify-content-end">
        <ExportToExcel apiData={dataForExcel} fileName='لیست سفارشات' />
      </div>
    </div>
  </div>
  )
}
  
else{
  return(
      <div className='user-progress dashboard-widget'>
       
       

        <div className=" statbox widget-content widget-content-area">
          <div>




            <div className='text-center mt-5'>
              <h5>اطلاعاتی جهت نمایش موجود نیست</h5>
            </div>




          </div>
        </div>


      </div>
  )
}

}
export default OrderCustomer