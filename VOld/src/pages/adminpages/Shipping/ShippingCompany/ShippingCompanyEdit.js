import react, { Fragment, useEffect, useState, useRef } from "react";
import { useNavigate, NavLink, useParams } from "react-router-dom";

import { toast } from 'react-toastify';

import SimpleReactValidator from 'simple-react-validator';

import { GetShippingCompany, GetShoppingContract, SetShippingCompany } from "../../../../services/ShippingService";


const EditShippingCompany = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('')
    const [createDate, setCreateDate] = useState('')
    const [check, setChek] = useState(true);


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
                navigate('/shippingcompanyList')

            }


        }



        catch (error) {
            console.log(error);
        }



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
                                <button type="submit" className="btn btn-success float-left " onClick={submit}>تایید</button>
                            </div>
                            <div className='col-6 '>
                                <NavLink to='/shippingcompanyList' className="btn btn-danger float-right">بازگشت</NavLink>
                            </div>
                        </div>


                    </form>
                </div >
            </div >
        </div>

    );
}
export default EditShippingCompany