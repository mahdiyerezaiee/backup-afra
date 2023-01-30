import React, { useState, useEffect, useCallback } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import {
    GetAllUsers,
    GetDataWithSearch,
    GetForKarbars,
    GetUsersRoles,
    SetUserRole
} from '../../../services/userService';
import { useMemo } from "react";
import MyTable from "../../../Common/Shared/Form/MyTable";
import { setCustomerInfo } from "../../../services/customerService";
import Select from "react-select";
import { ExportToExcel } from '../../../Common/Shared/Common/ExportToExcel';
import { GetAllOrganisation, GetAllOrganisationCode, GetOrganisationById, GetOrganisationCode } from '../../../services/organisationService';
import ModalGroupWork from "../../../Common/Shared/Common/ModalGroupWork";
import AdvancedSearch from "../../../Common/Shared/Common/AdvancedSearch";
import { optionsRole } from "../../../Common/Enums/RolesEnums";
import QueryString from 'qs';
import { GetGroupByIds, GetGroupsForEntity } from '../../../services/GroupService';
import EditCustomerGroup from '../../Customer/Component/EditCustomerGroup';
import EditUserRole from './editUserRole';
import { GetCompanyChild } from '../../../services/companiesService';
import { GetGroupWithCompany } from '../../../services/GroupService';
import { GetUsersRolesById } from '../../../services/userService';

