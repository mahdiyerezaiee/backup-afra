import React,{useState,useEffect} from 'react'
import { useParams, useNavigate,NavLink } from 'react-router-dom';
import { GetGroupById } from '../../../services/GroupService';
import { SetGroup } from './../../../services/GroupService';
import { toast } from 'react-toastify';

const EditCustomerGroupName = () => {
const navigate=useNavigate()
    const params=useParams();
    const[entityTypeId,setEntityTypeId]=useState(0)
    const[name,setName]=useState('')

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

const handelSubmit=async(event)=>{

   

      event.preventDefault();
 
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
            navigate('/customergroup')
        }
        } catch (error) {
            console.log(error);
        }


}

    return (

        <div className='user-progress' >
            <div className='row'>
                <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12 p-3 m-2'>
                    <h5 >ویرایش گروه مشتری</h5>
                    <p>در این بخش می توانید گروه را ویرایش کنید.</p>
                </div>
            </div>
            <div className='row d-flex justify-content-center '>
                <div className='widget box shadow col-md-4 col-xs-12'>


                    <form>
                        <div className='form-group'>

                            <div className="form-group mb-3 textOnInput">
<label>نام گروه</label>
                            <input type="text" className="form-control opacityForInput" placeholder="گروه" aria-describedby="basic-addon1" value={name} onChange={e => setName(e.target.value)} />

                            </div>
                            <div className='row '>
                                <div className='col-6 '>
                                    <button type="submit" className="btn btn-success float-left" onClick={handelSubmit} >ثبت</button>
                                </div>
                                <div className='col-6 '>
                                    <NavLink to='/customergroup' className="btn btn-danger float-right">بازگشت</NavLink>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default EditCustomerGroupName