import { useNavigate } from "react-router-dom";
import { CSVLink } from 'react-csv';
import { useEffect, useState } from "react";
import { useTable } from "react-table";

import { useMemo } from "react";
import MyTable from "../../../../components/form/MyTable";

import { toast } from "react-toastify";
// import { GetAttribute, GetAttributeValues } from "../../../services/attributeService";
import Modal from "react-modal";
import { ExportToExcel } from "../../../../components/common/ExportToExcel";
// import { DeleteOrganization, SetOrganisation } from "../../../services/organisationService";
import ModalGroupWork from "../../../../components/common/ModalGroupWork";
import AdvancedSearch from '.././../../../components/common/AdvancedSearch';
import Select from 'react-select';
import QueryString from "qs";
import { GetShippingCompanies, SetShippingCompany } from "../../../../services/ShippingService";
import { GetGroupsForEntity } from "../../../../services/GroupService";




const customStyles = {
    content: {

        inset: '50% auto auto 50%',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '5%',
        border: '2px ridge black'
    }
};
const ShoppingCompanyList = () => {
    const [PageNumber, setPageNumber] = useState(0)
    const [PageSize, setPageSize] = useState(10)
    const [totalCount, setTotalCount] = useState(0);
    const [shippingCompany, setShippingCompanys] = useState([]);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [id, setId] = useState(0)
    const [selectedRows, setSelectedRows] = useState([])
    const [stateSuccess, SetStateSuccess] = useState(0)
    const [stateError, SetStateError] = useState(0)
    const [shippingCompanyG, setShippingCompanyG] = useState([])
    const [groupIds, SetGroupId] = useState()
    const [Name, setName] = useState(getDefault().Name)
    const [Code, setCode] = useState(getDefault().Code)
    const [isclearable, setIscreable] = useState(true)
    const [getData, setGeData] = useState(false)


    const [open, SetOpen] = useState(false);
    const close = () => {
        SetOpen(false);
    }
    let arrayOfSelectedData = [];
    const getSelectedData = (data) => {

        arrayOfSelectedData = data.map(item => item.original);


        return (arrayOfSelectedData)

    }

    const GetshippingCompanyGroup = async () => {
        const { data, status } = await GetGroupsForEntity(2);
        if (status === 200) {


            setShippingCompanyG(data.result.groups);


        }

    }

    const getBulkJob = (selected) => {
        if (selected === 2) {
            enableSelectedItem()
        }
        if (selected === 3) {
            copySelectedItem()
        } if (selected === 4) {
            DeleteSelectedItem()
        }
        if (selected === 5) {
            disableSelectedItem()
        }
    }
    const DeleteSelectedItem = async () => {
        // const arrayOfData = getSelectedData(selectedRows);
        // let successCount = 0;
        // let errorCount = 0;
        // for (let i = 0; i < arrayOfData.length; i++) {
        //
        //     try {
        //         const { data, status } = await DeleteshippingCompany(arrayOfData[i].id)
        //         if (status === 200) {
        //             SetOpen(true)
        //
        //             SetStateSuccess(successCount += 1)
        //         }
        //
        //
        //
        //     } catch (error) {
        //         SetOpen(true)
        //
        //         SetStateError(errorCount += 1)
        //
        //     }
        //
        //
        // }

    }
    const copySelectedItem = async () => {
        const arrayOfData = getSelectedData(selectedRows);
        const copyData = arrayOfData.map(item => { return { ...item, id: 0, active: true, createDate: new Date() } })

        let successCount = 0;
        let errorCount = 0;
        for (let i = 0; i < copyData.length; i++) {


            try {


                const { data, status } = await SetShippingCompany(copyData[i])
                if (status === 200) {
                    SetOpen(true)

                    SetStateSuccess(successCount += 1)
                }


            } catch (error) {
                SetOpen(true)

                SetStateError(errorCount += 1)
            }


        }


    }
    const enableSelectedItem = async () => {
        const arrayOfData = getSelectedData(selectedRows);
        const copyData = arrayOfData.map(item => { return { ...item, active: true } })

        let successCount = 0;
        let errorCount = 0;
        for (let i = 0; i < copyData.length; i++) {


            try {


                const { data, status } = await SetShippingCompany(copyData[i])
                if (status === 200) {
                    SetOpen(true)

                    SetStateSuccess(successCount += 1)
                }


            } catch (error) {
                SetOpen(true)

                SetStateError(errorCount += 1)
            }


        }


    }
    const disableSelectedItem = async () => {
        const arrayOfData = getSelectedData(selectedRows);
        const copyData = arrayOfData.map(item => { return { ...item, active: false } })

        let successCount = 0;
        let errorCount = 0;
        for (let i = 0; i < copyData.length; i++) {


            try {

                let payload = {
                    'shippingCompany': copyData[i]
                }

                const { data, status } = await SetShippingCompany(copyData[i])
                if (status === 200) {
                    SetOpen(true)

                    SetStateSuccess(successCount += 1)
                }



            } catch (error) {
                SetOpen(true)

                SetStateError(errorCount += 1)
            }


        }


    }
    const getGroupForCompbo = () => {

        return (shippingCompanyG.map(item => ({ label: item.name, value: item.id })))

    }
    const groups = getGroupForCompbo();
    const params = { Name, Code}
    function getDefault() {
        let items = JSON.parse(sessionStorage.getItem('params'));
        return items? items:''


    }
    const getDataBySearch = async () => {

        let config = {

            headers: { 'Content-Type': 'application/json' },

            params: {
                Name,
                Code,
                PageNumber:0,
                PageSize:10,

                


            },
            paramsSerializer: params => {

                return QueryString.stringify(params)
            }


        };

        try {
            const { data, status } = await GetShippingCompanies(config)
            if (status === 200) {

                setShippingCompanys(data.result.shippingCompanies.values)
                setTotalCount(data.result.shippingCompanies.totalCount)
                sessionStorage.setItem('params', JSON.stringify(params));

            }
        } catch (error) {
            console.log(error);
        }
    }
    const getDataByPage = async () => {

        let config = {

            headers: { 'Content-Type': 'application/json' },

            params: {
                Name,
                Code,
                currentPage: 0,
                PageNumber,
                PageSize,


            },
            paramsSerializer: params => {

                return QueryString.stringify(params)
            }


        };

        try {
            const { data, status } = await GetShippingCompanies(config)
            if (status === 200) {

                setShippingCompanys(data.result.shippingCompanies.values)
                sessionStorage.setItem('params', JSON.stringify(params));

            }
        } catch (error) {
            console.log(error);
        }
    }
    const openModal = (id) => {
        setIsOpen(true);
        setId(id)

    }
    const closeModal = () => {
        setIsOpen(false);
    }
    const getShippingCompany = async () => {
        let config = {

            headers: { 'Content-Type': 'application/json' },

            params: {
                Name,
                Code,
                PageNumber,
                PageSize,




            },
            paramsSerializer: params => {

                return QueryString.stringify(params)
            }


        };

        try {
            const { data, status } = await GetShippingCompanies(config)
            setGeData(false)
            setShippingCompanys(data.result.shippingCompanies.values)
            setTotalCount(data.result.shippingCompanies.totalCount)

        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getShippingCompany();
        sessionStorage.clear()
        GetshippingCompanyGroup();
    }, [getData])

    const editHandler = (id) => {
        navigate(`/editshippingCompany/${id}`)
    }
    // const deletHandler = async () => {
    //     try {
    //         const { data, status } = await DeleteshippingCompany(id)
    //         if (data.result.success === true) {
    //             toast.success("کالا با موفقیت حذف شد", {
    //                 position: "top-right",
    //                 closeOnClick: true
    //             });
    //             setIsOpen(false)
    //             getshippingCompanys()
    //         } if (data.result.success === false) {
    //
    //             toast.error("این کالا به یک یا چند عرضه اختصاص داده شده است", {
    //                 position: "top-right",
    //                 closeOnClick: true
    //             });
    //         }
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }
    const navigate = useNavigate()
    const formHandler = () => {
        navigate("/newshippingcompany")
    }


    const columns = useMemo(() => [
        { Header: 'شناسه', accessor: 'id' },
        { Header: 'نام شرکت', accessor: 'name' }
        , { Header: 'شماره کد', accessor: 'code' }
        , {
            Header: 'عملیات', accessor: '11', Cell: row => {

                return (
                    <ul className="table-controls">

                        <button className="border-0 bg-transparent non-hover edit-btn" data-toggle="tooltip" data-placement="top" title="ویرایش"
                            onClick={e => editHandler(row.row.original.id)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                strokeLinejoin="round"
                                className="feather feather-edit-2">
                                <path
                                    d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                            </svg>
                        </button>


                        <button onClick={() => openModal(row.row.original.id)} className="border-0 bg-transparent non-hover edit-btn" data-toggle="tooltip" data-placement="top" title="حذف">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
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
        }
    ])
    const data = useMemo(() => shippingCompany);
    const handelSearchFieldClear = async () => {

        setName('')
        setCode('')
      sessionStorage.clear()
        setGeData(true)

    }
    if (shippingCompany) {
        const dataForExcel = data.map(item => ({
            'شناسه': item.id,
            'نام شرکت': item.name,
            'کد': item.code,
            'تاریخ ایجاد': new Date(item.createDate).toLocaleTimeString('fa-IR')
        }))



        return (
            <div
            // className='user-progress'
            >
                <div className='row'>
                    <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12 '>


                    </div>
                </div>
                <div className=" statbox widget-content widget-content-area mb-1 mt-1 p-2 my-1   rounded">
                    <AdvancedSearch>

                        <form className='form-row  form-group textOnInput'>



                            <div className="col-lg-2 col-md-4  col-sm-12    mb-1">

                                <label> نام شرکت</label>

                                <input className="form-control opacityForInput  mb-4" type="text" placeholder="نام شرکت" value={Name} onChange={e => setName(e.target.value)} />
                            </div>

                            <div className="col-lg-2 col-md-4  col-sm-12    mb-1">
                                <label> کد </label>

                                <input className="form-control opacityForInput  mb-4" type="text" placeholder="کد " value={Code} onChange={e => setCode(e.target.value)} />
                            </div>




                        </form>
                        <div className="row float-right ">
                            <div >
                                <button onClick={handelSearchFieldClear} className=" text-center btn-small btn-danger mr-1">حذف فیلتر</button>

                            </div>
                            <div >
                                <button onClick={getDataBySearch} className=" text-center btn-small mr-1 btn-primary">جستجو</button>

                            </div>
                        </div>
                        <br />
                    </AdvancedSearch>
                </div>
                {getDefault().Name || getDefault().Code ? <span className="d-block p-3 text-center w-100 bg-light-primary  " style={{fontSize:"15px"}}>نمایش اطلاعات بر اساس فیلتر  </span>:null}

                <div className=" statbox widget-content widget-content-area">
                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        style={customStyles}
                        contentLabel="Selected Option"
                        ariaHideApp={false}

                    >
                        <div style={{width:'20rem'}}>
                            <div className="d-block clearfix mb-2"   onClick={closeModal}><svg
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


                            <p> آیا مطمئنید  کالا {shippingCompany.filter(item => item.id === id).map(item => item.name)}   </p>
                            <p>حذف شود ؟ </p>




                            <button className="btn btn-danger float-left">حذف
                            </button>

                            {/*<button className="btn btn-success float-right" onClick={closeModal}>خیر</button>*/}
                        </div>
                    </Modal>
                    <div>
                        <button className="btn btn-primary m-3" onClick={formHandler}>تعریف باربری جدید</button>
                        <MyTable columns={columns} data={data} getData={rows => setSelectedRows(rows)} bulkJob={getBulkJob}
                            total={totalCount}
                            setPageSize={setPageSize}
                            PageSize={PageSize}
                            getDataBySearch={getDataByPage}
                            setPageNumber={setPageNumber}
                            PageNumber={PageNumber}
                        />                        <ModalGroupWork open={open} close={close} success={stateSuccess} error={stateError} />

                    </div>
                    <div className="d-flex justify-content-end">
                        <ExportToExcel apiData={dataForExcel} fileName='لیست کالا' />
                    </div>
                </div>
            </div>


        )
    }
    else {
        return (
            <div className='user-progress'>
                <div className='row'>
                    <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>


                    </div>
                </div>
                <div className=" statbox widget-content widget-content-area mb-1 mt-1 p-2 my-1   rounded">
                    <AdvancedSearch>

                        <form className='form-row  form-group textOnInput'>



                            <div className="col-lg-2 col-md-4  col-sm-12    mb-1">

                                <label> نام شرکت</label>

                                <input className="form-control opacityForInput  mb-4" type="text" placeholder="نام شرکت" value={Name} onChange={e => setName(e.target.value)} />
                            </div>

                            <div className="col-lg-2 col-md-4  col-sm-12    mb-1">
                                <label> کد </label>

                                <input className="form-control opacityForInput  mb-4" type="text" placeholder="کد " value={Code} onChange={e => setCode(e.target.value)} />
                            </div>




                        </form>
                        <div className="row float-right ">
                            <div >
                                <button onClick={handelSearchFieldClear} className=" text-center btn-small btn-danger mr-1">حذف فیلتر</button>

                            </div>
                            <div >
                                <button onClick={getDataBySearch} className=" text-center btn-small mr-1 btn-primary">جستجو</button>

                            </div>
                        </div>
                        <br />
                    </AdvancedSearch>
                </div>
                {getDefault().Name || getDefault().Code ? <span className="d-block p-3 text-center w-100 bg-light-primary  " style={{fontSize:"15px"}}>نمایش اطلاعات بر اساس فیلتر  </span>:null}

                <div className=" statbox widget-content widget-content-area">
                    <div>
                        <button className="btn btn-primary m-3" onClick={formHandler}>تعریف باربری جدید</button>


                        <div className='text-center mt-5'>
                            <h5>اطلاعاتی جهت نمایش موجود نیست</h5>
                        </div>


                    </div>
                </div>


            </div>
        )
    }

}
export default ShoppingCompanyList