import file from "../../pages/order/addressFile.xlsx";
import { useSelector } from "react-redux";
import { getExtraData } from '../../services/extraService';
import { useEffect } from 'react';
import { useState } from 'react';
import ShippingSelected from "../common/shippingSelected";
import {GetAllProductSupply} from "../../services/productSupplyService";
import { GetAddress } from '../../services/addressService';
import {editOrder} from "../../services/orderService";
import {toast} from "react-toastify";
import FinancialConfirmation from "./FinancialConfirmation";


const OrderAddress = ({ setIsOpenUploadExcel, openModalAddress, details,shipping,orderWeight,TakhsisWeight,getOrder,order }) => {
    const roles = useSelector(state => state.userRole)
    const [modalIsOpen, setIsOpen] = useState(false);
    const [IsOpen, SetIsOpen] = useState(false);
    const [orderDetailId, setorderDetailId] = useState(0);
    const [completeDdata, SetCompletedData] = useState([])
    const [cottageCode, setcottageCode] = useState('');
    const handleEditFormSubmit =async () => {
        const datas ={
            "order": {
                id:order.id,
                "customerId": order.customerId,
                orderStatusId:3,
                'paymentStatusId':3,
                paymentMethodId:order.paymentMethodId,
                shippingStatusId:order.shippingStatusId,
                "orderTotal": order.orderTotal,
                "orderTax": order.orderTax,
                "orderDiscount": order.orderDiscount,
                orderFinalizedPrice:order.orderFinalizedPrice,
                "createDate": order.createDate,
                "extId":order.extId,
                "paid": false,
                "comment": null,
                "customer": null,
                "extraData":null
            }
        }
        try {
            const {data , staus}= await editOrder(datas)
            if (data.result.message==="Done.") {
                toast.success("ویرایش با موفقعیت انجام شد", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined
                });
            }}catch (e) {
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
            const {data , status}= await GetAllProductSupply(details[0].productSupplyId)
            setcottageCode(data.result.productSupply.cottageCode)

        }catch (e) {
            console.log(e)
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



    const getDetails = async () => {
        let finalArr = [];
        try {
            for (let i = 0; i < details.length; i++) {

                const { data, status } = await getExtraData(Number(details[i].extId), 1)
                const response=await GetAddress(11,Number(details[i].id))

                let addresses=response.data.result.addresses[0]

                if(addresses){

                    const rename = (({ id: AddressId, ...addresses }) => ({ AddressId, ...addresses }))

                    addresses= rename(addresses)

                }

                let extraData=(data.result.extraData)
                if(extraData){
                    let extraD = JSON.parse(data.result.extraData.data)

                    const rename = (({ Id: extraDataId, ...extraD }) => ({ extraDataId, ...extraD }))
                    let newExtraData = rename(extraD)

                    let newArr = { ...details[i], ...newExtraData,...addresses }
                    newArr={...newArr,hasShipp:false}
                    finalArr.push(newArr)
                }
                else{

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
    }, [details])
    var formatter = new Intl.NumberFormat('fa-IR', { style: 'currency',
        currency: 'IRR', maximumFractionDigits: 0,
        minimumFractionDigits: 0, });

    return (
        <div>
            <ShippingSelected modalIsOpen={modalIsOpen} closeModal={closeModal} orderDetailId={orderDetailId} Order={order} />
            <FinancialConfirmation id={order.id} modalIsOpen={IsOpen} closeModal={closeModalFinancialConfirmation} />

            <div className="form-group mb-4 textOnInput col-lg-12 rounded border  border-dark mt-4   ">
                <label>جزییات سفارش </label>

                <div className="table-responsive p-2">
                    { details && details[0].extId === null  ?
                        (<table className="table table-bordered table-hover table-striped  mt-2  mb-4">
                            <thead className='text-center'>
                            <tr className="">
                                <th> عرضه</th>
                                <th> شناسه جزییات سفارش</th>
                                <th>کوتاژ</th>
                                <th> کالا</th>
                                <th>وزن خرید</th>
                                <th> تاریخ</th>
                                <th> فی</th>

                            </tr>
                            </thead>
                            <tbody>
                            {completeDdata.map(item =>
                                <tr className="" key={item.id}>

                                    <td className="text-center">{item.productSupplyId}</td>
                                    <td className="text-center">{item.id}</td>
                                    <td className="text-center">{cottageCode}</td>
                                    <td className="text-center">{item.product.name}</td>
                                    <td className="text-center">{item.quantity}</td>
                                    <td className="text-center">{new Date(item.createDate).toLocaleDateString('fa-IR')}</td>
                                    <td className="text-center">{item.price}</td>

                                </tr>
                            )
                            }
                            </tbody>
                        </table>)
                        :(                     <table className="table table-bordered table-hover table-striped  mt-2  mb-4">
                                <thead className='text-center'>
                                <tr className="">
                                    <th> شناسه سیستم</th>
                                    <th>شناسه تخصیص</th>
                                    <th> نام تحویل گیرنده</th>
                                    <th> شناسه یکتا</th>
                                    <th> تریلی</th>
                                    <th> آدرس تحویل</th>
                                    <th> کد پستی تحویل</th>
                                    <th> شماره هماهنگی تحویل</th>
                                    <th> کد ملی تحویل</th>
                                    <th> وزن تخصیص</th>
                                    {roles.includes(7) || roles.includes(5) || roles.includes(8) ? <th>عملیات</th> : ''}
                                </tr>
                                </thead>
                                <tbody>
                                {completeDdata.map(item =>
                                    item.extId ?
                                    <tr className="" key={item.id}>

                                        <td className="text-center">{item.id}</td>
                                        <td className="text-center">{item.AllocationId}</td>
                                        <td className="text-center">{item.receiverName}</td>
                                        <td className="text-center">{item.ReceiverUniqueId}</td>
                                        <td className="text-center">{item.ShipTruckTypet === 1 ? 'بله' : 'خیر'}</td>
                                        <td className="text-center"
                                            title={item.fullAddress}>{item.fullAddress ? item.fullAddress.substring(0, 30) + "..." : ""}</td>
                                        <td className="text-center">{item.postalCode?item.postalCode:item.ReceiverZip}</td>
                                        <td className="text-center">{item.receiverMobile?item.receiverMobile:item.receiverTel}</td>
                                        <td className="text-center">{item.ReceiverId}</td>
                                        <td className="text-center">{item.quantity}</td>
                                        {roles.includes(7) || roles.includes(5) || roles.includes(8) ?
                                            <td className="text-center">
                                                <button onClick={() => openModal(item.id)} className="btn btn-sm btn-primary" hidden={order.paymentStatusId!==3?true:false}
                                                        disabled={ item.shippingId!==null ? true:false }

                                                >صدور حواله
                                                </button>
                                            </td> : ''}


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
                        )}


                    <div className='d-block  '>


                    </div>
                </div>
                <div className=" text-end  p-2" style={{ textAlign: 'left' }}>
                    <button hidden={(orderWeight<=TakhsisWeight)?true:false}  className=" btn-success  btn  m-1 " onClick={openModalAddress} title="افزودن آدرس" >
                        افزودن آدرس
                    </button>

                    <button className={order.orderStatusId === 8 ?"btn-primary m-1 btn ":"btn-success m-1 btn "}disabled={(orderWeight<=TakhsisWeight)?true:false} onClick={() => setIsOpenUploadExcel(true)}>آپلود فایل آدرس</button>
                    {roles.includes(7) || roles.includes(5) || roles.includes(8) ?<button className="btn-success m-1 btn "hidden={order.orderStatusId === 8 ? false : true } onClick={openModalFinancialConfirmation}>تایید مالی</button>:null}
                </div>

            </div>


        </div>
    )
}
export default OrderAddress