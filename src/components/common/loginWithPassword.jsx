import {useDispatch, useSelector} from "react-redux";
import React, {useRef, useState,useEffect} from "react";
import {Navigate, useNavigate} from "react-router-dom";
import SimpleReactValidator from "simple-react-validator";
import {loginUser} from "../../services/userService";
import {toast} from "react-toastify";
import afra from "../login/afra.jpg";
import { decodeToken } from '../../utils/decodeToken';
import { addUser } from '../../actions/user';
import {loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha} from "react-simple-captcha";

const LoginWithPassword = ({value , onchange}) => {
    const [input , setInput]= useState('')
    const [valid , setValid]= useState(true)
    const [SHOW , setShow]= useState(false)
    const [, forceUpdate] = useState();
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [captcha, setCaptcha] = useState(0);
useEffect(()=>{
    loadCaptchaEnginge(6)

},[])
    const validator = useRef(new SimpleReactValidator({

        messages: {
            required: "پرکردن این فیلد الزامی می باشد"


        }
        , element: message => <p style={{color: 'red'}}>{message}</p>
    }));
   
 

    const handleSubmit = async (event) => {
        const user = {

            phoneNumber: value,
            password
        }
        event.preventDefault();
       if (SHOW === true) {
           if (validateCaptcha(input) === true) setValid(true)
           else {
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
        if ( valid && validator.current.allValid()) {
        try {
            
                const {status, data} = await loginUser(user);
                if (status === 200){

                    if (data.result.success===true) {
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

                navigate('/dashboard',{replace:false})

                        
                    }
                   
               
                    else{
                        setShow(true)
                        setValid(false)
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

        let maxNumber1 = 10;
        const randomNumber1 = Math.floor((Math.random() * maxNumber1) + 1);


        let maxNumber2 = 20;
        const randomNumber2 = Math.floor((Math.random() * maxNumber2) + 1);




    return (

        <div className='card-body'>

            <h4 className='card-title'>
                ورود
            </h4>
            <p className='mt-5'>برای استفاده از خدمات هولدینگ افرا، وارد حساب کاربری خود شوید .</p>


            <form onSubmit={handleSubmit}>
                <div className='mt-5 textOnInput' style={{direction: 'ltr'}}>
                <label>شماره موبایل</label>

                    <input type='text' name='mobile' className='form-control opacityForInput' placeholder='09121234567 '
                           value={value} onChange={onchange}/>



                </div>
                <div className='form-group' style={{height: "20px"}}>
                    {validator.current.message("required", value, "required")}

                </div>
                <div className=' textOnInput' style={{direction: 'ltr'}}>
                    <label>رمز عبور</label>
                    <input type='password' name='password' className='form-control opacityForInput' placeholder='******** '
                           value={password} onChange={e => {
                        setPassword(e.target.value)
                        validator.current.showMessageFor("required");
                    }}/>



                </div>
               <div className=' row mt-4' style={{display:SHOW? "flex":"none"}} >
                        <div  className='col-6 textOnInput' style={{direction: 'ltr'}}>

                            <label>کپچا</label>

                            <input  className='form-control opacityForInput' value={input} onChange={e=> setInput(e.target.value)}/>

                        </div>
                        <div className="col-6">
                            <LoadCanvasTemplate reloadText="بازنشانی مجدد"/>

                        </div>


                </div>


                <div className='form-group' style={{height: "20px"}}>
                    {validator.current.message("required", password, "required")}

                </div>


                <button className='btn btn-success mt-5 mb-5 float-right' disabled={validator.current.allValid()? false: true} onClick={handleSubmit}>تایید</button>
            </form>
        </div>


    )
}

export default LoginWithPassword