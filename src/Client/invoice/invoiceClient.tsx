import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GetInvoicesWithSearch, GetPaymentMethods } from "../../services/invoiceService";
import Pagination from "../../Utils/pagination";
import QueryString from 'qs';
import { AiOutlineWarning } from "react-icons/ai";
import { InvoceTypes } from "../../Common/Enums/InvoiceTypeIdEnums";
import { PriceUnitEnums } from "../../Common/Enums/PriceUnit";
import { PaymentStatusEnums } from "../../Common/Enums/PaymentStatus";
import { PaymentStructureEnums } from "../../Common/Enums/PaymentStructureEnums";
import { PaymentMethod } from "../../store/Slice/PaymentMethods/PaymentMethods";
import { useDispatch } from "react-redux";

const InvoiceClient:React.FC =()=>{
    const [invoices, SetInvoice] = useState([])
    const [totalCount, setTotalCount] = useState(0);
    const [PageNumber, setPageNumber] = useState( getPage().PageNumber?getPage().PageNumber:0)
    const [PageSize, setPageSize] = useState(getPage().PageSize?getPage().PageSize:5)
    const [active, setActive] = useState<any>([])
    const activity = active.map((data:any )=> ({active: data}))
    const [newInvoices , setNewInvoices] = useState<any>([])
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const mergeById = (a1:any, a2:any) =>
        a1.map((itm:any, index1:any) => ({
            ...a2.find((item:any, index:any) => index === index1 && item),
            ...itm,
        }));
    useEffect(() => {
if(invoices){

  if (active.length === 0) {
    setActive(new Array( invoices.length ).fill(false))
}
setNewInvoices(mergeById(invoices, activity))
}

    }, [active])
    const checkValueee = (position:any) => {
      const updatedCheckedState = active.map((item:any, index:any) =>
          index === position ? !item : item
      );
      setActive(updatedCheckedState);
  }
const filterInvoice = newInvoices.filter((item:any )=> item.active === true).map((item:any)=>  item)
const finallInvoice= filterInvoice.map((item:any)=> item.id )
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
      const paymentMethodsGroup = async () => {
        let config = {
          headers: { 'Content-Type': 'application/json' },
          params: {
            InvoiceIds:finallInvoice
          },
          paramsSerializer: (params:any) => {
            return QueryString.stringify(params)
          }
        };
    
        try {
            const { data, status } = await GetPaymentMethods(config);
            if (status === 200) {
               dispatch(PaymentMethod(finallInvoice))
               sessionStorage.setItem(`param/client/PaymentMethod`, JSON.stringify(finallInvoice));

navigate("/client/PaymentMethod")
            }
        } catch (err) {
          console.log(err)
        }
    
      }
      const paymentMethodSingel = async (id:any) => {
        let config = {
          headers: { 'Content-Type': 'application/json' },
          params: {
            InvoiceIds:id
          },
          paramsSerializer: (params:any) => {
            return QueryString.stringify(params)
          }
        };
    
        try {
            const { data, status } = await GetPaymentMethods(config);
            if (status === 200) {
             
              dispatch(PaymentMethod([id]))
              sessionStorage.setItem(`param/client/PaymentMethod`, JSON.stringify([id]));

              navigate("/client/PaymentMethod")
            }
        } catch (err) {
          console.log(err)
        }
    
      }
      let formatterForMoney = new Intl.NumberFormat('fa-IR', {
           currency: 'IRR'
        });
   if(invoices){
    return (
    <div>
   <div className=" text-right ">
   <button className="border-0 btn-success btn non-hover mb-2" onClick={paymentMethodsGroup} hidden={finallInvoice.length === 0 ? true :false}>
پرداخت دسته جمعی
               </button>
        <div>
          {invoices.map((item:any , index:any) =>
            <div className="col-sm-10 col-md-12 m-1">

  
            <div className="  auction-item-2 text-center  ">
            <div className="auction-content">
                <div className=" row bid-area">
                    <span className="col-lg-1 text-center  m-auto button-auction" > 
                    <input
                                            id={`custom-checkbox-${index}`}
                                            checked={active[index]}
                                            type="checkbox"
                                            required
                                            value={item}
                                            name={item}
                                            onClick={(event) => checkValueee(index)}
                                        />
                     </span> 
              
                    <div className="col-lg-10">
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
               <span className="col-lg-1 text-center  m-auto button-auction" > 
               <button className="border-0 btn-success btn-sm non-hover "  onClick={()=>{paymentMethodSingel(item.id)}} hidden={finallInvoice.length === 0 ? false :true}>
پرداخت
               </button>
           </span> 
              
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