import React, { useEffect, useState } from 'react'
import { GetAttribute } from '../../../services/attributeService';
import { NavLink } from 'react-router-dom';
import { SetAttribute } from './../../../services/attributeService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { SetGroup } from './../../../services/GroupService';
import {ClipLoader} from "react-spinners";


const NewProductGroup = () => {
    const navigate=useNavigate();
    const [loading, setLoading] = useState(false);

    const [name, Setname] = useState('')
   
  
   

    const handelSubmit = async (event) => {
        setLoading(true)
        event.preventDefault();
 
        try {
            const body={
            group:{
                id:0,
                entityTypeId:2,
                name
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


                    <form>
                        <div className='form-group'>

                            <div className="input-group mb-3">
                                <input type="text" className="form-control opacityForInput" placeholder="گروه" aria-describedby="basic-addon1" value={name} onChange={e => Setname(e.target.value)} />


                            </div>
                            <div className='row '>
                                <div className='col-6 '>
                                    <button type="submit" disabled={loading} className="btn btn-success float-left" onClick={handelSubmit} >ثبت<ClipLoader

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
                    </form>
                </div>
            </div>
        </div>
    )
}

export default NewProductGroup