import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  GetInvoicesWithSearch,
  GetPaymentMethods,
} from "../../services/invoiceService";
import Pagination from "../../Utils/pagination";
import QueryString from "qs";
import { AiOutlineWarning } from "react-icons/ai";
import { InvoceTypes } from "../../Common/Enums/InvoiceTypeIdEnums";
import { PriceUnitEnums } from "../../Common/Enums/PriceUnit";
import { PaymentStatusEnums } from "../../Common/Enums/PaymentStatus";
import { PaymentStructureEnums } from "../../Common/Enums/PaymentStructureEnums";
import { PaymentMethod } from "../../store/Slice/PaymentMethods/PaymentMethods";
import { useDispatch } from "react-redux";
import { BsTrash } from "react-icons/bs";

const InvoiceClient: React.FC = () => {
  const location = useLocation();

  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [invoices, SetInvoice] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [PageNumber, setPageNumber] = useState( getPage().PageNumber ? getPage().PageNumber : 0);
  const [PageSize, setPageSize] = useState( getPage().PageSize ? getPage().PageSize : 5);
  const [newInvoices, setNewInvoices] = useState<any>([]);
  let invoiceOrder= location.state === "fromOrderClient" ? JSON.parse(String(sessionStorage.getItem(`param/client/invoice`))) : null
  let invoicePaymentId = location.state === "fromPaymentClient" ? JSON.parse(String(sessionStorage.getItem(`param/client/invoice/paymentId`))) : null;
  
 
  const checkValueee = (id: any) => {
    const clonedData = [...newInvoices];
    setNewInvoices(
      clonedData.map((i:any) => (i.id === id ? { ...i, active: !i.active } : i))
    )
   
  };
  const filterInvoice = newInvoices
    .filter((item: any) => item.active === true)
    .map((item: any) => item);
    const finallInvoice = filterInvoice.map((item: any) => item.id);

  const param = { PageSize, PageNumber };
  function getPage() {
    let items = JSON.parse(
      String(sessionStorage.getItem(`param${window.location.pathname}`))
    );
    return items ? items : "";
  }

  const GetIvoices = async () => {
    
      let config = {
        headers: { "Content-Type": "application/json" },
        params: {
          PaymentId:location.state === "fromPaymentClient" ? invoicePaymentId && invoicePaymentId[0] :"",
          EntityTypeId:location.state === "fromOrderClient" ? 10:"",
          EntityId:location.state === "fromOrderClient" ? invoiceOrder[0] :"",
          PageNumber,
          PageSize,
        },
        paramsSerializer: (params: any) => {
          return QueryString.stringify(params);
        },
      };
      try {
        const { data, status } = await GetInvoicesWithSearch(config);
        if (status === 200) {
          SetInvoice(data.result.invoices.values);
          setTotalCount(data.result.invoices.totalCount);
          setNewInvoices(data.result.invoices.values.map((item:any) =>({
            ...item,active:false
          })));
        }
      } catch (err) {
        console.log(err);
      }
    
  };
  
  
  const getDataByPage = async () => {
    let config = {
      headers: { "Content-Type": "application/json" },
      params: {

        PageNumber,
        PageSize,
      },
      paramsSerializer: (params: any) => {
        return QueryString.stringify(params);
      },
    };

    try {
      const { data, status } = await GetInvoicesWithSearch(config);
      if (status === 200) {
        SetInvoice(data.result.invoices.values);
        setTotalCount(data.result.invoices.totalCount);
       
        setNewInvoices(data.result.invoices.values.map((item:any) =>({
          ...item,active:false
        })));

      }
    } catch (err) {
      console.log(err);
    }
  };
  const paymentMethodsGroup = async () => {
    let config = {
      headers: { "Content-Type": "application/json" },
      params: {
        InvoiceIds: finallInvoice,
      },
      paramsSerializer: (params: any) => {
        return QueryString.stringify(params);
      },
    };

    try {
      const { data, status } = await GetPaymentMethods(config);
      if (status === 200) {
        dispatch(PaymentMethod(finallInvoice));
        sessionStorage.setItem(
          `param/client/PaymentMethod`,
          JSON.stringify(finallInvoice)
        );

        navigate("/client/PaymentMethod");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const paymentMethodSingel = async (id: any) => {
    let config = {
      headers: { "Content-Type": "application/json" },
      params: {
        InvoiceIds: id,
      },
      paramsSerializer: (params: any) => {
        return QueryString.stringify(params);
      },
    };

    try {
      const { data, status } = await GetPaymentMethods(config);
      if (status === 200) {
        dispatch(PaymentMethod([id]));
        sessionStorage.setItem(
          `param/client/PaymentMethod`,
          JSON.stringify([id])
        );

        navigate("/client/PaymentMethod");
      }
    } catch (err) {
      console.log(err);
    }
  };
  let formatterForMoney = new Intl.NumberFormat("fa-IR", {
    currency: "IRR",
  });
  
  if (invoices) {
    return (
      <div>
        <div className="text-left pb-3">
          {location.state === "fromOrderClient" ? <span className="bg-light rounded p-2  ">
            {" "}
            صورت حساب های سفارش {invoiceOrder && invoiceOrder[0]}{" "}
            
          </span> :null}
          {location.state === "fromPaymentClient" ? <span className="bg-light rounded p-2  ">
            {" "}
            صورت حساب های پرداخت {invoicePaymentId && invoicePaymentId[0]}{" "}
            
          </span> :null}
        </div>
        <div className=" text-right ">
          <button
            className="border-0 btn-success btn non-hover mb-2"
            onClick={paymentMethodsGroup}
            hidden={finallInvoice.length === 0 ? true : false}
          >
            پرداخت دسته جمعی
          </button>
          <div>
            {invoices.map((item: any, index: any) => (
              <div key={index} className="col-sm-10 col-md-12 m-1">
                <div className="  auction-item-2 text-center  ">
                  <div className="auction-content">
                    <div className=" row bid-area">
                      <span className="col-lg-1 text-center  m-auto button-auction">
                        {item.paymentStatusId === 3 ? null : (
                          <input
                            id={`custom-checkbox-${index}`}
                            checked={item.active}
                            type="checkbox"
                            required
                            value={item}
                            name={item}
                            onClick={(event) => checkValueee(item.id)}
                          />
                        )}
                      </span>

                      <div className="col-lg-9">
                        <div className="row">
                          <span className="col-lg-3 m-auto p-2">
                            <b>نوع صورتحساب </b>:{" "}
                            {InvoceTypes.filter(
                              (i: any) => i.id === item.invoiceTypeId
                            ).map((item: any) => item.name)}
                          </span>
                          <span className=" col-lg-3 m-auto p-2 ">
                            {" "}
                            <b>شناسه</b>: {item.entityId}
                          </span>
                          <span className="col-lg-3 m-auto p-2">
                            {" "}
                            <b>قیمت </b>: {formatterForMoney.format(item.price)}
                          </span>
                          <span className="col-lg-3 m-auto p-2">
                            <b> واحد</b> :{" "}
                            {PriceUnitEnums.filter(
                              (i: any) => i.id === item.priceUnitId
                            ).map((i: any) => i.name)}
                          </span>
                          <span className="col-lg-3 m-auto p-2">
                            <b>تاریخ ثبت</b> :{" "}
                            {new Date(item.createDate).toLocaleDateString(
                              "fa-IR"
                            )}
                          </span>
                          <span className="col-lg-3 m-auto p-2">
                            <b>تاریخ پرداخت</b> :{" "}
                            {item.installmentStartDate !==null ?new Date(
                              item.installmentStartDate
                            ).toLocaleDateString("fa-IR"):"--"}
                          </span>
                          <span className="col-lg-3 m-auto p-2">
                            <b>دوره اقساط </b> : {item.installmentPeriod}
                          </span>
                          <span className="col-lg-3 m-auto p-2">
                            <b>تعداد اقساط </b> : {item.installmentOccureCount}
                          </span>
                          <span className="col-lg-3 m-auto p-2">
                            {" "}
                            <b>وضعیت پرداخت</b> :{" "}
                            {PaymentStatusEnums.filter(
                              (i: any) => i.id === item.paymentStatusId
                            ).map((i: any) => i.name)}
                          </span>
                          <span className="col-lg-3 m-auto p-2">
                            {" "}
                            <b>نوع پرداخت</b> :{" "}
                            {PaymentStructureEnums.filter(
                              (i: any) => i.id === item.paymentMethodId
                            ).map((i: any) => i.name)}
                          </span>

                          <span className="col-lg-3 m-auto p-2">
                            <b>توضیحات </b> : {item.comment}
                          </span>
                          <span className="col-lg-3 m-auto p-2">
                            <b></b>
                          </span>
                        </div>
                      </div>
                      <span className="col-lg-2 text-center  m-auto button-auction">
                        {item.paymentStatusId === 5||item.paymentStatusId === 4||item.paymentStatusId === 2||item.paymentStatusId === 1 ? (
                           
                          <button
                            className="border-0 btn-success btn non-hover "
                            onClick={() => {
                              paymentMethodSingel(item.id);
                            }}
                            hidden={finallInvoice.length === 0 ? false : true}
                          >
                            پرداخت
                          </button>
                        ): (<Link
                        className="border-0 bg-transparent non-hover edit-btn"
                        to={`/client/payment`}
                    state="fromInvoiceClient"
                      >
                        <button className="border-0 bg-transparent  non-hover "   onClick={ ()=>sessionStorage.setItem(`param/client/payment/invoice`, JSON.stringify([item.id]))}>
                          {" "}
                          مشاهده پرداخت ها
                        </button></Link>
                      )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <br />
            <br />
            <Pagination
              setPageNumber={setPageNumber}
              PageNumber={PageNumber}
              getDataBySearch={location.state ? GetIvoices :getDataByPage}
              PageSize={PageSize}
              total={totalCount}
            />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className="text-left pb-3">
        {location.state === "fromOrderClient" ? <span className="bg-light rounded p-2  ">
            {" "}
            صورت حساب های سفارش {invoiceOrder && invoiceOrder[0]}{" "}
            
          </span> :null}
          {location.state === "fromPaymentClient" ? <span className="bg-light rounded p-2  ">
            {" "}
            صورت حساب های پرداخت {invoicePaymentId && invoicePaymentId[0]}{" "}
            
          </span> :null}
        </div>
        <div className="text-center dashboard-widget">
          <AiOutlineWarning size="5rem " color="gold" />
          <div>اطلاعاتی برای نمایش وجود ندارد</div>
        </div>
      </div>
    );
  }
};
export default InvoiceClient;
