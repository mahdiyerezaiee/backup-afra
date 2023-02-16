
import React, { useState, useMemo, useEffect } from 'react'
import QueryString from 'qs';
import { GetInvoicesWithSearch } from '../../../services/invoiceService';
import { accessor } from 'react-widgets/esm/PropTypes';
import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import AdvancedSearch from '../../../Common/Shared/Common/AdvancedSearch';
import Modal from 'react-modal';
import Select from 'react-select';
import { DateObject } from 'react-multi-date-picker';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { EntityTypes } from '../../../Common/Enums/EntityTypesEnums';
import { PriceUnitEnums } from '../../../Common/Enums/PriceUnit';
import { PaymentStatusEnums } from '../../../Common/Enums/PaymentStatus';
import MyTable from '../../../Common/Shared/Form/MyTable';
import ModalGroupWork from '../../../Common/Shared/Common/ModalGroupWork';
import { InvoceTypes } from '../../../Common/Enums/InvoiceTypeIdEnums';
import { PaymentStructureEnums } from '../../../Common/Enums/PaymentStructureEnums';
import { GetPayments } from '../../../services/paymentService';
import ChangePayment from './ChangePayment';





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

}

const PaymentsList: React.FC = () => {
    const [PageNumber, setPageNumber] = useState(getPage().PageNumber ? getPage().PageNumber : 0)
    const [PageSize, setPageSize] = useState(getPage().PageSize ? getPage().PageSize : 10)
    const [totalCount, setTotalCount] = useState(0);
    const [selectedRows, setSelectedRows] = useState([])
    const [getData, setGeData] = useState(false)
    const [modalIsOpen, setIsOpen] = useState(false);
    const [stateSuccess, SetStateSuccess] = useState(0)
    const [open, SetOpen] = useState(false);

    const [stateError, SetStateError] = useState(0)
    const [payments, SetPayments] = useState([])
    const [InvoiceId, setInvoiceId] = useState<any>(getDefault().InvoiceId)
    const [EntityTypeId, SetEntityTypeId] = useState(getDefault().EntityTypeId)
    const [EntityId, SetEntityId] = useState(getDefault().EntityId)
    const [PriceUnitId, SetPriceUnitId] = useState(getDefault().PriceUnitId)
    const [MinPrice, SetMinPrice] = useState(getDefault().MinPrice)
    const [MaxPrice, SetMaxPrice] = useState(getDefault().MaxPrice)
    const [PaymentStatusId, SetPaymentStatusId] = useState(getDefault().PaymentStatusId)
    const [PaymentMethodId, SetPaymentMethodId] = useState(getDefault().PaymentMethodId)
    const [MinCreateDate, SetMinCreateDate] = useState(getDefault().MinCreateDate)
    const [MaxCreateDate, SetMaxCreateDate] = useState(getDefault().MaxCreateDate)
    const [MinPaymentDueDate, SetMinPaymentDueDate] = useState(getDefault().MinPaymentDueDate)
    const [MaxPaymentDueDate, SetMaxPaymentDueDate] = useState(getDefault().MaxPaymentDueDate)
    const [TrackingCode, SetTrackingCode] = useState(getDefault().TrackingCode)
    const [CustomerName, SetCustomerName] = useState(getDefault().CustomerName)
    const [HasAttachment, setHasAttachment] = useState(false)
    const [Paid, setPaid] = useState(false)
    const [Confirmed, setConfirmed] = useState(false)
    const [OrganizationName, SetOrganizationName] = useState(getDefault().OrganizationName)
    const [OrganizationNationalId, SetOrganizationNationalId] = useState(getDefault().OrganizationNationalId)
    const[IsOpenEdit,setIsOpenEdit]=useState(false)
    const[EditPayment,setEditPayment]=useState()
    const[PaymentStatus,setPaymentStatus]=useState(0)

    const companies = useSelector((state: RootState) => state.companies)


    const param = { PageSize, PageNumber }

    function getPage() {
        let items = JSON.parse(String(sessionStorage.getItem(`param${window.location.pathname}`)));
        return items ? items : ''


    }
    const params = { InvoiceId, EntityTypeId, EntityId, PaymentMethodId, PaymentStatusId, PriceUnitId, MinPrice, MaxPrice, MinCreateDate, MaxCreateDate, MinPaymentDueDate, MaxPaymentDueDate, TrackingCode }
    function getDefault() {
        let items = JSON.parse(String(sessionStorage.getItem(`params${window.location.pathname}`)));
        return items ? items : ''

    }
    const close = () => {
        SetOpen(false);
    }
    let arrayOfSelectedData = [];
    const getSelectedData = (data: any) => {

        arrayOfSelectedData = data.map((item: any) => item.original);


        return (arrayOfSelectedData)

    }
    const getBulkJob = (selected: any) => {
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
    const closeModal = () => {
        setIsOpen(false);
    }
    const openModalEdit = (peyment:any,paymentStatus:number) => {
        setEditPayment(peyment)
        setPaymentStatus(paymentStatus)
        setIsOpenEdit(true);
    }
    const closeModalEdit = () => {
        setIsOpenEdit(false);
    }
    const DeleteSelectedItem = async () => {
        const arrayOfData = getSelectedData(selectedRows);
        let successCount = 0;
        let errorCount = 0;
        for (let i = 0; i < arrayOfData.length; i++) {

            // try {
            //     const { data, status } = await DeleteSupply(arrayOfData[i].id)
            //     if (data.result.success === true) {
            //         SetOpen(true)
            //         SetStateSuccess(successCount += 1)
            //     }
            //     if (data.result.success === false) {
            //         SetOpen(true)

            //         SetStateError(errorCount += 1)
            //     }


            // } catch (error) {
            //     SetOpen(true)

            //     SetStateError(errorCount += 1)
            // }


        }

    }
    const copySelectedItem = async () => {
        const arrayOfData = getSelectedData(selectedRows);
        const copyData = arrayOfData.map((item: any) => {
            return { ...item, id: 0, active: true, createDate: new Date() }
        })

        let successCount = 0;
        let errorCount = 0;
        for (let i = 0; i < copyData.length; i++) {


            // try {
            //     let payload = {
            //         'supply': copyData[i]
            //     }
            //     const { data, status } = await SetSupply(payload)
            //     if (status === 200) {
            //         SetOpen(true)
            //         SetStateSuccess(successCount += 1)
            //     }


            // } catch (error) {
            //     SetOpen(true)

            //     SetStateError(errorCount += 1)
            // }


        }


    }
    const enableSelectedItem = async () => {
        const arrayOfData = getSelectedData(selectedRows);
        const copyData = arrayOfData.map((item: any) => {
            return { ...item, active: true }
        })

        let successCount = 0;
        let errorCount = 0;
        for (let i = 0; i < copyData.length; i++) {


            // try {
            //     let payload = {
            //         'supply': copyData[i]
            //     }

            //     const { data, status } = await SetSupply(payload)
            //     if (status === 200) {
            //         SetOpen(true)
            //         SetStateSuccess(successCount += 1)
            //     }


            // } catch (error) {
            //     SetOpen(true)

            //     SetStateError(errorCount += 1)
            // }


        }


    }
    const disableSelectedItem = async () => {
        const arrayOfData = getSelectedData(selectedRows);
        const copyData = arrayOfData.map((item: any) => {
            return { ...item, active: false }
        })

        let successCount = 0;
        let errorCount = 0;
        for (let i = 0; i < copyData.length; i++) {


            // try {

            //     let payload = {
            //         'supply': copyData[i]
            //     }

            //     const { data, status } = await SetSupply(payload)
            //     if (status === 200) {
            //         SetOpen(true)
            //         SetStateSuccess(successCount += 1)
            //     }


            // } catch (error) {
            //     SetOpen(true)

            //     SetStateError(errorCount += 1)
            // }


        }


    }
    const handelMinCreateDate = (value: any) => {
        if (value === null) {
            SetMinCreateDate('')
        }
        //تغییرات روی تاریخ رو اینجا اعمال کنید
        if (value instanceof DateObject) {
            SetMinCreateDate(new Date(value.toDate().setHours(3, 30, 0, 0)))



        }
    }
    const handelMaxCreateDate = (value: any) => {
        if (value === null) {
            SetMaxCreateDate('')
        }
        //تغییرات روی تاریخ رو اینجا اعمال کنید
        if (value instanceof DateObject) {
            SetMaxCreateDate(new Date(value.toDate().setHours(3, 30, 0, 0)))
        }
    }
    const handelMinPaymentDueDate = (value: any) => {
        if (value === null) {
            SetMinPaymentDueDate('')
        }
        //تغییرات روی تاریخ رو اینجا اعمال کنید
        if (value instanceof DateObject) {
            SetMinPaymentDueDate(new Date(value.toDate().setHours(3, 30, 0, 0)))



        }
    }
    const handelMaxPaymentDueDate = (value: any) => {
        if (value === null) {
            SetMaxPaymentDueDate('')
        }
        //تغییرات روی تاریخ رو اینجا اعمال کنید
        if (value instanceof DateObject) {
            SetMaxPaymentDueDate(new Date(value.toDate().setHours(3, 30, 0, 0)))
        }
    }
    const getDataBySearch = async () => {
        let config = {

            headers: { 'Content-Type': 'application/json' },
            params: {
                InvoiceId,
                EntityTypeId,
                EntityId,
                PriceUnitId,
                MinPrice,
                MaxPrice,
                PaymentStatusId,
                PaymentMethodId,
                MinCreateDate,
                MaxCreateDate,
                MinPaymentDueDate,
                MaxPaymentDueDate,
                CustomerName,
                OrganizationName,
                TrackingCode,
                HasAttachment:HasAttachment===false?null:HasAttachment,
                Paid:Paid===false?null:Paid,
                Confirmed:Confirmed===false?null:Confirmed,
                OrganizationNationalId,
                IsAdmin: true,
                PageNumber,
                PageSize


            }
            ,
            paramsSerializer: (params: any) => {

                return QueryString.stringify(params)
            }

        };

        try {
            const { data, status } = await GetPayments(config);
            if (status === 200) {
                SetPayments(data.result.payments.values)
                setTotalCount(data.result.payments.totalCount)

                sessionStorage.setItem(`param${window.location.pathname}`, JSON.stringify(param));

            }

        } catch (err) {
            console.log(err)
        }
    }
    const getDataByPage = async () => {
        let config = {

            headers: { 'Content-Type': 'application/json' },
            params: {
                InvoiceId,
                EntityTypeId,
                EntityId,
                PriceUnitId,
                MinPrice,
                MaxPrice,
                PaymentStatusId,
                PaymentMethodId,
                MinCreateDate,
                MaxCreateDate,
                MinPaymentDueDate,
                MaxPaymentDueDate,
                CustomerName,
                OrganizationName,
                TrackingCode,
                HasAttachment:HasAttachment===false?null:HasAttachment,
                Paid:Paid===false?null:Paid,
                Confirmed:Confirmed===false?null:Confirmed,
                OrganizationNationalId,
                IsAdmin: true,
                PageNumber,
                PageSize

            }
            ,
            paramsSerializer: (params: any) => {

                return QueryString.stringify(params)
            }

        };

        try {
            const { data, status } = await GetPayments(config);
            if (status === 200) {
                SetPayments(data.result.payments.values)
                setTotalCount(data.result.payments.totalCount)

                sessionStorage.setItem(`param${window.location.pathname}`, JSON.stringify(param));

            }

        } catch (err) {
            console.log(err)
        }

    }
    const getPayments = async () => {
        if (getData) {
            sessionStorage.clear()

        }

        let config = {

            headers: { 'Content-Type': 'application/json' },
            params: {
                InvoiceId,
                EntityTypeId,
                EntityId,
                PriceUnitId,
                MinPrice,
                MaxPrice,
                PaymentStatusId,
                PaymentMethodId,
                MinCreateDate,
                MaxCreateDate,
                MinPaymentDueDate,
                MaxPaymentDueDate,
                CustomerName,
                OrganizationName,
                TrackingCode,
                HasAttachment:HasAttachment===false?null:HasAttachment,
                Paid:Paid===false?null:Paid,
                Confirmed:Confirmed===false?null:Confirmed,
                OrganizationNationalId,
                IsAdmin: true,
                PageNumber,
                PageSize

            }
            ,
            paramsSerializer: (params: any) => {

                return QueryString.stringify(params)
            }

        };

        try {
            const { data, status } = await GetPayments(config);
            if (status === 200) {
                setGeData(false)
                SetPayments(data.result.payments.values)
                setTotalCount(data.result.payments.totalCount)

                sessionStorage.setItem(`param${window.location.pathname}`, JSON.stringify(param));

            }
        } catch (err) {
            console.log(err)
        }

    }
    useEffect(() => {
        getPayments()

    }, [getData])
    let formatterForMoney = new Intl.NumberFormat('fa-IR', {

        currency: 'IRR'


    });
    const CompaniesIDs = () => {
        return (companies.map(data => ({ label: data.name, value: data.id })))
    }
    const EntityTypesIDs = () => {

        return (EntityTypes.filter((item: any) => item.id === 10 || item.id === 11).map((data: any) => ({ label: data.name, value: data.id })))
    }
    const PriceUnitIDS = () => {
        return (PriceUnitEnums.map((data: any) => ({ label: data.name, value: data.id })))
    }
    const PaymentStatusIds = () => {
        return (PaymentStatusEnums.map((data: any) => ({ label: data.name, value: data.id })))
    }
    const PaumentMrthodIds = () => {
        return (PaymentStructureEnums.map((data: any) => ({ label: data.name, value: data.id })))
    }
    const columns = useMemo(() => [
        { Header: '#', accessor: 'id' },
        { Header: 'شناسه مشتری', accessor: 'customerId' },
        { Header: 'نام مشتری', accessor: 'customerName' },
        { Header: 'نام سازمان', accessor: 'organizationName' },
        { Header: 'کد پیگیری', accessor: 'trackingCode' },
        {
            Header: 'قیمت', accessor: 'price', Cell: (rows: any) => {

                return (formatterForMoney.format(rows.row.original.price))

            }
        },
        {
            Header: 'واحد', accessor: 'priceUnitId', Cell: (rows: any) => {

                return (PriceUnitEnums.filter((i: any) => i.id === rows.row.original.priceUnitId).map((i: any) => i.name))
            }
        },
        {
            Header: 'وضعیت پرداخت', accessor: 'paymentStatusId', Cell: (rows: any) => {

                return (PaymentStatusEnums.filter((i: any) => i.id === rows.row.original.paymentStatusId).map((i: any) => i.name))
            }
        },
        {
            Header: 'نوع پرداخت', accessor: 'paymentMethodId', Cell: (rows: any) => {


                return (PaymentStructureEnums.filter((i: any) => i.id === rows.row.original.paymentMethodId).map((i: any) => i.name))
            }
        },
        {
            Header: 'تاریخ ثبت ', accessor: 'createDate', Cell: (rows: any) => {

                return (new Date(rows.row.original.createDate).toLocaleDateString('fa-IR'))
            }
        },
        {
            Header: 'تاریخ سررسید ', accessor: 'paymentDueDate', Cell: (rows: any) => {

                return (new Date(rows.row.original.paymentDueDate).toLocaleDateString('fa-IR'))
            }
        },
        { Header: 'تایید سند', accessor: 'confirmed',Cell:(Rows:any)=>{

            return(Rows.row.original.confirmed?'بله':'خیر')

        } },
        { Header: 'تایید پرداخت', accessor: 'paid',Cell:(Rows:any)=>{

            return(Rows.row.original.paid?'بله':'خیر')

         }},
        { Header: 'دارای سند', accessor: 'hasAttachment',Cell:(Rows:any)=>{

            return(Rows.row.original.hasAttachment?'بله':'خیر')

         }},

        { Header: 'توضیحات', accessor: 'comment' },
        {
            Header: 'عملیات', accessor: '', Cell: row => (

                <div className=" btn-group">

                    <button className="border-0 bg-transparent non-hover edit-btn" data-toggle="tooltip"
                        data-placement="top" data-title="ویرایش"
                        onClick={function () {
                            openModalEdit(row.row.original,row.row.original.paymentStatusId)
                      
                        }}
                        >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                            viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-edit-2">
                            <path
                                d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                        </svg>
                    </button>


                </div>

            )}



    ], [])

    const data = useMemo(() => payments, [payments])


    const handelSearchFieldClear = () => {
        setGeData(true)
        getPayments()
        setInvoiceId('')
        SetOrganizationName('')
        SetOrganizationNationalId('')
        SetCustomerName('')

        SetMinCreateDate('')
        SetMaxCreateDate('')
        SetMinPaymentDueDate('')
        SetMaxPaymentDueDate('')
        SetMaxPrice('')
        setHasAttachment(false)
        setPaid(false)
        setConfirmed(false)
        SetTrackingCode(null)
        SetEntityId(null)
        SetEntityTypeId([])
        SetMinPrice('')
        SetPriceUnitId('')
        SetPaymentStatusId(null)
        SetPaymentMethodId(null)

        sessionStorage.clear()

        setPageNumber(0)
    }
    if (payments) {
        return (
            <div className="rounded">
<ChangePayment payment={EditPayment} closeModal={closeModalEdit} modalIsOpen={IsOpenEdit}  paymentStatus={PaymentStatus}/>
                <div className='row'>
                    <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12  '>
                    </div>
                </div>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Selected Option"
                    ariaHideApp={false}>
                </Modal>
                <div className=" statbox widget-content widget-content-area mb-1 mt-1 p-2  rounded">
                    <AdvancedSearch>
                        <br />
                        <form className='form-row textOnInput'>
                            <div className="col-lg-2 col-md-4  col-sm-12  mb-1">

                                <label className="date-piker-form" >تاریخ ایجاد از</label>
                                <div className='form-group  '>
                                    <DatePicker
                                        calendar={persian}
                                        locale={persian_fa}
                                        style={{ height: '45.39px', width: '100%', textAlign: 'center' }}
                                        value={MinCreateDate}
                                        onChange={handelMinCreateDate}
                                    />

                                </div>
                            </div>
                            <div className="col-lg-2 col-md-4  col-sm-12  mb-1">
                                <label className="date-piker-form"  >تاریخ ایجاد تا</label>
                                <div className='form-group  '>
                                    <DatePicker
                                        calendar={persian}
                                        locale={persian_fa}
                                        style={{ height: '45.39px', width: '100%', textAlign: 'center' }}
                                        value={MaxCreateDate}
                                        onChange={handelMaxCreateDate}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-4  col-sm-12  mb-1">

                                <label className="date-piker-form" >تاریخ سررسید از</label>
                                <div className='form-group  '>
                                    <DatePicker
                                        calendar={persian}
                                        locale={persian_fa}
                                        style={{ height: '45.39px', width: '100%', textAlign: 'center' }}
                                        value={MinPaymentDueDate}
                                        onChange={handelMinPaymentDueDate}
                                    />

                                </div>
                            </div>
                            <div className="col-lg-2 col-md-4  col-sm-12  mb-1">
                                <label className="date-piker-form"  >تاریخ سررسید تا</label>
                                <div className='form-group  '>
                                    <DatePicker
                                        calendar={persian}
                                        locale={persian_fa}
                                        style={{ height: '45.39px', width: '100%', textAlign: 'center' }}
                                        value={MaxPaymentDueDate}
                                        onChange={handelMaxPaymentDueDate}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-4  col-sm-12  mb-1">
                                <label>شماره پیگیری</label>
                                <input className="form-control opacityForInput  mb-4" type="text" placeholder="شماره پیگیری"
                                    value={TrackingCode} onChange={(e: any) => SetTrackingCode(e.target.value)} /></div>
                            <div className="col-lg-2 col-md-4  col-sm-12  mb-1">
                                <label>شناسه فاکتور </label>
                                <input className="form-control opacityForInput  mb-4" type="number" placeholder="شناسه فاکتور "
                                    value={InvoiceId} onChange={(e: any) => setInvoiceId(e.target.value)} /></div>
                            <div className="col-lg-2 col-md-4  col-sm-12  mb-1">
                                <label> نام مشتری</label>

                                <input className="form-control opacityForInput  mb-4" type="text"
                                    placeholder="نام مشتری"
                                    value={CustomerName} onChange={(e: any) => SetCustomerName(e.target.value)} />
                            </div>

                            <div className="col-lg-2 col-md-4  col-sm-12  mb-1">
                                <label> شناسه ملی</label>
                                <input className="form-control opacityForInput  mb-4" type="text" placeholder="شناسه ملی"
                                    maxLength={11} value={OrganizationNationalId}
                                    onChange={(e: any) => SetOrganizationNationalId(e.target.value)} /></div>

                            <div className="col-lg-2 col-md-4  col-sm-12  mb-1">
                                <label>نام سازمان</label>

                                <input className="form-control opacityForInput  mb-4" type="text" placeholder="نام سازمان"
                                    value={OrganizationName} onChange={(e: any) => SetOrganizationName(e.target.value)} />
                            </div>
                            <div className="col-lg-2 col-md-4  col-sm-12  mb-1">
                                <label>حداقل قیمت</label>

                                <input className="form-control opacityForInput  mb-4" type="number" placeholder="حداقل قیمت"
                                    value={MinPrice} onChange={(e: any) => SetMinPrice(e.target.value)} />
                            </div>
                            <div className="col-lg-2 col-md-4  col-sm-12  mb-1">
                                <label>حداکثر قیمت</label>

                                <input className="form-control opacityForInput  mb-4" type="number" placeholder="حداکثر قیمت"
                                    value={MaxPrice} onChange={(e: any) => SetMaxPrice(e.target.value)} />
                            </div>
                            <div className="col-lg-2 col-md-4  col-sm-12    textOnInput form-group "
                                style={{ marginBottom: "3rem" }}>
                                <div className=" form-control-sm">
                                    <label>نوع فاکتور</label>
                                    {EntityTypeId && EntityTypeId === null ?
                                        <Select

                                            placeholder="نوع فاکتور"
                                            options={EntityTypesIDs()}

                                            isClearable={true}
                                            onChange={(e: any) => {
                                                SetEntityTypeId(e.value)
                                            }}
                                        /> : <Select

                                            placeholder="نوع فاکتور"
                                            options={EntityTypesIDs()}
                                            value={EntityTypesIDs().filter((i: any) => i.value === EntityTypeId).map((i: any) => i)}

                                            isClearable={true}
                                            onChange={(e: any) => {
                                                SetEntityTypeId(e.value)
                                            }}
                                        />}
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-4  col-sm-12    textOnInput form-group "
                                style={{ marginBottom: "3rem" }}>
                                <div className=" form-control-sm">
                                    <label>واحد پول </label>
                                    {PriceUnitId && PriceUnitId === null ?
                                        <Select

                                            placeholder='واحد پول '
                                            options={PriceUnitIDS()}

                                            isClearable={true}
                                            onChange={(e: any) => {
                                                SetPriceUnitId(e.value)
                                            }} /> :
                                        <Select

                                            placeholder='واحد پول '
                                            options={PriceUnitIDS()}
                                            value={PriceUnitIDS().filter((i: any) => i.value === PriceUnitId).map((i: any) => i)}
                                            isClearable={true}
                                            onChange={(e: any) => {
                                                SetPriceUnitId(e.value)
                                            }} />
                                    }
                                </div>
                            </div>

                            <div className="col-lg-2 col-md-4  col-sm-12    textOnInput form-group "
                                style={{ marginBottom: "3rem" }}>
                                <div className=" form-control-sm">
                                    <label>وضعیت پرداخت </label>

                                    {PaymentStatusId && PaymentStatusId === null ?
                                        <Select

                                            placeholder='وضعیت پرداخت'
                                            options={PaymentStatusIds()}


                                            onChange={(e: any) => {
                                                SetPaymentStatusId(e.value)
                                            }}
                                        /> : <Select

                                            value={PaymentStatusIds().filter((i: any) => i.value === PaymentStatusId).map((i: any) => i)}
                                            placeholder='وضعیت پرداخت'
                                            options={PaymentStatusIds()}


                                            onChange={(e: any) => {
                                                SetPaymentStatusId(e.value)
                                            }}
                                        />}
                                </div>
                            </div>

                            <div className="col-lg-2 col-md-4  col-sm-12    textOnInput form-group "
                                style={{ marginBottom: "3rem" }}>
                                <div className=" form-control-sm">
                                    <label>وضعیت پرداخت </label>

                                    {PaymentMethodId && PaymentMethodId === null ?
                                        <Select

                                            placeholder='وضعیت پرداخت'
                                            options={PaumentMrthodIds()}


                                            onChange={(e: any) => {
                                                SetPaymentMethodId(e.value)
                                            }}
                                        /> : <Select

                                            value={PaumentMrthodIds().filter((i: any) => i.value === PaymentMethodId).map((i: any) => i)}
                                            placeholder='وضعیت پرداخت'
                                            options={PaumentMrthodIds()}


                                            onChange={(e: any) => {
                                                SetPaymentMethodId(e.value)
                                            }}
                                        />}
                                </div>
                            </div>


                            <div className="col-lg-2 col-md-2  col-sm-12 mt-4">
                                <label className="checkbox-inline ml-3">

                                    <input id='attachment' type="checkbox" checked={HasAttachment} onChange={(e: any) => setHasAttachment(e.target.checked)} /> دارای سند</label>
                            </div>
                            <div className=" col-lg-2 col-md-2  col-sm-12 mt-4 ">
                                <label className=" checkbox-inline ml-3">

                                    <input type="checkbox" className='' checked={Paid} onChange={(e: any) => setPaid(e.target.checked)} /> پرداخت شده</label>

                            </div>
                            <div className=" col-lg-2 col-md-2  col-sm-12 mt-4 ">
                                <label className=" checkbox-inline ml-3">

                                    <input type="checkbox" className='' checked={Confirmed} onChange={(e: any) => setConfirmed(e.target.checked)} /> تاییدیه سند</label>

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
                <div className=" statbox widget-content widget-content-area">
                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        style={customStyles}
                        contentLabel="Selected Option"
                        ariaHideApp={false}

                    >




                        {/*<button className="btn btn-success float-right" onClick={closeModal}>خیر</button>*/}

                    </Modal>
                    <div>

                        <MyTable columns={columns} data={data} getData={(rows: any) => setSelectedRows(rows)} bulkJob={getBulkJob}
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

            </div >


        )
    }
    else {
        return (
            <div className="rounded">

                <div className='row'>
                    <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12  '>
                    </div>
                </div>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Selected Option"
                    ariaHideApp={false}>
                </Modal>
                <div className=" statbox widget-content widget-content-area mb-1 mt-1 p-2  rounded">
                <AdvancedSearch>
                        <br />
                        <form className='form-row textOnInput'>
                            <div className="col-lg-2 col-md-4  col-sm-12  mb-1">

                                <label className="date-piker-form" >تاریخ ایجاد از</label>
                                <div className='form-group  '>
                                    <DatePicker
                                        calendar={persian}
                                        locale={persian_fa}
                                        style={{ height: '45.39px', width: '100%', textAlign: 'center' }}
                                        value={MinCreateDate}
                                        onChange={handelMinCreateDate}
                                    />

                                </div>
                            </div>
                            <div className="col-lg-2 col-md-4  col-sm-12  mb-1">
                                <label className="date-piker-form"  >تاریخ ایجاد تا</label>
                                <div className='form-group  '>
                                    <DatePicker
                                        calendar={persian}
                                        locale={persian_fa}
                                        style={{ height: '45.39px', width: '100%', textAlign: 'center' }}
                                        value={MaxCreateDate}
                                        onChange={handelMaxCreateDate}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-4  col-sm-12  mb-1">

                                <label className="date-piker-form" >تاریخ سررسید از</label>
                                <div className='form-group  '>
                                    <DatePicker
                                        calendar={persian}
                                        locale={persian_fa}
                                        style={{ height: '45.39px', width: '100%', textAlign: 'center' }}
                                        value={MinPaymentDueDate}
                                        onChange={handelMinPaymentDueDate}
                                    />

                                </div>
                            </div>
                            <div className="col-lg-2 col-md-4  col-sm-12  mb-1">
                                <label className="date-piker-form"  >تاریخ سررسید تا</label>
                                <div className='form-group  '>
                                    <DatePicker
                                        calendar={persian}
                                        locale={persian_fa}
                                        style={{ height: '45.39px', width: '100%', textAlign: 'center' }}
                                        value={MaxPaymentDueDate}
                                        onChange={handelMaxPaymentDueDate}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-4  col-sm-12  mb-1">
                                <label>شماره پیگیری</label>
                                <input className="form-control opacityForInput  mb-4" type="text" placeholder="شماره پیگیری"
                                    value={TrackingCode} onChange={(e: any) => SetTrackingCode(e.target.value)} /></div>
                            <div className="col-lg-2 col-md-4  col-sm-12  mb-1">
                                <label>شناسه فاکتور </label>
                                <input className="form-control opacityForInput  mb-4" type="number" placeholder="شناسه فاکتور "
                                    value={InvoiceId} onChange={(e: any) => setInvoiceId(e.target.value)} /></div>
                            <div className="col-lg-2 col-md-4  col-sm-12  mb-1">
                                <label> نام مشتری</label>

                                <input className="form-control opacityForInput  mb-4" type="text"
                                    placeholder="نام مشتری"
                                    value={CustomerName} onChange={(e: any) => SetCustomerName(e.target.value)} />
                            </div>

                            <div className="col-lg-2 col-md-4  col-sm-12  mb-1">
                                <label> شناسه ملی</label>
                                <input className="form-control opacityForInput  mb-4" type="text" placeholder="شناسه ملی"
                                    maxLength={11} value={OrganizationNationalId}
                                    onChange={(e: any) => SetOrganizationNationalId(e.target.value)} /></div>

                            <div className="col-lg-2 col-md-4  col-sm-12  mb-1">
                                <label>نام سازمان</label>

                                <input className="form-control opacityForInput  mb-4" type="text" placeholder="نام سازمان"
                                    value={OrganizationName} onChange={(e: any) => SetOrganizationName(e.target.value)} />
                            </div>
                            <div className="col-lg-2 col-md-4  col-sm-12  mb-1">
                                <label>حداقل قیمت</label>

                                <input className="form-control opacityForInput  mb-4" type="number" placeholder="حداقل قیمت"
                                    value={MinPrice} onChange={(e: any) => SetMinPrice(e.target.value)} />
                            </div>
                            <div className="col-lg-2 col-md-4  col-sm-12  mb-1">
                                <label>حداکثر قیمت</label>

                                <input className="form-control opacityForInput  mb-4" type="number" placeholder="حداکثر قیمت"
                                    value={MaxPrice} onChange={(e: any) => SetMaxPrice(e.target.value)} />
                            </div>
                            <div className="col-lg-2 col-md-4  col-sm-12    textOnInput form-group "
                                style={{ marginBottom: "3rem" }}>
                                <div className=" form-control-sm">
                                    <label>نوع فاکتور</label>
                                    {EntityTypeId && EntityTypeId === null ?
                                        <Select

                                            placeholder="نوع فاکتور"
                                            options={EntityTypesIDs()}

                                            isClearable={true}
                                            onChange={(e: any) => {
                                                SetEntityTypeId(e.value)
                                            }}
                                        /> : <Select

                                            placeholder="نوع فاکتور"
                                            options={EntityTypesIDs()}
                                            value={EntityTypesIDs().filter((i: any) => i.value === EntityTypeId).map((i: any) => i)}

                                            isClearable={true}
                                            onChange={(e: any) => {
                                                SetEntityTypeId(e.value)
                                            }}
                                        />}
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-4  col-sm-12    textOnInput form-group "
                                style={{ marginBottom: "3rem" }}>
                                <div className=" form-control-sm">
                                    <label>واحد پول </label>
                                    {PriceUnitId && PriceUnitId === null ?
                                        <Select

                                            placeholder='واحد پول '
                                            options={PriceUnitIDS()}

                                            isClearable={true}
                                            onChange={(e: any) => {
                                                SetPriceUnitId(e.value)
                                            }} /> :
                                        <Select

                                            placeholder='واحد پول '
                                            options={PriceUnitIDS()}
                                            value={PriceUnitIDS().filter((i: any) => i.value === PriceUnitId).map((i: any) => i)}
                                            isClearable={true}
                                            onChange={(e: any) => {
                                                SetPriceUnitId(e.value)
                                            }} />
                                    }
                                </div>
                            </div>

                            <div className="col-lg-2 col-md-4  col-sm-12    textOnInput form-group "
                                style={{ marginBottom: "3rem" }}>
                                <div className=" form-control-sm">
                                    <label>وضعیت پرداخت </label>

                                    {PaymentStatusId && PaymentStatusId === null ?
                                        <Select

                                            placeholder='وضعیت پرداخت'
                                            options={PaymentStatusIds()}


                                            onChange={(e: any) => {
                                                SetPaymentStatusId(e.value)
                                            }}
                                        /> : <Select

                                            value={PaymentStatusIds().filter((i: any) => i.value === PaymentStatusId).map((i: any) => i)}
                                            placeholder='وضعیت پرداخت'
                                            options={PaymentStatusIds()}


                                            onChange={(e: any) => {
                                                SetPaymentStatusId(e.value)
                                            }}
                                        />}
                                </div>
                            </div>

                            <div className="col-lg-2 col-md-4  col-sm-12    textOnInput form-group "
                                style={{ marginBottom: "3rem" }}>
                                <div className=" form-control-sm">
                                    <label>وضعیت پرداخت </label>

                                    {PaymentMethodId && PaymentMethodId === null ?
                                        <Select

                                            placeholder='وضعیت پرداخت'
                                            options={PaumentMrthodIds()}


                                            onChange={(e: any) => {
                                                SetPaymentMethodId(e.value)
                                            }}
                                        /> : <Select

                                            value={PaumentMrthodIds().filter((i: any) => i.value === PaymentMethodId).map((i: any) => i)}
                                            placeholder='وضعیت پرداخت'
                                            options={PaumentMrthodIds()}


                                            onChange={(e: any) => {
                                                SetPaymentMethodId(e.value)
                                            }}
                                        />}
                                </div>
                            </div>


                            <div className="col-lg-2 col-md-2  col-sm-12 mt-4">
                                <label className="checkbox-inline ml-3">

                                    <input id='attachment' type="checkbox" checked={HasAttachment} onChange={(e: any) => setHasAttachment(e.target.checked)} /> دارای سند</label>
                            </div>
                            <div className=" col-lg-2 col-md-2  col-sm-12 mt-4 ">
                                <label className=" checkbox-inline ml-3">

                                    <input type="checkbox" className='' checked={Paid} onChange={(e: any) => setPaid(e.target.checked)} /> پرداخت شده</label>

                            </div>
                            <div className=" col-lg-2 col-md-2  col-sm-12 mt-4 ">
                                <label className=" checkbox-inline ml-3">

                                    <input type="checkbox" className='' checked={Confirmed} onChange={(e: any) => setConfirmed(e.target.checked)} /> تاییدیه سند</label>

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
                <div className=" statbox widget-content widget-content-area">
                    <div>
                        <div className='text-center mt-5'>
                            <h5>اطلاعاتی جهت نمایش موجود نیست</h5>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default PaymentsList