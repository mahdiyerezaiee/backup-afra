import React, {useCallback, useEffect, useState} from "react";
import {GetUserInfo, GetUsersRoles, SetUserRole} from "../../../services/userService";
import {useNavigate, useParams} from "react-router-dom";
import Select from "react-select";
import {NavLink} from "react-router-dom";
import {toast} from "react-toastify";
import { optionsRole } from "../../../Enums/RolesEnums";
import {addUserInfo} from "../../../actions/user";



const EditUserRole = () => {
    const params=useParams()
    const [editRoles, setEditRoles] = useState([])
    const [roles, setRoles] = useState([]);
    const navigate = useNavigate()


    const getrole = async () => {
        try {
            const {data, status} = await GetUsersRoles(Number(params.id))
            setRoles(data.result.userRoleIds)

        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {

            getrole();
        }
        , [])

    const UserRoles = () => {
        if (!roles[0]) {
    return (<span>نامشخص </span>)
}


if (roles[0] === 1) {
    return (<span>ثبت نام شده </span>)
}
if (roles[0] === 2) {
    return (<span> مشتری</span>)
}
if (roles[0] === 3) {
    return (<span> کارمند</span>)
}
if (roles[0] === 4) {
    return (<span> کارشناس پشتیبانی</span>)
}if (roles[0] === 5) {
    return (<span>ادمین مالی</span>)
}
if (roles[0] === 6) {
    return (<span> ادمین انبار</span>)
}
if (roles[0] === 7) {
    return (<span> ادمین</span>)
}
if (roles[0] === 8) {
    return (<span> سوپر ادمین</span>)
}
}
const userRoles = {
    userRoleIds: [
        editRoles
    ],
    userId: params.id
}
    const setRole =async () => {

      const {data, status} = await SetUserRole(userRoles)
           try {
        
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

            navigate('/userlist')

        }
            
           } catch (error) {
            console.log(error);
           }

    }


const onchangRole = (e) => {
        setEditRoles(e.value)
    }

  return(
      <div className='user-progress' >
          <div className='row'>
              <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12 p-3 m-2'>
                  <h5 >تعیین نقش کاربر</h5>
            <p>در این بخش می توانید نقش کاربر را ویرایش کنید</p>

              </div>
          </div>
          <div className='row d-flex justify-content-center '>
              <div className='widget box shadow col-md-4 col-xs-12'>

              <div className="form-group textOnInput  align-content-between">

              <div className="form-group mb-4 textOnInput">
                  <label>تعیین نقش</label>

              <Select
                  className="opacityForInput"
      options={optionsRole}
      placeholder={UserRoles()}
      onChange={onchangRole}
  />
              </div>
      <div className='row '>
          <div className='col-6 '>
              <button onClick={setRole} className="btn btn-success float-right" >تایید</button>
          </div>
          <div className='col-6 '>
              <NavLink to="/userlist" className="btn btn-danger float-left">بازگشت</NavLink>
          </div>
      </div>
      </div>
      </div>


  </div>
  </div>)
}
export default EditUserRole