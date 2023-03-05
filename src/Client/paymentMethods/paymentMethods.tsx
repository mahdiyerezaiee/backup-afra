import { AiOutlineWarning } from "react-icons/ai";
import { useSelector } from "react-redux";
import { GetPaymentMethods } from "../../services/invoiceService";
import { RootState } from "../../store";
import QueryString from "qs";
import { useEffect, useState } from "react";
import { PaymentStructureEnums } from "../../Common/Enums/PaymentStructureEnums";
import ImageUploaderForPayment from "../../Utils/ImageUploaderForPayment";
import { GetInvoicePayments, GetPayments } from './../../services/paymentService';

const PaymentMethodComponent: React.FC = () => {
  const [paymentId, setPaymentId] = useState([]);
  const [currentTab, setCurrentTab] = useState(1);
  const [currentPay, SetCurrentPay] = useState<any>([])

  let payments = JSON.parse(
    String(sessionStorage.getItem(`param/client/PaymentMethod`))
  );
  const paymentMethodsGroup = async () => {
    let config = {
      headers: { "Content-Type": "application/json" },
      params: {
        InvoiceIds: payments,
      },
      paramsSerializer: (params: any) => {
        return QueryString.stringify(params);
      },
    };

    try {
      const { data, status } = await GetPaymentMethods(config);
      if (status === 200) {
        setPaymentId(data.result.paymentMethods);
      }
    } catch (err) {
      console.log(err);
    }
  };

  var formatter = new Intl.NumberFormat('fa-IR', { maximumFractionDigits: 0, 
    minimumFractionDigits: 0, });
  const getCurrentPaids = async () => {
    let pays = []

    for (let i = 0; i < payments.length; i++) {



      try {
        const { data, status } = await GetInvoicePayments(payments[i])

        if (status === 200) {

          pays.push(...data.result.payments)

        }
      } catch (error) {

      }


      SetCurrentPay(pays)
    }

    console.log(pays);

  }
  useEffect(() => {
    paymentMethodsGroup();
    getCurrentPaids()
  }, []);
  const handleTabClick = (id: any) => {
    setCurrentTab(id);
  }




  if (payments) {
    return (
      <div className="row">
        <div id="tabsIcons" className="col-lg-12 col-12 layout-spacing">
          <div className="dashboard-widget p-4">
            <div className=" icon-tab">
              <ul
                className="nav nav-tabs  mb-3 mt-3"
              // id="iconTab"
              // role="tablist"
              >
                {paymentId.map((item: any, i: any) =>


                  <li className="nav-item">
                    <button
                      onClick={() => handleTabClick(item.tabIndex)}
                      key={i}
                      id={item.tabIndex}

                      className={currentTab === item.tabIndex ? "nav-link active " : " nav-link "}

                    >
                      {item.tabName}
                    </button>
                  </li>
                )}
              </ul>
              <div className="tab-content" >
                {paymentId.map((item: any) =>

                  <div id={item.tabIndex}

                    className={currentTab === item.tabIndex ? "tab-pane fade p-2 show active " : "null"}>
                    {currentTab === item.tabIndex &&
                      <div>
                        <h6 className="float-left "><b>مجموع اسناد قابل پرداخت:</b> {item.totalValue}</h6>
                        <h6 className="float-right"><b>    نحوه پرداخت: </b> {PaymentStructureEnums.filter((i: any) => i.id === item.paymentMethodId).map((i: any) => i.name)}</h6>

                        <p className="mb-4 d-block clearfixed">
                          {item.message}
                        </p>
                        <br></br>
                        {currentPay.length > 0 ?
                          <div><table className='table text-center table-striped'>
                          <thead>
                              <tr>
                                  <th>#</th>
                                  <th>کدرهگیری</th>
                                  <th>مبلغ</th>
      
                              </tr>
                          </thead>
      
                          <tbody>
                              {currentPay.map((i:any) => (
                                  <tr>
                                      <td>{i.id}</td>
                                      <td>{i.trackingCode}</td>
                                      <td>{formatter.format(i.price)}</td>
                                  </tr>
      
                              ))}
                          </tbody>
      
                      </table></div> : < ImageUploaderForPayment data={paymentId} index={item.tabIndex} Ids={payments} />}
                      </div>}



                  </div>

                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="text-center dashboard-widget">
        <AiOutlineWarning size="5rem " color="gold" />
        <div>اطلاعاتی برای نمایش وجود ندارد</div>
      </div>
    );
  }
};
export default PaymentMethodComponent;
