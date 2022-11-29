import React, { useEffect, useState } from 'react'
import { GetAttribute } from '../../../services/attributeService';
import { NavLink } from 'react-router-dom';
import { SetAttribute } from './../../../services/attributeService';
import { toast } from 'react-toastify';
import { useNavigate,useParams } from 'react-router-dom';
import { GetGroupById, SetGroup } from './../../../services/GroupService';



const NewWareHouseType = () => {
    const navigate=useNavigate();
    
    const [name, Setname] = useState('')
   
   


    const handelSubmit = async (event) => {
        event.preventDefault();
 
        try {
            const body={
            group:{
                id:0,
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
            navigate('/warehousetypes')
        }
        } catch (error) {
            console.log(error);
        }
    

    }
    return (
        <div className='user-progress' >
            <div className='row'>
                <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12 p-3 m-2'>
                    <h5 >تعریف گروه انبار</h5>
                    <p>در این بخش می توانید گروه جدید تعریف کنید.</p>
                </div>
            </div>
            <div className='row d-flex justify-content-center '>
                <div className='widget box shadow col-12 col-md-6 col-xs-12'>


                    <form className='form-group col-md-10'>
                        <div className='form-group '>

                            <div className="input-group  mb-3">
                                <input type="text" className="form-control opacityForInput" placeholder="گروه" aria-describedby="basic-addon1" value={name} onChange={e => Setname(e.target.value)} />


                            </div>
                            <div className='row '>
                                <div className='col-6 '>
                                    <button type="submit" className="btn btn-success float-left" onClick={handelSubmit} >ثبت</button>
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

export default NewWareHouseType