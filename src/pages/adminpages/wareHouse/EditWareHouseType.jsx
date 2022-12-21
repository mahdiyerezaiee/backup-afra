import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useNavigate,useParams } from 'react-router-dom';
import { GetGroupById, SetGroup } from '../../../services/GroupService';
import {ClipLoader} from "react-spinners";



const EditWareHouseType = () => {
    const navigate=useNavigate();
    const params=useParams();
    const [name, Setname] = useState('')
    const [loading, setLoading] = useState(false);

    const getGroup=async()=>{

        try {
            const{data,status}=await GetGroupById(params.id);
            if(status===200){
                Setname(data.result.group.name)
            }
           
        } catch (error) {
            
        }
    }
  
   useEffect(()=>{
    getGroup()
   },[])

    const handelSubmit = async (event) => {
        setLoading(true)
        event.preventDefault();
 
        try {
            const body={
            group:{
                id:params.id,
                entityTypeId:4,
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
            navigate('/EditWareHouseTypeName')
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
                    <h5 >ویرایش گروه انبار</h5>
                    <p>در این بخش می توانید گروه را ویرایش کنید.</p>
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
                                    <NavLink to='/warehousetypes' className="btn btn-danger float-right">بازگشت</NavLink>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditWareHouseType