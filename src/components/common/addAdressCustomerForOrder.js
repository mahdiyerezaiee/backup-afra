import React, { useEffect, useState, useRef } from "react";
import { GetAllProvince, SetAddress } from "../../services/addressService";
import { toast } from "react-toastify";
import Select from "react-select";
import Modal from "react-modal";
import { orderSpliter } from "../../services/orderService";

import SimpleReactValidator from "simple-react-validator";
import { GetOrderDetails } from './../../services/orderService';
import file from "../../pages/order/addressFile.xlsx";

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
const AddAdressCustomerForOrder = ({ closeModal, isOpenAddress, orderDetailId, orderId, orderMeasuerId }) => {

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

    const Allcities = province.filter(data => data.parentId !== null);
    const cities = Allcities.filter(data => data.parentId === ostanId)
    const ostan = province.filter(data => data.parentId === null);
    const ProvincerenderList = () => {
        return (ostan.map(data => ({ label: data.name, value: data.id })))
    }
    const CitiesrenderList = () => {
        return (cities.map(data => ({ label: data.name, value: data.id })))
    }

    const handelSubmit = async (event) => {
        event.preventDefault();

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
            if (status === 200 && data.result.success === true) {



                toast.success(data.result.message, {
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

            else {
                toast.error(" وزن وارد شده   بیشتر از باقیمانده  سفارش میباشد ", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined
                });
            }

        } catch (error) {
            console.log(error)
        }
    }

    const validator = useRef(new SimpleReactValidator({
        validators: {
            alpha: {

                rule: (val, params, validator) => {
                    return validator.helpers.testRegex(val, /^[ یكئآابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی  ]*$/i,) && params.indexOf(val) === -1;

                }
            },
            numeric: {

                rule: (val, params, validator) => {
                    return validator.helpers.testRegex(val, /^[0123456789]/,) && params.indexOf(val) === -1;


                }
            },
            min:{ message: 'حداقل :min کارکتر.', rule: function rule(val, options) {
                return val.length >= options[0];
              }, messageReplace: function messageReplace(message, options) {
                return message.replace(':min', options[0]);
              } }
        },
        messages: {
            required: "پرکردن این فیلد الزامی می باشد",
         
            email: 'ایمیل صحیح نیست',
            alpha: 'حتما از حروف استفاده کنید',
            numeric: 'از اعداد استفاده کنید'
        }
        , element: message => <p style={{ color: 'red' }}>{message}</p>
    }));

    return (
        <Modal
            isOpen={isOpenAddress}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Selected Option"
            ariaHideApp={false}

        >



                    <div className='widget box shadow' style={{ width: '50rem'  }}>


                        <form>
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

                                    <input type="checkbox" defaultChecked={heavyWeightTruck} onChange={e => {
                                        SetheavyWeightTruck(e.checked)

                                    }}
                                    />

                                </div>
                            </div>
                            <div className="form-row mb-4 ">
                                <div className="form-group  textOnInput col-md-2">

                                    <label >مقدار </label>
                                    <input type="text" className="form-control" id="inputZip" value={quantity}
                                           onChange={e => {
                                               setQuantity(e.target.value)
                                               validator.current.showMessageFor("required");
                                           }} />
                                    {validator.current.message("required", quantity, "required|numeric")}


                                </div>
                                <div className="form-group  textOnInput col-md-2">

                                    <label >شناسه خرید </label>
                                    <input type="text" className="form-control" id="inputZip" value={idKharId}
                                           onChange={e => {
                                               SetidKharId(e.target.value)
                                               validator.current.showMessageFor("required");

                                           }} />
                                    {validator.current.message("required", idKharId, "required|numeric")}

                                </div>
                                <div className="form-group  textOnInput col-md-2">

                                    <label >کد رهگیری </label>
                                    <input type="text" className="form-control" id="inputZip" value={traceCode}
                                           onChange={e => {
                                               SetTraceCode(e.target.value)
                                               validator.current.showMessageFor("required");

                                           }} />
                                    {validator.current.message("required", traceCode, "required|numeric")}

                                </div>
                                <div className="form-group  textOnInput col-md-3">

                                    <label >شماره تخصیص </label>
                                    <input type="text" className="form-control" id="inputZip" value={allocationId}
                                           onChange={e => {
                                               setAllocationId(e.target.value)
                                               validator.current.showMessageFor("required");

                                           }} />
                                    {validator.current.message("required", allocationId, "required|numeric")}
                                </div>
                                <div className="form-group  textOnInput col-md-3">

                                    <label >شناسه یکتا </label>
                                    <input type="text" maxLength="12" className="form-control" id="inputZip" value={receiverUniqueId}
                                           onChange={e => {
                                               SetReceiverUniqueId(e.target.value)
                                               validator.current.showMessageFor("required");

                                           }} />
                                    {validator.current.message("required", receiverUniqueId, "required|numeric|min:12")}

                                </div>

                            </div>
                            <div className="form-group mb-4 textOnInput">
                                <label>آدرس</label>
                                <input type="text" className="form-control opacityForInput" placeholder="تهران ، اسلام شهر و ...." value={fullAddress}
                                       onChange={e => {
                                           setFulAddress(e.target.value)
                                           validator.current.showMessageFor("required");

                                       }} />
                                {validator.current.message("required", fullAddress, "required")}

                            </div>

                            <div className="form-row mb-4 textOnInput">
                                <div className="form-group col-md-3">
                                    <label >نام تحویل گیرنده </label>
                                    <input type="text" className="form-control" id="inputCity" value={receiverName} onChange={e => {
                                        setReceiverName(e.target.value)
                                        validator.current.showMessageFor("required");

                                    }} />
                                    {validator.current.message("required", receiverName, "required|alpha")}

                                </div>

                                <div className="form-group col-md-3">
                                    <label >کد ملی تحویل گیرنده </label>
                                    <input type="text" className="form-control" id="inputCity" value={receiverId} maxLength="10" onChange={e => {
                                        SetreceiverId(e.target.value)
                                        validator.current.showMessageFor("required");

                                    }} />
                                    {validator.current.message("required", receiverId, "required|numeric|min:10")}

                                </div>
                                <div className="form-group col-md-2">
                                    <label >تلفن </label>
                                    <input type="text" className="form-control" id="inputCity" value={receiverTel} onChange={e => {
                                        setreceiverTel(e.target.value)
                                        validator.current.showMessageFor("required");

                                    }} />
                                    {validator.current.message("required", receiverTel, "required|numeric")}

                                </div>

                                <div className="form-group col-md-2">

                                    <label > موبایل</label>
                                    <input type="text" className="form-control" maxLength='11' id="inputZip" value={receiverMobile}
                                           onChange={e => {
                                               setreceiverMobile(e.target.value)
                                               validator.current.showMessageFor("required");

                                           }} />
                                    {validator.current.message("required", receiverMobile, "required|numeric|min:11")}

                                </div>
                                <div className="form-group col-md-2">

                                    <label >کد پستی</label>
                                    <input type="text" className="form-control" id="inputZip" maxLength="10" value={postalCode}
                                           onChange={e => {
                                               setpostalCode(e.target.value)
                                               validator.current.showMessageFor("required");

                                           }} />
                                    {validator.current.message("required", postalCode, "required|numeric|min:10")}

                                </div>

                            </div>

                            <div className="form-row  textOnInput">
                                <div className="form-group col-md-6">
                                    <label>استان</label>
                                    <Select
                                        placeholder='استان'
                                        options={ProvincerenderList()}
                                        onChange={e => {
                                            setostanId(e.value)

                                        }}
                                    />
                                    {ostanId === 0 ? <span className=" text-danger">استان خود را انتخاب کنید</span> : ''}
                                </div>
                                <div className="form-group col-md-6">

                                    <label >شهر</label>
                                    <Select
                                        placeholder='شهر'
                                        options={CitiesrenderList()}
                                        className='form-group'
                                        onChange={e => {
                                            setProvinceName(e.label)
                                        }
                                        }
                                    />
                                    {provinceName === null ? <span className=" text-danger">شهر خود را انتخاب کنید</span> : ''}

                                </div>


                            </div>

                            {/*<div className="form-group">*/}
                            {/*    <div className="form-check pl-0">*/}
                            {/*        <div className="custom-control custom-checkbox checkbox-info">*/}

                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*</div>*/}

                            <div className='row justify-content-between'>

                                <div className='col-6 '>
                                    <button disabled={ostanId === 0 || !validator.current.allValid()} type="submit" className="btn btn-primary" onClick={handelSubmit}>تایید</button>
                                </div>


                            </div>




                        </form>
                    </div >

        </Modal>
    )
}
export default AddAdressCustomerForOrder