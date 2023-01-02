import { useNavigate } from "react-router-dom";
import { CSVLink } from 'react-csv';
import { useEffect, useState } from "react";
import { useTable } from "react-table";
import { DeleteProduct, GetAllProducts, SetProduct } from '../../../services/productService';
import { useMemo } from "react";
import MyTable from "../../../components/form/MyTable";

import { toast } from "react-toastify";
import Modal from "react-modal";
import { ExportToExcel } from "../../../components/common/ExportToExcel";
import { GetGroupsForEntity } from './../../../services/GroupService';
import ModalGroupWork from "../../../components/common/ModalGroupWork";
import AdvancedSearch from './../../../components/common/AdvancedSearch';
import Select from 'react-select';
import { GetProductsWithSearch } from './../../../services/productService';
import QueryString from "qs";





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
const ProductList = () => {
    const [PageNumber, setPageNumber] = useState( getPage().PageNumber?getPage().PageNumber:0)
    const [PageSize, setPageSize] = useState(getPage().PageSize?getPage().PageSize:10)

    const [totalCount, setTotalCount] = useState(0);
    const [product, setProduct] = useState([]);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [id, setId] = useState(0)
    const [selectedRows, setSelectedRows] = useState([])
    const [stateSuccess, SetStateSuccess] = useState(0)
    const [stateError, SetStateError] = useState(0)
    const [productG, setProductG] = useState([])
    const [groupIds, SetGroupId] = useState(getDefault().groupIds)
    const [Name, setName] = useState(getDefault().Name)
    const [EnglishName, setEnglishName] = useState(getDefault().EnglishName)
    const [isclearable, setIscreable] = useState(true)
    const [getData, setGeData] = useState(false)


    const [open, SetOpen] = useState(false);
    const param = { PageSize , PageNumber}

    function getPage() {
        let items = JSON.parse(sessionStorage.getItem('param'));
        return items? items:''


    }
    const params = { Name, EnglishName, groupIds}
    function getDefault() {
        let items = JSON.parse(sessionStorage.getItem('params'));
        return items? items:''


    }
    const close = () => {
        SetOpen(false);
    }
    let arrayOfSelectedData = [];
    const getSelectedData = (data) => {

        arrayOfSelectedData = data.map(item => item.original);


        return (arrayOfSelectedData)

    }

    const GetProductGroup = async () => {
        const { data, status } = await GetGroupsForEntity(2);
        if (status === 200) {


            setProductG(data.result.groups);


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
        const arrayOfData = getSelectedData(selectedRows);
        let successCount = 0;
        let errorCount = 0;
        for (let i = 0; i < arrayOfData.length; i++) {

            try {
                const { data, status } = await DeleteProduct(arrayOfData[i].id)
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
    const copySelectedItem = async () => {
        const arrayOfData = getSelectedData(selectedRows);
        const copyData = arrayOfData.map(item => { return { ...item, id: 0, active: true, createDate: new Date() } })

        let successCount = 0;
        let errorCount = 0;
        for (let i = 0; i < copyData.length; i++) {


            try {


                const { data, status } = await SetProduct(copyData[i])
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


                const { data, status } = await SetProduct(copyData[i])
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
                    'product': copyData[i]
                }

                const { data, status } = await SetProduct(copyData[i])
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

        return (productG.map(item => ({ label: item.name, value: item.id })))

    }
    const groups = getGroupForCompbo();
    const getDataBySearch = async () => {

        let config = {

            headers: { 'Content-Type': 'application/json' },

            params: {
                Name:params.Name,
                EnglishName:params.EnglishName,
                GroupIds: params.groupIds ? params.groupIds.map(item => item.value) : [],
                isAdmin: true,
                active: false,
                PageNumber:0,
                PageSize,

            },
            paramsSerializer: params => {

                return QueryString.stringify(params)
            }


        };

        try {
            const { data, status } = await GetProductsWithSearch(config)
            if (status === 200) {

                setProduct(data.result.products.values)
                setTotalCount(data.result.products.totalCount)
                sessionStorage.setItem('params', JSON.stringify(params));
                sessionStorage.setItem('param', JSON.stringify(param));

            }
        } catch (error) {
            console.log(error);
        }
    }
    const getDataByPageNumber = async () => {

        let config = {

            headers: { 'Content-Type': 'application/json' },

            params: {
                isAdmin: true,
                active: false,
                Name:Name,
                EnglishName:EnglishName,
                GroupIds: groupIds ? groupIds.map(item => item.value) : [],
                PageNumber,
                PageSize,
            },
            paramsSerializer: params => {

                return QueryString.stringify(params)
            }


        };

        try {
            const { data, status } = await GetProductsWithSearch(config)
            if (status === 200) {

                setProduct(data.result.products.values)
                sessionStorage.setItem('param', JSON.stringify(param));

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
    const getProducts = async () => {
        if (getData){
            sessionStorage.clear()

        }
        let config = {

            headers: { 'Content-Type': 'application/json' },

            params: {
                Name,
               EnglishName,
                GroupIds: groupIds ? groupIds.map(item => item.value) : [],
                isAdmin: true,
                active: false,
                PageNumber,
                PageSize,

            },
            paramsSerializer: params => {

                return QueryString.stringify(params)
            }


        };

        try {
            const { data, status } = await GetProductsWithSearch(config)
            if (status === 200) {
setGeData(false)
                setProduct(data.result.products.values)
                setTotalCount(data.result.products.totalCount)

            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {

        getProducts();

        GetProductGroup();
    }, [getData])

    const editHandler = (id) => {
        navigate(`/editproduct/${id}`)
    }

    const deletHandler = async () => {
        try {
            const { data, status } = await DeleteProduct(id)
            if (data.result.success === true) {
                toast.success("کالا با موفقیت حذف شد", {
                    position: "top-right",
                    closeOnClick: true
                });
                setIsOpen(false)
                getProducts()
            } if (data.result.success === false) {

                toast.error("این کالا به یک یا چند عرضه اختصاص داده شده است", {
                    position: "top-right",
                    closeOnClick: true
                });
            }
        } catch (err) {
            console.log(err)
        }
    }
    const navigate = useNavigate()
    const formHandler = () => {
        navigate("/newproduct")
    }

    var formatter = new Intl.NumberFormat('fa-IR', {
        style: 'currency',
        currency: 'IRR', maximumFractionDigits: 0, 
        minimumFractionDigits: 0, 


    });
    const columns = useMemo(() => [
        { Header: '#', accessor: 'id' },
        { Header: 'نام', accessor: 'name' }
        , { Header: 'کد بازارگاه', accessor: 'englishName' }
        , {
            Header: 'گروه کالا', accessor: ' ', Cell: row => {



                if (!row.row.original.groupId) {
                    return ('تعیین نشده')
                }
                else {
                    return (productG.filter(item => item.id === row.row.original.groupId).map(item => item.name))
                }

            }
        }
        ,
        {
            Header: 'فعال', accessor: '', isVisible: true,
            disableFilters: true, Cell: row => {
                const [active, setActive] = useState(row.row.original.active)
                const id = row.row.original.id
                const name = row.row.original.name
                const englishName = row.row.original.englishName
                const price = row.row.original.price
                const maxSellableAmount = row.row.original.maxSellableAmount
                const minSellableAmount = row.row.original.minSellableAmount
                const activeChang = {
                    id,
                    active: !active,
                    name,
                    englishName,
                    price,
                    maxSellableAmount,
                    minSellableAmount
                }

                const activeHandler = async (e) => {
                    setActive(!active)

                    try {
                        const { data, status } = await SetProduct(activeChang)

                    } catch (err) {
                        console.log(err)
                    }


                }
                if (active === true) {
                    return (
                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                            className="feather feather-check  " onClick={activeHandler} style={{ color: 'green' }}>
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>)
                } else {
                    return (<svg xmlns="http://www.w3.org/2000/svg" data-dismiss="alert" width="21" height="21"
                        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        className="feather feather-x  danger " onClick={activeHandler} style={{ color: 'red' }}>
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>)
                }




            }
        },
        {
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
        }])
    const data = useMemo(() => product);
    const handelSearchFieldClear = () => {
        setGeData(true)
getProducts()
        setPageNumber(0)
        setName('')
        setEnglishName('')
        SetGroupId([])
        sessionStorage.clear();




    }
    if (product) {

        const dataForExcel = data.map(item => ({
            'شناسه': item.id,
            'نام کالا': item.name,
            'قیمت': item.price,
            'نام انگلیسی': item.englishName
        }))

        return (
            <div className='user-progress'>
                <div className='row'>
                    <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12 '>


                    </div>
                </div>
                <div className=" statbox widget-content widget-content-area mb-1 mt-1 p-2 my-1 ">
                    <AdvancedSearch>

                        <form className='form-row  form-group textOnInput'>



                            <div className="col-lg-4 col-md-4  col-sm-12    mb-1">

                                <label> نام کالا</label>

                                <input className="form-control opacityForInput  mb-4" type="text" placeholder="نام فارسی" value={Name} onChange={e => setName(e.target.value)} />
                            </div>

                            <div className="col-lg-4 col-sm-12 col-md-4  mb-1">
                                <label> کد بازارگاه</label>

                                <input className="form-control opacityForInput  mb-4" type="text" placeholder="کد بازارگاه" value={EnglishName} onChange={e => setEnglishName(e.target.value)} />
                            </div>

                            <div className="col-lg-4 col-md-4 col-sm-12  textOnInput form-group " style={{marginBottom:"3rem"}}>
                                <div className=" form-control-sm">
                                    <label>گروه کالا </label>

                                    <Select
                                        value={groupIds}
                                        placeholder='گروه کالا'
                                        options={groups}
                                        isMulti

                                        isClearable={true}
                                        onChange={e => {

                                            SetGroupId(e)

                                        }}
                                    />
                                </div>
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
                            </div></div>
                        </div>
                        <br />
                    </AdvancedSearch>
                </div>
                {getDefault().Name || getDefault().EnglishName || getDefault().groupIds   ? <span className="d-block p-3 text-center w-100 bg-light-primary  " style={{fontSize:"15px"}}>نمایش اطلاعات بر اساس فیلتر  </span>:null}

                <div className=" statbox widget-content widget-content-area">
                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        style={customStyles}
                        contentLabel="Selected Option"
                        ariaHideApp={false}

                    >
                        <>
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


                            <p> آیا مطمئنید  کالا {product.filter(item => item.id === id).map(item => item.name)}   </p>
                            <p>حذف شود ؟ </p>




                            <button className="btn btn-danger float-left" onClick={deletHandler}>حذف
                            </button>

                            {/*<button className="btn btn-success float-right" onClick={closeModal}>خیر</button>*/}
                        </>
                    </Modal>
                    <div>
                        <button className="btn btn-primary m-3" onClick={formHandler}>تعریف کالا جدید</button>
                        <MyTable setPageNumber={setPageNumber} getDataBySearch={getDataByPageNumber} PageSize={PageSize} setPageSize={setPageSize} total={totalCount} PageNumber={PageNumber} columns={columns} data={data} getData={rows => setSelectedRows(rows)} bulkJob={getBulkJob} />
                        <ModalGroupWork open={open} close={close} success={stateSuccess} error={stateError} />

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
                    <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12 '>


                    </div>
                </div>
                <div className=" statbox widget-content widget-content-area mb-1 mt-1 p-2 my-1 ">
                    <AdvancedSearch>

                        <form className='form-row  form-group textOnInput'>



                            <div className="col-lg-4 col-md-4  col-sm-12  mb-1">

                                <label> نام کالا</label>

                                <input className="form-control opacityForInput  mb-4" type="text" placeholder="نام فارسی" value={Name} onChange={e => setName(e.target.value)} />
                            </div>

                            <div className="col-lg-4 col-md-4  col-sm-12  mb-1">
                                <label> کد بازارگاه</label>

                                <input className="form-control opacityForInput  mb-4" type="text" placeholder="کد بازارگاه" value={EnglishName} onChange={e => setEnglishName(e.target.value)} />
                            </div>

                            <div className="col-lg-4 col-md-4  col-sm-12    textOnInput form-group " style={{marginBottom:"3rem"}}>
                                <div className=" form-control-sm">
                                    <label>گروه کالا </label>

                                    <Select

                                        placeholder='گروه کالا'
                                        options={groups}
                                        isMulti

                                        isClearable={true}
                                        onChange={e => {

                                            SetGroupId(e)

                                        }}
                                    />
                                </div>
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
                        </div></div>
                        <br />

                    </AdvancedSearch>
                </div>
                {getDefault().Name || getDefault().EnglishName || getDefault().groupIds  ? <span className="d-block p-3 text-center w-100 bg-light-primary  " style={{fontSize:"15px"}}>نمایش اطلاعات بر اساس فیلتر  </span>:null}

                <div className=" statbox widget-content widget-content-area">
                    <div>
                        <button className="btn btn-primary m-3" onClick={formHandler}>تعریف کالا جدید</button>

                        <div className='text-center mt-5'>
                            <h5>اطلاعاتی جهت نمایش موجود نیست</h5>
                        </div>


                    </div>
                </div>


            </div>
        )
    }
}
export default ProductList