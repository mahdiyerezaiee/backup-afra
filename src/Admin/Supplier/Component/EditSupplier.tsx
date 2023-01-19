import React,{ useState ,useEffect} from 'react'
import { useNavigate, NavLink, useParams } from 'react-router-dom';
import { GetSupplier, SetSupplier } from '../../../services/supplyService';
import { toast } from 'react-toastify';
import {ClipLoader} from "react-spinners";
import {Field, Form, Formik} from "formik";
import {validatAlpha} from "../../../Utils/validitionParams";




const EditSupplier:React.FC = () => {
    const[name,Setname]=useState();
    const navigate=useNavigate();
    const params=useParams();
    const [loading, setLoading] = useState(false);

    const getSupplierbyId=async()=>{

        try {
            const{data,status}=await GetSupplier(params.id);
            if(status===200){

                Setname(data.result.supplier.name);
            }
        } catch (error) {
            
        } 
    }

    useEffect(()=>{
        getSupplierbyId();
    },[])

    const handelSubmit = async () => {
        setLoading(true)
        try {
            const supplier={
                'supplier':{
                    id:Number(params.id),
                    name,
                    groupId:null
                }
            }
            const { data, status } = await SetSupplier(supplier);
         
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
                
              
                navigate('/admin/supplierList')
            }
            setLoading(false)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='user-progress' >
            <div className='row'>
                <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12 p-3 m-2'>
                    <h5 >ویرایش تامین کننده</h5>
                    <p>در این بخش می توانید تامین کننده را ویرایش کنید.</p>
                </div>
            </div>
            <div className='row d-flex justify-content-center '>
                <div className='widget box shadow col-md-4 col-xs-12'>
                    <Formik
                        initialValues={{
                            id:Number(params.id),
                            name,
                            groupId:null
                        }}
                        enableReinitialize={true}
                        onSubmit={values => {
                            // same shape as initial values
                            handelSubmit()
                        }}>
                        {({ errors, touched, validateField, validateForm,setFieldValue ,handleChange,values}) => (


                    <Form>
                        <div className='form-group'>

                            <div className=" mb-4 textOnInput">
                                <label >نام </label>
                                <Field name="name" validate={validatAlpha} type="text" className="form-control opacityForInput" placeholder="نام تامیین کننده" aria-describedby="basic-addon1" value={name} onChange={(e:any) => Setname(e.target.value)} />
                                {errors.name && touched.name && <div className="text-danger">{errors.name}</div>}


                            </div>
                            <div className='row '>
                                <div className='col-6 '>
                                    <button type="submit" disabled={loading} className="btn btn-success float-left"  >ثبت<ClipLoader

                                        loading={loading}
                                        color="#ffff"
                                        size={15}
                                    /></button>
                                </div>
                                <div className='col-6 '>
                                    <NavLink to='/admin/supplierList' className="btn btn-danger float-right">بازگشت</NavLink>
                                </div>
                            </div>
                        </div>
                    </Form>)}</Formik>
                </div>
            </div>
        </div>

    )
}

export default EditSupplier