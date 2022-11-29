import React from 'react'
import { useNavigate } from 'react-router-dom';

export const ShowTimer = ({timer,firstCondition,secondCondition}) => {
    const [minutes, second] = [Math.floor(timer/60), timer%60];
    const navigate=useNavigate();
    let formatSecond=0;
    const handelForm=()=>{
        navigate("/login")
    }
    // second.length>1?formatSecond:`0${formatSecond}
    if (!timer) {


        return (
            <div>
            <button className='btn btn-primary mt-5 mb-5 float-right' onClick={firstCondition}>ارسال مجدد</button>
            <button className='btn btn-primary mt-5 mb-5 float-left' disabled={false} onClick={handelForm}> اصلاح شماره </button>
            </div>
        )
    }
    else {
        return (
        <div>
            <p>تا  {`${minutes}:${second}`} امکان ارسال مجدد کد وجود ندارد</p>
            <button className='btn btn-success mt-5 mb-5 float-right' disabled={false} onClick={secondCondition}>تایید و ادامه</button>
        </div>
        )
    }
}
