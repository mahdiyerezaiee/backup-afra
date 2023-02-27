import QueryString from "qs";
import { useEffect, useState } from "react";
import { HiOutlineUserCircle } from "react-icons/hi";
import { useParams } from "react-router-dom";
import { GaugeChartCustom } from "../../../Common/Shared/Chart/GaugeChartCustom";
import { GetAttachments } from "../../../services/attachmentService";
import { GetCustomerBrief } from "../../../services/reportService";
import InvoicesForReportBrief from "./invoiceForReportBrief";
import OrderReportBrief from "./OrderReportBrief";
import OrderWayBillReportBrief from "./orderWayBillReportBrief";
const attachmetURL = (window as any).globalThis.stie_att;

const CustomerBrief: React.FC = () => {
  const params = useParams();
  const [Berief, setBrief] = useState<any>([]);
  const [customer, setCustomer] = useState<any>({});
  const [ordersBrief, setOrdersBrief] = useState<any>({});
  const [shippingsBrief, setShippingsBrief] = useState<any>([]);
  const [attachments, Setattachments] = useState([]);

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
  let newAttachment: any = [];
  newAttachment = attachments.filter((item: any) => item.deleted === false);

  if (Berief.length !== 0) {
    return (
      <div className=" statbox widget-content widget-content-area">
        <div className="row  ">
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
            <div className="row mt-2">
              {ordersBrief.totalBought !== 0 ? (
                <div className="col-6  text-center">
                  <h4>سفارشات</h4>
                  <GaugeChartCustom
                    labels={["کل خرید", "صورت حساب ها", "پرداخت شده ها"]}
                    data1={ordersBrief.totalBought}
                    data2={ordersBrief.totalInvoices}
                    data3={ordersBrief.totalPaid}
                  />
                  <p> کل خرید : {ordersBrief.totalBought}</p>

                  <p> صورت حساب ها : {ordersBrief.totalInvoices}</p>

                  <p> پرداخت شده ها : {ordersBrief.totalPaid}</p>
                  <br />
                </div>
              ) : null}
              <div className="col-6 text-center">
                {shippingsBrief.map((item: any) =>
                  item.totalShippingRequest !== 0 ? <h4>حواله</h4> : null
                )}
                {shippingsBrief.map((item: any) =>
                  item.totalShippingRequest !== 0 ? (
                    item.measureUnitId === 5 ? (
                      <>
                        <GaugeChartCustom
                          labels={[" کل درخواست های ارسال", "  ارسال شده ها"]}
                          data1={item.totalShippingRequest}
                          data2={item.totalShipped}
                          data3={null}
                        />
                        <p>ارسال شده : {item.totalShipped}</p>

                        <p>
                          کل درخواست های ارسال : {item.totalShippingRequest}
                        </p>
                        <br />
                        <span>وزنی</span>
                      </>
                    ) : (
                      <>
                        <GaugeChartCustom
                          labels={[" کل درخواست های ارسال", "  ارسال شده ها"]}
                          data1={item.totalShippingRequest}
                          data2={item.totalShipped}
                          data3={null}
                        />
                        <p>ارسال شده : {item.totalShipped}</p>
                        <p>
                          کل درخواست های ارسال : {item.totalShippingRequest}
                        </p>
                        <br />
                        <span>تعدادی</span>
                      </>
                    )
                  ) : null
                )}
              </div>
            </div>
          </div>
        </div>
        <OrderWayBillReportBrief idCustomer={params.id}/>
        <InvoicesForReportBrief CustomerUserName={customer.userName}/>
<OrderReportBrief UserName={customer.userName}/>
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
