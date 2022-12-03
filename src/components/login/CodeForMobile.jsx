import React, { useState, useEffect, useCallback } from 'react';
import OtpInput from 'react-otp-input';
import { toast } from 'react-toastify';
import { SetUserRole, verifyUser } from './../../services/userService';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, setOTPCode } from '../../actions/user';
import { loginUser } from '../../services/userService';
import { decodeToken } from './../../utils/decodeToken';
import './customCss.css';
import afra from './afra.jpg';
import Countdown from 'react-countdown';
import { ShowTimer } from './../common/ShowTimer';






const CodeForMobile = () => {
    const history = useNavigate();
    const dispatch = useDispatch();
    
    const [Code, setCode] = useState(0);
    const [isSubmit, setIssubmit] = useState(false);
    const [timer, setTimer] = useState(120);
    const timeOutCallback = useCallback(() => setTimer(currTimer => currTimer - 1), []);
    const otpCodeResender = async (event) => {
        event.preventDefault();

        const mobile = localStorage.getItem('mobile');
        const user = {
            phoneNumber: mobile
        }
        const { data, status } = await loginUser(user);
        window.location.reload();
        resetTimer();
    }
    useEffect(() => {
        timer > 0 && setTimeout(timeOutCallback, 1000);
    }, [timer, timeOutCallback]);

    const resetTimer = function () {
        if (!timer) {
            setTimer(120);
        }
    };




    const handelSubmit = async (event) => {
        
        if (event) {
            event.preventDefault();
        }
        const user = {
            verificationCode: Code,
            phoneNumber: localStorage.getItem('mobile')
        }
        console.log(Code)
        setIssubmit(false);
        try {



            const { status, data } = await verifyUser(user);


            if (status === 200) {
               

                toast.success("ورود موفقیت آمیز بود", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined
                });
       
                localStorage.setItem('token', data.result.token);
                localStorage.setItem('refresh', data.result.refresh);

                const detoken = decodeToken(data.result.token);
                localStorage.setItem('connect', detoken.ID)

            
                dispatch(addUser(detoken));
                

            }


            history('/dashboard');


        }

        catch (error) {
            toast.error("کد وارد شده اشتباه است", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined
            });
            setIssubmit(false)

        }
    }
    const handleChang = (num) => {
       
        setCode(num);
        num.length===5?setIssubmit(true):setIssubmit(false)

    }

    if (Code.length>4 && isSubmit) {

        handelSubmit();
    }

    return (

        <div className='auth'  >
            <div className='card'>
                <div className='row no-gutters'>
                    <div className='col-md-6'>
                        <div className='card-body'>

                            <h4 className='card-title'>
                                ورود
                            </h4>
                            <p className='mt-5'>لطفا کد ارسال شده به تلفن همراه خود را وارد کیند.</p>



                            <form style={{ direction: 'ltr' }} >


                                <OtpInput

                                    containerStyle={{ display: 'flex' }}
                                    inputStyle={{ width: '3rem', height: '3rem', margin: '0 1rem', borderRadius: '4px' }}
                                    value={Code}
                                    numInputs={5}
                                    shouldAutoFocus={true}
                                    separator={<span> </span>}
                                    onChange={handleChang}

                                    
                                />
                                <hr />

                                <ShowTimer timer={timer} firstCondition={otpCodeResender} secondCondition={handelSubmit} />

                            </form>
                        </div>

                    </div>
                    <div className='col-md-6'>
                        <img className='card-img h-100' src={afra} alt="" />
                    </div>

                </div>
            </div>
        </div>);
}

export default CodeForMobile;