import React, { useEffect, useState } from 'react'
import { GetAttribute } from '../../../services/attributeService';
import { NavLink } from 'react-router-dom';
import { SetAttribute } from '../../../services/attributeService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { SetGroup } from '../../../services/GroupService';
import {ClipLoader} from "react-spinners";
import { GetCompanyChild } from '../../../services/companiesService';
import  Select  from 'react-select';
import { Formik, Form, Field } from 'formik';
import {validatAlpha, validatmin10, validatNumber} from "../../../Utils/validitionParams";

const NewProductGroup:React.FC = () => {
    const navigate=useNavigate();
    const [loading, setLoading] = useState(false);
    let [companyId, SetcompanyId] = useState()
    let [companyName, SetCompanyName] = useState()
    const [userCompanies, setUserCompanies] = useState([])
    const [name, Setname] = useState('')
   
  
const getCompanies = async () => {
    try {
        const { data, status } = await GetCompanyChild()
        setUserCompanies(data.result.companies)
        SetcompanyId(data.result.companies[0].id)
        SetCompanyName(data.result.companies[0].name)


    } catch (error) {

    }

}
useEffect(() => {
    getCompanies()
}, [])

    const handelSubmit = async () => {
        setLoading(true)
       
 
        try {
            const body={
            group:{
                id:0,
                entityTypeId:2,
                name,  companyId
                ,companyName
            }
        }

        const {data,status}=await SetGroup(body)
        if(status===200){
            toast.success('گروه جدید ایجاد شد',
            {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined
            })
            navigate('/admin/productgroup')
        }
        setLoading(false)
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
                    <h5 >تعریف گروه کالا</h5>
                    <p>در این بخش می توانید گروه جدید تعریف کنید.</p>
                </div>
            </div>
            <div className='row d-flex justify-content-center '>
                <div className='widget box shadow col-md-4 col-xs-12'>


                    <Formik
                        initialValues={{
                            id: 0,
                            entityTypeId: 2,
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
                                <div className='form-group'>

                            <div className="input-group mb-4">
                                <Field  validate={validatAlpha} name="name" type="text" className="form-control opacityForInput" placeholder="گروه" aria-describedby="basic-addon1" value={name} onChange={(e:any) => Setname(e.target.value)} />


                            </div>
                                    {errors.name && touched.name && <div className="text-danger">{errors.name}</div>}

                                    {userCompanies?
                            <div className="form-group mb-3 mt-3 textOnInput">

                                <label> شرکت</label>
                                <Select
                                    defaultValue={defaultValue}
                                    placeholder='نام شرکت'
                                    options={companys()}
                                    key={defaultValue}
                                    isClearable={true}
                                    onChange={e => {


                                        SetcompanyId(e.value)
                                        SetCompanyName(e.label)


                                    }

                                    }

                                />


                            </div>:''}
                            <div className='row '>
                                <div className='col-6 '>
                                    <button type="submit" disabled={loading} className="btn btn-success float-left"  >ثبت<ClipLoader

                                        loading={loading}
                                        color="#ffff"
                                        size={15}
                                    /></button>
                                </div>
                                <div className='col-6 '>
                                    <NavLink to='/admin/productgroup' className="btn btn-danger float-right">بازگشت</NavLink>
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

export default NewProductGroup