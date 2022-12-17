import { useDispatch, useSelector } from "react-redux";
import React, { useRef, useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import SimpleReactValidator from "simple-react-validator";
import { loginUser } from "../../services/userService";
import { toast } from "react-toastify";
import afra from "../login/afra.jpg";
import { decodeToken } from '../../utils/decodeToken';
import { addUser } from '../../actions/user';
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from "react-simple-captcha";
import { AiOutlineReload } from "react-icons/ai"
import {BiArrowBack} from 'react-icons/bi'
const LoginWithPassword = ({ value, onchange, setShows }) => {
    const [input, setInput] = useState('')
    const [valid, setValid] = useState(true)
    const [SHOW, setShow] = useState(false)
    const [, forceUpdate] = useState();
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const select = useSelector(state => state.userInfo)
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    useEffect(() => {
        loadCaptchaEnginge(6, 'lightgray', 'black', 'numbers');
    }, [])
    const validator = useRef(new SimpleReactValidator({
        validators: {
            min: {
                message: 'حداقل :min کارکتر.', rule: function rule(val, options) {
                    return val.length >= options[0];
                }, messageReplace: function messageReplace(message, options) {
                    return message.replace(':min', options[0]);
                }
            }
        },
        messages: {
            required: "پرکردن این فیلد الزامی می باشد"


        }
        , element: message => <p style={{ color: 'red' }}>{message}</p>
    }));

const handelBack=(e)=>{
    e.preventDefault()
    navigate('sysplus')
}
    const submitCaptcha = () => {
        if (SHOW) {
            if (validateCaptcha(input) !== true) {
                setShow(true)
                setValid(false)
                toast.error("کپچا اشتباه ثبت شده", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined
                });
            }

            setInput("")
        }
    }
    const handleSubmit = async (event) => {
        const user = {

            phoneNumber: value,
            password
        }
        event.preventDefault();
        submitCaptcha()
        if (valid && validator.current.allValid()) {
            try {



                const { status, data } = await loginUser(user);
                if (status === 200) {

                    if (data.result.success === true) {
                        setValid(true)
                        localStorage.setItem('mobile', user.phoneNumber)
                        localStorage.setItem('token', data.result.token);
                        localStorage.setItem('refresh', data.result.refresh);

                        const detoken = decodeToken(data.result.token);
                        localStorage.setItem('connect', detoken.ID);
                        dispatch(addUser(detoken));

                        toast.success("ورود موفقیت آمیز بود", {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: false,
                            draggable: true,
                            progress: undefined
                        });

                        navigate('/dashboard')


                    }


                    else {
                        setShow(true)
                        toast.error(`${data.result.message}`, {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: false,
                            draggable: true,
                            progress: undefined
                        });

                    }




                }
            }



            catch (error) {
                toast.error("خطایی از سمت سرور رخ داده است", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined
                });

            }


        }


    }



    return (

        <div className='card-body'>

            <div className='row'>
                <h4 className="col-10">
                    ورود
                </h4>
                <BiArrowBack className="col-2 text-left"  size="20px" title="بازگشت به صفحه اصلی" onClick={handelBack}/>
            </div>
            <p className='mt-5'>برای استفاده از خدمات هولدینگ افرا، وارد حساب کاربری خود شوید .</p>


            <form onSubmit={handleSubmit}>
                <div className='mt-5 textOnInput' style={{ direction: 'ltr' }}>
                    <label>شماره موبایل</label>

                    <input type='text' name='mobile' className='form-control opacityForInput' placeholder='09121234567 ' maxLength="11"
                        value={value} onChange={onchange} />



                </div>
                <div className='form-group' style={{ height: "20px" }}>
                    {validator.current.message("required", value, "required|min:11")}

                </div>
                <div className=' textOnInput' style={{ direction: 'ltr' }}>
                    <label>رمز عبور</label>
                    <input type='password' name='password' className='form-control opacityForInput' placeholder='******** '
                        value={password} onChange={e => {
                            setPassword(e.target.value)
                            validator.current.showMessageFor("required");
                        }} />



                </div>
                <div className=' row mt-4' style={{ display: SHOW ? "flex" : "none" }} >
                    <div className='col-6 textOnInput' style={{ direction: 'ltr' }}>

                        <label>کد امنیتی</label>

                        <input className='form-control opacityForInput' value={input} onChange={e => setInput(e.target.value)} />

                    </div>
                    <div className="col-6">
                        <LoadCanvasTemplate reloadColor="black" reloadText={`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-clockwise" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/> <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/> </svg>`} />

                    </div>


                </div>


                <div className='form-group' style={{ height: "20px" }}>
                    {validator.current.message("required", password, "required")}

                </div>
                <div className='row'>
                    <div className="col-5">
                        <button className='btn btn-success mt-5 mb-5 float-left' disabled={validator.current.allValid() ? false : true} onClick={handleSubmit}>تایید</button>
                    </div>
                    <div className="col-7">
                        <button className=' btn btn-primary  mt-5 mb-5 float-right' onClick={() => setShows(true)}>ورود با رمز یکبار مصرف</button>
                    </div>

                </div>
            </form>
        </div>


    )
}

export default LoginWithPassword