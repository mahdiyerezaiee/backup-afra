import { useParams } from "react-router-dom";
import { useEffect, useState, Fragment } from "react";
import { GetOrder, GetOrderDetails } from "../../services/orderService";
import { NavLink } from "react-router-dom";
import { GetAllOrganisation, GetAllOrganisationCode } from "../../services/organisationService";
import { GetAddress } from "../../services/addressService";
import { GetShoppingContracts, GetShoppings } from "../../services/ShippingService";
import QueryString from 'qs';
import { GetAttachments } from "../../services/attachmentService";
import ImagePreviewer from "../../utils/ImagePreviewer";
import AddAdressCustomerForOrder from "../../components/common/addAdressCustomerForOrder";
import ExcelFileUploader from "../../utils/ExcelFileUploader";
import { UpdateShippingReport } from "../../services/outScopeService";
import ProgressBar from "../../utils/progressBar";
import OrderAddress from "../../components/order/orderAddress";
import OrderWayBill from "../../components/order/OrderWayBill";
import OrderAttachment from "../../components/order/OrderAttachment";
import OrderInfo from "../../components/order/orderInfo";
import OrderCustomerInfo from "../../components/order/OrderCustomerInfo";
import OrderAdminDetail from "../../components/order/OrderAdminDetail";
import { MeasureUnitSample } from "../../Enums/MeasureUnitSample";
import { DeliveryMethods } from './../../Enums/DeliveryMethodsEnums';
import { OrderStatusEnumsProgressBar } from './../../Enums/OrderStatusEnumsProgressBar';


