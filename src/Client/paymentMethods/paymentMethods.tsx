import { AiOutlineWarning } from "react-icons/ai";
import { useSelector } from "react-redux";
import { GetPaymentMethods } from "../../services/invoiceService";
import { RootState } from "../../store";
import QueryString from "qs";
import { useEffect, useState } from "react";
import { PaymentStructureEnums } from "../../Common/Enums/PaymentStructureEnums";

const PaymentMethodComponent: React.FC = () => {
  const [paymentId, setPaymentId] = useState([]);
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
  useEffect(() => {
    paymentMethodsGroup();
  }, []);
  if (payments) {
    return (
      <div className="row">
        <div id="tabsIcons" className="col-lg-12 col-12 layout-spacing">
          <div className="dashboard-widget">
            <div className=" icon-tab">
              <ul
                className="nav nav-tabs  mb-3 mt-3"
                id="iconTab"
                role="tablist"
              >
                {paymentId.map((item:any)=>

               
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    id="icon-home-tab"
                    data-toggle="tab"
                    href={item.tabIndex}
                    role="tab"
                    aria-controls="icon-home"
                    aria-selected="true"
                  >
                  {item.tabName}
                  </a>
                </li>
                 )}
              </ul>
              <div className="tab-content" id="iconTabContent-1">
              {paymentId.map((item:any)=>
                <div
                  className={item.tabIndex ===1 ?"tab-pane fade p-2 show active ": "tab-pane fade p-2"}
                  id={item.tabIndex}
                  role="tabpanel"
                  aria-labelledby="icon-home-tab"
                >
                    <h6 className="float-left "><b>مجموع اسناد قابل پرداخت:</b> {item.totalValue}</h6>   
                    <h6 className="float-right"><b>    نحوه پرداخت: </b> {PaymentStructureEnums.filter((i:any)=> i.id === item.paymentMethodId).map((i:any)=> i.name)}</h6>   

                  <p className="mb-4 d-block clearfixed">
                    {item.message}
                  </p>

                 
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
