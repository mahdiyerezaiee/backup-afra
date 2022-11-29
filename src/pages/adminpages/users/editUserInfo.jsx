import { NavLink, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import { CreateUser, GetUserData } from "../../../services/userService";
import { GetAllOrganisation } from "../../../services/organisationService";
import SimpleReactValidator from "simple-react-validator";
import Select from "react-select";
import { setCustomerInfo } from "../../../services/customerService";
import "./style.css"

const EditUserInfo = () => {
    const navigate = useNavigate()
    const params = useParams()
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [nationalCode, setNationalCode] = useState('')
    const [organizationID, setOrganizationID] = useState([])
    const [organizationId, setOrganizationId] = useState(null)
    const [password, setPassword] = useState(null)
    const [passwordConfirm, setPasswordConfirm] = useState(null)
    const [check, setChek] = useState(false);
    const [actionBlock, SetactionBlock] = useState(false)
    const [show, setShow] = useState(false)
    const [active, setActive] = useState(false);
    const [passwordType, setPasswordType] = useState("password");


    const togglePassword = (e) => {
        e.preventDefault()
        if (passwordType === "password") {
            setPasswordType("text")
            return;
        }
        setPasswordType("password")
    }
    const showHandler = (e) => {
        setShow(e.target.checked)
    }
    const dataUser = {

        id: params.id,
        userName,
        email,
        firstName,
        lastName,
        nationalCode,
        organizationId,
        password,
        active,
        actionBlock
    }

    const getUserInfo = async () => {
        try {
            const { data, status } = await GetUserData(params.id)
            setEmail(data.result.customer.email)
            setUserName(data.result.customer.userName)
            setFirstName(data.result.customer.firstName)
            setLastName(data.result.customer.lastName)
            setNationalCode(data.result.customer.nationalCode)
            setOrganizationId(data.result.customer.organizationId)
            setActive(data.result.customer.active)
            SetactionBlock(data.result.customer.actionBlock)


        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getUserInfo()
    }, [])

    useEffect(() => {


        if (organizationId !== null) {
            setChek(true)
        }


    }, [organizationId])

    const submit = async (e) => {
        e.preventDefault()
        try {
            const { data, status } = await setCustomerInfo(dataUser)

        } catch (err) {
            console.log(err)
        }
        navigate('/userlist')

    }
    const getOrganizationId = async () => {
        try {
            const { data, status } = await GetAllOrganisation()
            setOrganizationID(data.result.organizationLists.values)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getOrganizationId()
    }, [])
    const OrganizationId = () => {
        return (organizationID.map(item => ({ label: item.name, value: item.id })))
    }
    const OrganizationItem = () => {
        return (organizationID.filter(item => item.id === organizationId).map(item => ({ label: item.name, value: item.id })))
    }

    const validator = useRef(new SimpleReactValidator({
        validators: {
            alpha: {

                rule: (val, params, validator) => {
                    return validator.helpers.testRegex(val, /^[ یكئآابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی  ]*$/i,) && params.indexOf(val) === -1;
                }
            },
            numeric: {

                rule: (val, params, validator) => {
                    return validator.helpers.testRegex(val, /^[u06F0-u06F9]+$/,);

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

    return (

        <div className='user-progress' >
            <div className='row'>
                <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12 p-3 m-2'>
                    <h5> ویرایش کاربر </h5>
                    <p>در این بخش می توانید اطلاعات کاربر را ویرایش کنید</p>

                </div>
            </div>
            <div className='row d-flex justify-content-center col-12'>
                <div className='widget box shadow col-md-6 col-xs-12'>


                    <form  >

                        <div className="form-group  textOnInput col-12 ">

                            <div className="form-row">
                                <div className="col-12 mb-5">


                                    <label className="form-check-label mb-3">

                                        <input type="checkbox" checked={check} className="form-check-input" onChange={e => setChek(e.target.checked)} />
                                        حساب کاربری شخص حقوقی
                                    </label>
                                </div>
                                <div className="col-12 mb-5 d-flex justify-content-between ">
                                    <div className="col-6">

                                        <label className="form-check-label mb-3">

                                            <input type="checkbox" checked={active} className="form-check-input" onChange={e => setActive(e.target.checked)} />
                                            فعال / غیرفعال                                    </label>
                                    </div>
                                    <div className="col">

                                        <label className="form-check-label mb-3 text-danger font-weight-bold">

                                            <input type="checkbox" checked={actionBlock} className="form-check-input" onChange={e => SetactionBlock(e.target.checked)} />
                                           تعلیق کاربر                                  </label>
                                    </div>
                                </div>
                                <div className="col-4 mb-4">

                                    <label >شماره موبایل</label>
                                    <input type="text" className="form-control opacityForInput" placeholder="شماره موبایل" value={userName||""} onChange={
                                        (e) => {
                                            setUserName(e.target.value);
                                            validator.current.showMessageFor("required");
                                        }} />
                                    {validator.current.message("required", userName, "required|numeric|min:11")}
                                </div>
                                <div className="col-4 mb-4">

                                    <label >نام</label>
                                    <input type="text" className="form-control opacityForInput" placeholder="نام" value={firstName || ""} onChange={
                                        (e) => {
                                            setFirstName(e.target.value);
                                            validator.current.showMessageFor("required");
                                        }} />
                                    {validator.current.message("required", firstName, "required|alpha")}
                                </div>
                                <div className="col-4 mb-4" >
                                    <label >نام خانوادگی</label>
                                    <input type="text" className="form-control opacityForInput" placeholder="نام خانوادگی" value={lastName || ""} onChange={e => {
                                        setLastName(e.target.value)
                                        validator.current.showMessageFor("required");
                                    }} />
                                    {validator.current.message("required", lastName, "required|alpha")}
                                </div>
                                <div className="col-6 mb-4">
                                    <label >کد ملی</label>
                                    <input type="text" className="form-control opacityForInput" placeholder="0070090602" maxLength="10" value={nationalCode || ""} onChange={e => {
                                        setNationalCode(e.target.value)
                                        validator.current.showMessageFor("required");
                                    }} />
                                    {validator.current.message("required", nationalCode, "required|numeric|min:10")}
                                </div>
                                <div className="col-6 mb-4">
                                    <label >ایمیل</label>
                                    <input type="text" className="form-control opacityForInput" placeholder="email@example.com" value={email || ""} onChange={e => {
                                        setEmail(e.target.value)
                                        validator.current.showMessageFor("email")
                                    }} />
                                    {validator.current.message("email", email, "email")}
                                </div>



                                {check === true ?
                                    <div className="col-6 mb-4">
                                        <label >شرکت</label>
                                        <Select
                                            value={OrganizationItem()}
                                            options={OrganizationId()}
                                            onChange={e => setOrganizationId(e.value)}
                                        />
                                    </div> : ''}
                                <div className='col-12 textOnInputForGrp '><input type='checkbox' checked={show} onChange={showHandler} /> تغییر رمز عبور </div>


                                <div className="input-group col-5 mb-5 mt-4 textOnInputForGrp rounded" hidden={!show}>
                                    <label >رمز عبور</label>
                                    <input type={passwordType} className="form-control opacityForInput  " style={{ borderLeft: 'none' }} placeholder="*******" value={password || ""} onChange={e => {
                                        setPassword(e.target.value)
                                        validator.current.showMessageFor("required");
                                    }} />
                                    <div className="input-group-append ">
                                        <button className=" btn-outline-primary box-shadow-none rounded" onClick={togglePassword} style={{ border: 'none' }}>
                                            {passwordType === "password" ? <svg style={{ color: "blue" }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16"> <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" fill="blue"></path> <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" fill="blue"></path> </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16"> <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" /> <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" /> <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" /> </svg>}</button>
                                    </div>
                                </div>
                                <div className="col-1"></div>
                                <div className="input-group col-5 mb-5 mt-4 textOnInputForGrp rounded" hidden={!show}>
                                    <label >تکراررمز عبور</label>
                                    <input type={passwordType} className="form-control opacityForInput  " style={{ borderLeft: 'none' }} placeholder="*******" value={passwordConfirm || ""} onChange={e => {
                                        setPasswordConfirm(e.target.value)
                                        validator.current.showMessageFor("required");
                                    }} />
                                    <div className="input-group-append ">
                                        <button className=" btn-outline-primary box-shadow-none rounded" onClick={togglePassword} style={{ border: 'none', outline: 'none' }}>
                                            {passwordType === "password" ? <svg style={{ color: "blue" }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16"> <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" fill="blue"></path> <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" fill="blue"></path> </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16"> <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" /> <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" /> <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" /> </svg>}</button>
                                    </div>

                                </div>
                                {password !== passwordConfirm ?
                                    <p hidden={!show} className="text-danger">رمز عبور برابر نیست</p> : ''}
                                <div className="form-group">
                                    <div className="form-check pl-0">
                                        <div className="custom-control custom-checkbox checkbox-info">

                                        </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className='row'>
                                        <div className='col-6 '>
                                            {show === true ?
                                                <button type="submit" className="btn btn-success " disabled={password === passwordConfirm && validator.current.allValid() ? false : true} onClick={submit}>تایید</button> :
                                                <button type="submit" className="btn btn-success " disabled={validator.current.allValid() ? false : true} onClick={submit}>تایید</button>}
                                        </div>
                                        <div className='col-6 '>
                                            <NavLink to='/userlist' className="btn btn-danger float-right">بازگشت</NavLink>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>



                    </form>

                </div >
            </div >
        </div>
    )
}
export default EditUserInfo