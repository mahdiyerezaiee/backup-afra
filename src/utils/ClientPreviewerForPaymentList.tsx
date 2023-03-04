import React from 'react'
import Modal from 'react-modal';
import { DeleteAttachments, GetAttachments, SetAttachmentType } from "../services/attachmentService";
import { toast } from "react-toastify";
import { useState,useEffect } from "react"
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { ClipLoader } from "react-spinners";
import { Field, Form, Formik } from "formik";
import { validatmin10, validatNumber } from "./validitionParams";
import  QueryString  from 'qs';
import { Attachment, Attachments } from '../Common/models/attachments';

const attachmet = (window as any).globalThis.stie_att
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

interface Props {

    modalIsOpen: any, closeModal: any,id:any
}


const ClientPreviewerForPaymentList: React.FC<Props> = ({ modalIsOpen, closeModal,id}) => {
    const [trackingCode, setTrackingCode] = useState(0)
    const [value, setValue] = useState(0)
    const [image, setImage] = useState<Attachment>()
    const [chacked, setchacked] = useState(false)
    const [open, setClose] = useState(false)
    
    let [loading, setLoading] = useState(false);
    const openModelDelete = () => {
        setClose(true)
    }
    const closeModelDelete = () => {
        setClose(false)
    }

    const handelGetAttachment = async () => {
        let config = {

            headers: {'Content-Type': 'application/json'},
            params: {

                entityTypeId: 20,
                entityId: id,
               
            }
            ,
            paramsSerializer: (params:any) => {

                return QueryString.stringify(params)
            }
        };
        try {
            const {data, status} = await GetAttachments(config)
            if (status === 200) {

                setImage(data.result.attachments[0])
            }

        } catch (error) {

            console.log(error);
        }


    }



    useEffect(()=>{
        handelGetAttachment()



    },[id])
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

                <div className='text-center img-previewer'>
                {image? <img style={{
                        width:  "50rem",
                        height: '25rem'
                    }}  src={`${attachmet}${image.path}`} className="img-fluid m-auto" alt={image.name}/>:''}
                </div>
            </div>

        </Modal>


    )
}

export default ClientPreviewerForPaymentList