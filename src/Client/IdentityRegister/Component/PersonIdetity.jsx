
import React, { useState, useRef, useEffect } from 'react'
import SimpleReactValidator from 'simple-react-validator';
import {NavLink, useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';
import "react-multi-date-picker/styles/layouts/prime.css";
import { useSelector, useDispatch } from 'react-redux';
import { GetOrganisationCode, SetOrganisation } from '../../../services/organisationService';
import { setCustomerInfo } from '../../../services/customerService';
import { GetUserInfo } from '../../../services/userService';


const PersonIdetity = () => {
    const navigate=useNavigate()

    const [, forceUpdate] = useState();
    const [userData, setUserData] = useState({});
    const [Click, setClick] = useState(false);
    const [check, setChek] = useState(false);
    const userinfo = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [nationalId, SetnationalId] = useState('');
    const [formDisable, setformDisable] = useState(true);
    const [password, setPassword]=useState(null)
    const [passwordConfirm , setPasswordConfirm]=useState(null)
    const [companyName, setcompanyName] = useState('');
    const [companyRegister, setcompanyRegister] = useState('');
    const [firstName, setfirstName] = useState(userinfo.firstName);
    const [lastName, setlastName] = useState(userinfo.lastName);
    const [nationalCode, setnationalCode] = useState(userinfo.nationalCode);
    const [email, setemail] = useState(userinfo.email);
    const [show , setShow]=useState(false)
    const [passwordType, setPasswordType] = useState("password");
    const togglePassword = (e) => {
        e.preventDefault()
        if (passwordType === "password") {
            setPasswordType("text")
            return;
        }
        setPasswordType("password")
    }
    const user = {
        id: userinfo.id,
        userName: userinfo.userName,
        email,
        firstName,
        lastName,
        requireInfo: true,
        nationalCode,
        organizationId: null
    }

    const organ = {
        organization: {
            id: 0, parentId: 0,
            name: companyName, nationalId, registrationNumber: companyRegister
        }
    }

    const validator = useRef(new SimpleReactValidator({
        validators:{
            alpha:{

                rule: (val ,params,validator) => {
                    return validator.helpers.testRegex(val, /^[A-Z آابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی]*$/i, )&& params.indexOf(val) === -1;
                }
            },
            numeric:{

                rule: (val ,params,validator) => {
                    return validator.helpers.testRegex(val,/^[u06F0-u06F9]+$/,)&& params.indexOf(val) === -1 && val.length===10;

                }
            },
            min:{ message: 'حداقل :min کارکتر.', rule: function rule(val, options) {
                    return val.length >= options[0];
                }, messageReplace: function messageReplace(message, options) {
                    return message.replace(':min', options[0]);
                } }
        },
        messages: {
            required: "پرکردن این فیلد الزامی می باشد",

            email: 'ایمیل صحیح نیست',
            alpha: 'حتما از حروف استفاده کنید',
            numeric: 'کد ملی را صحیح وارد کنید'
        }
        , element: message => <p style={{ color: 'red' }}>{message}</p>
    }));
    const handelSetCustomer = async () => {

        try {

            const { data, status } = await setCustomerInfo(user);
            if (data.success) {

                toast.success("اطلاعات با موفقیت ثبت شد", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined
                });
                const { data, status } = await GetUserInfo();

navigate('/admin/identitypannel')
            }


        } catch (error) {

           
        }
    }

    const handelSetOrganisation = async () => {

        try {

            const { data, status } = await SetOrganisation(organ);
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

                setformDisable(false);
            }


        } catch (error) {
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
    const showHandler = (e) => {

        setShow(!show)
    }
    const handelSubmit = (event) => {
        event.preventDefault();
        try {

            if (validator.current.allValid()) {

                if (check) {
                    handelSetOrganisation();
                    handelSetCustomer();
                }
                else {
                    handelSetCustomer();
                }

            }
            else {

                validator.current.showMessages();

                forceUpdate(1);
            }

        }
        catch (error) {

        }



    }

    if (!check) {

        return (
            <div className='user-progress' >
                <div className='row'>
                    <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12 p-3 m-2'>
                        <h5 >تکمیل اطلاعات کاربری</h5>
                        <p>در این بخش می توانید وضعیت حساب کاربری خود را مشاهده کنید.</p>
                    </div>
                </div>
                <div className='row d-flex justify-content-center '>
                    <div className='widget box shadow col-4'>


                        <form  >
                            <div className="n-chk">


                                <label className="form-check-label mb-3">
                                    <input type="checkbox" className="form-check-input" onChange={e => setChek(e.target.checked)} />
                                    شخص حقوقی هستم
                                </label>
                            </div>
                            <div className="form-group mb-4 textOnInput  align-content-between">

                                <label >نام</label>
                                <input type="text" className="form-control opacityForInput" placeholder="نام" value={firstName || ""} onChange={
                                    (e) => {
                                        setfirstName(e.target.value);
                                        validator.current.showMessageFor("required");
                                    }} />
                                {validator.current.message("required", firstName, "required|alpha")}
                            </div>
                            <div className="form-group mb-4 textOnInput">
                                <label >نام خانوادگی</label>
                                <input type="text" className="form-control opacityForInput" placeholder="نام خانوادگی" value={lastName || ""} onChange={e => {
                                    setlastName(e.target.value)
                                    validator.current.showMessageFor("required");
                                }} />
                                {validator.current.message("required", lastName, "required|alpha")}
                            </div>
                            <div className="form-group mb-4 textOnInput">
                                <label >کد ملی</label>
                                <input type="text" className="form-control opacityForInput" placeholder="0070090602" value={nationalCode ||""} onChange={e => {
                                    setnationalCode(e.target.value)
                                    validator.current.showMessageFor("required");
                                }} />
                                {validator.current.message("required", nationalCode, "required|numeric|min:10")}
                            </div>


                            <div className="form-group mb-4 textOnInput">
                                <label >ایمیل</label>
                                <input type="text" className="form-control opacityForInput" placeholder="email@example.com" value={email || ""} onChange={e => {
                                    setemail(e.target.value)
                                    validator.current.showMessageFor("email")
                                }} />
                                {validator.current.message("email", email, "email")}
                            </div>


                            <div><input type='checkbox' checked={show} onClick={showHandler}/> تغییر رمز عبور </div>
                            {show === true?
                                <>
                                    <div className="input-group col-12 mb-5 mt-4 textOnInputForGrp rounded"  hidden={!show}>
                                        <label >رمز عبور</label>
                                        <input type={passwordType}  className="form-control opacityForInput" placeholder="*******" value={password || ""} onChange={e => {
                                            setPassword(e.target.value)
                                            validator.current.showMessageFor("required");
                                        }} />
                                        <div className="input-group-append ">
                                            <button className=" btn-outline-primary box-shadow-none rounded"
                                                    onClick={togglePassword} style={{border: 'none'}}>
                                                {passwordType === "password" ? <svg style={{color: "blue"}}
                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                    width="16" height="16"
                                                                                    fill="currentColor"
                                                                                    className="bi bi-eye"
                                                                                    viewBox="0 0 16 16">
                                                    <path
                                                        d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"
                                                        fill="blue"></path>
                                                    <path
                                                        d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"
                                                        fill="blue"></path>
                                                </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="16"
                                                              height="16" fill="currentColor"
                                                              className="bi bi-eye-slash" viewBox="0 0 16 16">
                                                    <path
                                                        d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
                                                    <path
                                                        d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
                                                    <path
                                                        d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
                                                </svg>}</button>
                                        </div>

                                        {validator.current.message("required", password, "required")}
                                    </div>
                                    <div className="input-group col-12 mb-5 mt-4 textOnInputForGrp rounded"  hidden={!show}>
                                        <label >تکرار مرز عبور</label>
                                        <input type={passwordType}  className="form-control opacityForInput" placeholder="*******" value={passwordConfirm || " "} onChange={e => {
                                            setPasswordConfirm(e.target.value)
                                            validator.current.showMessageFor("required");
                                        }} />
                                        <div className="input-group-append ">
                                            <button className=" btn-outline-primary box-shadow-none rounded"
                                                    onClick={togglePassword} style={{border: 'none'}}>
                                                {passwordType === "password" ? <svg style={{color: "blue"}}
                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                    width="16" height="16"
                                                                                    fill="currentColor"
                                                                                    className="bi bi-eye"
                                                                                    viewBox="0 0 16 16">
                                                    <path
                                                        d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"
                                                        fill="blue"></path>
                                                    <path
                                                        d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"
                                                        fill="blue"></path>
                                                </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="16"
                                                              height="16" fill="currentColor"
                                                              className="bi bi-eye-slash" viewBox="0 0 16 16">
                                                    <path
                                                        d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
                                                    <path
                                                        d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
                                                    <path
                                                        d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
                                                </svg>}</button>
                                        </div>


                                    </div>
                                    {password !== passwordConfirm ?
                                        <span  className="text-danger ">رمز عبور برابر نیست</span> : ''}
                                </>:''
                            }



                            <div className="form-group">
                                <div className="form-check pl-0">
                                    <div className="custom-control custom-checkbox checkbox-info">

                                    </div>
                                </div>
                            </div>
                            <div className='row justify-content-between'>
                                <div className='col '>
                                    <button type="submit" className="btn btn-success " disabled={Click} onClick={handelSubmit}>تایید</button>
                                </div>
                                <div className='col-3 '>
                                    <NavLink to='/admin/identitypannel' className="btn btn-danger">بازگشت</NavLink>
                                </div>
                            </div>




                        </form>
                    </div >
                </div >
            </div>

        )
    }
    else {

        const handelCheckCompanyCode = async (event) => {
            event.preventDefault();
            const NationalId = nationalId
            try {


                const { data, status } = await GetOrganisationCode(NationalId);
                if (data.result.organization === null) {
                    
                    setformDisable(false);
                    setcompanyName('');
                    setcompanyRegister('');



                }
                else {
                    setcompanyName(data.result.organization.name);
                    setcompanyRegister(data.result.organization.name);
                }

            } catch (error) {
                console.log(error)
            }

        }

        return (
            <div className='user-progress' >
                <div className='row'>
                    <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12 p-3 m-2'>
                        <h5 >تکمیل اطلاعات کاربری</h5>
                        <p>در این بخش می توانید وضعیت حساب کاربری خود را مشاهده کنید.</p>
                    </div>
                </div>
                <div className='row d-flex justify-content-center '>
                    <div className='widget box shadow col-4'>

                        <form className='form' >
                            <div className="n-chk">


                                <label className="form-check-label mb-3">
                                    <input type="checkbox" className="form-check-input" onChange={e => setChek(e.target.checked)} />
                                    شخص حقوقی هستم
                                </label>
                            </div>
                            <div className="form-group mb-4 textOnInput  align-content-between">

                                <label >نام</label>
                                <input type="text" className="form-control opacityForInput" placeholder="نام" value={firstName || ""} onChange={
                                    (e) => {
                                        setfirstName(e.target.value);
                                        validator.current.showMessageFor("required");
                                    }} />
                                {validator.current.message("required", firstName, "required|alpha")}
                            </div>
                            <div className="form-group mb-4 textOnInput">
                                <label >نام خانوادگی</label>
                                <input type="text" className="form-control opacityForInput" placeholder="نام خانوادگی" value={lastName || ""} onChange={e => {
                                    setlastName(e.target.value)
                                    validator.current.showMessageFor("required");
                                }} />
                                {validator.current.message("required", lastName, "required|alpha")}
                            </div>
                            <div className="form-group mb-4 textOnInput">
                                <label >کد ملی</label>
                                <input type="text" className="form-control opacityForInput" placeholder="0070090602" value={nationalCode || ""} onChange={e => {
                                    setnationalCode(e.target.value)
                                    validator.current.showMessageFor("required");
                                }} />
                                {validator.current.message("required", nationalCode, "required|numeric")}
                            </div>


                            <div className="form-group mb-4 textOnInput">
                                <label >ایمیل</label>
                                <input type="text" className="form-control opacityForInput" placeholder="email@example.com" value={email || ""} onChange={e => {
                                    setemail(e.target.value)

                                }} />
                                {validator.current.message("required", email, "required|email")}

                            </div>

                            <br />
                            <div className="form-group mb-4 textOnInput">

                                <label >شماره ملی شرکت</label>
                                <div className='form-row justify-content-center'>
                                    <input type="text" className="form-control opacityForInput col" value={nationalId || ""} onChange={(e) => { SetnationalId(e.target.value); validator.current.showMessageFor('required') }} placeholder="12345678912" />
                                    <button type='submit' className='btn btn-outline-primary col-4 ' onClick={handelCheckCompanyCode}>استعلام </button>

                                </div>
                                {validator.current.message("required", nationalId, "required|numeric")}


                            </div>
                            <div className="form-group mb-4 textOnInput ">
                                <label >نام شرکت</label>
                                <input type="text" className="form-control opacityForInput" disabled={formDisable} value={companyName || ""} onChange={(e) => {
                                    setcompanyName(e.target.value)
                                    validator.current.showMessageFor('required')
                                }} placeholder="نام شرکت" />
                                {validator.current.message("required", companyName, "required|alpha")}

                            </div>
                            <div className="form-group  textOnInput ">
                                <label >شماره ثبت</label>
                                <input type="text" className="form-control opacityForInput" disabled={formDisable} value={companyRegister || ""} onChange={(e) => {
                                    setcompanyRegister(e.target.value)
                                    validator.current.showMessageFor('required')
                                }} placeholder="شماره ثبت" />
                                {validator.current.message("required", companyRegister, "required|numeric")}

                            </div>
                            <div><input type='checkbox' checked={show} onClick={showHandler}/> تغییر رمز عبور </div>
                            {show === true?
                                <>
                                    <div className="form-group m-4 textOnInput">
                                        <label >رمز عبور</label>
                                        <input type="password" className="form-control opacityForInput" placeholder="*******" value={password || ""} onChange={e => {
                                            setPassword(e.target.value)
                                            validator.current.showMessageFor("required");
                                        }} />
                                        {validator.current.message("required", password, "required")}
                                    </div>
                                    <div className="form-group m-4 textOnInput">
                                        <label >تکرار مرز عبور</label>
                                        <input type="password" className="form-control opacityForInput" placeholder="*******" value={passwordConfirm || ""} onChange={e => {
                                            setPasswordConfirm(e.target.value)
                                            validator.current.showMessageFor("required");
                                        }} />
                                        {password !== passwordConfirm ?
                                            <p  className="text-danger">رمز عبور برابر نیست</p> : ''}

                                    </div> </>:''
                            }


                            <div className='row justify-content-between'>
                                <div >
                                    <button type="submit" className="btn btn-success " disabled={Click} onClick={handelSubmit} >تایید</button>
                                </div>
                                <div >
                                    <NavLink to='/admin/identitypannel' className="btn btn-danger">بازگشت</NavLink>
                                </div>
                            </div>




                        </form>
                    </div >
                </div >
            </div>

        )
    }
}

export default PersonIdetity