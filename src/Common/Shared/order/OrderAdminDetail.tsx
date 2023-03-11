import {PaymentStructureEnums} from "../../Enums/PaymentStructureEnums";
import {useEffect, useState} from "react";
import {GetAllProductSupply} from "../../../services/productSupplyService";
import OrderEdit from "../../../Admin/Order/Component/orderEdit";
import OrderConfirmation from "./orderConfirmation";
import Modal from "react-modal";
import InvoiceCreator from "../../../Utils/invoiceCreator";
import {Link} from "react-router-dom";
import ReserveOrder from "./ReserveOrder";
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

    orderDetail:any ,order:any , handelPreview:any, getOrder:any

}
const OrderAdminDetail:React.FC<Props> = ({orderDetail ,order ,  handelPreview, getOrder}) => {
    const [cottageCode, setcottageCode] = useState('');
    const [idEdit, setIdEdit] = useState(0);
    const [id, setId] = useState(0);
    const [modalIsOpenEdit, setIsOpenEdit] = useState(false);
    const [modalIsOpeninvoice, setIsOpeninvoice] = useState(false);
    const [modalIsOpen, setIsOpen] = useState(false);
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
    const openModalEdit = (id:any) => {
        setIdEdit(id)
        setIsOpenEdit(true);
    }
    const closeModalEdit = () => {
        setIsOpenEdit(false);
        getOrder()
    }
    const openModalinvoice = (id:any) => {
        setIdEdit(id)
        setIsOpeninvoice(true);
    }
    const closeModalinvoice = () => {
        setIsOpeninvoice(false);
        getOrder()
    }
    const openModal = (id:any) => {
        setId(id)
        setIsOpen(true);
    }
    const closeModal = () => {
        getOrder()
        setIsOpen(false);
    }
    var formatter = new Intl.NumberFormat('fa-IR', {
        maximumFractionDigits: 0,
        minimumFractionDigits: 0,
    });
    return(
        <div>
            <div  className="form-group mb-4 textOnInput col-lg-12 rounded border  border-dark mt-4   ">
                <label>ثبت و صدور پیش فاکتور بر اساس درخواست </label>
                <div className="table-responsive p-2 mb-5">
                    <table  className="table table-bordered table-hover table-striped  mt-2  mb-4">
                        <thead className='text-center'>
                        <tr className="">
                            <th> شماره عرضه</th>
                            <th>شماره کوتاژ</th>
                            <th> نام کالا</th>
                            <th>وزن</th>
                            <th> فی</th>
                            <th> نوع پرداخت</th>
                            <th> مبلغ کل</th></tr>
                        </thead>
                        <tbody>
                        {orderDetail.map((item:any)=>
                            <tr key={item.id} className="" >
                                <td data-th="شماره عرضه" className="text-center">{item.productSupplyId}</td>
                                <td data-th="شماره کوتاژ" className="text-center">{cottageCode}</td>
                                <td data-th=" نام کالا"  className="text-center">{item.product.name}</td>
                                <td data-th="وزن" className="text-center">{item.quantity}</td>
                                <td data-th=" فی" className="text-center">{formatter.format(item.basePrice)}</td>
                                <td data-th="نوع پرداخت" className="text-center">{PaymentStructureEnums.filter(i=> i.id === order.paymentMethodId).map(i=> i.name)[0]}</td>
                                <td data-th=" مبلغ کل" className="text-center">{formatter.format(item.price)}</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>

                <div className="  buttons  text-end  p-2 mt-5">

                    <button className="btn-danger   btn m-1" onClick={()=>{openModal(13)}}>رد درخواست </button>
                    <button className={ order.orderStatusId === 5?"btn-primary   btn m-1 ":"btn-success   btn m-1 "} onClick={()=>openModalEdit(order.id)}>صدور پیش فاکتور </button>
                    <Link  to={`/admin/invoiceAdmin/${order.id}`} className= "btn-primary   btn m-1" hidden={order.orderStatusId ===  1?true:false } >دریافت پیش فاکتور</Link>
                    <button className="btn btn-warning"  disabled={order.reserved===true?true:false} hidden={order.orderStatusId===4?true:false} onClick={()=>openModalinvoice(order.id)}>رزرو سفارش</button>
                    <button className="btn-success  m-1 btn "hidden={order.orderStatusId===5?false:true} onClick={()=>{openModal(8)}}>تایید درخواست </button>
                </div>
            </div>

            <OrderConfirmation id={order.id} modalIsOpen={modalIsOpen} closeModal={closeModal} orderStatusId={id}/>
            <OrderEdit id={order.id} closeModal={closeModalEdit} modalIsOpen={modalIsOpenEdit} />
            <ReserveOrder id={order.id} closeModal={closeModalinvoice} modalIsOpen={modalIsOpeninvoice}  expireDate={null}/>


        </div> )
}
export default OrderAdminDetail