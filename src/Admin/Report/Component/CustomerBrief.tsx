import QueryString from "qs";
import { Fragment, useEffect, useState } from "react";
import GaugeChart from "react-gauge-chart";
import { HiOutlineUserCircle } from "react-icons/hi";
import { useParams,useNavigate } from "react-router-dom";
import { GaugeChartCustom } from "../../../Common/Shared/Chart/GaugeChartCustom";
import { GetAttachments } from "../../../services/attachmentService";
import { GetCustomerBrief } from "../../../services/reportService";
import InvoicesForReportBrief from "./invoiceForReportBrief";
import OrderReportBrief from "./OrderReportBrief";
import OrderWayBillReportBrief from "./orderWayBillReportBrief";
import { AiOutlineArrowRight } from 'react-icons/ai';
const attachmetURL = (window as any).globalThis.stie_att;

const CustomerBrief: React.FC = () => {
  const params = useParams();
  const [Berief, setBrief] = useState<any>([]);
  const [customer, setCustomer] = useState<any>({});
  const [ordersBrief, setOrdersBrief] = useState<any>({});
  const [shippingsBrief, setShippingsBrief] = useState<any>([]);
  const [attachments, Setattachments] = useState([]);
  const navigate = useNavigate()
  const GetBerief = async () => {
    try {
      const { data, status } = await GetCustomerBrief(params.id);
      setBrief(data.result.customerBrief);
      setCustomer(data.result.customerBrief.customer);
      setOrdersBrief(data.result.customerBrief.ordersBrief);
      setShippingsBrief(data.result.customerBrief.shippingsBrief);
    } catch (err) {
      console.log(err);
    }
  };
  const handelGetAttachment = async () => {
    let config = {
      headers: { "Content-Type": "application/json" },
      params: {
        entityTypeId: 1,
        entityId: params.id,
      },
      paramsSerializer: (params: any) => {
        return QueryString.stringify(params);
      },
    };
    try {
      const { data, status } = await GetAttachments(config);
      if (status === 200) {
        Setattachments(data.result.attachments);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetBerief();
    handelGetAttachment();
  }, []);
  const handelBack = () => {
    navigate(-1)
}
  var formatter = new Intl.NumberFormat('fa-IR', {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
});
  let newAttachment: any = [];
  newAttachment = attachments.filter((item: any) => item.deleted === false);

  if (Berief.length !== 0) {
    return (
      <div className=" statbox widget-content widget-content-area">
        <div className="row  ">
        <button className="border-0 bg-transparent  edit-btn float-left" onClick={handelBack}><AiOutlineArrowRight size={'2rem'} /></button>

          <div className="col-12  rounded shadow mb-2  p-4">
            <div className="row">
              <div className="col-lg-3">
                {newAttachment.length !== 0 ? (
                  <img
                    src={`${attachmetURL}${newAttachment[0].path}`}
                    className="rounded-circle border "
                    alt={`${customer.fullName}`}
                    style={{ height: "150px", width: "150px" }}
                  />
                ) : (
                  <HiOutlineUserCircle size="5rem" />
                )}
              </div>
              <div className="col-lg-9 ">
                <div className="row p-0 m-0">
                  <div className="col-lg-4 my-2">
                    <span>نام</span> : {customer.fullName}
                  </div>
                  <div className="col-lg-4 my-2">
                    <span>کد ملی</span> : {customer.nationalCode}
                  </div>
                  <div className="col-lg-4 my-2">
                    <span>شناسه</span> : {customer.userName}
                  </div>
                  <div className="col-lg-4 my-2">
                    <span>نام سازمان</span> :{" "}
                    {customer.organizationName
                      ? customer.organizationName
                      : "--"}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 ">
            <div className="row mt-2 text-center">
                <div className="col-12  ">
                  <div className="row">
                  {ordersBrief.totalBought !== 0 ? (
<Fragment>
  
                

                    <div className="col-4 ">
                    <h4>سفارشات</h4>

                      <span>براساس پرداخت شده ها</span>
                      <GaugeChart
                        id="gauge-chart6"
                        colors={["#5685ff47", "#51f4eb42"]}
                        arcWidth={0.3}
                        style={{fontSize:"14.0497px"}}

                        textColor="#000"
                        formatTextValue={() =>formatter.format( ordersBrief.totalPaid)}
                        percent={
                          ordersBrief.totalPaid / ordersBrief.totalBought
                        }
                      />
                      <p> کل خرید : {formatter.format( ordersBrief.totalBought)}</p>

                      <p> پرداخت شده ها : {formatter.format( ordersBrief.totalPaid)}</p>
                    </div>
                    <div className="col-4 ">
                    <h4>سفارشات</h4>

                      <span>براساس صورت حساب ها</span>
                      <GaugeChart
                        id="gauge-chart6"
                        colors={["#5685ff47", "#51f4eb42"]}
                        arcWidth={0.3}
                        style={{fontSize:"14.0497px"}}

                        textColor="#000"
                        formatTextValue={() => formatter.format( ordersBrief.totalInvoices)}
                        percent={
                          ordersBrief.totalInvoices / ordersBrief.totalBought
                        }
                      />
                      <p> کل خرید : {formatter.format( ordersBrief.totalBought)}</p>

                      <p> صورت حساب ها : {formatter.format( ordersBrief.totalInvoices)}</p>
                    </div></Fragment>) : null}
                    <div className="col-4 text-center">
                {shippingsBrief.map((item: any) =>
                  item.totalShippingRequest !== 0 ? <h4>حواله</h4> : null
                )}
                {shippingsBrief.map((item: any) =>
                  item.totalShippingRequest !== 0 ? (
                    item.measureUnitId === 5 ? (
                      <>
                        <span>وزنی</span>
                        <GaugeChart
                          id="gauge-chart6"
                          //  nrOfLevels={10}
                          colors={["#5685ff47", "#51f4eb42"]}
                          arcWidth={0.3}
                          style={{fontSize:"14.0497px"}}
                          textColor="#000"
                          formatTextValue={() =>formatter.format(  item.totalShipped) }
                          percent={
                            item.totalShipped / item.totalShippingRequest
                          }
                        />
                        <p>ارسال شده : {formatter.format( item.totalShipped)}</p>

                        <p>
                          کل درخواست های ارسال : {formatter.format( item.totalShippingRequest)}
                        </p>
                        <br />
                      </>
                    ) : (
                      <>
                        <span>تعدادی</span>
                        <GaugeChart
                          id="gauge-chart6"
                          nrOfLevels={10}
                          colors={["#5685ff47", "#51f4eb42"]}
                          arcWidth={0.3}
                          percent={
                            item.totalShipped / item.totalShippingRequest
                          }
                        />
                        <p>ارسال شده : {item.totalShipped}</p>
                        <p>
                          کل درخواست های ارسال : {item.totalShippingRequest}
                        </p>
                        <br />
                      </>
                    )
                  ) : null
                )}
              </div>
                  </div>
                </div>
              
              
            </div>
          </div>
        </div>
        <OrderWayBillReportBrief idCustomer={params.id} />
        <InvoicesForReportBrief CustomerUserName={customer.userName} />
        <OrderReportBrief UserName={customer.userName} />
      </div>
    );
  } else {
    return (
      <div className=" statbox widget-content widget-content-area text-center">
        اطلاعات کاربر کامل نیست
      </div>
    );
  }
};
export default CustomerBrief;
