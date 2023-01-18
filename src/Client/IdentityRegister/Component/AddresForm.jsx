import React from 'react'
import { NavLink ,useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { GetAllProvince, SetAddress } from '../../../services/addressService';
import Select from 'react-select';
import { toast } from 'react-toastify';
import {useRef} from "react";
import {Field, Form, Formik} from "formik";
import {validateRequired, validatmin10, validatMobail, validatNumber} from "../../../Utils/validitionParams";

const AddresForm = () => {

    const userinfo = useSelector(state => state.user);
    const [fullAddress, setFulAddress] = useState('');
    const [postalCode, setpostalCode] = useState('');
    const [receiverTel, setreceiverTel] = useState('');
    const [receiverMobile, setreceiverMobile] = useState('');
    const [province, setProvince] = useState([]);
    const[provinceId,setProvinceId]=useState(0);
    const[ostanId,setostanId]=useState(0);
    
    const getProvince = async () => {

        const { data, status } = await GetAllProvince();
        setProvince(data.result.provinces);

    }
    useEffect(() => {

        getProvince();

    }




        , []);

    const Allcities = province.filter(data => data.parentId !== null);
    const cities =Allcities.filter(data=>data.parentId===ostanId)
  
    const ostan = province.filter(data => data.parentId === null);
    const ProvincerenderList = () => {
        return (ostan.map(data => ({ label: data.name, value: data.id })))
    
    }
    const CitiesrenderList = () => {
    
        return (cities.map(data => ({ label: data.name, value: data.id })))
    }
    const body={
        address:{
            id:0,
            provinceId,
            fullAddress,
            postalCode,receiverTel,receiverMobile
        },
        entityTypeId:1,
        entityId:Number( localStorage.getItem('connect'))
    }
    const handelSubmit =async () => {
        try {
            
            const {data,status}=await SetAddress(body);
            if(data.success===true){
                toast.success("اطلاعات با موفقیت ثبت شد", {
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
    return (
        <div className='user-progress' >
            <div className='row'>
                <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12 p-3 m-2'>
                    <h5 >تکمیل اطلاعات کاربری</h5>
                    <p>در این بخش می توانید وضعیت حساب کاربری خود را مشاهده کنید.</p>
                </div>
            </div>
            <div className='row d-flex justify-content-center '>
                <div className='widget box shadow'>


                    <Formik
                        initialValues={{
                            id:0,
                            provinceId,
                            fullAddress,
                            postalCode,receiverTel,receiverMobile
                        }}
                        enableReinitialize={true}
                        onSubmit={values => {
                            // same shape as initial values
                            handelSubmit()
                        }}>
                        {({ errors, touched, validateField, validateForm,setFieldValue ,handleChange,values}) => (



                            <Form >

                                <div className="form-group mb-4 textOnInput">
                                    <label>آدرس</label>
                                    <Field  validate={validateRequired} name="fullAddress" type="text" className="form-control opacityForInput" placeholder="تهران ، اسلام شهر و ...." value={fullAddress}  onChange={e=> {
                                        setFulAddress(e.target.value)

                                    }}/>
                                    {errors.fullAddress && touched.fullAddress && <div className="text-danger">{errors.fullAddress}</div>}

                                </div>

                                <div className="form-row mb-4 textOnInput">
                                    <div className="form-group col-md-4">
                                        <label >تلفن </label>
                                        <Field  validate={validatNumber} name="receiverTel" type="text" className="form-control" id="inputCity"  value={receiverTel}  onChange={e=> {
                                            setreceiverTel(e.target.value)

                                        }}/>
                                        {errors.receiverTel && touched.receiverTel && <div className="text-danger">{errors.receiverTel}</div>}

                                    </div>

                                    <div className="form-group col-md-4">

                                        <label > موبایل</label>
                                        <Field  validate={validatMobail} name="receiverMobile"  type="text" className="form-control" id="inputZip"  value={receiverMobile}  onChange={e=> {
                                            setreceiverMobile(e.target.value)

                                        }} />
                                        {errors.receiverMobile && touched.receiverMobile && <div className="text-danger">{errors.receiverMobile}</div>}

                                    </div>
                                    <div className="form-group col-md-4">

                                        <label >کد پستی</label>
                                        <Field  validate={validatmin10} name="postalCode" type="text" className="form-control" id="inputZip" value={postalCode}  onChange={e=> {
                                            setpostalCode(e.target.value)


                                        }} />
                                        {errors.postalCode && touched.postalCode && <div className="text-danger">{errors.postalCode}</div>}

                                    </div>
                                </div>

                                <div className="form-row  textOnInput">
                                    <div className="form-group col-md-6">
                                        <label>استان</label>
                                        <Select
                                            placeholder='استان'
                                            options={ProvincerenderList()}
                                            onChange={e=>{setostanId(e.value)
                                            }}
                                        />
                                        {ostanId ===0 ?<span className="text-danger">استان خود را انتخاب کنید</span> :null }

                                    </div>
                                    <div className="form-group col-md-6">

                                        <label >شهر</label>
                                        <Select
                                            placeholder='شهر'
                                            options={CitiesrenderList()}
                                            className='form-group'
                                            onChange={e=>setProvinceId(e.value)}
                                        />
                                        {provinceId ===0 ?<span className="text-danger">شهر خود را انتخاب کنید</span> :null }

                                    </div>


                                </div>
                                <div className='form-row  tesxOnInput'>

                                </div>
                                <div className='form-row  tesxOnInput'>

                                </div>
                                <div className="form-group">
                                    <div className="form-check pl-0">
                                        <div className="custom-control custom-checkbox checkbox-info">

                                        </div>
                                    </div>
                                </div>
                                <div className='row justify-content-between mt-4'>
                                    <div >
                                        <button  type="submit" className="btn btn-success">ذخیره تغییرات</button>
                                    </div>
                                    <div >
                                        <NavLink to='/admin/identitypannel' className="btn btn-danger">بازگشت</NavLink>
                                    </div>
                                </div>




                            </Form>
                        )}
                    </Formik>
                </div >
            </div >
        </div>
    )
}

export default AddresForm;