const OrderDetailTest = () => {
    const params = useParams()
    let orderDetail = []
    const [modalIsOpenUpload, setIsOpenUpload] = useState(false);
    const [modalIsOpenUploadExcel, setIsOpenUploadExcel] = useState(false);
    const [order, setOrder] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const [isOpenAddress, setIsOpenAddress] = useState(false)
    const [image, setImage] = useState({})
    const [customerDetail, setCustomerDetail] = useState([])
    const [product, setProduct] = useState([])
    const [ShippingInformation, SetShippingInformation] = useState([]);
    const [organization, setOrganization] = useState([]);
    let [DetailAddress, setDetailAddress] = useState([]);
    const [Shipping, SetShipping] = useState([])
    const [ShippingContracts, SetShippingContracts] = useState([])
    const [attachments, Setattachments] = useState([])
    const [OrderWeight, SetOrderWeight] = useState(0)
    let [loading, setLoading] = useState(false);

    const GetShipping = async () => {
        try {
            const { data, status } = await GetShoppings(params.id)
            SetShipping(data.result.shippings.values)

        } catch (e) {
            console.log(e)
        }
    }
    const ShippingContract = async () => {
        try {
            const { data, status } = await GetShoppingContracts()
            SetShippingContracts(data.result.shippings.values)
        } catch (e) {
            console.log(e)
        }
    }
    const closeModal = () => {
        setIsOpen(false);
    }
    const closeModalForUpload = () => {
        setIsOpenUpload(false)
    }
    const closeModalIsOpenUploadExcel = () => {
        setIsOpenUploadExcel(false)
    }
    const openModalAddress = () => {
        setIsOpenAddress(true);
    }
    const closeModalAddress = () => {
        setIsOpenAddress(false);
    }
    const getOrganizationName = async () => {
        try {
            const { data, status } = await GetAllOrganisation();
            if (status === 200) {
                setOrganization(data.result.organizationLists.values)
            }
        } catch (error) {
            console.log(error);
        }
    }
    let entityId = params.id
    const handelGetAttachment = async () => {
        let config = {

            headers: { 'Content-Type': 'application/json' },
            params: {

                entityTypeId: 10,
                entityId: entityId,
                isAdmin: true
            }
            ,
            paramsSerializer: params => {

                return QueryString.stringify(params)
            }
        };
        try {
            const { data, status } = await GetAttachments(config)
            if (status === 200) {

                Setattachments(data.result.attachments)
            }

        } catch (error) {

            console.log(error);
        }


    }
    const getOrder = async () => {
        try {
            const { data, status } = await GetOrder(params.id)
            setCustomerDetail(data.result.order.customer)
            setOrder(data.result.order)
            SetShippingInformation(JSON.parse(data.result.order.extraData.data))
        } catch (err) {
            console.log(err)
        }
    }
    const bindAdress = async (arr) => {
        let FilnalArr = [];

        if (orderDetail.length > 1) {
            for (let i = 0; i < orderDetail.length; i++) {
                try {

                    const { data, status } = await GetAddress(11, arr[i].id)
                    let detail = orderDetail.filter(item => item.id === arr[i].id)[0]
                    let address = data.result.addresses;
                    const finallAddres = address.map(item =>
                    ({
                        fullAddress: item.fullAddress,
                        postalCode: item.postalCode,
                        receiverTel: item.receiverTel,
                        receiverMobile: item.receiverMobile,
                        receiverName: item.receiverName,


                    }))[0]

                    let obj = { ...detail, ...finallAddres }
                    FilnalArr.push(obj)
                    setDetailAddress(FilnalArr)
                } catch (e) {
                    console.log(e)
                }

            }
        } else {
            for (let i = 0; i < orderDetail.length; i++) {
                try {

                    const { data, status } = await GetAddress(10, arr[i].orderId)
                    let detail = orderDetail.filter(item => item.orderId === arr[i].orderId)[0]
                    let address = data.result.addresses;
                    const finallAddres = address.map(item =>
                    ({
                        fullAddress: item.fullAddress,
                        postalCode: item.postalCode,
                        receiverTel: item.receiverTel,
                        receiverMobile: item.receiverMobile,
                        receiverName: item.receiverName,


                    }))[0]

                    let obj = { ...detail, ...finallAddres }
                    FilnalArr.push(obj)
                    setDetailAddress(FilnalArr)
                } catch (e) {
                    console.log(e)
                }

            }
        }

    }
    const returnHavaleSum = () => {
        var sum = 0

        if (Shipping) {
            Shipping.forEach(item => sum += item.plannedQuantity)
        }
        return sum
    }

    const returnBarbariSum = () => {
        var sum = 0

        if (Shipping) {
            Shipping.forEach(item => sum += item.shippedQuantity)
        }
        return sum
    }




    const getOrderDetail = async () => {
        try {
            const { data, status } = await GetOrderDetails(params.id)
            if (status === 200) {
                orderDetail = data.result.orderDetails
                setProduct(data.result.orderDetails[0].product)

                await bindAdress(orderDetail)

                var sum = 0;
                orderDetail.forEach(item => sum += item.quantity

                );
                SetOrderWeight(sum)
            }
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getOrder()
        getOrderDetail()
        GetShipping()
        getOrganizationName();
        ShippingContract()
        handelGetAttachment()


    }, [])
    const handelPreview = (item) => {
        setImage(item)
        setIsOpen(true)
    }
    const customerName = () => {
        let fName = customerDetail.firstName;
        let lName = customerDetail.lastName;
        let OName;
        let fullname;
        if (customerDetail.organizationId > 0) {

            OName = organization.filter(item => item.id === customerDetail.organizationId).map(item => item.name)
            fullname = `${OName ? OName : ''}`
        }
        else {
            fullname = `${fName ? fName : ''} ${lName ? lName : ''}`
        }

        return (fullname)
    }

    const dataForExcel = Shipping ? Shipping.map(item => ({

        ' شناسه سیستم': item.id,
        'شناسه سفارش': item.orderId ? item.orderId : "--",
        'شناسه جزییات سفارش': item.orderDetailId ? item.orderDetailId : "--",
        'واحد': MeasureUnitSample.filter(i => i.id === item.measureUnitId).map(item => item.name),
        '  مقدار': item.quantity,
        'تاریخ قرارداد ': new Date(item.shippingDate).toLocaleDateString('fa-IR'),
        'نحوه ارسال': DeliveryMethods.filter(i => i.id === item.deliveryMethodId).map(i => i.name),
        'شماره قراداد': item.shippingContractId === null ? '' : ShippingContracts.filter(i => i.id === item.shippingContractId).map(i => i.contractNumber),
    })) : ''
    const update = async () => {
        setLoading(true)
        try {
            const { data, status } = await UpdateShippingReport()
            if (status === 200) {
                setLoading(false)
            }
        } catch (e) {
            console.log(e)
        }
    }
    let orderDetailId;
    let measureUnitId;
    let detailAddress;
    var sumTakhsis = 0


    if (DetailAddress.length > 0) {
        let count = DetailAddress.length
        orderDetailId = (DetailAddress.filter(item => item.extId === null)[0] ? DetailAddress.filter(item => item.extId === null)[0].id : DetailAddress[count - 1].id)
        measureUnitId = DetailAddress[0].measureUnitId
        detailAddress = DetailAddress


        let newArr = DetailAddress.filter(item => item.extId !== null)

        if (newArr.length > 0) {

            newArr.forEach(item => sumTakhsis += item.quantity)
        }
        else {
            sumTakhsis = 0
        }
    }


    const number = OrderStatusEnumsProgressBar.filter(item => item.id === order.orderStatusId).map(item => item.number)[0]
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
                        {number === 12 || number < 4 ? <><OrderAdminDetail getOrder={getOrder} handelPreview={handelPreview} attachments={attachments} order={order} orderDetail={DetailAddress} />
                            {attachments ? (<OrderAttachment order={order} params={params} attachments={attachments}
                                closeModalForUpload={closeModalForUpload}
                                modalIsOpenUpload={modalIsOpenUpload}
                                setIsOpenUpload={setIsOpenUpload}
                                handelPreview={handelPreview} />) : ''}
                        </> :
                            (
                                <><OrderAddress openModalAddress={openModalAddress} setIsOpenUploadExcel={setIsOpenUploadExcel} details={detailAddress} shipping={Shipping} orderWeight={OrderWeight} TakhsisWeight={sumTakhsis} getOrder={getOrder} order={order} />
                                    <OrderWayBill loading={loading} Shipping={Shipping} ShippingContracts={ShippingContracts} dataForExcel={dataForExcel} update={update} />
                                    {attachments ? (<OrderAttachment order={order} params={params} attachments={attachments}
                                        closeModalForUpload={closeModalForUpload}
                                        modalIsOpenUpload={modalIsOpenUpload}
                                        setIsOpenUpload={setIsOpenUpload}
                                        handelPreview={handelPreview} />) : ''}
                                </>)}
                        <ImagePreviewer modalIsOpen={isOpen} closeModal={closeModal} item={image} isUser={false} orderStatus={number} />

                    </div>
                </div>
                <div className="py-5 ">
                    <button className="btn btn-danger  float-right m-1 ">
                        <NavLink className="text-light" to='/orderList'>بازگشت</NavLink>
                    </button>
                </div>
                <AddAdressCustomerForOrder isOpenAddress={isOpenAddress} closeModal={closeModalAddress} orderDetailId={orderDetailId} orderMeasuerId={measureUnitId} />
                <ExcelFileUploader modalIsOpen={modalIsOpenUploadExcel} closeModal={closeModalIsOpenUploadExcel}
                    EntityId={orderDetailId} EntityTypesId={11}
                    comment={'لطفا فایل اکسل مطابق نمونه اطلاعات ارسال را بارگزاری کنید'} />
            </div>
        </Fragment>
    )
}
export default OrderDetailTest