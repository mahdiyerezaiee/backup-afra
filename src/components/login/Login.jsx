import React, { useState, useRef } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { useNavigate, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { isEmpty } from 'lodash';
import { loginUser } from '../../services/userService';
import { toast } from 'react-toastify';
import './customCss.css';
import afra from './afra.jpg';


// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';

// import { loginUser } from '../../services/userService';
import CodeForMobile from './CodeForMobile';
import LoginWithPassword from "../common/loginWithPassword";



const Login = () => {
    const user = useSelector(state => state.user);
    const [, forceUpdate] = useState();
    const history = useNavigate();
    const [click, setClick] = useState(false);
    const [show , setShow]=useState(false)
    //     const user=useSelector(state=>state.user);
    const dispatch = useDispatch();
    const [mobile, setMobile] = useState('');
    //     const [password, setPssword] = useState('');
    //     const [, forceUpdate] = useState();
    //     const [rememberme, setRememberme] = useState();
    //     const [loading, setLoading] = useState(false);
    //     console.log(history);

    const validator = useRef(new SimpleReactValidator({

        messages: {
            required: "پرکردن این فیلد الزامی می باشد"


        }
        , element: message => <p style={{ color: 'red' }}>{message}</p>
    }));

    const handleSubmit = async (event) => {
        event.preventDefault();
        setClick(true);
        const user = {

            phoneNumber: mobile

        }
        const resetForm = () => {
            setMobile('');

        }

        try {

            if (validator.current.allValid()) {



                const { status, data } = await loginUser(user);
                if (status === 200) {
                    toast.success("کد برای تلفن همراه شما ارسال شد", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined
                    });
                    localStorage.setItem('mobile', user.phoneNumber)
                    resetForm();
                    
                    history('/verify', { replace: true });

                }
            }
            else {
                setClick(false);
                validator.current.showMessages();

                forceUpdate(1);
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

                            <h4 className='card-title'>
                            ورود
                            </h4>
                            <p className='mt-5'>برای استفاده از خدمات هولدینگ افرا، وارد حساب کاربری خود شوید .</p>



                            <form onSubmit={handleSubmit}>
                            <div className=' mt-5 textOnInput ' style={{direction: 'ltr'}} >
                <label>شماره موبایل</label>

                            <input  type='text' name='mobile' className='form-control opacityForInput' value={mobile} placeholder='09121234567 ' onChange={e => {
                            setMobile(e.target.value)
                            validator.current.showMessageFor("required");
                        }} />


                            </div>
                            <div className='form-group' style={{height: "20px"}}>
                        {validator.current.message("required", mobile, "required")}
                            </div>
                                <div className='row'>


                                    <div className="col-6">
                                        <button className='  btn btn-success mt-5 mb-5 float-left' disabled={validator.current.allValid()? false: true}>تایید و ادامه</button>

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
