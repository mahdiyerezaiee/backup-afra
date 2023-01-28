import React, { useState } from 'react'
import Modal from 'react-modal';
import { validatAlpha, validatmin10, validatMobail, validatNumber } from "../../../Utils/validitionParams";
import { Field, Form, Formik } from "formik";
import DatePicker, { DateObject } from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import { ClipLoader } from 'react-spinners';
import { SetShippingReport } from '../../../services/ShippingService';
import { toast } from 'react-toastify';



const customStyles = {
    content: {

        inset: '55% auto auto 50%',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: 0,
        backgroundColor: "transparent"
    }

}

interface Props {
    modalIsOpen: any, closeModal: any, shippingId: any
}
const SetExtraShipping: React.FC<Props> = ({ modalIsOpen, closeModal, shippingId }) => {
    const [createDate, SetCreateDate] = useState<any>();
    const [quantity, SetQuantity] = useState(0)
    const [shippingNumber, setshippingNumber] = useState('')
    const [shippingSerial, setshippingSerial] = useState('')
    const [delivererName, setdelivererName] = useState('')
    const [delivererNumber, setdelivererNumber] = useState('')
    const [delivererPlaque, setdelivererPlaque] = useState('')
    let [loading, setLoading] = useState(false);



    const handelCreateDate = (value: any) => {

        //تغییرات روی تاریخ رو اینجا اعمال کنید

        if (value === null) {
            SetCreateDate('')
        }
        //تغییرات روی تاریخ رو اینجا اعمال کنید
        if (value instanceof DateObject) {
            SetCreateDate(new Date(value.toDate().setHours(3, 30, 0, 0)).toJSON())
        }

    }
    const handelSubmit = async () => {
        setLoading(true)
        const body = {

            "report": {
                id: 0,
                shippingId,
                createDate,
                quantity: Number(quantity),
                measureUnitId: 5,
                shippingNumber,
                shippingSerial,
                delivererName,
                delivererNumber,
                delivererPlaque,
                extId: null
            }
        }

        try {
            const {data,status}=await SetShippingReport(body)
            
            if(status===200){
        setLoading(false)

                toast.success('آدرس با موفقیت ثبت شد', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined
                });
                closeModal();
                window.location.reload()
            }
        } catch (error) {
        setLoading(false)
            
        }

closeModal()
    }



    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Selected Option"
            ariaHideApp={false}

        >


            

            <div className='widget  box ' style={{ width: '50rem'  ,height:'25rem'}}>


                <Formik initialValues={{
                    id: 0,
                    shippingId,
                    createDate,
                    quantity,
                    measureUnitId: 5,
                    shippingNumber, shippingSerial, delivererName, delivererNumber,
                    delivererPlaque, extId: null

                }}
                    enableReinitialize={true}
                    onSubmit={values => {
                        // same shape as initial values
                        handelSubmit()
                    }}>
                    {({ errors, touched, validateField, validateForm, setFieldValue, handleChange, values }) => (


                        <Form >
                            <div className="d-block clearfix mb-4" onClick={closeModal}><svg
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
                                        x1="6" y1="6" x2="18" y2="18"></line></svg>
                                        
                                        
                                        <h5>ثبت بارنامه دستی</h5>
                                        </div>

                            <div className="n-chk d-flex  mb-4">

                                <div>

                                </div>
                            </div>

                            <div className='form-row mb-4 mt-3'>
                                
                                <div className="form-group  textOnInput col-md-3">

                                    <label >مفدار</label>
                                    <Field validate={validatNumber} name="quantity" type="number" className="form-control" id="inputZip" value={quantity}
                                        onChange={(e: any) => {
                                            SetQuantity(e.target.value)

                                        }} />
                                    {errors.quantity && touched.quantity && <div className="text-danger">{errors.quantity}</div>}

                                </div>
                                <div className="form-group  textOnInput col-md-3">
                                    <div className=" mb-4 " style={{ position: 'relative' }}>
                                        <label style={{ position: 'absolute', zIndex: '1', top: '-15px', right: '10px', background: 'white', padding: '0 8px' }}>تاریخ بارنامه</label>
                                        <div className='form-group '>
                                            <DatePicker
                                                
                                                calendar={persian}

                                                locale={persian_fa}
                                                style={{ height: '45.39px', width: '100%', textAlign: 'center' }}
                                                value={createDate}
                                                onChange={handelCreateDate}
                                            />

                                        </div>

                                    </div>

                                </div><div className="form-group  textOnInput col-md-3">

                                    <label >شماره بارنامه</label>
                                    <Field validate={validatAlpha} name="shippingNumber" type="text" className="form-control" id="inputZip" value={shippingNumber}
                                        onChange={(e: any) => {
                                            setshippingNumber(e.target.value)

                                        }} />
                                    {errors.shippingNumber && touched.shippingNumber && <div className="text-danger">{errors.shippingNumber}</div>}

                                </div>
                                <div className="form-group  textOnInput col-md-3">

                                    <label >سریال بارنامه</label>
                                    <Field validate={validatAlpha} name="shippingSerial" type="text" className="form-control" id="inputZip" value={shippingSerial}
                                        onChange={(e: any) => {
                                            setshippingSerial(e.target.value)

                                        }} />
                                    {errors.shippingSerial && touched.shippingSerial && <div className="text-danger">{errors.shippingSerial}</div>}

                                </div>

                            </div>
                            <div className='form-row'>
                                <div className="form-group  textOnInput col-md-4">

                                    <label >نام راننده</label>
                                    <Field validate={validatAlpha} name="shippingSerial" type="text" className="form-control" id="inputZip" value={delivererName}
                                        onChange={(e: any) => {
                                            setdelivererName(e.target.value)

                                        }} />
                                    {errors.delivererName && touched.delivererName && <div className="text-danger">{errors.delivererName}</div>}

                                </div>
                                <div className="form-group  textOnInput col-md-4">

                                    <label >شماره راننده</label>
                                    <Field validate={validatMobail} name="shippingSerial" type="text" className="form-control" id="inputZip" value={delivererNumber}
                                        onChange={(e: any) => {
                                            setdelivererNumber(e.target.value)

                                        }} />
                                    {errors.delivererNumber && touched.delivererNumber && <div className="text-danger">{errors.delivererNumber}</div>}

                                </div>
                                <div className="form-group  textOnInput col-md-4">

                                    <label >شماره پلاک</label>
                                    <Field validate={validatAlpha} name="shippingSerial" type="text" className="form-control" id="inputZip" value={delivererPlaque}
                                        onChange={(e: any) => {
                                            setdelivererPlaque(e.target.value)

                                        }} />
                                    {errors.delivererPlaque && touched.delivererPlaque && <div className="text-danger">{errors.delivererPlaque}</div>}

                                </div>


                            </div>


                            <div className='row justify-content-center mt-3'>

                                <div className='col-2 '>
                                    <button type="submit" className="btn btn-success" >تایید<ClipLoader

                                        loading={loading}
                                        color="#ffff"
                                        size={15}
                                    /></button>
                                </div>


                            </div>
                        </Form>

                    )}



                </Formik>






            </div>






        </Modal >

    )
}

export default SetExtraShipping