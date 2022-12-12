import React from 'react'
import Modal from 'react-modal';
import {DeleteAttachments, SetAttachmentType} from "../services/attachmentService";
import {toast} from "react-toastify";
import {useState} from "react"
import InputMask from "./InputMask";
import DatePicker, {DateObject} from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

const attachmet = window.globalThis.stie_att
const customStyles = {
    content: {

        inset: '50% auto auto 50%',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '3%',
        border: '2px ridge black',

    }

}


const ImagePreviewer = ({modalIsOpen, closeModal, item, isUser, orderStatus}) => {
    console.log(item)
    const [trackingCode, setTrackingCode] = useState(item.trackingCode)
    const [value, setValue] = useState(item.value)
    const [dueDate, setDueDate] = useState(item.dueDate)
    const [chacked, setchacked] = useState(false)
    const datas = {
        attachmentId: item.id,
        name: '',
        attachmentTypeId: 2,
        trackingCode,
        value,
        dueDate: new Date(),
    }
    const submitAttachment = async () => {
        try {
            const {data, status} = await SetAttachmentType(datas)
            if (data.result.success === true) {

                toast.success("اطلاعات سند ثبت شد", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined
                });
                window.location.reload()

            }
        } catch (e) {

            console.log(e)
        }

    }
    const handelDelete = async (e) => {
        e.preventDefault()
        try {

            const {data, status} = await DeleteAttachments(item.id)
            if (status === 200) {

                toast.success("ویرایش با موفقعیت انجام شد", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined
                });

                window.location.reload()
            }

        } catch (error) {

            console.log(error);
        }
    }
    const handelStartDate = (value) => {
        if (value === null) {
            setDueDate('')

        }
        //تغییرات روی تاریخ رو اینجا اعمال کنید
        if (value instanceof DateObject) {
            setDueDate(value.toDate())


        }
    }

    return (

        <Modal

            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Selected Option"
            ariaHideApp={false}

        >

            <div className="d-block clearfix mb-2" onClick={closeModal}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24" height="24"
                    viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-x close"
                    data-dismiss="alert">
                    <line x1="18" y1="6"
                          x2="6"
                          y2="18"></line>
                    <line
                        x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </div>
            <div className='m-auto'>

                <div className='text-center'>
                    <img style={{
                        width: chacked === true ? "25rem" : "50rem",
                        height: chacked === true ? "12.5rem" : '25rem'
                    }} src={`${attachmet}${item.path}`} className="img-fluid m-auto" alt={item.name}/>
                </div>
                {!isUser ? <div className="row ">
                        {item.trackingCode ? null :
                            <div className="col-6 mb-2 ">

                                <input className='m-1' type="checkbox" checked={chacked} onChange={() => {
                                    setchacked(!chacked)
                                }}/>
                                <label>سند مالی</label></div>}


                        {item.trackingCode || chacked === true ?
                            <div className="col-12 text-center">
                                <div className="row  text-center form-row textOnInput">

                                    <div className="col-3">
                                        <label>شماره چک</label>
                                        <input disabled={item.trackingCode} className="form-control opacityForInput  mb-4"
                                               type="text" value={trackingCode}
                                               onChange={e => setTrackingCode(e.target.value)}/>
                                    </div>
                                    <div className="col-3">
                                        <label>مبلغ چک</label>
                                        <input disabled={item.value} className="form-control opacityForInput  mb-4"
                                               type="text" value={value} onChange={e => setValue(e.target.value)}/>
                                    </div>

                                    <div className="col-3">

                                        <label style={{
                                            position: 'absolute',
                                            zIndex: '1',
                                            top: '-15px',
                                            right: '10px',
                                            background: 'none',
                                            padding: '0 8px'
                                        }}>موعد چک</label>
                                        <div className='form-group  '>
                                            <DatePicker
                                                calendar={persian}
                                                disabled={item.dueDate}
                                                locale={persian_fa}
                                                style={{height: '45.39px', width: '100%', textAlign: 'center'}}
                                                value={dueDate}
                                                onChange={handelStartDate}
                                            />

                                        </div>
                                    </div>

                                    {item.trackingCode ? null : <div className="col-3 text-center">
                                        <button className="btn btn-success  float-right" onClick={submitAttachment}>ثبت سند
                                            مالی
                                        </button>
                                    </div>}
                                </div>

                            </div>
                            : ""}
                    </div>
                    : null}
                <div className=' d-block   '>
                    <div className='m-1'>
                        <button hidden={isUser && orderStatus >= 3} onClick={handelDelete}
                                className="btn btn-danger float-left">حذف
                        </button>
                    </div>

                    <div className='m-1'>
                        <button onClick={() => closeModal()} className="btn btn-primary float-right">بازگشت</button>
                    </div>
                </div>
            </div>


        </Modal>
    )


}

export default ImagePreviewer