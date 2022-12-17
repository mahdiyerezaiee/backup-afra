import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import { GetAttribute, GetAttributeValues, SetAttributeValues } from '../../../services/attributeService';
import { toast } from 'react-toastify';
import { IoFastFood } from 'react-icons/io5';
import { GetGroupsForEntity } from '../../../services/GroupService';
import { CreateUser, GetUserData } from '../../../services/userService';
import { setCustomerInfo } from '../../../services/customerService';
import { template } from 'lodash';

const EditCustomerGroup = () => {
    const [CustomerG, setCustomerG] = useState([])
    const [userinfo, setUserInfo] = useState({});
    const [groupId, setGroupId] = useState(0);
    const navigate=useNavigate();
    const params = useParams();
    const id = params.id;
    const GetCustomerGroup = async () => {
        const { data, status } = await GetGroupsForEntity(1);
        if (status === 200) {

            

            setCustomerG(data.result.groups);
            
        }

    }

    const getUserInfo=async()=>{
        try {
                    const{data,status}=await GetUserData(id);
                    if(status===200){
                        setUserInfo(data.result.customer)
                        setGroupId(data.result.customer.groupId)
                    }
        } catch (error) {
            console.log(error);
        }
    }
  
    useEffect(() => {

        GetCustomerGroup()
        getUserInfo();
        
    }, [])
    
    const inputCustomerG = () => {
        let customer=[...CustomerG , {id:null ,name: 'تعیین نشده'}]
       
        return (customer.map(data => ({ label: data.name, value: data.id })))
    }
  

    
    const handelSubmit = async (event) => {
        event.preventDefault();
       
        const body={
            id,
            userName:userinfo.userName,
            email:userinfo.email,
            firstName:userinfo.firstName,
            lastName:userinfo.lastName,
            requireInfo:userinfo.requireInfo,
            createDate:userinfo.createDate,
            nationalCode:userinfo.nationalCode,
            organizationId:userinfo.organizationId,
            password:null,
            salt:null,
            sugar:null,
            islegal:true,
            groupId,
            active:true

        }
        try {
            
            const{data,status}=await setCustomerInfo(body);
            if(status===200){
                toast.success('با موفقیت ثبت شد',
                {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined
                })
                navigate('/userlist')
            }
            
        } catch (error) {
            console.log(error);
        } 
    }
    let Group=CustomerG.filter(item=>item.id===groupId).map(item=>item.name)
    let groupName=Group[0]?Group[0]:"تعیین نشده"
    return (

        <div className='user-progress' >
            <div className='row'>
                <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12 p-3 m-2'>
                    <h5 >تعریف گروه مشتری</h5>
                    <p>در این بخش می توانید گروه جدید تعریف کنید.</p>
                </div>
            </div>
            <div className='row d-flex justify-content-center '>
                <div className='widget box shadow col-md-4 col-xs-12'>


                    <form>
                        <div className='form-group'>

                            <div className="form-group mb-3">

                                <Select
                                    value={{label:groupName,value:groupId}}
                                    options={inputCustomerG()}
                                    onChange={e => {
                                        setGroupId(e.value)
                                        
                                    }}
                                   

                                />
                            </div>
                            <div className='row '>
                                <div className='col-6 '>
                                    <button type="submit" className="btn btn-success float-left" onClick={handelSubmit} >ثبت</button>
                                </div>
                                <div className='col-6 '>
                                    <NavLink to='/userlist' className="btn btn-danger float-right">بازگشت</NavLink>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default EditCustomerGroup