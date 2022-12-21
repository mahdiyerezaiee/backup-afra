import {useEffect, useState} from "react";
import {GetAllProductSupply} from "../../services/productSupplyService";
import {PaymentStructureEnums} from "../../Enums/PaymentStructureEnums";
import './style.css'
import InvoiceCreator from "../../utils/invoiceCreator";
import Modal from "react-modal";
import ImageFileUploader from "../../utils/ImageFileUploader";
import {OrderStatus} from "../../Enums/OrderStatusEnums";
import { editOrder } from './../../services/orderService';
import { toast } from 'react-toastify';
import config from "../../services/config.json"

const customStyles = {
    content: {
        position:'fixed',
        inset: '-50px',
        backgroundColor:'transparent',
        height:'100%',
        overflow:'none',

    }

}
const OrderCustomerDetail = ({orderDetail ,order , attachments, handelPreview}) => {
    const [cottageCode, setcottageCode] = useState('');
    const [idEdit, setIdEdit] = useState(0);
    const [modalIsOpenEdit, setIsOpenEdit] = useState(false);
let newAttachmnet=attachments.filter(item=>item.deleted===false)

    const getSupplyCode = async () => {
        try {
            const {data , status}= await GetAllProductSupply(orderDetail[0].productSupplyId)
            setcottageCode(data.result.productSupply.cottageCode)

        }catch (e) {
            console.log(e)
        }

    }

    useEffect(()=>{
        getSupplyCode()
    },[orderDetail])
    const openModalEdit = (id) => {
        setIdEdit(id)
        setIsOpenEdit(true);
    }
    const closeModalEdit = () => {
        setIsOpenEdit(false);
    }
    const handelSubmit=async(e)=>{
        e.preventDefault()

        const body={
            "order":{...order,orderStatusId:5}
        }
        try {
            const{data,status}=await editOrder(body)

            if(status===200){
                toast.success("درخواست با موفقیت ارسال شد", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined
                });
            }
        } catch (error) {

        }
window.location.reload()
    }
    return(
        <div>
            <div  className="form-group mb-4 textOnInput col-lg-12 rounded border  border-dark mt-4   ">
                <label>درخواست شما </label>
                <div className="table-responsive p-2 mb-5">
                    <table  className="table table-bordered table-hover table-striped  mt-2  mb-4">
                        <thead className='text-center'>
                        <tr className="">
                            <th> شماره عرضه</th>
                            <th>شماره کورتاژ</th>
                            <th> نام کالا</th>
                            <th>وزن</th>
                            <th> فی</th>
                            <th> نوع پرداخت</th>
                            <th> مبلغ کل</th>
                            <th>وضعیت</th>
                        </tr>
                        </thead>
                        <tbody>
                        {orderDetail.map(item=>
                            <tr className="" >
                                <td className="text-center">{item.productSupplyId}</td>
                                <td className="text-center">{cottageCode}</td>
                                <td className="text-center">{item.product.name}</td>
                                <td className="text-center">{item.quantity}</td>
                                <td className="text-center">{item.price / item.quantity}</td>
                                <td className="text-center">{PaymentStructureEnums.filter(i=> i.id === order.paymentMethodId).map(i=> i.name)[0]}</td>
                                <td className="text-center">{item.price}</td>
                                <td className="text-center">{OrderStatus.filter(i=> i.id === order.orderStatusId).map(i=> i.name)}</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>

                <div className=" buttons   text-end  p-2 mt-4" >

                    <button className={newAttachmnet.length > 0?  "btn-primary   btn m-1" : order.orderStatusId === 4 ?"btn-success   btn m-1" : "btn-primary   btn m-1"} hidden={order.orderStatusId ===  1 } onClick={()=>openModalEdit(order.id)} disabled={  order.orderStatusId >  5  }>دریافت پیش فاکتور</button>
                    <button className="btn-success  m-1 btn " hidden={newAttachmnet.length > 0?false:true} disabled={order.orderStatusId ===  5   } onClick={handelSubmit}>درخواست بررسی اسناد ارائه شده </button>
                </div>
            </div>
            <Modal
                isOpen={modalIsOpenEdit}
                onRequestClose={closeModalEdit}
                style={customStyles}
                contentLabel="Selected Option"
                ariaHideApp={false}

            >


                <InvoiceCreator orderId={idEdit} closeModal={closeModalEdit} customerId={order.customerId}/>
            </Modal>
        </div>)
}
export default OrderCustomerDetail