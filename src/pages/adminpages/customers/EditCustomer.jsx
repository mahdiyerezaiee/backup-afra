import {NavLink, useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import {CreateUser, GetUserData} from "../../../services/userService";
import {GetAllOrganisationCode} from "../../../services/organisationService";
import SimpleReactValidator from "simple-react-validator";
import Select from "react-select";
import {setCustomerInfo} from "../../../services/customerService";

const EditCustomer = () => {
    const navigate = useNavigate()
    const params =useParams()
    const [userName, setUserName]=useState('')
    const [email, setEmail]=useState('')
    const [firstName, setFirstName]=useState('')
    const [lastName, setLastName]=useState('')
    const [nationalCode, setNationalCode]=useState('')
    const [organizationID, setOrganizationID]=useState([])
    const [organizationId, setOrganizationId]=useState(null)
    const [password, setPassword]=useState(null)
    const [passwordConfirm , setPasswordConfirm]=useState(null)
    const [check, setChek] = useState(false);
    const [active, setActive] = useState(false);
    const [show , setShow]=useState(false)

    const showHandler = (e) => {
        setShow(e.target.checked)
    }
    const dataUser={

        id:params.id,
        userName,
        email,
        firstName,
        lastName,
        nationalCode,
        organizationId,
        password,
        active,
    }

    const getUserInfo = async () => {
        try {
            const {data , status}= await GetUserData(params.id)
            setEmail(data.result.customer.email)
            setUserName(data.result.customer.userName)
            setFirstName(data.result.customer.firstName)
            setLastName(data.result.customer.lastName)
            setNationalCode(data.result.customer.nationalCode)
            setOrganizationId(data.result.customer.organizationId)
            setActive(data.result.customer.active)


        }catch (err){
            console.log(err)
        }
    }

    useEffect(()=>{
        getUserInfo()
    },[])

    useEffect(()=>{


        if(organizationId !== null){
            setChek(true)
        }


    },[organizationId])
   
    const submit = async (e)=>{
        e.preventDefault()
        try {
            const {data , status} = await setCustomerInfo(dataUser)

        }catch (err){
            console.log(err)
        }
        navigate('/customerlist')

    }
    const getOrganizationId = async () => {
        try {
            const {data , status}= await GetAllOrganisationCode()
            setOrganizationID(data.result.organizationLists)
        }catch (err){
            console.log(err)
        }
    }
    useEffect(()=>{
        getOrganizationId()
    },[])
    const OrganizationId = () => {
        return(organizationID.map(item=>( {label: item.name ,  value:item.id}) ))
    }
    const OrganizationItem = () => {
        return(organizationID.filter(item=>item.id === organizationId).map(item=>( {label: item.name ,  value:item.id}) ))
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
                    return validator.helpers.testRegex(val,/^[u06F0-u06F9]+$/,) ;

                }
            },
        },
        messages: {
            required: "پرکردن این فیلد الزامی می باشد",

            email: 'ایمیل صحیح نیست',
            alpha: 'حتما از حروف استفاده کنید',
            numeric: 'کد ملی را صحیح وارد کنید'
        }
        , element: message => <p style={{ color: 'red' }}>{message}</p>
    }));

    return(

        <div className='user-progress' >
            <div className='row'>
                <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12 p-3 m-2'>
                    <h5> ویرایش کاربر </h5>
                </div>
            </div>
            <div className='row d-flex justify-content-center '>
                <div className='widget box shadow col-md-4 col-xs-12'>


                    <form  >

                        <div className="form-group  textOnInput  ">

                            <div className="form-row">
                                <div className="col-12 mb-5">


                                    <label className="form-check-label mb-3">

                                        <input type="checkbox"  checked={check} className="form-check-input" onChange={e => setChek(e.target.checked)} />
                                        حساب کاربری شخص حقوقی
                                    </label>
                                </div>
                                <div className="col-12 mb-5">


                                    <label className="form-check-label mb-3">

                                        <input type="checkbox"  checked={active} className="form-check-input" onChange={e => setActive(e.target.checked)} />
فعال / غیرفعال                                    </label>
                                </div>
                                <div className="col-12 mb-4">

                                    <label >شماره موبایل</label>
                                    <input type="text" className="form-control opacityForInput" placeholder="شماره موبایل" value={userName} onChange={
                                        (e) => {
                                            setUserName(e.target.value);
                                            validator.current.showMessageFor("required");
                                        }} />
                                    {validator.current.message("required", userName, "required|numeric")}
                                </div>
                                <div className="col-6 mb-4">

                                    <label >نام</label>
                                    <input type="text" className="form-control opacityForInput" placeholder="نام" value={firstName} onChange={
                                        (e) => {
                                            setFirstName(e.target.value);
                                            validator.current.showMessageFor("required");
                                        }} />
                                    {validator.current.message("required", firstName, "required|alpha")}
                                </div>
                                <div className="col-6 mb-4" >
                                    <label >نام خانوادگی</label>
                                    <input type="text" className="form-control opacityForInput" placeholder="نام خانوادگی" value={lastName} onChange={e => {
                                        setLastName(e.target.value)
                                        validator.current.showMessageFor("required");
                                    }} />
                                    {validator.current.message("required", lastName, "required|alpha")}
                                </div>
                                <div className="col-6 mb-4">
                                    <label >کد ملی</label>
                                    <input type="text" className="form-control opacityForInput" placeholder="0070090602" value={nationalCode} onChange={e => {
                                        setNationalCode(e.target.value)
                                        validator.current.showMessageFor("required");
                                    }} />
                                    {validator.current.message("required", nationalCode, "required|numeric")}
                                </div>
                                <div className="col-6 mb-4">
                                    <label >ایمیل</label>
                                    <input type="text" className="form-control opacityForInput" placeholder="email@example.com" value={email} onChange={e => {
                                        setEmail(e.target.value)
                                        validator.current.showMessageFor("email")
                                    }} />
                                    {validator.current.message("email", email, "email")}
                                </div>



                                { check===true?
                                    <div className="col-6 mb-4">
                                        <label >شرکت</label>
                                        <Select
                                            value={OrganizationItem()}
                                            options={OrganizationId()}
                                            onChange={e=>setOrganizationId(e.value)}
                                        />
                                    </div>:''}
                                <div className='col-12'><input type='checkbox' checked={show} onChange={showHandler}/> تغییر رمز عبور </div>


                                <div className="col-6 mt-4 " style={{display: show===true ?"block":"none"}}>
                                    <label >رمز عبور</label>
                                    <input type="password" className="form-control opacityForInput" placeholder="*******" value={password} onChange={e => {
                                        setPassword(e.target.value)
                                    }} />
                                </div>
                                <div className="col-6 mt-4" style={{display: show===true ?"block":"none"}}>
                                    <label >تکرار مرز عبور</label>
                                    <input type="password" className="form-control opacityForInput" placeholder="*******" value={passwordConfirm} onChange={e => {
                                        setPasswordConfirm(e.target.value)
                                        validator.current.showMessageFor("required");
                                    }} />
                                    {password !== passwordConfirm ?
                                        <p  className="text-danger">رمز عبور برابر نیست</p> : ''}

                                </div>
                                <div className="form-group">
                                    <div className="form-check pl-0">
                                        <div className="custom-control custom-checkbox checkbox-info">

                                        </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className='row'>
                                        <div className='col-6 '>
                                            {show === true?
                                                <button type="submit" className="btn btn-success " disabled={password === passwordConfirm && validator.current.allValid()? false: true}  onClick={submit}>تایید</button> :
                                                <button type="submit" className="btn btn-success " disabled={ validator.current.allValid()? false: true}  onClick={submit}>تایید</button>}
                                        </div>
                                        <div className='col-6 '>
                                            <NavLink to='/customerlist' className="btn btn-danger float-right">بازگشت</NavLink>
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
export default EditCustomer