import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import { SetWareHouses } from '../../../services/wareHouseService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { SetAttributeValues } from '../../../services/attributeService';
import Select from 'react-select'
import { GetGroupsForEntity } from '../../../services/GroupService';
import { ClipLoader } from "react-spinners";
import { GetCompanyChild } from './../../../services/companiesService';
import { GetGroupWithCompany } from './../../../services/GroupService';

const NewWareHouse = () => {
    const [name, Setname] = useState('');
    const [wareHouseT, SetWarehouseT] = useState([]);
    const [groupId, setGroupId] = useState({})
    const [attValuehajm, setAttValueHajm] = useState('')
    const [Addres, setAddres] = useState('');
    const [loading, setLoading] = useState(false);
    const [userCompanies, setUserCompanies] = useState([])
    let [companyId, SetcompanyId] = useState()
    let [companyName, SetCompanyName] = useState()


    let wareId = 0;
    const navigate = useNavigate();
    const test = {
        "wareHouse": {
            name,
            groupId,
companyId, companyName
        }

    }
    const GetCurrentUserCompany = async () => {

        try {
            const { data, status } = await GetCompanyChild()
            if (status === 200) {
                setUserCompanies(data.result.companies)
                SetcompanyId(data.result.companies[0].id)
                SetCompanyName(data.result.companies[0].name)

            }
        } catch (error) {
            console.log();
        }
    }

    useEffect(() => {

        GetCurrentUserCompany()
    }, [])
    const GetWareHouseType = async (companyId) => {

        if (userCompanies.length === 1) {
            try {

                const { data, status } = await GetGroupWithCompany(4, userCompanies[0].id);
                SetWarehouseT(data.result.groups)

            } catch (error) {

            }

        }
        else {
            try {
                const { data, status } = await GetGroupWithCompany(4, companyId);
                SetWarehouseT(data.result.groups)

            } catch (error) {

            }

        }





    }
    const inputwareHouseT = () => {
        return (wareHouseT.map(data => ({ label: data.name, value: data.id })))
    }

    const setAddressForWare = async () => {

        const attribute = {
            "attributeValues": [
                {

                    attributeTypeId: 1007,
                    entityId: wareId,
                    value: `${Addres}`
                }
            ]
        }

        try {
            const { data, status } = await SetAttributeValues(attribute)
        } catch (error) {
            console.log(error);
        }

    }
    const setAttributevalueforHajm = async () => {

        const attribute = {
            "attributeValues": [
                {

                    attributeTypeId: 1006,
                    entityId: wareId,
                    value: `${attValuehajm}`
                }
            ]
        }

        try {
            const { data, status } = await SetAttributeValues(attribute)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        GetWareHouseType(companyId);
    }, [companyId])
    const handelSubmit = async (event) => {
        setLoading(true)
        event.preventDefault();
        try {
            const { data, status } = await SetWareHouses(test);

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
                wareId = data.result.id;

                setAddressForWare();
                setAttributevalueforHajm();
                navigate('/admin/warehouselist')
            }
            setLoading(false)
        } catch (error) {
            console.log(error);
        }
    }
    const companys = () => {
        return (userCompanies.map((item) => ({ label: item.name, value: item.id })))

    }
    let defaultValue = companys()[0]

    return (
        <div className='user-progress' >
            <div className='row'>
                <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12 p-3 m-2'>
                    <h5 >تعریف انبار</h5>
                    <p>در این بخش می توانید انبار جدید تعریف کنید.</p>
                </div>
            </div>
            <div className='row d-flex justify-content-center '>
                <div className='widget box shadow col-md-5 col-xs-12'>


                    <form className='col-lg-6 col-sm-12'>
                        <div className='form-group'>

                            <div className=" mb-4 textOnInput">
                                <label >انبار</label>
                                <input type="text" className="form-control opacityForInput" placeholder="انبار" aria-describedby="basic-addon1" value={name} onChange={e => Setname(e.target.value)} />


                            </div>
                            <div className=" mb-4 textOnInput">


                                <label>حجم انبار</label>

                                <input type="text" className="form-control opacityForInput" placeholder="انبار" aria-describedby="basic-addon1" value={attValuehajm} onChange={e => setAttValueHajm(e.target.value)} />





                            </div>
                            {userCompanies ?
                                <div className="form-group mb-4 mt-3 textOnInput">

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


                                </div> : ''}
                            <div className="mb-4 textOnInput ">

                                <label>گروه انبار</label>

                                <Select
                                    placeholder="گروه"
                                    options={inputwareHouseT()}
                                    onChange={e =>
                                        setGroupId(e.value)


                                    }
                                />




                            </div>

                            <div className='mb-4 textOnInput'>
                                <label>آدرس</label>
                                <textarea type="textarea" className="form-control opacityForInput " rows='4' placeholder='آدرس انبار' value={Addres} onChange={e => {
                                    setAddres(e.target.value)

                                }} />

                            </div>
                            <div className='row '>
                                <div className='col-lg-6 col-sm-12'>
                                    <button type="submit" disabled={loading} className="btn btn-success float-left" onClick={handelSubmit} >ثبت<ClipLoader

                                        loading={loading}
                                        color="#ffff"
                                        size={15}
                                    /></button>
                                </div>
                                <div className='col-lg-6 col-sm-12 '>
                                    <NavLink to='/admin/warehouselist' className="btn btn-danger float-right">بازگشت</NavLink>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default NewWareHouse