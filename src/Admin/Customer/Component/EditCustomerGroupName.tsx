import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import { GetGroupById } from '../../../services/GroupService';
import { SetGroup } from '../../../services/GroupService';
import { toast } from 'react-toastify';
import { ClipLoader } from "react-spinners";
import { GetCompanyChild } from '../../../services/companiesService';
import  Select  from 'react-select';
import { Formik, Form, Field } from 'formik';
import {validatAlpha, validatmin10, validatNumber} from "../../../Utils/validitionParams";


const EditCustomerGroupName:React.FC = () => {
    const navigate = useNavigate()
    const params = useParams();
    const [entityTypeId, setEntityTypeId] = useState(0)
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false);
    const [userCompanies, setUserCompanies] = useState([])
    let [companyId, SetcompanyId] = useState()
    let [companyName, SetCompanyName] = useState()


    const getGroup = async () => {

        try {
            const { data, status } = await GetGroupById(params.id)
            setName(data.result.group.name)
            setEntityTypeId(data.result.group.entityTypeId)

        } catch (error) {
            console.log(error);
        }
    }
    const getCompanies = async () => {
        try {
            const { data, status } = await GetCompanyChild()
            setUserCompanies(data.result.companies)
            SetcompanyId(data.result.companies[0].id)
            SetCompanyName(data.result.companies[0].name)


        } catch (error) {
            console.log(error);
        }

    }


    useEffect(() => {

        getGroup();
        getCompanies()
    }, [])

    const handelSubmit = async () => {


        setLoading(true)


        try {
            const body = {
                group: {
                    id: Number(params.id),
                    entityTypeId,
                    name,
                    companyId
                    ,companyName
                }
            }

            const { data, status } = await SetGroup(body)
            if (data.success === true) {
                setLoading(false)
                toast.success('گروه ویرایش  شد',
                    {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined
                    })
                navigate('/admin/customergroup')
            }
        } catch (error) {
            console.log(error);
        }


    }
    const companys = () => {
        return (userCompanies.map((item:any) => ({ label: item.name, value: item.id })))

    }
    let defaultValue:any = companys()[0]

    return (

        <div className='user-progress' >
            <div className='row'>
                <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12 p-3 m-2'>
                    <h5 >ویرایش گروه مشتری</h5>
                    <p>در این بخش می توانید گروه را ویرایش کنید.</p>
                </div>
            </div>
            <div className='row d-flex justify-content-center '>
                <div className=' col-md-8 col-xs-12 m-2'>

                    <Formik
                        initialValues={{
                            id: 0,
                            entityTypeId: 1,
                            name
                            ,companyId
                            ,companyName
                        }}
                        enableReinitialize={true}
                        onSubmit={values => {
                            // same shape as initial values
                            handelSubmit()
                        }}>
                        {({ errors, touched, validateField, validateForm,setFieldValue ,handleChange,values}) => (

<Form  >
<div className=' form-row '>

    <div className=" col-lg-6 col-sm-12 form-group mb-4 textOnInput">
                                        <label>نام گروه</label>

                                        <Field  validate={validatAlpha} name="name" type="text" className="form-control opacityForInput" placeholder="گروه" aria-describedby="basic-addon1" value={name} onChange={(e:any) => setName(e.target.value)} />


                                    </div>
                                    {errors.name && touched.name && <div className="text-danger">{errors.name}</div>}

                                    {userCompanies?
                                        <div className=" col-lg-6 col-sm-12 form-group mb-3 textOnInput">

                                            <label> شرکت</label>
                                            <Select
                                                defaultValue={defaultValue}
                                                placeholder='نام شرکت'
                                                options={companys()}
                                                key={defaultValue}
                                                isClearable={true}
                                                onChange={(e:any) => {


                                                    SetcompanyId(e.value)
                                                    SetCompanyName(e.label)


                                                }

                                                }

                                            />


                                        </div>:''}
                                        <div className='col-12 '>
                            <div className='row '>
                                <div className='col-6 '>
                                    <button type="submit" disabled={loading} className="btn btn-success float-right" > ثبت

                                        <ClipLoader

                                            loading={loading}
                                            color="#ffff"
                                            size={15}
                                        /></button>
                                </div>
                                <div className='col-6 '>
                                    <NavLink to='/admin/customergroup' className="btn btn-danger">بازگشت</NavLink>
                                </div>
                            </div>
                            </div>
                        </div>


                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>

    )
}

export default EditCustomerGroupName