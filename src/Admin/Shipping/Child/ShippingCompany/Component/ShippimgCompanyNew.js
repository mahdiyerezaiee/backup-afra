import react, { Fragment, useEffect, useState, useRef } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import {ClipLoader} from "react-spinners";

import { toast } from 'react-toastify';

import SimpleReactValidator from 'simple-react-validator';

import { SetShippingCompany } from "../../../../../services/ShippingService";


const NewShippingCompany = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false);

    const [code, setCode] = useState(0)
    const [check, setChek] = useState(true);







    const ShippingCompany = {
        "shippingCompany"  :{
        name,
        code,
        createDate: new Date(),
        active:check
        }

    };
    const validator = useRef(new SimpleReactValidator({
        validators: {
            alpha: {

                rule: (val, params, validator) => {
                    return validator.helpers.testRegex(val, /^[A-Z آابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی]*$/i,) && params.indexOf(val) === -1;
                }
            },
            numeric: {

                rule: (val, params, validator) => {
                    return validator.helpers.testRegex(val, /^[u0660-u0669]+$/,) && params.indexOf(val) === -1;
                }
            },
        },
        messages: {
            required: "پرکردن این فیلد الزامی می باشد",

            email: 'ایمیل صحیح نیست',
            alpha: 'حتما از حروف استفاده کنید',
            numeric: 'حتما از عداد استفاده کنید'
        }
        , element: message => <p style={{ color: 'red' }}>{message}</p>
    }));


    const submit = async (event) => {
       setLoading(true)
        event.preventDefault();
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


                    <form>

                        <div className="col-12 mb-3">


                            <label className="form-check-label mb-3">

                                <input type="checkbox" checked={check} className="form-check-input" onChange={e => setChek(e.target.checked)} />
                            فعال /غیرفعال
                            </label>
                        </div>
                        <div className="form-group mb-4 textOnInput  align-content-between">

                            <label>نام باربری</label>
                            <input type="text" className="form-control opacityForInput" placeholder="نام باربری"
                                value={name} onChange={e => {
                                    setName(e.target.value)
                                    validator.current.showMessageFor("required");

                                }} />
                            {validator.current.message("required", name, "required|alpha")}

                        </div>

                        <div className="form-group mb-4 textOnInput">
                            <label>کد</label>
                            <input type="text" className="form-control opacityForInput" value={code} onChange={e => {
                                setCode(e.target.value)
                                validator.current.showMessageFor("required");

                            }} />
                            {validator.current.message("required", code, "required|numeric")}

                        </div>




                        <div className="form-group">
                            <div className="form-check pl-0">
                                <div className="custom-control custom-checkbox checkbox-info">

                                </div>
                            </div>
                        </div>
                        <div className='row justify-content-between'>
                            <div className='col-6 '>
                                <button disabled={loading} type="submit" className="btn btn-success float-left " onClick={submit}>تایید <ClipLoader

                                    loading={loading}
                                    color="#ffff"
                                    size={15}
                                /></button>
                            </div>
                            <div className='col-6 '>
                                <NavLink to='/admin/shippingcompanyList' className="btn btn-danger float-right">بازگشت</NavLink>
                            </div>
                        </div>


                    </form>
                </div >
            </div >
        </div>

    );
}
export default NewShippingCompany