import { useDispatch, useSelector } from "react-redux";
import React, { useRef, useState, useCallback } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import SimpleReactValidator from "simple-react-validator";
import { loginUser } from "../../services/userService";
import { toast } from "react-toastify";
import afra from "../login/afra.jpg";
import { decodeToken } from '../../utils/decodeToken';
import { AiOutlineReload } from "react-icons/ai"
import Captcha from "react-captcha-code";
import FadeLoader from "react-spinners/FadeLoader";
import {ClipLoader} from "react-spinners";
const LoginWithPassword = ({ value, onchange, setShows }) => {
    const [input, setInput] = useState('')
    const [valid, setValid] = useState(true)
    const [SHOW, setShow] = useState(false)
    const [, forceUpdate] = useState();
    const [captcha, setCaptcha] = useState("");

    const [loading, setLoading] = useState(false);

    let navigate = useNavigate();
    const dispatch = useDispatch();
    const select = useSelector(state => state.userInfo)
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const captchaRef=useRef()
    const handelCaptchaChange=useCallback((code)=>{
        setCaptcha(code)
    })

    const captchaChek=()=>{

        if(SHOW){
            if(captcha===input){
                setValid(true)
            }
            else{
                setValid(false)
            }
        }

    }
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
    const handelRefreshCaptcha=(e)=>{
        e.preventDefault()
        captchaRef.current.refresh()
    }
    const handleSubmit = async (event) => {
        setLoading(true)

        const user = {

            phoneNumber: value,
            password
        }
        event.preventDefault();
        // submitCaptcha()
        if ( valid && validator.current.allValid()) {
            try {



                const { status, data } = await loginUser(user);
                console.log(data,status);
                if (status===200) {

                     
                        setValid(true)
                        localStorage.setItem('mobile', user.phoneNumber)
                        localStorage.setItem('token', data.result.token);
                        localStorage.setItem('refresh', data.result.refresh);

                        const detoken = decodeToken(data.result.token);
                        localStorage.setItem('connect', detoken.ID);

                        toast.success("ورود موفقیت آمیز بود", {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: false,
                            draggable: true,
                            progress: undefined
                        });

                        navigate('/admin')

                    }


                    else {
                        setShow(true)
                        toast.error(`${data.error.message}`, {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: false,
                            draggable: true,
                            progress: undefined
                        });

                    }

                    setLoading(false)

                    

                
            }



            catch (error) {
                setShow(true)
               
                console.log(error);
                setLoading(false)


            }


        }


    }



    return (

        <div className='card-body'>

            <div className='row'>
                <h4 className="col-10">
                    ورود
                </h4>
                {/* <BiArrowBack className="col-2 text-left"  size="20px" title="بازگشت به صفحه اصلی" onClick={handelBack}/> */}
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
                    <div className="row" >
                        {/* <LoadCanvasTemplate reloadColor="black" reloadText={`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-clockwise" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/> <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/> </svg>`} /> */}
                        <button className="border-0" style={{backgroundColor:'#ff000000'}} onClick={handelRefreshCaptcha}><AiOutlineReload size={30} color='#888ea8'/></button>

                        <Captcha height='30' fontSize={25} width='130' onChange={handelCaptchaChange} ref={captchaRef} />
                    </div>


                </div>


                <div className='form-group' style={{ height: "20px" }}>
                    {validator.current.message("required", password, "required")}

                </div>
                <div className='row'>
                    <div className="col-5">
                        <button className='btn btn-success mt-5  mb-5 float-left' disabled={ !loading ? validator.current.allValid() ? false : true:true} onClick={handleSubmit}>
                            تایید

                            <ClipLoader

                                loading={loading}
                                color="#ffff"
                                size={15}
                            />

                        </button>
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