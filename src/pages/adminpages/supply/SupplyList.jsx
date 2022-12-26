import React, { useState, useEffect, useMemo } from 'react'
import {
    DeleteSupply, GetAllSuppliers,
    GetAllSupplies,
    GetDataWithSearchSupply,
    GetSupplier,
    SetSupply
} from '../../../services/supplyService';
import { useNavigate } from 'react-router-dom';
import { SupplyTypesEnums } from '../../../Enums/SupplyTypesEnums';
import Modal from 'react-modal';
import MyTable from '../../../components/form/MyTable';


import { DeleteProduct, GetAllProducts, getEditProduct, SetProduct } from "../../../services/productService";
import { toast } from "react-toastify";
import { GetAllWareHouses } from "../../../services/wareHouseService";
import { MeasureUnitSample } from "../../../Enums/MeasureUnitSample";
import ModalGroupWork from "../../../components/common/ModalGroupWork";
import AdvancedSearch from "../../../components/common/AdvancedSearch";
import Select from "react-select";
import { GetDataWithSearchOrder } from "../../../services/orderService";
import { ShippingStatusEnums } from "../../../Enums/ShippingStatusEnums";
import QueryString from 'qs';


const SupplyList = () => {
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
    const navigate = useNavigate()
    const [PageNumber, setPageNumber] = useState( getPage().PageNumber?getPage().PageNumber:0)
    const [PageSize, setPageSize] = useState(getPage().PageSize?getPage().PageSize:10)

    const [totalCount, setTotalCount] = useState(0);
    const [supplies, setSupplies] = useState([]);
    const [wareHouses, SetWareHouse] = useState([]);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [id, setId] = useState(0);
    const [selectedRows, setSelectedRows] = useState([])
    const [stateSuccess, SetStateSuccess] = useState(0)
    const [stateError, SetStateError] = useState(0)
    const [supplyTypeIds, SetSupplyTypeIds] = useState(getDefault().supplyTypeIds);
    const [supplierId, SetSupplierId] = useState(getDefault().supplierId);
    const [shippingStatusIds, SetShippingStatusIds] = useState(getDefault().shippingStatusIds);
    const [productId, SetProductId] = useState(getDefault().productId);
    const [wareHouseId, SetWareHouseId] = useState(getDefault().wareHouseId);
    const [contractNumber, SetContractNumber] = useState(getDefault().contractNumber);
    const [products, SetProducts] = useState([]);
    const [getData, setGeData] = useState(false)

    const [suppliers, setSuppliers] = useState([])

    const [open, SetOpen] = useState(false);
    const param = { PageSize , PageNumber}

    function getPage() {
        let items = JSON.parse(sessionStorage.getItem('param'));
        return items? items:''


    }
    const params = { supplierId, supplyTypeIds, shippingStatusIds, productId, wareHouseId, contractNumber}
    function getDefault() {
        let items = JSON.parse(sessionStorage.getItem('params'));
        return items? items:''


    }
    var formatter = new Intl.NumberFormat('fa-IR', {
        maximumFractionDigits: 0,
        minimumFractionDigits: 0,
    });
    const close = () => {
        SetOpen(false);
    }
    const getProducts = async () => {
        try {
            const { data, status } = await GetAllProducts();

            SetProducts(data.result.products.values)

        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getProducts();
    }, [])
    let arrayOfSelectedData = [];
    const getSelectedData = (data) => {

        arrayOfSelectedData = data.map(item => item.original);


        return (arrayOfSelectedData)

    }
    const getBulkJob = (selected) => {
        if (selected === 2) {
            enableSelectedItem()
        }
        if (selected === 3) {
            copySelectedItem()
        }
        if (selected === 4) {
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
                const { data, status } = await DeleteSupply(arrayOfData[i].id)
                if (data.result.success === true) {
                    SetOpen(true)
                    SetStateSuccess(successCount += 1)
                }
                if (data.result.success === false) {
                    SetOpen(true)

                    SetStateError(errorCount += 1)
                }


            } catch (error) {
                SetOpen(true)

                SetStateError(errorCount += 1)
            }


        }

    }
    const copySelectedItem = async () => {
        const arrayOfData = getSelectedData(selectedRows);
        const copyData = arrayOfData.map(item => {
            return { ...item, id: 0, active: true, createDate: new Date() }
        })

        let successCount = 0;
        let errorCount = 0;
        for (let i = 0; i < copyData.length; i++) {


            try {
                let payload = {
                    'supply': copyData[i]
                }
                const { data, status } = await SetSupply(payload)
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
        const copyData = arrayOfData.map(item => {
            return { ...item, active: true }
        })

        let successCount = 0;
        let errorCount = 0;
        for (let i = 0; i < copyData.length; i++) {


            try {
                let payload = {
                    'supply': copyData[i]
                }

                const { data, status } = await SetSupply(payload)
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
        const copyData = arrayOfData.map(item => {
            return { ...item, active: false }
        })

        let successCount = 0;
        let errorCount = 0;
        for (let i = 0; i < copyData.length; i++) {


            try {

                let payload = {
                    'supply': copyData[i]
                }

                const { data, status } = await SetSupply(payload)
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
    const shippingId = () => {
        return (ShippingStatusEnums.map(data => ({ label: data.name, value: data.id })))
    }
    const SupplyTypes = () => {
        return (SupplyTypesEnums.map(data => ({ label: data.name, value: data.id })));
    }
    const inputProductG = () => {
        if(products){
        return (products.map(data => ({ label: data.name, value: data.id })))}
        else{
            return null
        }
    }
    const WareHouseG = () => {
        return (wareHouses.map(data => ({ label: data.name, value: data.id })))
    }

    const deletHandler = async () => {
        try {
            const { data, status } = await DeleteSupply(id)
            if (data.result.success === true) {
                toast.success("تامین با موفقیت حذف شد", {
                    position: "top-right",
                    closeOnClick: true
                });
                setIsOpen(false)
                getSupplies()
            }
            if (data.result.success === false) {

                toast.error("این تامین کننده به یک یا چند تامین اختصاص داده شده است", {
                    position: "top-right",
                    closeOnClick: true
                });
            }
        } catch (err) {
            console.log(err)
        }
    }

    const formHandler = () => {
        navigate("/newsupply")
    }


    const openModal = (id) => {
        setIsOpen(true);
        setId(id)

    }
    const closeModal = () => {
        setIsOpen(false);
    }
    const getSupplies = async () => {
        if (getData){
            sessionStorage.clear()

        }

        let config = {

            headers: { 'Content-Type': 'application/json' },
            params: {
                SupplierId: supplierId,
                SupplyTypeIds: supplyTypeIds ?supplyTypeIds.map(item => item.value) : [],
                ShippingStatusIds: shippingStatusIds ?shippingStatusIds.map(item => item.value) : [],
                ProductId:productId,
                WareHouseId: wareHouseId,
                ContractNumber: contractNumber,
              PageNumber,
                PageSize


            }
            ,
            paramsSerializer: params => {

                return QueryString.stringify(params)
            }

        };

        try {
            const { data, status } = await GetDataWithSearchSupply(config);
            if (status === 200) {
                setGeData(false)
                setSupplies(data.result.supplies.values);
                setTotalCount(data.result.supplies.totalCount)
            }

        } catch (err) {
            console.log(err)
        }

    }
    const getDataBySearch = async () => {
        let config = {

            headers: { 'Content-Type': 'application/json' },
            params: {
                SupplierId:supplierId,
                SupplyTypeIds: supplyTypeIds ? supplyTypeIds.map(item => item.value) : [],
                ShippingStatusIds: shippingStatusIds ? shippingStatusIds.map(item => item.value) : [],
                ProductId: params.productId,
                WareHouseId: params.wareHouseId,
                ContractNumber: params.contractNumber,
                PageNumber: 0,
                PageSize


            }
            ,
            paramsSerializer: params => {

                return QueryString.stringify(params)
            }

        };

        try {
            const { data, status } = await GetDataWithSearchSupply(config);
            if (status === 200) {

                setSupplies(data.result.supplies.values);
                setTotalCount(data.result.supplies.totalCount)
                sessionStorage.setItem('params', JSON.stringify(params));
                sessionStorage.setItem('param', JSON.stringify(param));
            }

        } catch (err) {
            console.log(err)
        }

    }
    const getDataByPage = async () => {
        let config = {

            headers: { 'Content-Type': 'application/json' },
            params: {
                SupplierId: params.supplierId,
                SupplyTypeIds: params.supplyTypeIds ? params.supplyTypeIds.map(item => item.value) : [],
                ShippingStatusIds: params.shippingStatusIds ? params.shippingStatusIds.map(item => item.value) : [],
                ProductId: params.productId,
                WareHouseId: params.wareHouseId,
                ContractNumber: params.contractNumber,

                PageNumber,
                PageSize


            }
            ,
            paramsSerializer: params => {

                return QueryString.stringify(params)
            }

        };

        try {
            const { data, status } = await GetDataWithSearchSupply(config);
            if (status === 200) {
                setSupplies(data.result.supplies.values);
                sessionStorage.setItem('param', JSON.stringify(param));

            }

        } catch (err) {
            console.log(err)
        }

    }
    const getSupplier = async () => {
        try {
            const { data, status } = await GetAllSuppliers();
            if (status === 200) {
                setSuppliers(data.result.suppliers.values)

            }
        } catch (error) {
            console.log(error);
        }
    }
    const getWareHouse = async () => {
        try {

            const { data, status } = await GetAllWareHouses();
            if (status === 200) {
                SetWareHouse(data.result.wareHouses)
            }

        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {


        getSupplies();
        getWareHouse();

        getSupplier()
    }, [getData])
    const SupplierG = () => {
        if(suppliers){
        return (suppliers.map(data => ({ label: data.name, value: data.id })))}
        else{
            return null
        }
    }

    const editHandler = (id) => {
        navigate(`/editsupply/${id}`)
    }

    const columns = useMemo(() => [

        { Header: 'شناسه', accessor: 'id' },
        { Header: 'قراداد', accessor: 'contractNumber' },
        {
            Header: 'نام کالا', accessor: 'product.name', Cell: row => {
                const [product, setProduct] = useState('')
                const getProduct = async () => {
                    try {
                        const { data, status } = await getEditProduct(row.row.original.productId)
                        setProduct(data.result.product.name)
                    } catch (err) {
                        console.log(err)
                    }
                }
                useEffect(() => {
                    getProduct()
                }, [])

                return product
            }
        },

        {
            Header: 'مقدار', accessor: 'quantity' , Cell:row => formatter.format(row.row.original.quantity)
        }, {
            Header: 'واحد', accessor: 'Mesures', Cell: row => {

                return (MeasureUnitSample.filter(item => item.id === row.row.original.measureUnitId).map(item => item.name))
            }
        }
        ,

        {
            Header: 'انبار', accessor: 'wareHouse', Cell: row => {
                return (wareHouses.filter(item => item.id === row.row.original.wareHouseId).map(item => item.name))
            }
        }, {
            Header: 'تامین کننده', accessor: 'supplier.name', Cell: row => {
                const [supplier, setSupplier] = useState('')
                const getSupplier = async () => {
                    try {
                        const { data, status } = await GetSupplier(row.row.original.supplierId)
                        setSupplier(data.result.supplier.name)
                    } catch (err) {
                        console.log(err)
                    }
                }
                useEffect(() => {
                    getSupplier()
                }, [])

                return supplier
            }
        },
        {
            Header: 'نوع تامین', accessor: 'taminType', Cell: row => {

                return (SupplyTypesEnums.filter(item => item.id === row.row.original.supplyTypeId).map(item => item.name))

            }
        },
        {
            Header: 'کد  کوتاژ', accessor: 'cottageCode'
        },
        {
            Header: 'توضیحات', accessor: 'comment', Cell: row => {

                return (<span title={row.row.original.comment}>{row.row.original.comment.substring(0, 50) + '...'}</span>)
            }
        },
        {
            Header: 'عملیات', accessor: '11', Cell: row => {

                return (
                    <ul className="table-controls">

                        <button className="border-0 bg-transparent non-hover edit-btn" data-toggle="tooltip"
                            data-placement="top" title="ویرایش"
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


                        <button onClick={() => openModal(row.row.original.id)}
                            className="border-0 bg-transparent non-hover edit-btn" data-toggle="tooltip"
                            data-placement="top" title="حذف">
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
    const data = useMemo(() => supplies)
    const handelSearchFieldClear =async () => {
setGeData(true)
        getSupplies()
        SetContractNumber('')
        SetProductId('')
        SetSupplierId('')
        SetSupplyTypeIds([])
        SetShippingStatusIds([])
        SetWareHouseId('')

        sessionStorage.clear()

    }
    if (supplies) {
        const dataForExcel = data.map(item => ({
            'شناسه': item.id,
            'نام تامین کننده': item.name
        }))
        return (
            <div className='user-progress'>
                <div className='row'>
                    <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12 '>


                    </div>
                </div>
                <div className=" statbox widget-content widget-content-area mb-1 mt-1 p-2 my-1 ">
                    <AdvancedSearch>

                        <form className='form-row textOnInput'>


                            <div className="col-lg-2 col-md-4  col-sm-12    mb-1">
                                <label> شماره قرارداد</label>

                                <input className="form-control opacityForInput  mb-4" type="text" placeholder="شماره قرارداد"
                                    value={contractNumber} onChange={e => SetContractNumber(e.target.value)} />
                            </div>

                            <div className="col-lg-2 col-md-4  col-sm-12      textOnInput form-group selectIndex" style={{marginBottom:"3rem"}}>
                                <div className=" form-control-sm">
                                    <label>محصول</label>

                                    <Select
defaultValue={products.filter(i=> i.id === productId).map(data => ({ label: data.name, value: data.id }))[0]}

                                        placeholder='محصول'
                                        options={inputProductG()}

                                        onChange={e => {
                                            SetProductId(e.value)
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-4  col-sm-12      textOnInput form-group selectIndex" style={{marginBottom:"3rem"}}>
                                <div className=" form-control-sm">
                                    <label>تامین کننده</label>

                                    <Select
defaultValue={params.supplierId}

                                        placeholder='تامین کننده'
                                        options={SupplierG()}

                                        onChange={e => {
                                            SetSupplierId(e.value)
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-4  col-sm-12      textOnInput form-group selectIndex" style={{marginBottom:"3rem"}}>
                                <div className=" form-control-sm">
                                    <label>نوع تامین</label>

                                    <Select
                                        defaultValue={params.supplyTypeIds}

                                        placeholder='نوع تامین '
                                        options={SupplyTypes()}
                                        isMulti

                                        isClearable={true}
                                        onChange={e => {

                                            SetSupplyTypeIds(e)

                                        }}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-4  col-sm-12      textOnInput form-group selectIndex" style={{marginBottom:"3rem"}}>
                                <div className=" form-control-sm">
                                    <label>وضعیت ارسال </label>

                                    <Select
                                        defaultValue={params.shippingStatusIds}

                                        placeholder='وضعیت ارسال'
                                        options={shippingId()}
                                        isMulti

                                        isClearable={true}
                                        onChange={e => {

                                            SetShippingStatusIds(e)

                                        }}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-4  col-sm-12      textOnInput form-group " style={{marginBottom:"3rem"}}>
                                <div className=" form-control-sm">
                                    <label>انبار </label>

                                    <Select
defaultValue={params.wareHouseId}
                                        isClearable={true}
                                        placeholder='انبار'
                                        options={WareHouseG()}

                                        onChange={e => {

                                            SetWareHouseId(e.value)

                                        }}
                                    />
                                </div>
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
                    </AdvancedSearch>
                </div>
                { getDefault().shippingStatusIds||getDefault().wareHouseId||getDefault().contractNumber || getDefault().productId||getDefault().supplierId || getDefault().supplyTypeIds ? <span className="d-block p-3 text-center w-100 bg-light-primary  " style={{fontSize:"15px"}}>نمایش اطلاعات بر اساس فیلتر  </span>:null}

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
                            <p> آیا مطمئنید تامین {supplies.filter(item => item.id === id).map(item => item.name)}   </p>
                            <p>حذف شود ؟ </p>


                            <button className="btn btn-danger float-left" onClick={deletHandler}>حذف
                            </button>

                            {/*<button className="btn btn-success float-right" onClick={closeModal}>خیر</button>*/}
                        </div>
                    </Modal>
                    <div>
                        <button className="btn btn-primary m-3" onClick={formHandler}>تعریف تامین جدید</button>
                        <MyTable columns={columns} data={data} getData={rows => setSelectedRows(rows)} bulkJob={getBulkJob}
                            total={totalCount}
                            setPageSize={setPageSize}
                            PageSize={PageSize}
                            getDataBySearch={getDataByPage}
                            setPageNumber={setPageNumber}
                            PageNumber={PageNumber}
                        />

                        <ModalGroupWork open={open} close={close} success={stateSuccess} error={stateError} />

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
                    <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12 p-3 m-2'>


                    </div>
                </div>
                <div className=" statbox widget-content widget-content-area mb-1 mt-1 p-2 my-1 ">
                    <AdvancedSearch>

                        <form className='form-row textOnInput'>


                            <div className="col-lg-2 col-md-4  col-sm-12    mb-1">
                                <label> شماره قرارداد</label>

                                <input className="form-control opacityForInput  mb-4" type="text" placeholder="شماره قرارداد"
                                    value={contractNumber} onChange={e => SetContractNumber(e.target.value)} />
                            </div>

                            <div className="col-lg-2 col-md-4  col-sm-12    mb-1  textOnInput form-group selectIndex" style={{marginBottom:"3rem"}}>
                                <div className=" form-control-sm">
                                    <label>محصول</label>

                                    <Select

                                        defaultValue={products?products.filter(i=> i.id === productId).map(data => ({ label: data.name, value: data.id }))[0]:""}
                                        placeholder='محصول'
                                        options={inputProductG()}

                                        onChange={e => {
                                            SetProductId(e.value)
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-4  col-sm-12    mb-1  textOnInput form-group selectIndex " style={{marginBottom:"3rem"}}>
                                <div className=" form-control-sm">
                                    <label>تامین کننده</label>

                                    <Select

defaultValue={params.supplierId}
                                        placeholder='تامین کننده'
                                        options={SupplierG()}

                                        onChange={e => {
                                            SetSupplierId(e.value)
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-4  col-sm-12    mb-1  textOnInput form-group selectIndex" style={{marginBottom:"3rem"}} >
                                <div className=" form-control-sm">
                                    <label>نوع تامین</label>

                                    <Select
                                        defaultValue={params.supplyTypeIds}

                                        placeholder='نوع تامین '
                                        options={SupplyTypes()}
                                        isMulti

                                        isClearable={true}
                                        onChange={e => {

                                            SetSupplyTypeIds(e)

                                        }}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-4  col-sm-12    mb-1  textOnInput form-group selectIndex" style={{marginBottom:"3rem"}}>
                                <div className=" form-control-sm">
                                    <label>وضعیت ارسال </label>

                                    <Select
                                        defaultValue={params.shippingStatusIds}

                                        placeholder='وضعیت ارسال'
                                        options={shippingId()}
                                        isMulti

                                        isClearable={true}
                                        onChange={e => {

                                            SetShippingStatusIds(e)

                                        }}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-4  col-sm-12    mb-1  textOnInput form-group " style={{marginBottom:"3rem"}}>
                                <div className=" form-control-sm">
                                    <label>انبار </label>

                                    <Select
defaultValue={params.wareHouseId}
                                        isClearable={true}
                                        placeholder='انبار'
                                        options={WareHouseG()}

                                        onChange={e => {

                                            SetWareHouseId(e.value)

                                        }}
                                    />
                                </div>
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
                    </AdvancedSearch>
                </div>
                {getDefault().shippingStatusIds||getDefault().wareHouseId||getDefault().contractNumber || getDefault().productId||getDefault().supplierId || getDefault().supplyTypeIds ? <span className="d-block p-3 text-center w-100 bg-light-primary  " style={{fontSize:"15px"}}>نمایش اطلاعات بر اساس فیلتر  </span>:null}

                <div className=" statbox widget-content widget-content-area">
                    <div>
                        <button className="btn btn-primary m-3" onClick={formHandler}>تعریف تامین جدید</button>



                        <div className='text-center mt-5'>
                            <h5>اطلاعاتی جهت نمایش موجود نیست</h5>
                        </div>




                    </div>
                </div>


            </div>
        )
    }


}

export default SupplyList