import {useEffect, useState} from "react";
import {GetAllProductSupply} from "../../../services/productSupplyService";
import {PaymentStructureEnums} from "../../Enums/PaymentStructureEnums";
import './style.css'
import InvoiceCreator from "../../../Utils/invoiceCreator";
import Modal from "react-modal";
import ImageFileUploader from "../../../Utils/ImageFileUploader";
import {OrderStatus} from "../../Enums/OrderStatusEnums";
import { ChangeOrderStatus, editOrder } from '../../../services/orderService';
import { toast } from 'react-toastify';
import config from "../../../services/config.json"
import {Link} from "react-router-dom";
import { GetAttachments } from "../../../services/attachmentService";
import QueryString from 'qs';

const customStyles = {
    content: {
        position:'fixed',
        inset: '-50px',
        backgroundColor:'transparent',
        height:'100%',
        overflow:'none',

    }

    
}
interface Props{
    orderDetail:any ,order:any ,params:any
}
const OrderCustomerDetail:React.FC<Props> = ({orderDetail ,order ,params }) => {
    const [cottageCode, setcottageCode] = useState('');
    const [idEdit, setIdEdit] = useState(0);
    const [modalIsOpenEdit, setIsOpenEdit] = useState(false);
    const [attachments, Setattachments] = useState([])

let newAttachmnet=attachments.filter((item:any)=>item.deleted===false)
let entityId = params.id

const handelGetAttachment = async () => {
    let config = {

        headers: {'Content-Type': 'application/json'},
        params: {

            entityTypeId: 10,
            entityId: entityId,
            isAdmin: true
        }
        ,
        paramsSerializer: (params:any) => {

            return QueryString.stringify(params)
        }
    };
    try {
        const {data, status} = await GetAttachments(config)
        if (status === 200) {

            Setattachments(data.result.attachments)
        }

    } catch (error) {

        console.log(error);
    }


}
useEffect(() => {

    handelGetAttachment()
}, [])
    const getSupplyCode = async () => {
        try {
            const {data , status}= await GetAllProductSupply(orderDetail[0].productSupplyId)
            setcottageCode(data.result.productSupply.cottageCode)

        }catch (e) {
            console.log(e)
        }

    }

    useEffect(()=>{
        // getSupplyCode()
    },[orderDetail])
    const openModalEdit = (id:any) => {
        setIdEdit(id)
        setIsOpenEdit(true);
    }
    const closeModalEdit = () => {
        setIsOpenEdit(false);
    }
    const handelSubmit=async(e:any)=>{
        e.preventDefault()

        const body={
            orderId: order.id,
            orderStatusId: 5,
            paymentStatusId: null,
            conditionalPaymentTypeId: null,
            conditionPaymentComment: null,
            isAdmin:null

        }
        try {
            const{data,status}=await ChangeOrderStatus(body)

            if(data.success===true){
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
                           
                            <th> نام کالا</th>
                            <th>وزن</th>
                            <th> فی</th>
                            <th> نوع پرداخت</th>
                            <th> مبلغ کل</th>
                            <th>وضعیت</th>
                        </tr>
                        </thead>
                        <tbody>
                        {orderDetail.map((item:any)=>
                            <tr className="" >
                                <td data-th="شماره عرضه"className="text-center">{item.productSupplyId}</td>
                              
                                <td data-th="نام کالا" className="text-center">{item.product.name}</td>
                                <td data-th="وزن " className="text-center">{item.quantity}</td>
                                <td data-th=" فی" className="text-center">{item.price / item.quantity}</td>
                                <td data-th="نوع پرداخت" className="text-center">{PaymentStructureEnums.filter(i=> i.id === order.paymentMethodId).map(i=> i.name)[0]}</td>
                                <td data-th=" مبلغ کل" className="text-center">{item.price}</td>
                                <td data-th=" وضعیت" className="text-center">{OrderStatus.filter(i=> i.id === order.orderStatusId).map(i=> i.name)}</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>

                <div className=" buttons   text-end  p-2 mt-4" >

                    <Link  to={`/client/invoice/${order.id}`} className={newAttachmnet.length > 0?  "btn-primary   btn m-1" : order.orderStatusId === 4 ?"btn-success   btn m-1" : "btn-primary   btn m-1"} hidden={order.orderStatusId ===  1 }  >دریافت پیش فاکتور</Link>
                    <button className="btn-success  m-1 btn " hidden={newAttachmnet.length > 0?false:true} disabled={order.orderStatusId ===  5   } onClick={handelSubmit}>درخواست بررسی اسناد ارائه شده </button>
                </div>
            </div>

        </div>)
}
export default OrderCustomerDetail