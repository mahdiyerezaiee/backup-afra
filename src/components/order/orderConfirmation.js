import Modal from "react-modal";

import {useEffect, useState} from "react";
import {ChangeOrderStatus, editOrder, GetOrder, GetOrderDetails} from "../../services/orderService";

import {toast} from "react-toastify";
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
const OrderConfirmation = ({orderStatusId ,id, modalIsOpen, closeModal}) => {

    const handleEditFormSubmit =async () => {
        const datas = {

            orderId:id,
            orderStatusId,


        }
        try {
            const {data, staus} = await ChangeOrderStatus(datas)

            if (data.result.success === true) {
                toast.success("ویرایش با موفقعیت انجام شد", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined
                });
                closeModal()
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
            console.log(e)
        }
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
                <div className="card-body p-0" style={{ height: '5rem', width: '20rem' }}>

                    <div className="row">


                            <div className=" col-12 text-center">
                                {orderStatusId === 12? <span>آیا مطمئن هستید که این درخواست این سفارش را رد کنید</span> : <span>آیا مطمئن هستید که این درخواست این سفارش را تایید کنید</span>}

                            </div>



                    </div>



            </div>
                <div className='row '>

                    <div className='col-6 '>
                        <button className="btn btn-success float-left "
                                onClick={handleEditFormSubmit} >تایید
                        </button>
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