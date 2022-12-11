import {useEffect, useState} from "react";
import {ChangeOrderStatus, GetOrder} from "../../services/orderService";
import {toast} from "react-toastify";
import Modal from "react-modal";
import Select from "react-select";
import {PaymentStatusEnums} from "../../Enums/PaymentStatus";
import {ConditionalPaymentTypes} from "../../Enums/ConditionalPaymentTypes";
import {PaymentFinancialConfirmtion} from "../../Enums/paymentFinancialConfirmtion";

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
    const [StatusId, setId] = useState(0)
  let paymentStatusId=0
  let conditionalPaymentTypeId=0

    const handleEditFormSubmit =async () => {
        if (StatusId === 1  ){

            paymentStatusId=3
            conditionalPaymentTypeId=null

            } if(StatusId === 2){
            paymentStatusId=6
            conditionalPaymentTypeId=1


            } if(StatusId === 3){
            paymentStatusId=6
            conditionalPaymentTypeId=2


            }


        const datas = {

            orderId: id,
            orderStatusId: 3,
            paymentStatusId,
            conditionalPaymentTypeId

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
    const PaymentStatus = () => {
        return (PaymentFinancialConfirmtion.map(data => ({ label: data.name, value: data.id })))
    }

    return(
        <Modal

            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Selected Option"
            ariaHideApp={false}>
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
                <div className="card-body p-0" style={{ height: '10rem', width: '20rem' }}>

                    <div className="row">

                        <div className="col-lg-12 col-md-12  col-sm-12    textOnInput form-group selectIndex " style={{marginBottom:"4rem"}}>
                            <div className=" form-control-sm">
                                <label>نوع تایید</label>

                                <Select

                                    placeholder='نوع تایید'
                                    options={PaymentStatus()}
                                    onChange={e => {setId(e.value)}}
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