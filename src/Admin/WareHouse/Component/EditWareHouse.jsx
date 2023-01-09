import React, { useEffect, useState, } from "react";
import { GetAllWareHouse, SetWareHouses } from "../../../services/wareHouseService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { NavLink, useParams } from "react-router-dom";
import Select from 'react-select'
import {  SetAttributeValues } from "../../../services/attributeService";
import { GetAttributeValues } from '../../../services/attributeService';
import { GetGroupsForEntity, GetGroupWithCompany } from '../../../services/GroupService';
import {ClipLoader} from "react-spinners";
import { GetCompanyChild } from './../../../services/companiesService';

const EditWareHouse = () => {
    const params = useParams()
    const [Addres, setAddres] = useState('');
    const [name, Setname] = useState('');
    const[wareGid,setWareGId]=useState(0)
    const [wareHouseT, SetWarehouseT] = useState([]);
    const [groupId, setGroupId] = useState(0);
    const [attributeIdHajm, setattributeIdHajm] = useState(0);
    const [attributeIdadd, setattributeIdadd] = useState(0);
    const [loading, setLoading] = useState(false);
    const [attValuehajm, setAttValueHajm] = useState('')
    const id = params.id
    const navigator = useNavigate();
    const test = {

        "wareHouse": {
            id,
            name,
            groupId
        }

    }
    const getWareHouse = async () => {
        try {
            const { data, status } = await GetAllWareHouse(params.id)
            Setname(data.result.wareHouse.name)
            setWareGId(data.result.wareHouse.groupId)
        } catch (err) {
            console.log(err)
        }
    }

    const GetWareHouseTypes = async () => {
        const response = await GetCompanyChild();
        let companies = response.data.result.companies
        let arr = []
        let finalArr=[]
        for (let i = 0; i < companies.length; i++) {

            const { data, status } = await GetGroupWithCompany(4, companies[i].id);

            if(data.result.groups.length>0)
            {
               arr.push(data.result.groups)
            }


        }

        finalArr=Array.prototype.concat.apply([], arr);

        SetWarehouseT(finalArr);

      


    }

    const getWareHajm = async () => {
        try {


            const { data, status } = await GetAttributeValues(1006, params.id);
            if (status === 200) {
                setAttValueHajm(data.result.attributeValue.value)
                setattributeIdHajm(data.result.attributeValue.id)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getWareAddress = async () => {
        try {
            const { data, status } = await GetAttributeValues(1007, params.id);
            if (status === 200) {
                setAddres(data.result.attributeValue.value)
                setattributeIdadd(data.result.attributeValue.id)
               
            }
        } catch (error) {

        }

    }
    

    const inputwareHouseT = () => {
        return (wareHouseT.map(data => ({ label: data.name, value: data.id })))
    }
   let WareT=wareHouseT.filter(item=>item.id===wareGid).map(item=>item.name)

 let wareGPName=WareT[0]
   
    
    const setAddressForWare = async () => {

        const attribute = {
            "attributeValues": [
                {
                    id:attributeIdadd,
                    attributeTypeId: 1007,
                    entityId: params.id,
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
                    id:attributeIdHajm,
                    attributeTypeId: 1006,
                    entityId: params.id,
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
               
                setAddressForWare();
                setAttributevalueforHajm();
                navigator('/admin/warehouselist')
            }
            setLoading(false)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getWareHouse()
        GetWareHouseTypes();
        getWareHajm();
      
        getWareAddress();
    }, [])
    return (
        <div className='user-progress' >
        <div className='row'>
            <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12 p-3 m-2'>
                <h5 >ویریش انبار</h5>
                <p>در این بخش می توانید انبار را ویرایش کنید.</p>
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
                            <div className="mb-4 textOnInput selectIndex">

                                <label>گروه انبار</label>
                               
                                   
                                        <Select
                                        value={
                                            {label:wareGPName,value:wareGid}
                                    }
                                            options={inputwareHouseT()}
                                            onChange={e =>setGroupId(e.value)}
                                        />



                            </div>
                            <div className='mb-4 textOnInput'>
                                <label>آدرس</label>
                                <textarea type="textarea" className="form-control opacityForInput " rows='4' placeholder='آدرس انبار' value={Addres} onChange={e => {
                                    setAddres(e.target.value)

                                }} />
                            </div>
                            <div className='row '>
                                <div className='col-lg-6 col-sm-12 '>
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
export default EditWareHouse