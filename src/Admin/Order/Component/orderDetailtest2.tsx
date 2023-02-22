import { useParams } from "react-router-dom";
import { useEffect, useState, Fragment } from "react";
import { GetOrder, GetOrderDetails } from "../../../services/orderService";
import { NavLink } from "react-router-dom";
import {
  GetAllOrganisation,
  GetAllOrganisationCode,
} from "../../../services/organisationService";
import { GetAddress } from "../../../services/addressService";
import { 
  GetShoppingContracts,
  GetShoppings,
  GetShoppingsAdmin ,
} from "../../../services/ShippingService";
import { GetAttachments } from "../../../services/attachmentService";
import ImagePreviewer from "../../../Utils/ImagePreviewer";
import ExcelFileUploader from "../../../Utils/ExcelFileUploader";
import { UpdateShippingReport } from "../../../services/outScopeService";
import ProgressBar from "../../../Utils/progressBar";
import OrderAddress from "../../../Common/Shared/order/orderAddress";
import OrderWayBill from "../../../Common/Shared/order/OrderWayBill";
import OrderAttachment from "../../../Common/Shared/order/OrderAttachment";
import OrderInfo from "../../../Common/Shared/order/orderInfo";
import OrderCustomerInfo from "../../../Common/Shared/order/OrderCustomerInfo";
import OrderAdminDetail from "../../../Common/Shared/order/OrderAdminDetail";
import { MeasureUnitSample } from "../../../Common/Enums/MeasureUnitSample";
import { DeliveryMethods } from "../../../Common/Enums/DeliveryMethodsEnums";
import { OrderStatusEnumsProgressBar } from "../../../Common/Enums/OrderStatusEnumsProgressBar";
import FadeLoader from "react-spinners/FadeLoader";
import { GetOrderDetailsAdmin } from "../../../services/orderService";
import InvoicesForOrder from './../../../Common/Shared/order/InvoicesForOrder';

