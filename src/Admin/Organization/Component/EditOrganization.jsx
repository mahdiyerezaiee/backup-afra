import React, { useState ,useEffect} from 'react'
import { GetOrganisationById, SetOrganisation } from '../../../services/organisationService';
import { useNavigate, NavLink, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {ClipLoader} from "react-spinners";
import { Formik, Form, Field } from 'formik';
import {validatAlpha, validatmin10, validatNumber} from "../../../Utils/validitionParams";

const EditOrganizaion = () => {
    const [name, setName] = useState('');
    const [companyRegister, setcompanyRegister] = useState('');
    const [nationalId, SetnationalId] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate=useNavigate();
    const params=useParams();

    const getOrganization=async()=>{
try {
    const {data,status}=await GetOrganisationById(params.id);
    if(status===200){
        setName(data.result.organization.name);
        setcompanyRegister(data.result.organization.registrationNumber);
        SetnationalId(data.result.organization.nationalId)
    }
} catch (error) {
    console.log(error);
}

    }
    useEffect(()=>{
        getOrganization()
    },[])
    const handelSubmit = async (organisation) => {
        setLoading(true)


        try {
            const { data, status } = await SetOrganisation(organisation)
            if (status === 200) {
setLoading(false)
                toast.success("اطلاعات با موفقیت ثبت شد", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined
                });

                navigate(-1)

            }
        } catch (error) {
            console.log(error)
        }

    }
    return (
        <div className='user-progress' >
            <div className='row'>
                <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12 p-3 m-2'>
                    <h5 >ویرایش سازمان  </h5>
                    <p>در این بخش می توانیداطلاعات سازمان را ویرایش کنید.</p>
                </div>
            </div>
            <div className='row d-flex justify-content-center '>
                <div className='widget box shadow col-lg-5 col-sm-12'>


                    <Formik
                        initialValues={{
                            id:0,
                            name,
                            nationalId,
                            registrationNumber: companyRegister,
                            parentId: 0,
                            groupId: 0
                        }}
                        enableReinitialize={true}
                        onSubmit={values => {
                            // same shape as initial values
                            handelSubmit({"organization": values})
                        }}>
                        {({ errors, touched, validateField, validateForm,setFieldValue ,handleChange,values}) => (

                            <Form className="form col"  >
                                <div className="n-chk">


                                    {/* <label className="form-check-label mb-3">
                        <input type="checkbox" className="form-check-input" onChange={e => setChek(e.target.checked)} />
                        شخص حقوقی هستم
                    </label> */}
                                </div>

                                <div className="form-group mb-4 textOnInput ">

                                    <label >شماره ملی شرکت</label>
                                    <div className='form-row justify-content-center'>
                                        <Field validate={validatNumber} type="text" className="form-control opacityForInput col" name="nationalId" value={nationalId} onChange={(e) => { SetnationalId(e.target.value); }} placeholder="12345678912" />


                                    </div>
                                    {errors.nationalId && touched.nationalId && <div className="text-danger">{errors.nationalId}</div>}



                                </div>
                                <div className="form-group mb-4 textOnInput ">
                                    <label >نام شرکت</label>
                                    <Field validate={validatAlpha} name="name" type="text" className="form-control opacityForInput" value={name}
                                           onChange={(e) => {
                                               setName(e.target.value)

                                           }} placeholder="نام شرکت" />

                                    {errors.name && touched.name && <div className="text-danger">{errors.name}</div>}

                                </div>

                                <div className="form-group mb-4 textOnInput ">
                                    <label >شماره ثبت</label>
                                    <Field validate={validatNumber} name="registrationNumber" type="text" className="form-control opacityForInput"  value={companyRegister} onChange={(e) => {
                                        setcompanyRegister(e.target.value)

                                    }} placeholder="شماره ثبت" />
                                    {errors.registrationNumber && touched.registrationNumber && <div className="text-danger">{errors.registrationNumber}</div>}


                                </div>




                                <div className='row justify-content-between'>
                                    <div >
                                        <button type="submit" disabled={loading} className="btn btn-success "  >
                                            تایید

                                            <ClipLoader

                                                loading={loading}
                                                color="#ffff"
                                                size={15}
                                            />
                                        </button>
                                    </div>
                                    <div >
                                        <NavLink to='/admin/organizationlist' className="btn btn-danger">بازگشت</NavLink>
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

export default EditOrganizaion