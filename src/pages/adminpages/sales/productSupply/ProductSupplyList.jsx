import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    DeleteProductSupply,
    GetAllProductSupplyForAdmin,
    GetAllProductWithSearch,
    SetProductSupply
} from './../../../../services/productSupplyService';
import MyTable from './../../../../components/form/MyTable';
import { MeasureUnitSample } from "../../../../Enums/MeasureUnitSample";
import { ExportToExcel } from "../../../../components/common/ExportToExcel";
import Modal from "react-modal";
import { toast } from "react-toastify";
import ModalGroupWork from "../../../../components/common/ModalGroupWork";
import React from "react";
import AdvancedSearch from './../../../../components/common/AdvancedSearch';
import { PaymentStructureEnums } from "../../../../Enums/PaymentStructureEnums";
import  Select  from 'react-select';
import DatePicker, { DateObject } from 'react-multi-date-picker';
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import { GetProducts } from './../../../../services/productService';

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

const ProductSupply = () => {
    const [PageNumber, setPageNumber] = useState( getPage().PageNumber?getPage().PageNumber:0)
    const [PageSize, setPageSize] = useState(getPage().PageSize?getPage().PageSize:10)

    const [totalCount , setTotalCount]=useState(0) ;
    const [productSupply, setProductSupply] = useState([]);
    const[ProductId,setProducId]=useState(getDefault().ProductId);
    const[products,setProduct]=useState([])
    const [modalIsOpen, setIsOpen] = useState(false);
    const[bulkStatusModal,SetBulkStatusModal]=useState(false)
    const [id, setId] = useState(0)
    const [stateSuccess , SetStateSuccess ] = useState('')
    const [stateError , SetStateError ] = useState('')
    const[open,SetOpen]=useState(false);
    const [CreateDate, setCreateDate] = useState(getDefault().CreateDate)
    const[CottageCode,setCottageCode]=useState(getDefault().CottageCode);
    const [getData, setGeData] = useState(false)
    const param = { PageSize , PageNumber}

    function getPage() {
        let items = JSON.parse(sessionStorage.getItem(`param${window.location.pathname}`));
        return items? items:''


    }
    const params = { CreateDate, CottageCode, ProductId}
    function getDefault() {
        let items = JSON.parse(sessionStorage.getItem(`params${window.location.pathname}`));
        return items? items:''


    }
    const getDataBySearch = async () => {
        let config = {

            headers: { 'Content-Type': 'application/json' },
            params: {
                CreateDate,
                CottageCode,
                ProductId,
                PageNumber:0,
                PageSize,
                IsAdmin: true,
                Active: false


            }
        };
        const { data, status } = await GetAllProductWithSearch(config);
        setProductSupply(data.result.productSupplies.values)
        setTotalCount(data.result.productSupplies.totalCount)
        setPageNumber(0)
        sessionStorage.setItem(`params${window.location.pathname}`, JSON.stringify(params));
        sessionStorage.setItem(`param${window.location.pathname}`, JSON.stringify(param));

    }
    const getDataByPage=async()=>{
        let config = {
       
            headers: { 'Content-Type': 'application/json' },
            params: {
                CreateDate,
                CottageCode,
                ProductId,
              PageNumber,
              PageSize,
              IsAdmin:true,
              Active:false
             
    
            }
        };
        const {data,status}=await GetAllProductWithSearch(config);
        setProductSupply(data.result.productSupplies.values)
        sessionStorage.setItem(`param${window.location.pathname}`, JSON.stringify(param));

    }
    const getProduct=async()=>{

        try {
            const {data,status}=await GetProducts();
           if (status===200) {
            setProduct(data.result.products.values)
           }
        } catch (error) {
            console.log(error);
        }
        
    }
const productForSelect=()=>{
    if(products){
    return(products.map(data => ({ label: data.name, value: data.id })))
    }
    else{
        return null
    }
}
    const paymentMethod = () => {
        return (PaymentStructureEnums.map(data => ({ label: data.name, value: data.id })))
    }
  
    const close = () => {
        SetOpen(false);
    }
    const [selectedRows, setSelectedRows] = useState([])
    let arrayOfSelectedData = [];

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
                const { data, status } = await DeleteProductSupply(arrayOfData[i].id)
                if(data.result.success ===true){
                    SetOpen(true)

                    SetStateSuccess ( successCount+=1)
                } if(data.result.success ===false){
                    SetOpen(true)

                    SetStateError (errorCount+=1)
                }



            } catch (error) {
                SetOpen(true)

                SetStateError (errorCount+=1)

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

                let payload = {
                    'productSupply': copyData[i],
                    "product": null
                    ,
                    "wareHouse": null
                }
                const { data, status } = await SetProductSupply(payload)
                if (status === 200) {
                    SetOpen(true)

                    SetStateSuccess ( successCount+=1)
                }


            } catch (error) {
                SetOpen(true)

                SetStateError (errorCount+=1)
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
                let payload = {
                    'productSupply': copyData[i],
                    "product": null
                    ,
                    "wareHouse": null
                }
                const { data, status } = await SetProductSupply(payload)
                if (status === 200) {
                    SetOpen(true)

                    SetStateSuccess ( successCount+=1)
                }


            } catch (error) {
                SetOpen(true)

                SetStateError (errorCount+=1)
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
                    'productSupply': copyData[i],
                    "product": null
                    ,
                    "wareHouse": null
                }
                const { data, status } = await SetProductSupply(payload)
                if (status === 200) {
                    SetOpen(true)

                    SetStateSuccess ( successCount+=1)
                }


            } catch (error) {
                SetOpen(true)

                SetStateError (errorCount+=1)
            }


        }


    }

    const getSelectedData = (data) => {

        arrayOfSelectedData = data.map(item => item.original);


        return (arrayOfSelectedData)

    }


    const deletHandler = async () => {
        try {
            const { data, status } = await DeleteProductSupply(id)
            if (data.result.success === true) {
                toast.success("عرضه با موفقیت حذف شد", {
                    position: "top-right",
                    closeOnClick: true
                });
                setIsOpen(false)
                getProductSupply()
            } if (data.result.success === false) {

                toast.error("این عرضه به یک یا چند سفارش اختصاص داده شده است", {
                    position: "top-right",
                    closeOnClick: true
                });
            }
        } catch (err) {
            console.log(err)
        }
    }

    const getProductSupply = async () => {
        if (getData){
            sessionStorage.clear()

        }
        let config = {

            headers: { 'Content-Type': 'application/json' },
            params: {
                CreateDate,
                CottageCode,
                ProductId,
                PageNumber,
                PageSize,
                IsAdmin: true,
                Active: false


            }
        };
        try {
            const {data,status}=await GetAllProductWithSearch(config);
            setGeData(false)
            setProductSupply(data.result.productSupplies.values)
            setTotalCount(data.result.productSupplies.totalCount)

        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {

        getProductSupply();

        getProduct();
    }, [getData])

    const editHandler = (id) => {
        navigate(`/admin/editproductsupply/${id}`)
    }
    const navigate = useNavigate()
    const formHandler = () => {
        navigate("/admin/newProductsupply")
    }
    const openModal = (id) => {
        setIsOpen(true);
        setId(id)
       
    }
    const closeModal = () => {
        setIsOpen(false);
    }

    let formatterForMoney = new Intl.NumberFormat('fa-IR', {
        style: 'currency',
        currency: 'IRR'


    });
    let formater = new Intl.NumberFormat('fa-IR', {


    });
    
    const handleChangeExpire = (value) => {
if (value===null){
setCreateDate('')

}
        //تغییرات روی تاریخ رو اینجا اعمال کنید
        if (value instanceof DateObject) {
            setCreateDate(new Date(value.toDate().setHours(3,30,0,0)))
          

        }
    }
    const columns = useMemo(() => [
        { Header: '#', accessor: 'id' },
        { Header: ' شناسه عرضه', accessor: 'name' },
        { Header: 'محصول', accessor: 'product.name' },
        { Header: 'انبار', accessor: 'wareHouse.wareHouseName' },
        , { Header: 'قیمت', accessor: d=>`${d.price}`, Cell: row => (formater.format(row.row.original.price)) }
        , {
            Header: 'واحد ', accessor:d => {
                let MeasureUnit = MeasureUnitSample.filter(item => item.id === d.product.measureUnitId).map(item => item.name)
                return(`${MeasureUnit}`)
            }, Cell: row => {

                return (MeasureUnitSample.filter(item => item.id === row.row.original.product.measureUnitId).map(item => item.name))
            }
        },
        { Header: 'مقدار عرضه', accessor: '', Cell: row => (formater.format(row.row.original.quantity)) },
        { Header: 'مقدار خریداری شده', accessor: 'orderedQuantity' , Cell: row => (formater.format(row.row.original.orderedQuantity))},
        { Header: 'مقدار مانده', accessor: 'remainedQuantity', Cell: row => (formater.format(row.row.original.remainedQuantity)) },
        { Header: 'شماره کوتاژ', accessor: 'cottageCode' },
        {
            Header: 'تاریخ اعتبار', accessor: 'date', Cell: row => {
                return (new Date(row.row.original.endDate).toLocaleDateString('fa-IR',{year:'numeric',month:'2-digit',day:'2-digit'}))
            }
        },
        {
            Header: 'توضیحات', accessor: 'comment', Cell: row => {
                return(row.row.original.comment.substring(0, 20))
            }
        },
        {
            Header: 'فعال', accessor: '', isVisible: true,
            disableFilters: true, Cell: row => {
                const [active, setActive] = useState(row.row.original.active)
                const id = row.row.original.id

                const activeChang = {
                    productSupply: {
                        id,
                        name:row.row.original.name,
                        productId: row.row.original.productId,
                        productWareHouseId: row.row.original.productWareHouseId,
                        createDate: row.row.original.createDate,
                        endDate: row.row.original.endDate,
                        measureUnitId: row.row.original.measureUnitId,
                        quantity: row.row.original.quantity,
                        active: !active,
                        comment: row.row.original.comment,
                        price: row.row.original.price,
                        minSellableAmount: row.row.original.minSellableAmount,
                        maxSellableAmount: row.row.original.maxSellableAmount,
                        usedAttributes: row.row.original.usedAttributes,
                        paymentMethodId: row.row.original.paymentMethodId,
                        installmentOccureCount: row.row.original.installmentOccureCount,
                        installmentPeriod: row.row.original.installmentPeriod,
                        installmentStartDate: row.row.original.installmentStartDate,
                        cottageCode: row.row.original.cottageCode,
                        product: {
                            id: row.row.original.product.id,
                            name: row.row.original.product.name,
                            englishName: row.row.original.product.englishName,
                            price: row.row.original.product.price,
                            active: row.row.original.product.active,
                            minSellableAmount: row.row.original.product.minSellableAmount,
                            maxSellableAmount: row.row.original.product.maxSellableAmount,
                            measureUnitId: row.row.original.product.measureUnitId,
                            groupId: row.row.original.product.groupId,
                            measureUnit: row.row.original.product.measureUnit
                        },
                        wareHouse:null
                        // wareHouse: {
                           
                        //     wareHouseId: row.row.original.wareHouse.wareHouseId,
                        //     wareHouseName: row.row.original.wareHouse.wareHouseName,
                        //     productId: row.row.original.wareHouse.productId,
                        //     quantity: row.row.original.wareHouse.quantity,
                        //     consumableQuantity: row.row.original.wareHouse.consumableQuantity,
                        //     reservedQuantity: row.row.original.wareHouse.reservedQuantity
                        // }
                    }

                }

                const activeHandler = async (e) => {
                    setActive(!active)

                    try {
                        const { data, status } = await SetProductSupply(activeChang)
                        
                        // if (status === 200){
                        //
                        //     setActive(!active)
                        // }
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
            Header: 'عملیات', accessor: 'عملیات', Cell: row => (
                <ul className="table-controls">

                    <button className="p-0 border-0  non-hover  bg-transparent edit-btn" data-toggle="tooltip" data-placement="top" title="ویرایش"
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


                    <button className="p-0 border-0  non-hover  bg-transparent edit-btn" onClick={() => openModal(row.row.original.id)} href="#" data-toggle="tooltip" data-placement="top" title="حذف">
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
        }])

    const data = useMemo(() => productSupply);
    const handelSearchFieldClear=async()=>{
setGeData(true)
        getProductSupply()
        setCreateDate('')
        setCottageCode('')
        setProducId('')
        setGeData(true)

        setPageNumber(0)
        sessionStorage.clear()

    }
    if(productSupply){
        const dataForExcel = data.map(item => ({
            'شناسه': item.id,
            'محصول': item.product.name,

            'قیمت': item.price,
            'تعداد': item.quantity,
            'توضیحات': item.comment,
            'تاریخ': new Date(item.endDate).toLocaleDateString('fa-IR', { year: 'numeric', month: '2-digit', day: '2-digit' })
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



                            <div className="col-lg-4 col-md-6  col-sm-12  mb-1">

                                <label style={{ position: 'absolute', zIndex: '1', top: '-15px', right: '10px', background: 'white', padding: '0 8px' }}>تاریخ ایجاد</label>
                                <div className='form-group  '>
                                    <DatePicker
                                        calendar={persian}

                                        locale={persian_fa}
                                        style={{ height: '45.39px', width: '100%', textAlign: 'center' }}
                                        value={CreateDate}
                                        onChange={handleChangeExpire}
                                    />

                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6  col-sm-12  mb-1">
                                <label> کد کوتاژ</label>

                                <input className="form-control opacityForInput  mb-4" type="text" placeholder="کد کوتاژ" value={CottageCode} onChange={e => setCottageCode(e.target.value)} />
                            </div>



                            <div className="col-lg-4 col-md-6  col-sm-12  mb-1  textOnInput form-group ">
                                <div className=" form-control-sm">
                                    <label> کالا </label>

                                    <Select

                                        placeholder='کالا'
                                        options={productForSelect()}
                                        onChange={e => {
                                            setProducId(e.value)


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
                        </div> </div>
                    <br />

                    </AdvancedSearch>
                </div>
                {getDefault().ProductId || getDefault().CreateDate || getDefault().CottageCode  ? <span className="d-block p-3 text-center w-100 bg-light-primary  " style={{fontSize:"15px"}}>نمایش اطلاعات بر اساس فیلتر  </span>:null}

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


                        <p> آیا مطمئنید  عرضه محصول {productSupply && productSupply.filter(item => item.id === id).map(item => item.product.name)}   </p>
                            <p>حذف شود ؟ </p>




                            <button className="btn btn-danger float-left" onClick={deletHandler}>حذف
                            </button>

                            {/*<button className="btn btn-success float-right" onClick={closeModal}>خیر</button>*/}
                        </div>
                    </Modal>
                    <div>
                        <button className="btn btn-primary m-3" onClick={formHandler}>تعریف عرضه جدید</button>

                        <MyTable PageNumber={PageNumber} PageSize={PageSize} getDataBySearch={getDataByPage} setPageSize={setPageSize} total={totalCount} setPageNumber={setPageNumber} columns={columns} data={data} getData={rows => setSelectedRows(rows)} bulkJob={getBulkJob} />
                        <ModalGroupWork open={open} close={close} success={stateSuccess} error={stateError} />

                    </div>
                    <div className="d-flex justify-content-end">
                        <ExportToExcel apiData={dataForExcel} fileName='لیست عرضه' />
                    </div>
                </div>
            </div>


        )}
    else{
        return(
            <div className='user-progress'>
                <div className='row'>
                    <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12 '>


                    </div>
                </div>
                <div className=" statbox widget-content widget-content-area mb-1 mt-1 p-2 my-1 ">
                    <AdvancedSearch>
                      
                        <form className='form-row  form-group textOnInput'>



                            <div className="col-lg-4 col-md-6  col-sm-12  mb-1">

                                <label style={{ position: 'absolute', zIndex: '1', top: '-15px', right: '10px', background: 'white', padding: '0 8px' }}>تاریخ ایجاد</label>
                                <div className='form-group  '>
                                    <DatePicker
                                        calendar={persian}

                                        locale={persian_fa}
                                        style={{ height: '45.39px', width: '100%', textAlign: 'center' }}
                                        value={CreateDate}
                                        onChange={handleChangeExpire}
                                    />

                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6  col-sm-12  mb-1">
                                <label> کد کوتاژ</label>

                                <input className="form-control opacityForInput  mb-4" type="text" placeholder="کد کوتاژ" value={CottageCode} onChange={e => setCottageCode(e.target.value)} />
                            </div>



                            <div className="col-lg-4 col-md-6  col-sm-12  mb-1  textOnInput form-group ">
                                <div className=" form-control-sm">
                                    <label> کالا </label>

                                    <Select

                                        placeholder='کالا'
                                        options={productForSelect()}
                                        onChange={e => {
                                            setProducId(e.value)


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
                        </div> </div>
                    <br />

                    </AdvancedSearch>
                </div>
                {getDefault().ProductId || getDefault().CreateDate || getDefault().CottageCode  ? <span className="d-block p-3 text-center w-100 bg-light-primary  " style={{fontSize:"15px"}}>نمایش اطلاعات بر اساس فیلتر  </span>:null}

                <div className=" statbox widget-content widget-content-area">
                    <div>
                        <button className="btn btn-primary m-3" onClick={formHandler}>تعریف عرضه جدید</button>


                        <div className='text-center mt-5'>
                            <h5>اطلاعاتی جهت نمایش موجود نیست</h5>
                        </div>

                    </div>
                </div>


            </div>
        )
    }
}
export default ProductSupply