import React, { useState ,useEffect} from 'react'
import { GetOrganisationById, SetOrganisation } from '../../../services/organisationService';
import { useNavigate, NavLink, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {ClipLoader} from "react-spinners";

const EditOrganizaion = () => {
    const [companyName, setcompanyName] = useState('');
    const [companyRegister, setcompanyRegister] = useState('');
    const [nationalId, SetnationalId] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate=useNavigate();
    const params=useParams();

    const getOrganization=async()=>{
try {
    const {data,status}=await GetOrganisationById(params.id);
    if(status===200){
        setcompanyName(data.result.organization.name);
        setcompanyRegister(data.result.organization.registrationNumber);
        SetnationalId(data.result.organization.nationalId)
    }
} catch (error) {
    console.log(error);
}

    }
    useEffect(()=>{
        getOrganization()
    },[])
    const handelSubmit = async (event) => {
        setLoading(true)

        event.preventDefault();
        const organisation = {
            organization: {
                id: params.id,
                name: companyName,
                nationalId,
                registrationNumber: companyRegister,
                parentId: 0,
                groupId: 0
            }
        }
        try {
            const { data, status } = await SetOrganisation(organisation)
            if (status === 200) {
setLoading(false)
                toast.success("اطلاعات با موفقیت ثبت شد", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined
                });

                navigate(-1)

            }
        } catch (error) {
            console.log(error)
        }

    }
    return (
        <div className='user-progress' >
            <div className='row'>
                <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12 p-3 m-2'>
                    <h5 >ویرایش سازمان  </h5>
                    <p>در این بخش می توانیداطلاعات سازمان را ویرایش کنید.</p>
                </div>
            </div>
            <div className='row d-flex justify-content-center '>
                <div className='widget box shadow col-lg-5 col-sm-12'>

                    <form className='form col' >
                        <div className="n-chk">


                            {/* <label className="form-check-label mb-3">
                        <input type="checkbox" className="form-check-input" onChange={e => setChek(e.target.checked)} />
                        شخص حقوقی هستم
                    </label> */}
                        </div>

                        <div className="form-group mb-4 textOnInput ">

                            <label >شماره ملی شرکت</label>
                            <div className='form-row justify-content-center'>
                                <input type="text" className="form-control opacityForInput col" value={nationalId} onChange={(e) => { SetnationalId(e.target.value); }} placeholder="12345678912" />


                            </div>



                        </div>
                        <div className="form-group mb-4 textOnInput ">
                            <label >نام شرکت</label>
                            <input type="text" className="form-control opacityForInput" value={companyName}
                                onChange={(e) => {
                                    setcompanyName(e.target.value)

                                }} placeholder="نام شرکت" />


                        </div>
                        <div className="form-group mb-4 textOnInput ">
                            <label >کد اقتصادی</label>
                            <input type="text" className="form-control opacityForInput"  value={companyRegister} onChange={(e) => {
                                setcompanyRegister(e.target.value)

                            }} placeholder="کد اقتصادی" />


                        </div>




                        <div className='row justify-content-between'>
                            <div >
                                <button type="submit" className="btn btn-success " onClick={handelSubmit} >
                                    تایید
                                    <ClipLoader

                                        loading={loading}
                                        color="#ffff"
                                        size={15}
                                    />
                                </button>
                            </div>
                            <div >
                                <NavLink to={-1} className="btn btn-danger">بازگشت</NavLink>
                            </div>
                        </div>




                    </form>
                </div >
            </div >
        </div>
    )
}

export default EditOrganizaion