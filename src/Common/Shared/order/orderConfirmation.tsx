import Modal from "react-modal";

import {useEffect, useState} from "react";
import {ChangeOrderStatus, editOrder, GetOrder, GetOrderDetails} from "../../../services/orderService";

import {toast} from "react-toastify";
import {ClipLoader} from "react-spinners";
import { CreateInvoice } from './../../../services/invoiceService';
const customStyles = {
    content: {

        inset: '50% auto auto 50%',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '30px',
        border: '2px ridge black'
    }

}

interface Props{
    orderStatusId:any ,id:any, modalIsOpen:any, closeModal:any
}
const OrderConfirmation:React.FC<Props> = ({orderStatusId ,id, modalIsOpen, closeModal}) => {
    const [loading, setLoading] = useState(false);
    const [comment,setComment]=useState('')

    const handleEditFormSubmit =async () => {
        setLoading(true)
        const datas = {

            orderId:id,
            orderStatusId,
            isAdmin:true

        }
       
        try {
            const {data, status} = await ChangeOrderStatus(datas)

                closeModal()
            }catch (e) {
           

            console.log(e)
            closeModal()

        }
        setLoading(false)
    }
    return(
        <Modal

            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Selected Option"
            ariaHideApp={false}

        >
            <div className="d-block clearfix mb-2" onClick={closeModal}><svg
                xmlns="http://www.w3.org/2000/svg"
                width="24" height="24"
                viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-x close"
                data-dismiss="alert"><line x1="18" y1="6"
                                           x2="6"
                                           y2="18"></line><line
                x1="6" y1="6" x2="18" y2="18"></line></svg></div>
            <div >
                <div className="card-body p-0" style={orderStatusId!==13?{ height: '15rem', width: '20rem' }:{height: '5rem', width: '20rem'}}>

                    <div className="row">


                            <div className=" col-12 text-center mb-2">
                                {orderStatusId === 13? <span>آیا مطمئن هستید که این درخواست این سفارش را رد کنید</span> : <span> آیا مطمئن هستید که این درخواست این سفارش را تایید کنید</span>}

                            </div>

                           


                    </div>
                    


            </div>
                <div className='row '>

                    <div className='col-6 '>
                        <button className="btn btn-success float-left "
                                onClick={handleEditFormSubmit} >تایید
                            <ClipLoader

                                loading={loading}
                                color="#ffff"
                                size={15}
                            /></button>
                    </div>
                    <div className='col-6 '>
                        <button className="btn btn-danger float-right "
                                onClick={function (){
                                    closeModal()
                                }}>انصراف
                        </button>
                    </div>
                </div>
            </div>


        </Modal>


    )
}
export default OrderConfirmation