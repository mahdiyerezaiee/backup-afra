import React, { useEffect, useState, useRef } from "react";
import { GetAllProvince, SetAddress } from "../../../services/addressService";
import { toast } from "react-toastify";
import Select from "react-select";
import Modal from "react-modal";
import { orderSpliter } from "../../../services/orderService";

import {ClipLoader} from "react-spinners";
import {validatAlpha, validatmin10, validatMobail, validatNumber} from "../../../Utils/validitionParams";
import {Field, Form, Formik} from "formik";

const customStyles = {
    content: {

        inset: '55% auto auto 50%',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding:0,
        backgroundColor:"transparent"
    }

}
interface Props{
    closeModal:any, isOpenAddress:any, orderDetailId:any, orderMeasuerId:any
}
const AddAdressCustomerForOrder:React.FC<Props> = ({ closeModal, isOpenAddress, orderDetailId, orderMeasuerId }) => {
    let [loading, setLoading] = useState(false);

    const [fullAddress, setFulAddress] = useState('');
    const [postalCode, setpostalCode] = useState('');
    const [receiverTel, setreceiverTel] = useState('');
    const [receiverMobile, setreceiverMobile] = useState('');
    const [province, setProvince] = useState([]);
    const [provinceName, setProvinceName] = useState('');
    const [ostanId, setostanId] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [idKharId, SetidKharId] = useState(0)
    const [receiverName, setReceiverName] = useState('')
    const [allocationId, setAllocationId] = useState(0)
    const [receiverUniqueId, SetReceiverUniqueId] = useState('')
    const [traceCode, SetTraceCode] = useState('')
    const [receiverId, SetreceiverId] = useState('')
    const [heavyWeightTruck, SetheavyWeightTruck] = useState(false)
    var sum;

    const getProvince = async () => {
        const { data, status } = await GetAllProvince();
        setProvince(data.result.provinces);
    }

    useEffect(() => {
        getProvince();
    }, []);

    const Allcities = province.filter((data:any) => data.parentId !== null);
    const cities = Allcities.filter((data:any) => data.parentId === ostanId)
    const ostan = province.filter((data:any) => data.parentId === null);
    const ProvincerenderList = () => {
        return (ostan.map((data:any) => ({ label: data.name, value: data.id })))
    }
    const CitiesrenderList = () => {
        return (cities.map((data:any) => ({ label: data.name, value: data.id })))
    }

    const handelSubmit = async () => {
        setLoading(true)

        try {
            const body = {
                orderDetailId,
                "model": {
                    "bazargah": {
                        idKharId: Number(idKharId),
                        quantity: Number(quantity),
                        allocationId: Number(allocationId),
                        receiverUniqueId,
                        traceCode,
                        heavyWeightTruck,
                        provinceName,
                        fullAddress,
                        postalCode,
                        receiverTel,
                        receiverMobile,
                        receiverName, receiverId,
                        measureUnitId: orderMeasuerId,

                    }
                }
            }

            const { data, status } = await orderSpliter(body);
            if ( data.success === true) {



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
            console.log(error)
        }
        setLoading(false)
    }



    return (
        <Modal
            isOpen={isOpenAddress}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Selected Option"
            ariaHideApp={false}

        >



                    <div className='widget box shadow' style={{ width: '50rem'  }}>


                        <Formik
                            initialValues={{
                                idKharId: Number(idKharId),
                                quantity: Number(quantity),
                                allocationId: Number(allocationId),
                                receiverUniqueId,
                                traceCode,
                                heavyWeightTruck,
                                provinceName,
                                fullAddress,
                                postalCode,
                                receiverTel,
                                receiverMobile,
                                receiverName, receiverId,
                                measureUnitId: orderMeasuerId,

                            }}
                            enableReinitialize={true}
                            onSubmit={values => {
                                // same shape as initial values
                                handelSubmit()
                            }}>
                            {({ errors, touched, validateField, validateForm,setFieldValue ,handleChange,values}) => (



                                <Form >
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
                            <div className="n-chk d-flex  mb-4">

                                <div>
                                    <label className="mr-2"> امکان حمل با تریلی </label>

                                    <Field type="checkbox" checked={heavyWeightTruck} onChange={(e:any) => {
                                        SetheavyWeightTruck(e.target.checked)

                                    }}
                                    />

                                </div>
                            </div>
                            <div className="form-row mb-4 ">
                                <div className="form-group  textOnInput col-md-2">

                                    <label >مقدار </label>
                                    <Field  validate={validatNumber} name="quantity" type="text" className="form-control" id="inputZip" value={quantity}
                                           onChange={(e:any) => {
                                               setQuantity(e.target.value)
                                           }} />

                                    {errors.quantity && touched.quantity && <div className="text-danger">{errors.quantity}</div>}

                                </div>
                                <div className="form-group  textOnInput col-md-2">

                                    <label >شناسه خرید </label>
                                    <Field  validate={validatNumber} name="idKharId" type="text" className="form-control" id="inputZip" value={idKharId}
                                           onChange={(e:any) => {
                                               SetidKharId(e.target.value)

                                           }} />
                                    {errors.idKharId && touched.idKharId && <div className="text-danger">{errors.idKharId}</div>}

                                </div>
                                <div className="form-group  textOnInput col-md-2">

                                    <label >کد رهگیری </label>
                                    <Field  validate={validatNumber} name="traceCode" type="text" className="form-control" id="inputZip" value={traceCode}
                                           onChange={(e:any) => {
                                               SetTraceCode(e.target.value)

                                           }} />
                                    {errors.traceCode && touched.traceCode && <div className="text-danger">{errors.traceCode}</div>}

                                </div>
                                <div className="form-group  textOnInput col-md-3">

                                    <label >شماره تخصیص </label>
                                    <Field  validate={validatNumber} name="allocationId" type="text" className="form-control" id="inputZip" value={allocationId}
                                           onChange={(e:any) => {
                                               setAllocationId(e.target.value)

                                           }} />
                                    {errors.allocationId && touched.allocationId && <div className="text-danger">{errors.allocationId}</div>}

                                </div>
                                <div className="form-group  textOnInput col-md-3">

                                    <label >شناسه یکتا </label>
                                    <Field  validate={validatNumber} name="receiverUniqueId" type="text" maxLength="12" className="form-control" id="inputZip" value={receiverUniqueId}
                                           onChange={(e:any) => {
                                               SetReceiverUniqueId(e.target.value)

                                           }} />
                                    {errors.receiverUniqueId && touched.receiverUniqueId && <div className="text-danger">{errors.receiverUniqueId}</div>}

                                </div>

                            </div>
                            <div className="form-group mb-4 textOnInput">
                                <label>آدرس</label>
                                <Field  validate={validatAlpha} name="fullAddress" type="text" className="form-control opacityForInput" placeholder="تهران ، اسلام شهر و ...." value={fullAddress}
                                       onChange={(e:any) => {
                                           setFulAddress(e.target.value)

                                       }} />
                                {errors.fullAddress && touched.fullAddress && <div className="text-danger">{errors.fullAddress}</div>}

                            </div>

                            <div className="form-row mb-4 textOnInput">
                                <div className="form-group col-md-3">
                                    <label >نام تحویل گیرنده </label>
                                    <Field  validate={validatAlpha} name="receiverName"  type="text" className="form-control" id="inputCity" value={receiverName} onChange={(e:any) => {
                                        setReceiverName(e.target.value)

                                    }} />
                                    {errors.receiverName && touched.receiverName && <div className="text-danger">{errors.receiverName}</div>}

                                </div>

                                <div className="form-group col-md-3">
                                    <label >کد ملی تحویل گیرنده </label>
                                    <Field  validate={validatmin10} name="receiverId" type="text" className="form-control" id="inputCity" value={receiverId} maxLength="10" onChange={(e:any) => {
                                        SetreceiverId(e.target.value)

                                    }} />
                                    {errors.receiverId && touched.receiverId && <div className="text-danger">{errors.receiverId}</div>}

                                </div>
                                <div className="form-group col-md-2">
                                    <label >تلفن </label>
                                    <Field  validate={validatNumber} name="receiverTel" type="text" className="form-control" id="inputCity" value={receiverTel} onChange={(e:any) => {
                                        setreceiverTel(e.target.value)

                                    }} />
                                    {errors.receiverTel && touched.receiverTel && <div className="text-danger">{errors.receiverTel}</div>}

                                </div>

                                <div className="form-group col-md-2">

                                    <label > موبایل</label>
                                    <Field  validate={validatMobail} name="receiverMobile" type="text" className="form-control" maxLength='11' id="inputZip" value={receiverMobile}
                                           onChange={(e:any) => {
                                               setreceiverMobile(e.target.value)

                                           }} />
                                    {errors.receiverMobile && touched.receiverMobile && <div className="text-danger">{errors.receiverMobile}</div>}

                                </div>
                                <div className="form-group col-md-2">

                                    <label >کد پستی</label>
                                    <Field  validate={validatmin10} name="postalCode" type="text" className="form-control" id="inputZip" maxLength="10" value={postalCode}
                                           onChange={(e:any) => {
                                               setpostalCode(e.target.value)

                                           }} />
                                    {errors.postalCode && touched.postalCode && <div className="text-danger">{errors.postalCode}</div>}

                                </div>

                            </div>

                            <div className="form-row  textOnInput">
                                <div className="form-group col-md-6">
                                    <label>استان</label>
                                    <Select
                                        menuShouldScrollIntoView ={false}
                                        placeholder='استان'
                                        options={ProvincerenderList()}
                                        onChange={(e:any) => {
                                            setostanId(e.value)

                                        }}
                                    />
                                    {ostanId === 0 ? <span className=" text-danger">استان خود را انتخاب کنید</span> : ''}
                                </div>
                                <div className="form-group col-md-6">

                                    <label >شهر</label>
                                    <Select
                                        menuShouldScrollIntoView ={false}
                                        placeholder='شهر'
                                        options={CitiesrenderList()}
                                        className='form-group'
                                        onChange={(e:any) => {
                                            setProvinceName(e.label)
                                        }
                                        }
                                    />
                                    {provinceName === null ? <span className=" text-danger">شهر خود را انتخاب کنید</span> : ''}

                                </div>


                            </div>

                            <div className='row justify-content-between'>

                                <div className='col-6 '>
                                    <button disabled={loading || ostanId === 0 } type="submit" className="btn btn-primary" >تایید<ClipLoader

                                        loading={loading}
                                        color="#ffff"
                                        size={15}
                                    /></button>
                                </div>


                            </div>




                        </Form>
                            )}
                        </Formik>
                    </div >

        </Modal>
    )
}
export default AddAdressCustomerForOrder