const UserList:React.FC = () => {

    const [PageNumber, setPageNumber] = useState(getPage().PageNumber ? getPage().PageNumber : 0)
    const [PageSize, setPageSize] = useState(getPage().PageSize ? getPage().PageSize : 10)
    const [totalCount, setTotalCount] = useState(0);
    const [UserName, setUserName] = useState(getDefault().UserName)
    const [FirstName, setFirstName] = useState(getDefault().FirstName)
    const [LastName, setLastName] = useState(getDefault().LastName)
    const [NationalCode, setNationalCode] = useState(getDefault().NationalCode)
    const [organizations, SetOrganisations] = useState<any>([]);
    const [userRole, setUserRole] = useState(getDefault().userRole)
    const [users, setUsers] = useState([]);
    const [organization, setOrganization] = useState([]);
    const [selectedRows, setSelectedRows] = useState([])
    const [CustomerG, setCustomerG] = useState<any>([])
    let [Ids, setIds] = useState([])
    const [stateSuccess, SetStateSuccess] = useState(0)
    const [stateError, SetStateError] = useState(0)
    const [modalId, setModalId] = useState(0)
    const [modalGroupOpen, setmodalGroupOpen] = useState(false)
    const [modalRoleOpen, setmodalRoleOpen] = useState(false)
    const [getData, setGeData] = useState(false)
    const params = { UserName, FirstName, NationalCode, LastName, userRole }

    function getDefault() {
        let items = JSON.parse(String(sessionStorage.getItem(`params${window.location.pathname}`)));
        return items ? items : ''


    }
    const param = { PageSize, PageNumber }

    function getPage() {
        let items = JSON.parse(String(sessionStorage.getItem(`param${window.location.pathname}`)));
        return items ? items : ''


    }
 

    const getOrganization = async () => {
        try {
            const { data, status } = await GetAllOrganisation();
            if (status === 200) {

                SetOrganisations(data.result.organizationLists.values)
            }

        } catch (error) {
            console.log(error);
        }

    }

    let config = {

        headers: { 'Content-Type': 'application/json' },
        params: {
            RoleIds: params.userRole ? params.userRole.map((item:any) => item.value) : [],
            UserName: params.UserName,
            FirstName: params.FirstName,
            LastName: params.LastName,
            NationalCode: params.NationalCode,
            PageNumber: 0,
            PageSize


        }
        ,
        paramsSerializer: (params:any) => {

            return QueryString.stringify(params)
        }

    };

    const getDataBySearch = async () => {
        const { data, status } = await GetDataWithSearch(config);
        if (status === 200) {
            setUsers(data.result.users.values);
            setTotalCount(data.result.users.totalCount)

            setPageNumber(0)
            sessionStorage.setItem(`params${window.location.pathname}`, JSON.stringify(params));
            sessionStorage.setItem(`param${window.location.pathname}`, JSON.stringify(param));
        }
    }

    const getDataByPage = async () => {
        let config = {

            headers: { 'Content-Type': 'application/json' },
            params: {
                RoleIds: userRole ? userRole.map((item:any) => item.value) : [],
                UserName: UserName,
                FirstName: FirstName,
                LastName: LastName,
                NationalCode: NationalCode,
                PageNumber,
                PageSize
            }
            ,
            paramsSerializer: (params:any) => {
                return QueryString.stringify(params)
            }
        };
        const { data, status } = await GetDataWithSearch(config);
        setUsers(data.result.users.values);
        setIds([...new Set((data.result.users.values).filter((item:any) => item.groupId !== null).map((item:any) => item.groupId))] as any)

        sessionStorage.setItem(`param${window.location.pathname}`, JSON.stringify(param));

    }

    const [open, SetOpen] = useState(false);
    let arrayOfSelectedData = [];
    const getSelectedData = (data:any) => {
        arrayOfSelectedData = data.map((item:any) => item.original);
        return (arrayOfSelectedData)
    }
    const getBulkJob = (selected:any) => {
        if (selected === 2) {
            enableSelectedItem()
        }
        if (selected === 3) {
            copySelectedItem()
        }
        if (selected === 5) {
            disableSelectedItem()
        }
    }
    const disableSelectedItem = async () => {
    }
    const copySelectedItem = async () => {


    }
    const enableSelectedItem = async () => {


    }
    const optiobUserRole = () => {
        return (optionsRole.map((item) => ({ label: item.label, value: item.value })))
    }
    let configs = {

        headers: { 'Content-Type': 'application/json' },
        params: {
            RoleIds: userRole ? userRole.map((item:any) => item.value) : [],
            UserName,
            FirstName,
            LastName,
            NationalCode,
            PageNumber,
            PageSize
        }
        ,
        paramsSerializer: (params:any) => {

            return QueryString.stringify(params)
        }
    };
    const getUsers = async () => {
        if (getData) {
            sessionStorage.clear()

        }
        try {
            const { data, status } = await GetDataWithSearch(configs);
            setGeData(false)

            setUsers(data.result.users.values);
            setIds([...new Set((data.result.users.values).filter((item:any) => item.groupId !== null).map((item:any) => item.groupId))] as any)
            setTotalCount(data.result.users.totalCount)
        } catch (e) {
            console.log(e)
        }
    }
    const close = () => {
        SetOpen(false);
    }
    

    const getCustomerGroups=async()=>{
        let newConfig={
            headers: { 'Content-Type': 'application/json' },
        params: {
            EntityTypeId:1,
            Ids
        }
        ,
        paramsSerializer: (params:any) => {

            return QueryString.stringify(params)
        }
        }
        try {
            const{data,status}=await GetGroupByIds(newConfig)
            if(status===200){
                setCustomerG(data.result.groups)
                setIds([])
            }
        } catch (error) {

        }
    }

    // const getCustomerGroups = async () => {
    //     const response = await GetCompanyChild();
    //     let companies = response.data.result.companies
    //     let arr = []
    //     let finalArr = []
    //     for (let i = 0; i < companies.length; i++) {

    //         const { data, status } = await GetGroupWithCompany(1, companies[i].id);

    //         if (data.result.groups.length > 0) {
    //             arr.push(data.result.groups)
    //         }


    //     }

    //     finalArr = Array.prototype.concat.apply([], arr);

    //     setCustomerG(finalArr);
    // }
    useEffect(() => {
        getOrganization()
        getUsers();
    
    }, [getData])



    const addNewUserHandler = () => {
        navigate('/admin/adduser')
    }
    const navigate = useNavigate()

    const editHandler = (id:number) => {
        setModalId(id)
        setmodalRoleOpen(true)
    }
    const modalRoleClose = () => {
        setmodalRoleOpen(false)

    }
    const editInfoHandler = (id:any) => {
        navigate(`/admin/editInfo/${id}`)
    }
    const editHandlerGroup = (id:number) => {
        setModalId(id)
        setmodalGroupOpen(true)
    }
    const modalGroupClose = () => {
        setmodalGroupOpen(false)
    }
    console.log(Ids);
    
    useEffect(() => {
      
        if(Ids.length>0){
        getCustomerGroups()
}
    }, [Ids])
    let organiz=organizations
    
    const columns = useMemo(() => [
        { Header: '#', accessor: 'id' },
        { Header: 'نام کاربری', accessor: 'userName' }
        ,
        {
            Header: 'نام و نام خانوادگی', accessor: (d:any) => {
                let fName = d.firstName;
                let lName = d.lastName;
                let fullname = `${fName ? fName : ''} ${lName ? lName : ''} `;
                return (fullname)
            }, Cell: (row:any) => {
                if (row.row.original.firstName){
                let fName = row.row.original.firstName;
                let lName = row.row.original.lastName;

                let fullname = `${fName ? fName : ''} ${lName ? lName : ''} `;

                return (fullname) 
                }else {

                    return ('--')
                }


            }
        }
        , { Header: 'کد ملی', accessor: 'nationalCode' , Cell:(row:any)=>row.row.original.nationalCode ?row.row.original.nationalCode:"--"  }
        , {
            Header: 'شناسه ملی', accessor: (d:any) => {
                let organizationss =organiz? organiz.filter((item:any) => item.id === d.organizationId).map((item:any) => item.nationalId):null
                return (`${organizationss}`)
            }, Cell: (row:any) => {

                if (row.row.original.organizationId) {
                    return (organiz.filter((item:any) => item.id === row.row.original.organizationId).map((item:any) => item.nationalId))

                }
                else {

                    return ('--')
                }

            }
        },
        {
            Header: 'سازمان', accessor: (d:any) => {
                let organizationss = organiz.filter((item:any) => item.id === d.organizationId).map((item:any) => item.name)
                return (`${organizationss}`)
            }, Cell: (row:any) => {

                if (row.row.original.organizationId) {
                    return (organiz.filter((item:any) => item.id === row.row.original.organizationId).map((item:any) => item.name))

                }
                else {

                    return ('--')
                }

            }
        }

        , {
            Header: 'نقش کاربر', accessor: '', Cell: (row:any) => {
                const [roles, setRoles] = useState([]);
                let userId = row.row.original.id
                const getrole = async () => {
                    try {
                        const { data, status } = await GetUsersRolesById(Number(userId))
                        setRoles(data.result.userRoleIds)

                    } catch (error) {
                        console.log(error);
                    }

                }

                useEffect(() => {

                    getrole();
                }
                    , [])


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

                    return (<span></span>)
                } if (!roles[0]) {

                    return (<span>کارشناس پشتیبانی </span>)
                }
                if (roles[0] === 5) {

                    return (<span>ادمین مالی</span>)
                }
                if (roles[0] === 6) {

                    return (<span> ادمین انبار</span>)
                }
                if (roles[0] === 7) {

                    return (<span> ادمین</span>)
                }
                if (roles[0] === 8) {

                    return (<span>سوپر ادمین</span>)
                }
            }


        }, {
            Header: 'گروه ', accessor: 'groupId', Cell: (row:any) => {

                if (row.row.original.groupId===null) {
                    return ('تعیین نشده')
                }
                else {
                    return (CustomerG.filter((item:any) => item.id === row.row.original.groupId).map((item:any) => item.name))
                }
            }
        }
        , {
            Header: 'وضعیت', accessor: '', Cell: (row:any) => {
                const [active, setActive] = useState(row.row.original.active)
                const id = row.row.original.id

                const activeChang = {


                    "userName": row.row.original.userName,
                    "email": row.row.original.email,
                    "firstName": row.row.original.firstName,
                    "lastName": row.row.original.lastName,
                    "requireInfo": true,
                    "createDate": row.row.original.createDate,
                    "nationalCode": row.row.original.nationalCode,
                    "organizationId": row.row.original.organizationId,

                    "islegal": row.row.original.islegal,
                    "groupId": row.row.original.groupId,
                    id,
                    "active": !active,
                }

                const activeHandler = async () => {
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
                            className="feather feather-check  " onClick={function () {
                                setActive(!active);
                                activeHandler()
                            }} style={{ color: 'green' }}>
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>)
                } else {
                    return (<svg xmlns="http://www.w3.org/2000/svg" data-dismiss="alert" width="21" height="21"
                        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-x  danger " onClick={function () {
                            setActive(!active);
                            activeHandler()
                        }} style={{ color: 'red' }}>
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>)
                }


            }
        }, {
            Header: 'عملیات', accessor: '', Cell: row => (
                <ul className="table-controls">

                    {/* <button className="p-0 border-0 bg-transparent non-hover edit-btn mr-1" data-toggle="tooltip" data-placement="top"
                        title="گروه بندی"
                        onClick={e => editHandlerGroup(row.row.original.id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-people" viewBox="0 0 16 16"> <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" /> </svg>
                    </button>

                    <button className="p-0 border-0 bg-transparent non-hover edit-btn" data-toggle="tooltip" data-placement="top"
                        title="تعیین نقش"
                        onClick={e => editHandler(row.row.original.id)}>
                        <svg width="19" height="24" viewBox="0 0 24 24" style={{ fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" }} className="feather feather-user">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    </button> */}
                    <button className="m-1 p-0 border-0 bg-transparent non-hover edit-btn" data-toggle="tooltip" data-placement="top"
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


                    <button className="m-1 p-0 border-0 bg-transparent non-hover edit-btn" data-toggle="tooltip" data-placement="top" title="حذف">
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
    ],[CustomerG,organiz])
    const handelSearchFieldClear = () => {
        setGeData(true)
        getUsers()
        setPageNumber(0)
        setFirstName('');
        setLastName('')
        setUserName('')
        setNationalCode('')
        setUserRole([])
        sessionStorage.clear();


    }
    const data = useMemo(() => users,[users]);

    if (users) {
        const dataForExcel = data.map((item:any) => ({
            'شناسه': item.id,
            'نام کاربری': item.userName,
            'نام': item.firstName,
            'نام خانوادگی': item.lastName,
            'کد ملی': item.nationalCode,
            'شناسه ملی شرکت': item.OrganizationId
        }));
        return (
            <div
            // className='user-progress'
            >

                <EditUserRole id={modalId} closeModal={modalRoleClose} modalIsOpen={modalRoleOpen} />
                <div className='row'>
                    <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>

                    </div>
                </div>
                <EditCustomerGroup id={modalId} closeModal={modalGroupClose} modalIsOpen={modalGroupOpen} refresh={getUsers} />
                <div className=" statbox widget-content widget-content-area mb-1 mt-1 p-2  rounded">
                    <AdvancedSearch>

                        <form className='form-row textOnInput'>

                            <label>نام</label>
                            <div className="col-lg-2 col-md-4  col-sm-12    mb-1">
                                <input className="form-control opacityForInput  mb-4" type="text" placeholder="نام " value={FirstName} onChange={e => setFirstName(e.target.value)} />
                            </div>


                            <div className="col-lg-2 col-md-4  col-sm-12    mb-1">
                                <label> نام خانوادگی</label>
                                <input className="form-control opacityForInput  mb-4" type="text" placeholder="نام خانوادگی " value={LastName} onChange={e => setLastName(e.target.value)} />
                            </div>
                            <div className="col-lg-2 col-md-4  col-sm-12    mb-1">
                                <label> نام کاربری</label>

                                <input className="form-control opacityForInput  mb-4" type="text" placeholder="شماره موبایل" value={UserName} onChange={e => setUserName(e.target.value)} />
                            </div>
                            <div className="col-lg-2 col-md-4  col-sm-12    mb-1">
                                <label> کد ملی</label>

                                <input className="form-control opacityForInput  mb-4" type="text" placeholder="کد ملی" value={NationalCode} onChange={e => setNationalCode(e.target.value)} />
                            </div>
                            <div className="col-lg-4 col-md-6  col-sm-12 mb-4  selectIndex">
                                <label> نقش کاربر</label>
                                <Select
                                    value={userRole}
                                    placeholder='گروه کاربر'
                                    options={optiobUserRole()}
                                    isMulti
                                    isClearable={true}
                                    onChange={e => setUserRole(e)}
                                />
                            </div>


                        </form>
                        <div className="  filter-btn ">
                            <div className=" row  ">
                                <div className="col-6 ">
                                    <button onClick={handelSearchFieldClear}
                                        className="  btn-sm btn-danger ">حذف فیلتر
                                    </button>
                                </div>
                                <div className="col-6">
                                    <button onClick={getDataBySearch}
                                        className="  btn-sm  btn-primary">جستجو
                                    </button>
                                </div>
                            </div> </div>
                    </AdvancedSearch>
                </div>
                {getDefault().UserName || getDefault().userRole || getDefault().LastName || getDefault().NationalCode || getDefault().FirstName ? <span className="d-block p-3 text-center w-100 bg-light-primary  " style={{ fontSize: "15px" }}>نمایش اطلاعات بر اساس فیلتر  </span> : null}

                <div className=" statbox widget-content widget-content-area">

                    <div className="table-responsive">


                        <button onClick={addNewUserHandler} className="btn btn-primary m-3">تعریف کاربر جدید</button>

                        <MyTable columns={columns} data={data} getData={(rows:any) => setSelectedRows(rows)} bulkJob={getBulkJob}
                            total={totalCount}
                            setPageSize={setPageSize}
                            PageSize={PageSize}
                            getDataBySearch={getDataByPage}
                            setPageNumber={setPageNumber}
                            PageNumber={PageNumber}
                        />                        <ModalGroupWork open={open} close={close} success={stateSuccess} error={stateError} />

                    </div>
                    <div className="d-flex justify-content-end">

                        <ExportToExcel apiData={dataForExcel} fileName='لیست کاربران' />
                    </div>
                    <div className="d-flex justify-content-end">

                    </div>
                </div>
            </div>


        )
    }
    else {
        return (
            <div className='user-progress'>
                <div className='row'>
                    <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12 '>


                    </div>
                </div>
                <div className=" statbox widget-content widget-content-area mb-1 mt-1 p-2  rounded">
                    <AdvancedSearch>


                        <form className='form-row textOnInput'>

                            <label>نام</label>
                            <div className="col-lg-2 col-md-4  col-sm-12    mb-1">
                                <input className="form-control opacityForInput  mb-4" type="text" placeholder="نام " value={FirstName} onChange={e => setFirstName(e.target.value)} />
                            </div>


                            <div className="col-lg-2 col-md-4  col-sm-12    mb-1">
                                <label> نام خانوادگی</label>
                                <input className="form-control opacityForInput  mb-4" type="text" placeholder="نام خانوادگی " value={LastName} onChange={e => setLastName(e.target.value)} />
                            </div>
                            <div className="col-lg-2 col-md-4  col-sm-12    mb-1">
                                <label> نام کاربری</label>

                                <input className="form-control opacityForInput  mb-4" type="text" placeholder="شماره موبایل" value={UserName} onChange={e => setUserName(e.target.value)} />
                            </div>
                            <div className="col-lg-2 col-md-4  col-sm-12    mb-1">
                                <label> کد ملی</label>

                                <input className="form-control opacityForInput  mb-4" type="text" placeholder="کد ملی" value={NationalCode} onChange={e => setNationalCode(e.target.value)} />
                            </div>
                            <div className="col-lg-4 col-md-6  col-sm-12  co selectIndex">
                                <label> نقش کاربر</label>
                                <Select
                                    value={userRole}
                                    placeholder='گروه کاربر'
                                    options={optiobUserRole()}
                                    isMulti
                                    isClearable={true}
                                    onChange={e => setUserRole(e)}
                                />
                            </div>


                        </form>
                        <div className="  filter-btn ">
                            <div className=" row  ">
                                <div className="col-6 ">
                                    <button onClick={handelSearchFieldClear}
                                        className="  btn-sm btn-danger ">حذف فیلتر
                                    </button>
                                </div>
                                <div className="col-6">
                                    <button onClick={getDataBySearch}
                                        className="  btn-sm  btn-primary">جستجو
                                    </button>
                                </div>
                            </div>  
                            </div>
                    </AdvancedSearch>
                </div>
                {getDefault().UserName || getDefault().userRole || getDefault().LastName || getDefault().NationalCode || getDefault().FirstName ? <span className="d-block p-3 text-center w-100 bg-light-primary  " style={{ fontSize: "15px" }}>نمایش اطلاعات بر اساس فیلتر  </span> : null}

                <div className=" statbox widget-content widget-content-area">
                    <div>
                        <button onClick={addNewUserHandler} className="btn btn-primary m-3">تعریف کاربر جدید</button>





                        <div className='text-center mt-5'>
                            <h5>اطلاعاتی جهت نمایش موجود نیست</h5>
                        </div>



                    </div>
                </div>


            </div>
        )
    }

}

export default UserList