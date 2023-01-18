import react, { Fragment, useEffect, useState, useRef } from "react";
import { useNavigate, NavLink, useParams } from "react-router-dom";
import {ClipLoader} from "react-spinners";

import { toast } from 'react-toastify';


import { GetShippingCompany, GetShoppingContract, SetShippingCompany } from "../../../../../services/ShippingService";
import {Field, Form, Formik} from "formik";
import {validatAlpha, validatNumber} from "../../../../../Utils/validitionParams";


const EditShippingCompany = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('')
    const [createDate, setCreateDate] = useState('')
    const [check, setChek] = useState(true);
    const [loading, setLoading] = useState(false);

    const [code, setCode] = useState(0)
    const params = useParams()


    const GetShippingcompany = async () => {
        const { data, status } = await GetShippingCompany(params.id);
        setName(data.result.shippingCompany.name);
        setCode(data.result.shippingCompany.code);
        setChek(data.result.shippingCompany.active)
        setCreateDate(data.result.shippingCompany.createDate)

    }

    useEffect(() => {
        GetShippingcompany()
    }, [])



    const ShippingCompany = {
        "shippingCompany": {
            id: Number(params.id),
            name,
            code,
            active: check



        }
    };



    const submit = async () => {
        setLoading(true)
        try {
            const { data, status } = await SetShippingCompany(ShippingCompany);
            if (status === 200) {
                toast.success("اطلاعات با موفقیت ثبت شد", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined
                });
                navigate('/admin/shippingcompanyList')

            }


        }



        catch (error) {
            console.log(error);
        }

setLoading(false)

    };


    return (

        <div className='user-progress' >
            <div className='row'>
                <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12 p-3 m-2'>
                    <h5 >تعریف باربری</h5>
                    <p>در این بخش می توانید باربری جدید تعریف  کنید.</p>
                </div>
            </div>
            <div className='row d-flex justify-content-center '>
                <div className='widget box shadow col-md-4 col-xs-12'>

                    <Formik
                        initialValues={{
                            id: Number(params.id),
                            name,
                            code,
                            active: check
                        }}
                        enableReinitialize={true}
                        onSubmit={values => {
                            // same shape as initial values
                            submit()
                        }}>
                        {({ errors, touched, validateField, validateForm,setFieldValue ,handleChange,values}) => (



                            <Form >

                                <div className="col-12 mb-3">


                                    <label className="form-check-label mb-3">

                                        <input type="checkbox" checked={check} className="form-check-input" onChange={e => setChek(e.target.checked)} />
                                        فعال /غیرفعال
                                    </label>
                                </div>
                                <div className="form-group mb-4 textOnInput  align-content-between">

                                    <label>نام باربری</label>
                                    <Field  validate={validatAlpha} name="name" type="text" className="form-control opacityForInput" placeholder="نام باربری"
                                            value={name} onChange={e => {
                                        setName(e.target.value)

                                    }} />
                                    {errors.name && touched.name && <div className="text-danger">{errors.name}</div>}

                                </div>

                                <div className="form-group mb-4 textOnInput">
                                    <label>کد</label>
                                    <Field  validate={validatNumber} name="code"  type="text" className="form-control opacityForInput" value={code} onChange={e => {
                                        setCode(e.target.value)

                                    }} />
                                    {errors.code && touched.code && <div className="text-danger">{errors.code}</div>}

                                </div>




                                <div className="form-group">
                                    <div className="form-check pl-0">
                                        <div className="custom-control custom-checkbox checkbox-info">

                                        </div>
                                    </div>
                                </div>
                                <div className='row justify-content-between'>
                                    <div className='col-6 '>
                                        <button disabled={loading} type="submit" className="btn btn-success float-left " >تایید <ClipLoader

                                            loading={loading}
                                            color="#ffff"
                                            size={15}
                                        /></button>
                                    </div>
                                    <div className='col-6 '>
                                        <NavLink to='/admin/shippingcompanyList' className="btn btn-danger float-right">بازگشت</NavLink>
                                    </div>
                                </div>


                            </Form>
                        )}
                    </Formik>
                </div >
            </div >
        </div>

    );
}
export default EditShippingCompany