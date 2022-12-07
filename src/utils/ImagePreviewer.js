import React from 'react'
import  Modal  from 'react-modal';
import { isEmptyObject } from 'jquery';
import {DeleteAttachments} from "../services/attachmentService";
import {toast} from "react-toastify";
import {useState} from "react"

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


const ImagePreviewer = ({ modalIsOpen, closeModal, item, isUser,orderStatus }) => {
    const [TrackingCode , setTrackingCode] = useState()
    const [Value , setValue] = useState()
    const [DueDate , setDueDate] = useState()
    const [chacked , setchacked] = useState(false)
    const data ={
        AttachmentTypeId:2,
        TrackingCode,
        Value,
        DueDate,
    }
    const handelDelete = async(e) => {
        e.preventDefault()
        try {

            const {data,status}=await DeleteAttachments(item.id)
            if(status===200){

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
    console.log(item);


    return (
   
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
    <div className='m-auto'>
        <div className="row">
            <div className="col-6">
                <label>ثبت سند</label>
                <input type="checkbox" checked={chacked} onClick={e=> setchacked(!chacked)}/>
            </div>
            {chacked === true ?
            <div className="col-12">
                <div className="row">

                <div className="col-4">
                    <label>شماره چک</label>
                    <input type="text" value={TrackingCode} onClick={e=> setTrackingCode(e.target.value)}/>
                </div> <div className="col-4">
                <label>مبلغ چک</label>
                <input type="text" value={Value} onClick={e=> setValue(e.target.value)}/>
            </div> <div className="col-4">
                <label>تاریخ چک</label>
                <input type="text" value={DueDate} onClick={e=> setDueDate(e.target.value)}/>
            </div>

            </div>
            </div>
            : null}
        </div>
    <div className='m-auto' >
        <img  style={{width:"40rem", height:'25rem'}} src={`http://10.10.20.4/${item.path}`} className="img-fluid m-auto" alt={item.name} />
    </div>
    
    <div className=' d-block   '>
        <div className='m-1' >
            <button hidden={isUser && orderStatus>=3} onClick={handelDelete} className="btn btn-danger float-left" >حذف</button>
        </div>
                       
                        <div className='m-1'>
                            {/*<button onClick={()=>closeModal()} className="btn btn-primary float-right" >بازگشت</button>*/}
                        </div>
                    </div>
    </div>
    
    
    
    </Modal>
      )
    
  
}

export default ImagePreviewer