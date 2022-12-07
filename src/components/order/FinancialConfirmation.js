import {useEffect, useState} from "react";
import {ChangeOrderStatus, GetOrder} from "../../services/orderService";
import {toast} from "react-toastify";
import Modal from "react-modal";
import Select from "react-select";
import {PaymentStatusEnums} from "../../Enums/PaymentStatus";
import {ConditionalPaymentTypes} from "../../Enums/ConditionalPaymentTypes";

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
const FinancialConfirmation = ({ id, modalIsOpen, closeModal}) => {
    const [paymentStatusId, setPaymentStatusId] = useState(0)
    const [conditionalPaymentTypeId, setConditionalPaymentTypeId] = useState(0)


    const handleEditFormSubmit =async () => {
        const datas = {

            orderId: id,
            orderStatusId:3,
            paymentStatusId,
            conditionalPaymentTypeId

        }
        console.log(datas)
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
    const PaymentStatus = () => {
        return (PaymentStatusEnums.map(data => ({ label: data.name, value: data.id })))
    }
    const ConditionalPayment = () => {
        return (ConditionalPaymentTypes.map(data => ({ label: data.name, value: data.id })))
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
                <div className="card-body p-0" style={{ height: '15rem', width: '20rem' }}>

                    <div className="row">

                        <div className="col-lg-12 col-md-12  col-sm-12    textOnInput form-group selectIndex " style={{marginBottom:"4rem"}}>
                            <div className=" form-control-sm">
                                <label>وضعیت پرداخت </label>

                                <Select

                                    placeholder='وضعیت پرداخت'
                                    options={PaymentStatus()}



                                    onChange={e => {

                                        setPaymentStatusId(e.value)

                                    }}
                                />
                            </div>
                        </div>
                        <div className="col-lg-12 col-md-12  col-sm-12    textOnInput form-group  " style={{marginBottom:"3rem"}}>
                            <div className=" form-control-sm">
                                <label>شرایط پرداخت </label>

                                <Select

                                    placeholder='وضعیت پرداخت'
                                    options={ConditionalPayment()}



                                    onChange={e => {

                                        setConditionalPaymentTypeId(e.value)

                                    }}
                                />
                            </div>
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
export  default  FinancialConfirmation