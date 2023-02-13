import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetInvoicesWithSearch } from "../../services/invoiceService";
import Pagination from "../../Utils/pagination";
import QueryString from 'qs';
import { AiOutlineWarning } from "react-icons/ai";
import { InvoceTypes } from "../../Common/Enums/InvoiceTypeIdEnums";
import { PriceUnitEnums } from "../../Common/Enums/PriceUnit";
import { PaymentStatusEnums } from "../../Common/Enums/PaymentStatus";
import { PaymentStructureEnums } from "../../Common/Enums/PaymentStructureEnums";

const InvoiceClient:React.FC =()=>{
    const [invoices, SetInvoice] = useState([])
    const [totalCount, setTotalCount] = useState(0);
    const [PageNumber, setPageNumber] = useState( getPage().PageNumber?getPage().PageNumber:0)
    const [PageSize, setPageSize] = useState(getPage().PageSize?getPage().PageSize:5)
    const param = { PageSize , PageNumber}
 function getPage() {
    let items = JSON.parse(String(sessionStorage.getItem(`param${window.location.pathname}`)));
    return items? items:''}
    const GetIvoices = async () => {
        try {
            const { data, status } = await GetInvoicesWithSearch();
            if (status === 200) {
                
                SetInvoice(data.result.invoices.values)
                setTotalCount(data.result.invoices.totalCount)

            }
        } catch (err) {
            console.log(err)
        }

    }
    useEffect(() => {
        GetIvoices()

    }, [])
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
            const { data, status } = await GetInvoicesWithSearch(config);
            if (status === 200) {
                
                SetInvoice(data.result.invoices.values)
                setTotalCount(data.result.invoices.totalCount)

            }
        } catch (err) {
          console.log(err)
        }
    
      }
      let formatterForMoney = new Intl.NumberFormat('fa-IR', {
        
        currency: 'IRR'


    });
   if(invoices){return (
    <div>
   <div className="  ">
        <div>
          {invoices.map((item:any) =>
            <div className="col-sm-10 col-md-12 m-1">
  
            <div className="  auction-item-2 text-center  ">
            <div className="auction-content">
                <div className=" row bid-area">
                    <div className="col-lg-12">
                    <div className="row">
               <span className="col-lg-3 m-auto p-2"><b>نوع صورتحساب  </b>: {InvoceTypes.filter((i: any) => (i.id === item.invoiceTypeId)).map((item: any) => (item.name))}</span>
               <span className=" col-lg-3 m-auto p-2 "> <b>شناسه</b>: {item.entityId}</span>
               <span className="col-lg-3 m-auto p-2"> <b>قیمت </b>: {formatterForMoney.format(item.price)}</span>
               <span className="col-lg-3 m-auto p-2"><b> واحد</b> : {PriceUnitEnums.filter((i:any)=>i.id===item.priceUnitId).map((i:any)=>i.name)}</span>
               <span className="col-lg-3 m-auto p-2"><b>تاریخ ثبت</b> : {new Date(item.createDate).toLocaleDateString('fa-IR')}</span>
               <span className="col-lg-3 m-auto p-2"><b>تاریخ پرداخت</b> : {new Date(item.installmentStartDate).toLocaleDateString('fa-IR')}</span>
               <span className="col-lg-3 m-auto p-2"><b>دوره اقساط </b> : {item.installmentPeriod}</span>
               <span className="col-lg-3 m-auto p-2"><b>تعداد اقساط </b> : {item.installmentOccureCount}</span>
               <span className="col-lg-3 m-auto p-2"> <b>وضعیت پرداخت</b> : {PaymentStatusEnums.filter((i:any)=>i.id===item.paymentStatusId).map((i:any)=>i.name)}</span>
               <span className="col-lg-3 m-auto p-2"> <b>نوع پرداخت</b> : {PaymentStructureEnums.filter((i:any)=>i.id===item.paymentMethodId).map((i:any)=>i.name)}</span>

               <span className="col-lg-3 m-auto p-2"><b>توضیحات </b> : {item.comment}</span>
               <span className="col-lg-3 m-auto p-2"><b></b></span>



               </div>
               </div>
               {/* <span className="col-lg-2 text-center  m-auto button-auction" > <Link className="border-0 bg-transparent non-hover edit-btn"  to={`/client/orderDetail/${item.id}`}>
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
          </Link> </span> */}
              
                    </div>
                    </div>
            </div>
            </div>
          )}
          <br/>
          <br/>
        <Pagination setPageNumber={setPageNumber} PageNumber={PageNumber} getDataBySearch={getDataByPage} PageSize={PageSize} total={totalCount} />
  
        </div>
        
      </div>
    </div>
    )}  else{
        return(<div className="text-center dashboard-widget">
            <AiOutlineWarning  size="5rem " color="gold"/>
<div>اطلاعاتی برای نمایش وجود ندارد</div>
        </div>)
    } 
    
}
export default InvoiceClient