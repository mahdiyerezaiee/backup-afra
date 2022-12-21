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
import Modal from 'react-modal';
import {ClipLoader} from "react-spinners";

const customStyles = {
    content: {

        inset: '50% auto auto 50%',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '30px',
        border: '2px ridge black'
    }

}
const EditCustomerGroup = ({ id, closeModal, modalIsOpen }) => {
    const [CustomerG, setCustomerG] = useState([])
    const [userinfo, setUserInfo] = useState({});
    const [groupId, setGroupId] = useState(0);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const params = useParams();
    const GetCustomerGroup = async () => {
        const { data, status } = await GetGroupsForEntity(1);
        if (status === 200) {



            setCustomerG(data.result.groups);

        }

    }

    const getUserInfo = async () => {
       
        try {
            const { data, status } = await GetUserData(id);
            if (status === 200) {
                setUserInfo(data.result.customer)
                setGroupId(data.result.customer.groupId)
            }
        } catch (error) {
            console.log(error);
        }
    
    }

    useEffect(() => {

        GetCustomerGroup()
        if(id>0){
        getUserInfo();
        }
    }, [id])

    const inputCustomerG = () => {
        let customer = [...CustomerG, { id: null, name: 'تعیین نشده' }]

        return (customer.map(data => ({ label: data.name, value: data.id })))
    }



    const handelSubmit = async (event) => {
        setLoading(true)
        event.preventDefault();

        const body = {
            id,
            userName: userinfo.userName,
            email: userinfo.email,
            firstName: userinfo.firstName,
            lastName: userinfo.lastName,
            requireInfo: userinfo.requireInfo,
            createDate: userinfo.createDate,
            nationalCode: userinfo.nationalCode,
            organizationId: userinfo.organizationId,
            password: null,
            salt: null,
            sugar: null,
            islegal: true,
            groupId,
            active: true

        }
        try {

            const { data, status } = await setCustomerInfo(body);
            if (status === 200) {
                setLoading(false)
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
               closeModal()
            }

        } catch (error) {
            console.log(error);
        }
    }
    let Group = CustomerG.filter(item => item.id === groupId).map(item => item.name)
    let groupName = Group[0] ? Group[0] : "تعیین نشده"
    return (
        <Modal

            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Selected Option"
            ariaHideApp={false}

        >

            <div className="d-block clearfix mb-2" onClick={closeModal}><svg
                xmlns="http://www.w3.org/2000/svg"
                width="24" height="24"
                viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-x close"
                data-dismiss="alert"><line x1="18" y1="6"
                    x2="6"
                    y2="18"></line><line
                        x1="6" y1="6" x2="18" y2="18"></line></svg></div>
            <div>
                <div className="card-body p-0" style={{ height: '14rem', width: '20rem' }}>


                    <div className="text-center mb-5">
                        <h5 className="text-center">  گروه مشتری </h5>
                    </div>
                    <div className="form-row mt-4">
                        <div className="  form-group col-md-12 col-xs-12 textOnInput  selectIndex">


                            <form>
                                <div className='form-group'>

                                    <div className="form-group mb-3">

                                        <Select
                                            value={{ label: groupName, value: groupId }}
                                            options={inputCustomerG()}
                                            onChange={e => {
                                                setGroupId(e.value)

                                            }}


                                        />
                                    </div>

                                </div>
                            </form>
                        </div>

                    </div>
                    <div className='text-center mt-2'>

                        <div className='col-12 '>
                            <button  disabled={loading} className="btn btn-success  "
                                onClick={handelSubmit}>تایید
                                <ClipLoader

                                    loading={loading}
                                    color="#ffff"
                                    size={15}
                                /></button>
                        </div>

                    </div>
                </div>
            </div>
        </Modal>

    )
}

export default EditCustomerGroup