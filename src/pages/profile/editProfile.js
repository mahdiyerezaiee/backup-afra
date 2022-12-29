import React, {useRef, useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import {setCustomerInfo} from "../../services/customerService";
import {toast} from "react-toastify";
import {GetUserInfo} from "../../services/userService";
import {addUserInfo} from "../../actions/user";
import {GetAllProvince, SetAddress} from "../../services/addressService";
import Select from "react-select";
import {useNavigate} from "react-router-dom";

const EditProfile = () => {
const navigate = useNavigate()
    const userinfo = useSelector(state => state.userInfo);

    const [firstName, setfirstName] = useState(userinfo.firstName);
    const [lastName, setlastName] = useState(userinfo.lastName);
    const [nationalCode, setnationalCode] = useState(userinfo.nationalCode);
    const [email, setemail] = useState(userinfo.email);


    const [password, setPassword]=useState(null)
    const [passwordConfirm , setPasswordConfirm]=useState(null)
    const [show , setShow]=useState(false)
    const [passwordType, setPasswordType] = useState("password");

    const dispatch = useDispatch();
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
        requireInfo: false,
        nationalCode,
        organizationId: null,
        password
    }


    const validator = useRef(new SimpleReactValidator({
        validators: {
            alpha: {

                rule: (val, params, validator) => {
                    return validator.helpers.testRegex(val, /^[A-Z آابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی]*$/i,) && params.indexOf(val) === -1;
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

    const showHandler = (e) => {

      setShow(!show)
    }
    const handelSetCustomer = async () => {

        try {

            const {data, status} = await setCustomerInfo(user);
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
                const {data, status} = await GetUserInfo();

                dispatch(addUserInfo(data.result.customer));

            }
           

        } catch (error) {

        }
    }

    const handelSubmit = (event) => {
        event.preventDefault();

        handelSetCustomer();
    }
const backHandel=(e)=>{
    e.preventDefault()

    navigate(-1)
}

    return (

        <div className="layout-px-spacing">

            <div className="page-header">
                <div className="page-title">
                    <h3>ویرایش اطلاعات</h3>
                </div>
            </div>



                            <div className='row d-flex justify-content-center col-12'>

                                <div className='widget box shadow col-md-6 col-xs-12'>
                                    <form>
                                        <div className="form-group textOnInput  align-content-between">

                                            <label>نام</label>
                                            <input type="text" className="form-control opacityForInput"
                                                   placeholder="نام" value={firstName} onChange={
                                                (e) => {
                                                    setfirstName(e.target.value);
                                                    validator.current.showMessageFor("required");
                                                }}/>
                                            {validator.current.message("required", firstName, "required|alpha")}
                                        </div>
                                        <div className="form-group mb-4 textOnInput">
                                            <label>نام خانوادگی</label>
                                            <input type="text" className="form-control opacityForInput"
                                                   placeholder="نام خانوادگی" value={lastName} onChange={e => {
                                                setlastName(e.target.value)
                                                validator.current.showMessageFor("required");
                                            }}/>
                                            {validator.current.message("required", lastName, "required|alpha")}
                                        </div>
                                        <div className="form-group mb-4 textOnInput">
                                            <label>کد ملی</label>
                                            <input type="text" className="form-control opacityForInput"
                                                   placeholder="0070090602" value={nationalCode} onChange={e => {
                                                setnationalCode(e.target.value)
                                                validator.current.showMessageFor("required");
                                            }}/>
                                            {validator.current.message("required", nationalCode, "required|numeric|min:10")}
                                        </div>


                                        <div className="form-group mb-4 textOnInput">
                                            <label>ایمیل</label>
                                            <input type="text" className="form-control opacityForInput"
                                                   placeholder="email@example.com" value={email} onChange={e => {
                                                setemail(e.target.value)

                                            }}/>
                                        </div>
                                        <div><input type='checkbox' checked={show}  onClick={showHandler}/> تغییر رمز عبور </div>
                                        {show === true?
                                            <>
                                                <div className="input-group col-12 mb-5 mt-4 textOnInputForGrp rounded"
                                                     hidden={!show}>
                                                <label >رمز عبور</label>
                                                <input  type={passwordType}  className="form-control opacityForInput" placeholder="*******" value={password} onChange={e => {
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
                                            </div>
                                                <div className="input-group col-12  mt-4 textOnInputForGrp rounded"
                                                     hidden={!show}>
                                                <label >تکرار مرز عبور</label>
                                                <input type={passwordType} className="form-control opacityForInput" placeholder="*******" value={passwordConfirm} onChange={e => {
                                                    setPasswordConfirm(e.target.value)
                                                    validator.current.showMessageFor("required");
                                                }} />
                                                <div className="input-group-append ">
                                                    <button className=" btn-outline-primary box-shadow-none rounded"
                                                            onClick={togglePassword}
                                                            style={{border: 'none', outline: 'none'}}>
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

                                        <div className='row justify-content-between mt-4'>
                                            <div >
                                                    <button  onClick={handelSubmit} className="btn btn-success">ذخیره تغییرات</button>
                                                </div>
                                                <div >
                                                    <button  onClick={backHandel} className="btn btn-primary">بازگشت</button>
                                                </div>
                                            </div>

                                    </form>

                                </div>

                            </div>



                    </div>

    )
}
export default EditProfile