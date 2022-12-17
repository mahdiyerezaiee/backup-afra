import React, { useState } from 'react'
import { SetOrganisation } from '../../../services/organisationService';
import { useNavigate,NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';

const NewOrganizaion = () => {
    const [companyName, setcompanyName] = useState('');
    const [companyRegister, setcompanyRegister] = useState('');
    const [nationalId, SetnationalId] = useState('');
    const navigate=useNavigate();
    const handelSubmit = async (event) => {
event.preventDefault();
        const organisation = {
            organization: {
                id: 0,
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

                toast.success("اطلاعات با موفقیت ثبت شد", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined
                });

                navigate('/organizationlist')

            }
        } catch (error) {
            console.log(error)
        }

    }
    return (
        <div className='user-progress' >
            <div className='row'>
                <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12 p-3 m-2'>
                    <h5 >تعریف سازمان جدید </h5>
                    <p>در این بخش می توانید سازمان جدید تعریف کنید.</p>
                </div>
            </div>
            <div className='row d-flex justify-content-center '>
                <div className='widget box shadow col-4'>

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
                            <label >شماره ثبت</label>
                            <input type="text" className="form-control opacityForInput"  value={companyRegister} onChange={(e) => {
                                setcompanyRegister(e.target.value)

                            }} placeholder="شماره ثبت" />


                        </div>




                        <div className='row justify-content-between'>
                            <div >
                                <button type="submit" className="btn btn-success " onClick={handelSubmit} >تایید</button>
                            </div>
                            <div >
                                <NavLink to='/organizationlist' className="btn btn-danger">بازگشت</NavLink>
                            </div>
                        </div>




                    </form>
                </div >
            </div >
        </div>
    )
}

export default NewOrganizaion