import React,{useState,useEffect} from 'react'
import { useParams, useNavigate,NavLink } from 'react-router-dom';
import { GetGroupById } from '../../../services/GroupService';
import { SetGroup } from '../../../services/GroupService';
import { toast } from 'react-toastify';
import {ClipLoader} from "react-spinners";
import {validatAlpha} from "../../../Utils/validitionParams";
import {Field, Form, Formik} from "formik";

const EditWareHouseTypeName = () => {
const navigate=useNavigate()
    const params=useParams();
    const[entityTypeId,setEntityTypeId]=useState(0)
    const[name,setName]=useState('')
    const [loading, setLoading] = useState(false);

    const getGroup=async()=>{

try {
    const{data,status}=await GetGroupById(params.id)
    setName(data.result.group.name)
    setEntityTypeId(data.result.group.entityTypeId)
    
} catch (error) {
    console.log(error);
}
    }
useEffect(()=>{

    getGroup();
},[])

const handelSubmit=async()=>{

   setLoading(true)


        try {
            const body={
            group:{
                id:Number(params.id),
                entityTypeId,
                name
            }
        }

        const {data,status}=await SetGroup(body)
        if(status===200){
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
            navigate('/admin/warehousetypes')
        }
        setLoading(false)
        } catch (error) {
            console.log(error);
        }


}

    return (

        <div className='user-progress ' >
            <div className='row'>
                <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12 p-3 m-2'>
                    <h5 >ویرایش گروه انبار</h5>
                    <p>در این بخش می توانید گروه را ویرایش کنید.</p>
                </div>
            </div>
            <div className='row d-flex justify-content-center '>
                <div className='widget box shadow col-12 col-md-6 col-xs-12'>
                    <Formik
                        initialValues={{
                            id:Number(params.id),
                            entityTypeId,
                            name
                        }}
                        enableReinitialize={true}
                        onSubmit={values => {
                            // same shape as initial values
                            handelSubmit()
                        }}>
                        {({ errors, touched, validateField, validateForm,setFieldValue ,handleChange,values}) => (

                            <Form className='form-group col-md-10' >
                        <div className='form-group col-md-12'>

                            <div className="form-group mb-3 textOnInput">
<label>نام گروه</label>
                                <Field validate={validatAlpha}  name="name" type="text" className="form-control opacityForInput" placeholder="گروه" aria-describedby="basic-addon1" value={name} onChange={e => setName(e.target.value)} />
                                {errors.name && touched.name && <div className="text-danger">{errors.name}</div>}

                            </div>
                            <div className='row '>
                                <div className='col-6 '>
                                    <button type="submit" disabled={loading} className="btn btn-success float-left">ثبت<ClipLoader

                                        loading={loading}
                                        color="#ffff"
                                        size={15}
                                    /></button>                                </div>
                                <div className='col-6 '>
                                    <NavLink to='/admin/warehousetypes' className="btn btn-danger float-right">بازگشت</NavLink>
                                </div>
                            </div>
                        </div>
                            </Form>)}</Formik>
                </div>
            </div>
        </div>

    )
}

export default EditWareHouseTypeName