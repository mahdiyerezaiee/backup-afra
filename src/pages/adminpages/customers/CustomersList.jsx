import React, { useState, useEffect, useCallback } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';

import { useMemo } from "react";
import MyTable from "../../../components/form/MyTable";
import { setCustomerInfo } from "../../../services/customerService";
import { getAllWithRole } from './../../../services/customerService';
import { ExportToExcel } from '../../../components/common/ExportToExcel';
import {DeleteGroup, GetGroupsForEntity, SetGroup} from '../../../services/GroupService';
import {GetAllOrganisation} from "../../../services/organisationService";
import ModalGroupWork from "../../../components/common/ModalGroupWork";
import QueryString from "qs";
import {GetDataWithSearch, GetForKarbars} from "../../../services/userService";


const CustomersList = () => {
    const [PageNumber, setPageNumber] = useState(0)
    const [PageSize, setPageSize] = useState(10)
    const [totalCount , setTotalCount]=useState(0) ;

    const [users, setUsers] = useState([]);
    const [organization, setOrganization] = useState([]);
    const[selectedRows,setSelectedRows]=useState([])
    const [stateSuccess , SetStateSuccess ] = useState(0)
    const [stateError , SetStateError ] = useState(0)
    const[open,SetOpen]=useState(false);


    const getDataBySearch = async () => {
        let config = {

            headers: { 'Content-Type': 'application/json' },
            params: {
                RoleIds: 2,
                PageNumber,
                PageSize


            }
            ,
            paramsSerializer:params=>{

                return QueryString.stringify(params)
            }

        };
        try {
            const { data, status } = await GetForKarbars(config);
            setUsers(data.result.users.values);
        }catch (e) {
            console.log(e)
        }


    }

    const close = () => {
        SetOpen(false);
    }
    let arrayOfSelectedData=[];
    const getSelectedData=(data)=>{

        arrayOfSelectedData= data.map(item=>item.original);


        return(arrayOfSelectedData)

    }
    const getBulkJob=(selected)=>{
        if(selected===2){
            enableSelectedItem()
        }
        if(selected===3){
            copySelectedItem()
        }if(selected===4){
            DeleteSelectedItem()
        }
        if(selected===5){
            disableSelectedItem()
        }
    }
    const DeleteSelectedItem=async()=>{
        // const arrayOfData=getSelectedData(selectedRows);
        // let successCount=0;
        // let errorCount=0;
        // for (let i = 0; i < arrayOfData.length; i++) {
        //
        //     try {
        //         const{data,status}=await DeleteGroup(arrayOfData[i].id)
        //         if(data.result.success ===true){
        //             SetOpen(true)
        //
        //             SetStateSuccess ( successCount+=1)
        //         } if(data.result.success ===false){
        //             SetOpen(true)
        //
        //             SetStateError (errorCount+=1)
        //         }
        //
        //
        //
        //     } catch (error) {
        //         SetOpen(true)
        //
        //         SetStateError (errorCount+=1)
        //
        //
        //     }
        //
        //
        // }

    }
    const copySelectedItem=async()=>{
        const arrayOfData=getSelectedData(selectedRows);
        const copyData= arrayOfData.map(item=>{return{...item,id:0,active:true,createDate:new Date()}})

        let successCount=0;
        let errorCount=0;
        for (let i = 0; i < copyData.length; i++) {


            try {
                let payload={
                    'group':copyData[i]
                }
                const{data,status}=await setCustomerInfo(payload)
                if(status===200){
                    SetOpen(true)

                    SetStateSuccess ( successCount+=1)
                }


            } catch (error) {
                SetOpen(true)

                SetStateError (errorCount+=1)
            }


        }


    }
    const enableSelectedItem=async()=>{
        const arrayOfData=getSelectedData(selectedRows);
        const copyData= arrayOfData.map(item=>{return{...item,active:true}})

        let successCount=0;
        let errorCount=0;
        for (let i = 0; i < copyData.length; i++) {


            try {
                let payload={
                    'group':copyData[i]
                }

                const{data,status}=await setCustomerInfo(payload)
                if(status===200){
                    SetOpen(true)

                    SetStateSuccess ( successCount+=1)
                }


            } catch (error) {
                SetOpen(true)

                SetStateError (errorCount+=1)
            }

        }


    }
    const disableSelectedItem=async()=>{
        const arrayOfData=getSelectedData(selectedRows);
        const copyData= arrayOfData.map(item=>{return{...item,active:false}})

        let successCount=0;
        let errorCount=0;
        for (let i = 0; i < copyData.length; i++) {


            try {

                let payload={
                    'group':copyData[i]
                }
                const{data,status}=await setCustomerInfo(payload)
                SetOpen(true)
                if(status===200){

                    SetStateSuccess( successCount+=1)

                }

                
            } catch (error) {
                SetOpen(true)

                SetStateError (errorCount+=1)

            }finally {

            }


        }


    }

    const getCustomers = async () => {


        const { data, staus } = await getAllWithRole(2);
        setUsers(data.result.users.values);
        setTotalCount(data.result.users.totalCount)
    }
    const getOrganizationName = async () => {
        try {
            const { data, status } = await GetAllOrganisation();
            if (status === 200) {
                setOrganization(data.result.organizationLists.values)
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getCustomers();
        getOrganizationName()

    }, [])


    const navigate = useNavigate()

    const editHandler = (id) => {
        navigate(`/editcustomergroup/${id}`)
    }
    const editInfoHandler=(id)=>{
        navigate(`/editCustumer/${id}`)
    }
    const columns = useMemo(() => [
        { Header: 'شناسه', accessor: 'id' },
        { Header: 'نام کاربری', accessor: 'userName' }
        ,
        {
            Header: 'نام و نام خانوادگی', accessor: d => {
                let fName = d.firstName;
                let lName = d.lastName;
                let fullname = `${fName ? fName : ''} ${lName ? lName : ''} `;
                return (fullname)
            }, Cell: row => {

                let fName = row.row.original.firstName;
                let lName = row.row.original.lastName;

                let fullname = `${fName ? fName : ''} ${lName ? lName : ''} `;

                return (fullname)

            }
        }
        , { Header: 'کد ملی', accessor: 'nationalCode' }
        , { Header: 'سازمان', accessor:d=> {
            let OName = organization.filter(item => item.id === d.organizationId).map(item => item.name)
            return(`${OName}`)

        }, Cell: row => {

                if (row.row.original.organizationId) {
            let OName = organization.filter(item => item.id ===row.row.original.organizationId).map(item => item.name)

                    return (OName)
                }
                else{

                    return('--')
                }

            }

            }
        ,
        {
            Header: 'گروه مشتری', accessor: ' ', Cell: row => {
                const [CustomerG, setCustomerG] = useState([])
              
                const GetCustomerGroup = async () => {
                    const { data, status } = await GetGroupsForEntity(1);
                    if (status === 200) {

                      
                        setCustomerG(data.result.groups);
                    }

                }

                useEffect(() => {
                  
                    GetCustomerGroup()
                }, [])


               
                
                if(!row.row.original.groupId){
                    return('تعیین نشده')
                }
                else{
                    return (CustomerG.filter(item=>item.id === row.row.original.groupId).map(item=> item.name))
                }
            }
        }
        , {
            Header: 'وضعیت', accessor: '', Cell: row => {
                const [active, setActive] = useState(row.row.original.active)
                const id = row.row.original.id

                const activeChang = {


                    "userName":row.row.original.userName ,
                    "email": row.row.original.email,
                    "firstName": row.row.original.firstName,
                    "lastName": row.row.original.lastName,
                    "requireInfo": true,
                    "createDate": row.row.original.createDate,
                    "nationalCode": row.row.original.nationalCode,
                    "organizationId": row.row.original.organizationId,

                    "islegal": row.row.original.islegal,
                    "groupId":  row.row.original.groupId,
                    id,
                    "active":!active,
                }

                const activeHandler = async (e) => {
                    try {
                        const { data, status } = await setCustomerInfo(activeChang)

                    } catch (err) {
                        console.log(err)
                    }


                }
                if (active === true) {
                    return (
                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                             className="feather feather-check  " onClick={function () {setActive(!active);
                            activeHandler()}} style={{ color: 'green' }}>
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>)
                } else {
                    return (<svg xmlns="http://www.w3.org/2000/svg" data-dismiss="alert" width="21" height="21"
                                 fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                 strokeLinejoin="round"
                                 className="feather feather-x  danger " onClick={function () {setActive(!active);
                        activeHandler()}} style={{ color: 'red' }}>
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>)
                }


            }
        }, {
            Header: 'عملیات', accessor: '', Cell: row => (
                <ul className="table-controls">
                    {/*<NavLink className='btn btn-primary btn-rounded ' to={`/userrole/${row.row.original.id}`}> تعیین نقش </NavLink>*/}

                    <button className="p-0 border-0 bg-transparent non-hover edit-btn" data-toggle="tooltip" data-placement="top"
                        title="گروه بندی"
                        onClick={e => editHandler(row.row.original.id)}>
                        <svg  width="19"  height="24" viewBox="0 0 24 24" style={{   fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLineJoin: "round" }}  className="feather feather-user">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    </button>
                    <button className=" p-0 border-0 bg-transparent non-hover edit-btn" data-toggle="tooltip" data-placement="top"
                        title="ویرایش"
                        onClick={e => editInfoHandler(row.row.original.id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="20"
                            viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-edit-2">
                            <path
                                d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                        </svg>
                    </button>

                    <button className=" p-0 border-0 bg-transparent non-hover edit-btn" href="#" data-toggle="tooltip" data-placement="top" title="حذف">
                        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="20"
                            viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-trash-2">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path
                                d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            <line x1="10" y1="11" x2="10" y2="17"></line>
                            <line x1="14" y1="11" x2="14" y2="17"></line>

                        </svg>
                    </button>


                </ul>
            )
        }
    ])
    const data = useMemo(() => users);;

    if(users){
        const dataForExcel = data.map(item => ({
            'شناسه': item.id,
            'نام کاربری': item.userName,
            'نام': item.firstName,
            'نام خانوادگی': item.lastName,
            'کد ملی': item.nationalCode,
            'شناسه ملی شرکت': item.OrganizationId
        }));
        return (
            <div className='user-progress'>
                <div className='row'>
                    <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12 p-3 m-2'>

                    </div>
                </div>

                <div className=" statbox widget-content widget-content-area">
                    <div className="table-responsive">


                        <MyTable   columns={columns} data={data} getData={rows=>setSelectedRows(rows)} bulkJob={getBulkJob}
                                   total={totalCount}
                                   setPageSize={setPageSize}
                                   PageSize={PageSize}
                                   getDataBySearch={getDataBySearch}
                                   setPageNumber={setPageNumber}
                                   PageNumber={PageNumber}
                        />
                        <ModalGroupWork open={open} close={close} success={stateSuccess} error={stateError} />

                    </div>
                    <div className="d-flex justify-content-end">
                        <ExportToExcel apiData={dataForExcel} fileName='اکسل' />
                    </div>
                </div>
            </div>


        )}

    else{
        return(
            <div className='text-center mt-5'>
                <h5>اطلاعاتی جهت نمایش موجود نیست</h5>
            </div>
        )
    }

}

export default CustomersList