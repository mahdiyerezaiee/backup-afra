import file from "../../pages/order/addressFile.xlsx";
import { useSelector } from "react-redux";
import { getExtraData } from '../../services/extraService';
import { useEffect } from 'react';
import { useState } from 'react';
import ShippingSelected from "../common/shippingSelected";
import { GetAllProductSupply } from "../../services/productSupplyService";
import { GetAddress } from '../../services/addressService';
import { editOrder } from "../../services/orderService";
import { toast } from "react-toastify";
import FinancialConfirmation from "./FinancialConfirmation";
import { GetProductSupplyConditions } from './../../services/ProductSupplyConditionService';
import AddAdressCustomerForOrder from './../common/addAdressCustomerForOrder';
import ExcelFileUploader from './../../utils/ExcelFileUploader';


const OrderAddress = ({ details, shipping, orderWeight, TakhsisWeight, getOrder, order }) => {
    const roles = useSelector(state => state.userRole)
    let FilnalArr = [];
    const [modalIsOpen, setIsOpen] = useState(false);
    const [OrderDetail, setOrderDetail] = useState([])
    const [IsOpen, SetIsOpen] = useState(false);
    const [measureUnitId, setmeasureUnitId] = useState(0)
    const [orderDetailId, setorderDetailId] = useState(0);
    const [completeDdata, SetCompletedData] = useState([])
    const [productSupplyId, setProductSupplyId] = useState(0)
    const [isOpenAddress, setIsOpenAddress] = useState(false)
    const [modalIsOpenUploadExcel, setIsOpenUploadExcel] = useState(false);


    const [cottageCode, setcottageCode] = useState('');
    const [orderCondition, setOrderCondition] = useState([])
    const handleEditFormSubmit = async () => {
        const datas = {
            "order": {
                id: order.id,
                "customerId": order.customerId,
                orderStatusId: 3,
                'paymentStatusId': 3,
                paymentMethodId: order.paymentMethodId,
                shippingStatusId: order.shippingStatusId,
                "orderTotal": order.orderTotal,
                "orderTax": order.orderTax,
                "orderDiscount": order.orderDiscount,
                orderFinalizedPrice: order.orderFinalizedPrice,
                "createDate": order.createDate,
                "extId": order.extId,
                "paid": false,
                "comment": null,
                "customer": null,
                "extraData": null
            }
        }
        try {
            const { data, staus } = await editOrder(datas)
            if (data.result.message === "Done.") {
                toast.success("ویرایش با موفقعیت انجام شد", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined
                });
            }
        } catch (e) {
            toast.error('مشکلی در ثبت ویرایش وجود دارد', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined
            });
        }
        window.location.reload()
    }
    const getSupplyCode = async () => {
        try {
            const { data, status } = await GetAllProductSupply(details[0].productSupplyId)
            setcottageCode(data.result.productSupply.cottageCode)

        } catch (e) {
            console.log(e)
        }

    }
    const getOrderDetailCondition = async () => {
        try {

            let Order = details
            setOrderDetail(details)
            setProductSupplyId(details.productSupplyId)
            let ids = details.map(item => item.productSupplyId)


            let productSupplyConditionIds = details.map(item => item.productSupplyConditionId)
            console.log(ids);
            console.log(productSupplyConditionIds);
            if (productSupplyConditionIds.length > 0) {
                let conditions = [];
                for (let i = 0; i < ids.length; i++) {
                    if (productSupplyConditionIds[i] !== null) {
                        const { data, status } = await GetProductSupplyConditions(ids[i]);
                        let condition = data.result.productSupplyConditions.values

                        const element = condition.filter(item => item.id === productSupplyConditionIds[i])[0]



                        conditions.push(element)
                    }
                    else {
                        const noData = { conditionId: null }
                        conditions.push(noData)
                    }
                }

                console.log(conditions);
                for (let i = 0; i < Order.length; i++) {


                    //   let ff = conditions.filter(item => item.id === Order[i].productSupplyConditionId)
                    //   console.log(ff);
                    const merged = conditions.map(item =>
                    ({
                        conditionId: item.id,
                        installmentOccureCount: item.installmentOccureCount,
                        installmentPeriod: item.installmentPeriod,
                        paymentMethodId: item.paymentMethodId,
                        additionalAmount: item.additionalAmount,
                        additionalTypeId: item.additionalTypeId,


                    }))


                    let obj = { ...Order[i], ...merged[i] }

                    FilnalArr.push(obj)
                }
                setOrderCondition(FilnalArr)
            }
            else {
                setOrderCondition(Order)
            }
        } catch (err) {
            console.log(err)
        }
    }


    const openModal = (id) => {
        setorderDetailId(id)
        setIsOpen(true);
    }
    const closeModal = () => {
        setIsOpen(false);
    }
    const openModalFinancialConfirmation = () => {

        SetIsOpen(true);
    }
    const closeModalFinancialConfirmation = () => {
        getOrder()
        SetIsOpen(false);
    }
    const closeModalAddress = () => {

        setIsOpenAddress(false);
    }
    const openModalAddress = (id, measureId) => {
        setorderDetailId(id)
        setmeasureUnitId(measureId)
        setIsOpenAddress(true);
    }
    const openModalExcelAddress = (id) => {
        setorderDetailId(id)
        setIsOpenUploadExcel(true);
    }
    const closeModalIsOpenUploadExcel = () => {
        setIsOpenUploadExcel(false)
    }
    console.log(measureUnitId);
    const getDetails = async () => {
        let finalArr = [];
        try {
            for (let i = 0; i < details.length; i++) {

                const { data, status } = await getExtraData(Number(details[i].extId), 1)
                const response = await GetAddress(11, Number(details[i].id))

                let addresses = response.data.result.addresses[0]

                if (addresses) {

                    const rename = (({ id: AddressId, ...addresses }) => ({ AddressId, ...addresses }))

                    addresses = rename(addresses)

                }

                let extraData = (data.result.extraData)
                if (extraData) {
                    let extraD = JSON.parse(data.result.extraData.data)

                    const rename = (({ Id: extraDataId, ...extraD }) => ({ extraDataId, ...extraD }))
                    let newExtraData = rename(extraD)

                    let newArr = { ...details[i], ...newExtraData, ...addresses }
                    newArr = { ...newArr, hasShipp: false }
                    finalArr.push(newArr)
                }
                else {

                    let newArr = { ...details[i] }
                    finalArr.push(newArr)
                }

            }
            SetCompletedData(finalArr)

        } catch (error) {

        }
    }

    useEffect(() => {
        getDetails()
        getSupplyCode()
        getOrderDetailCondition()
    }, [details])
    var formatter = new Intl.NumberFormat('fa-IR', {

        maximumFractionDigits: 0,
        minimumFractionDigits: 0,
    });


    console.log(orderCondition.filter(x => x.extId === null));


    return (
        <div>
            <ShippingSelected modalIsOpen={modalIsOpen} closeModal={closeModal} orderDetailId={orderDetailId} Order={order} />
            <FinancialConfirmation id={order.id} modalIsOpen={IsOpen} closeModal={closeModalFinancialConfirmation} />

            <div className="form-group mb-4 textOnInput col-lg-12 rounded border  border-dark mt-4   ">
                <label>جزییات سفارش </label>

                <div className="form-group   textOnInput col-lg-12 rounded border  border-dark   " style={{ marginTop: '4rem' }}>
                    <label> فاقد تخصیص </label>


                    {orderCondition && orderCondition.filter(x => x.extId === null).length > 0 ?
                        (<table className="table table-bordered table-hover table-striped  mt-2  mb-4">
                            <thead className='text-center'>
                                <tr className="">
                                    <th> #</th>
                                    <th> کالا</th>
                                    <th>قیمت پایه</th>
                                    <th>وزن خرید</th>
                                    <th> قیمت کل</th>

                                    <th> عرضه</th>
                                    <th>نحوه پرداخت</th>
                                    <th>بازه پرداخت</th>
                                    <th>کوتاژ</th>
                                    <th> تاریخ</th>
                                    <th>عملیات</th>

                                </tr>
                            </thead>
                            <tbody>
                                {orderCondition.filter(x => x.extId === null).map(item =>
                                    <tr className="" key={item.id}>

                                        <td className="text-center">{item.id}</td>
                                        <td className="text-center">{item.product.name}</td>
                                        <td className="text-center">{item.basePrice}</td>
                                        <td className="text-center">{formatter.format(item.quantity)}</td>
                                        <td className="text-center">{formatter.format(item.price)}</td>
                                        <td className="text-center"></td>
                                        <td className="text-center">{item.productSupplyId}</td>
                                        <td className="text-center">{cottageCode}</td>
                                        <td className="text-center">{new Date(item.createDate).toLocaleDateString('fa-IR')}</td>
                                        <td td className="text-center m-1"><button hidden={(orderWeight <= TakhsisWeight) ? true : false} onClick={() => openModalAddress(item.id, item.measureUnitId)} className=" border-0 bg-success " title="افزودن آدرس" >
                                            <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill=""
                                                className="bi bi-plus-circle" viewBox="0 0 17 16">
                                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                                <path
                                                    d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                            </svg>

                                        </button>

                                            <button className={order.orderStatusId === 8 ? "bg-primary m-1 border-0 " : "bg-success m-1 border-0 "} disabled={(orderWeight <= TakhsisWeight) ? true : false} onClick={() => setIsOpenUploadExcel(true)} title='افزودن آدرس با اکسل'>

                                                <svg style={{ color: 'black' }} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-explicit" viewBox="0 0 16 16"> <path d="M6.826 10.88H10.5V12h-5V4.002h5v1.12H6.826V7.4h3.457v1.073H6.826v2.408Z" /> <path d="M2.5 0A2.5 2.5 0 0 0 0 2.5v11A2.5 2.5 0 0 0 2.5 16h11a2.5 2.5 0 0 0 2.5-2.5v-11A2.5 2.5 0 0 0 13.5 0h-11ZM1 2.5A1.5 1.5 0 0 1 2.5 1h11A1.5 1.5 0 0 1 15 2.5v11a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 1 13.5v-11Z" /> </svg>
                                            </button>
                                        </td>

                                    </tr>
                                )
                                }
                            </tbody>
                        </table>) : ''}

                </div>
                <div className="form-group mb-4  textOnInput col-lg-12 rounded border  border-dark   " style={{ marginTop: '3rem' }}>
                    <label>  تخصیص یافته </label>

                    {/* :


                                    </tr>:
                                        <tr className="" key={item.id}>

                                            <td className="text-center"  bgcolor="white" style={{border:'none'}}></td>
                                            <td className="text-center"  bgcolor="white" style={{border:'none'}}></td>
                                            <td className="text-center"  bgcolor="white" style={{border:'none'}}></td>
                                            <td className="text-center"  bgcolor="white" style={{border:'none'}}></td>
                                            <td className="text-center"  bgcolor="white" style={{border:'none'}}></td>
                                            <td className="text-center"  bgcolor="white" style={{border:'none'}}></td>
                                            <td className="text-center"  bgcolor="white" style={{border:'none'}}></td>
                                            <td className="text-center"  bgcolor="white" style={{border:'none'}}></td>
                                            <td className="text-center text-primary">وزن باقی مانده</td>
                                            <td className="text-center text-danger" style={{fontSize:'17px'}}>{item.quantity}</td>
                                            {roles.includes(7) || roles.includes(5) || roles.includes(8) ?
                                                <td className="text-center"  bgcolor="white" style={{border:'none'}}>

                                                </td> : ''}


                                        </tr>


                                )
                                }
                                </tbody>
                            </table>
                        )} */}






                </div>
                <div className=" text-end  p-2" style={{ textAlign: 'left' }}>

                    {roles.includes(7) || roles.includes(5) || roles.includes(8) ? <button className="btn-success m-1 btn " hidden={order.orderStatusId === 8 ? false : true} onClick={openModalFinancialConfirmation}>تایید مالی</button> : null}
                </div>

            </div>

            <AddAdressCustomerForOrder isOpenAddress={isOpenAddress} closeModal={closeModalAddress} orderDetailId={orderDetailId} orderMeasuerId={measureUnitId} />
            <ExcelFileUploader modalIsOpen={modalIsOpenUploadExcel} closeModal={closeModalIsOpenUploadExcel}
                EntityId={orderDetailId} EntityTypesId={11}
                comment={'لطفا فایل اکسل مطابق نمونه اطلاعات ارسال را بارگزاری کنید'} />
        </div>
    )
}
export default OrderAddress