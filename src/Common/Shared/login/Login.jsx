import React, { useState, useRef } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { useNavigate, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import { loginUser } from '../../../services/userService';
import { toast } from 'react-toastify';
import './customCss.css';
import afra from './afra.jpg';

import LoginWithPassword from "./loginWithPassword";
import { BiArrowBack } from 'react-icons/bi';
import {ClipLoader} from "react-spinners";



const Login = () => {
    const user = useSelector(state => state.user);
    const [, forceUpdate] = useState();
    const history = useNavigate();
    const [click, setClick] = useState(false);
    const [show , setShow]=useState(false)
    const dispatch = useDispatch();
    const [mobile, setMobile] = useState('');
    const [loading, setLoading] = useState(false);
    


   const validator = useRef(new SimpleReactValidator({
validators:{
    min:{ message: 'حداقل :min کارکتر.', rule: function rule(val, options) {
        return val.length >= options[0];
    }, messageReplace: function messageReplace(message, options) {
        return message.replace(':min', options[0]);
    } }
}
,
        messages: {
            required: "پرکردن این فیلد الزامی می باشد"


        }
        , element: message => <p style={{ color: 'red' }}>{message}</p>
    }));
    const handelBack=(e)=>{
        e.preventDefault()
        history('sysplus')
    }
    let d = new Date();
    d.setTime(d.getTime() +  (60 * 2000));
    let expires =  d.toUTCString();

    const dataLogin = {
        expiresAt: expires,
    }
    function getDataLogin() {
        let items = JSON.parse(sessionStorage.getItem('dataLogin'));
        return items ? items : ''


    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true)
        setClick(true);
        const user = {

            phoneNumber: mobile

        }
        const resetForm = () => {
            setMobile('');

        }

        try {

            if (validator.current.allValid()) {

                if (getDataLogin().expiresAt < new Date().toUTCString()){

                    sessionStorage.removeItem("dataLogin")


                }
                if (!getDataLogin().expiresAt){
                    const { status, data } = await loginUser(user);
                    setLoading(false)
                    if (data.success===true) {
                        toast.success("کد برای تلفن همراه شما ارسال شد", {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: false,
                            draggable: true,
                            progress: undefined

                        });
                        setLoading(true)
                        localStorage.setItem('mobile', user.phoneNumber)


                        resetForm();

                        history('/verify', { replace: true });

                    }
                    
                    sessionStorage.setItem('dataLogin', JSON.stringify(dataLogin));


                }


            }
            else {
                setClick(false);
                validator.current.showMessages();

                forceUpdate(1);
            }




        }
        catch (error) {
        
            setClick(false);
        }
    }

    let mobileNo;
    if(mobile){
mobileNo=mobile
    }

    return (
        <div className='auth' >
            <div className='card'>
                <div className='row no-gutters'>
                    <div className='col-md-5'>
                        {show === false ?
                            <>
                            <LoginWithPassword setShows={setShow} value ={mobileNo} onchange={e =>{setMobile(e.target.value)
                                                                                localStorage.setItem('mobile',mobile)}}/>
                            </>:
                            <div className='card-body'>

<div className='row'>
                <h4 className="col-10">
                    ورود
                </h4>
                {/* <BiArrowBack className="col-2 text-left"  size="20px" title="بازگشت به صفحه اصلی" onClick={handelBack}/> */}
            </div>
                            <p className='mt-5'>برای استفاده از خدمات هولدینگ افرا، وارد حساب کاربری خود شوید .</p>



                            <form onSubmit={handleSubmit}>
                            <div className=' mt-5 textOnInput ' style={{direction: 'ltr'}} >
                <label>شماره موبایل</label>

                            <input  type='text' name='mobile' className='form-control opacityForInput' value={mobile} placeholder='09121234567 ' maxLength="11" onChange={e => {
                            setMobile(e.target.value)
                            validator.current.showMessageFor("required");
                        }} />


                            </div>
                            <div className='form-group' style={{height: "20px"}}>
                        {validator.current.message("required", mobile, "required|min:11")}
                            </div>
                                <div className='row'>


                                    <div className="col-6">
                                        <button className='  btn btn-success mt-5 mb-5 float-left' disabled={validator.current.allValid() && !loading? false: true}>
                                            تایید و ادامه
                                            <ClipLoader

                                                loading={loading}
                                                color="#ffff"
                                                size={15}
                                            />
                                        </button>

                                    </div>
                                    <div className="col-6">

                                        <button className='   btn btn-primary mt-5 mb-5 float-right'  onClick={()=>setShow(false)}>ورود با رمز عبور</button>
                                    </div>
                                </div>
                            </form>

                            </div>
                        }
                    </div>
                    <div className='col-md-7'>
                        <img className='card-img h-100' src={afra} alt="" />
                    </div>

                </div>
            </div>
        </div>
    )
}
export default Login;