const OrderDetailTest: React.FC = () => {
  const params = useParams();
  let orderDetail: any = [];
  const [modalIsOpenUpload, setIsOpenUpload] = useState(false);
  const [modalIsOpenUploadExcel, setIsOpenUploadExcel] = useState(false);
  const [order, setOrder] = useState<any>([]);
  const [orderPaymentStatusId, setorderPaymentStatusId] = useState<any>();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenAddress, setIsOpenAddress] = useState(false);
  const [image, setImage] = useState({});
  const [customerDetail, setCustomerDetail] = useState<any>([]);
  const [product, setProduct] = useState([]);
  const [ShippingInformation, SetShippingInformation] = useState([]);
  const [organization, setOrganization] = useState([]);
  let [DetailAddress, setDetailAddress] = useState<any>([]);
  const [Shipping, SetShipping] = useState([]);
  const [OrderWeight, SetOrderWeight] = useState(0);
  let [loading, setLoading] = useState(false);

  const GetShipping = async () => {
    try {
      const { data, status } = await GetShoppingsAdmin(params.id);
      SetShipping(data.result.shippings.values);
    } catch (e) {
      console.log(e);


    }}
  const closeModal = () => {
    setIsOpen(false);
  };
  const closeModalForUpload = () => {
    setIsOpenUpload(false);
  };
  const closeModalIsOpenUploadExcel = () => {
    setIsOpenUploadExcel(false);
  };
  const openModalAddress = () => {
    setIsOpenAddress(true);
  };
  const closeModalAddress = () => {
    setIsOpenAddress(false);
  };
  const getOrganizationName = async () => {
    try {
      const { data, status } = await GetAllOrganisation();
      if (status === 200) {
        setOrganization(data.result.organizationLists.values);
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  const getOrder = async () => {
    try {
      const { data, status } = await GetOrder(Number(params.id));
      setCustomerDetail(data.result.order.customer);
      setOrder(data.result.order);
      setorderPaymentStatusId(data.result.order.paymentStatusId);
      SetShippingInformation(JSON.parse(data.result.order.extraData.data));
    } catch (err) {
      console.log(err);
    }}
   
    let entityId = params.id
   
  const bindAdress = async (arr:  any) => {
    let FilnalArr:  any = [];

    if (orderDetail.length > 1) {
      for (let i = 0; i < arr.length; i++) {
        try {
          const { data, status } = await GetAddress(11, arr[i].id);
          let detail = orderDetail.filter(
            (item:  any) => item.id === arr[i].id
          )[0];
          let address = data.result.addresses;
          const finallAddres = address.map((item:  any) => ({
            fullAddress: item.fullAddress,
            postalCode: item.postalCode,
            receiverTel: item.receiverTel,
            receiverMobile: item.receiverMobile,
            receiverName: item.receiverName,
          }))[0];

          let obj = { ...detail, ...finallAddres };
          FilnalArr.push(obj);
          setDetailAddress(FilnalArr);
        } catch (e) {
          console.log(e);
        }
      }
    } else {
      for (let i = 0; i < orderDetail.length; i++) {
        try {
          const { data, status } = await GetAddress(10, arr[i].orderId);
          let detail = orderDetail.filter(
            (item:  any) => item.orderId === arr[i].orderId
          )[0];
          let address = data.result.addresses;
          const finallAddres = address.map((item:  any) => ({
            fullAddress: item.fullAddress,
            postalCode: item.postalCode,
            receiverTel: item.receiverTel,
            receiverMobile: item.receiverMobile,
            receiverName: item.receiverName,
          }))[0];

          let obj = { ...detail, ...finallAddres };
          FilnalArr.push(obj);
          setDetailAddress(FilnalArr);
        } catch (e) {
          console.log(e);
        }
      }
    }
  };
  const returnHavaleSum = () => {
    var sum = 0;

    if (Shipping) {
      Shipping.forEach((item:  any) => (sum += item.plannedQuantity));
    }

    return sum;
  };

  const returnBarbariSum = () => {
    var sum = 0;

    if (Shipping) {
      Shipping.forEach((item:  any) => (sum += item.shippedQuantity));
    }
    return sum;
  };

  const getOrderDetail = async () => {
    try {
      const { data, status } = await GetOrderDetailsAdmin(Number(params.id));
      if (status === 200) {
        orderDetail = data.result.orderDetails;
        setProduct(data.result.orderDetails[0].product);

        await bindAdress(orderDetail);

        var sum = 0;
        orderDetail.forEach((item:  any) => (sum += item.quantity));
        SetOrderWeight(sum);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getOrder();
    getOrderDetail();
    GetShipping();
    getOrganizationName();
  }, []);
  const handelPreview = (item:  any) => {
    setImage(item);
    setIsOpen(true);
  };
  const customerName = () => {
    let fName = customerDetail.firstName;
    let lName = customerDetail.lastName;
    let OName;
    let fullname;
    if (customerDetail.organizationId > 0) {
      OName = organization
        .filter((item:  any) => item.id === customerDetail.organizationId)
        .map((item:  any) => item.name);
      fullname = `${OName ? OName : ""}`;
    } else {
      fullname = `${fName ? fName : ""} ${lName ? lName : ""}`;
    }

    return fullname;
  };

 
  const update = async () => {
    setLoading(true);
    try {
      const { data, status } = await UpdateShippingReport();
      if (status === 200) {
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
   
   
  }}
  let orderDetailId;
  let measureUnitId;
  let detailAddress:  any;
  var sumTakhsis = 0;

  if (DetailAddress.length > 0) {
    let count = DetailAddress.length;
    orderDetailId = DetailAddress.filter((item:  any) => item.extId === null)[0]
      ? DetailAddress.filter((item:  any) => item.extId === null)[0].id
      : DetailAddress[count - 1].id;
    measureUnitId = DetailAddress[0].measureUnitId;
    detailAddress = DetailAddress;

    let newArr = DetailAddress.filter((item:  any) => item.extId !== null);

    if (newArr.length > 0) {
      newArr.forEach((item:  any) => (sumTakhsis += item.quantity));
    } else {
      sumTakhsis = 0;
    }
  }

  const number = OrderStatusEnumsProgressBar.filter(
    (item) => item.id === order.orderStatusId
  ).map((item) => item.number)[0];

    return (
        <Fragment>
            <div className='user-progress'>
                <div>
                    <div className="shadow border border-2" >
                        <OrderCustomerInfo order={order} product={product} customerDetail={customerDetail} customerName={customerName} />
                        {number !== 12 || number >= 4 ? <OrderInfo orderWeight={OrderWeight} TakhsisWeight={sumTakhsis} havalehWeight={returnHavaleSum()} barbariWeight={returnBarbariSum()} /> : ''}
                    </div>
                    <div className=" statbox widget-content widget-content-area text-dark ">
                        <ProgressBar number={number} id={order.orderStatusId} />
                        {number === 12 || number < 4 ? <><OrderAdminDetail getOrder={getOrder} handelPreview={handelPreview}  order={order} orderDetail={DetailAddress} />
                           <OrderAttachment order={order} params={params} 
                                closeModalForUpload={closeModalForUpload}
                                modalIsOpenUpload={modalIsOpenUpload}
                                setIsOpenUpload={setIsOpenUpload}
                                handelPreview={handelPreview} />
                        </> :
                            (
                                <>

                                    <OrderAddress details={detailAddress} orderWeight={OrderWeight} TakhsisWeight={sumTakhsis} getOrder={getOrder} order={order} paymentStatus={orderPaymentStatusId} />
                                    <OrderWayBill loading={loading} idOrder={params.id}  />

                                     <OrderAttachment order={order} params={params} 
                                        closeModalForUpload={closeModalForUpload}
                                        modalIsOpenUpload={modalIsOpenUpload}
                                        setIsOpenUpload={setIsOpenUpload}
                                        handelPreview={handelPreview} />  
                                    <InvoicesForOrder Order={order} />

                                </>)}

                        <ImagePreviewer modalIsOpen={isOpen} closeModal={closeModal} item={image} isUser={false} orderStatus={number} />

                    </div>
                </div>
                <div className="py-5 ">
                    <button className="btn btn-danger  float-right m-1 ">
                        <NavLink className="text-light" to='/admin/orderList'>بازگشت</NavLink>
                    </button>
                </div>
                <ExcelFileUploader modalIsOpen={modalIsOpenUploadExcel} closeModal={closeModalIsOpenUploadExcel}
                    EntityId={orderDetailId} EntityTypesId={11}
                    comment={'لطفا فایل اکسل مطابق نمونه اطلاعات ارسال را بارگزاری کنید'} />
            </div>
        </Fragment>
    )
}
export default OrderDetailTest